import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple in-memory rate limiter (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(ip: string, limit: number = 5, windowMs: number = 600000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Remove old timestamps outside the window
  const recentTimestamps = timestamps.filter((ts) => now - ts < windowMs);

  if (recentTimestamps.length >= limit) {
    return false; // Rate limit exceeded
  }

  // Add current timestamp
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);

  return true;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateInputs(data: ContactFormData): { valid: boolean; error?: string } {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    return { valid: false, error: 'İsim gereklidir' };
  }

  if (!data.email || typeof data.email !== 'string' || !validateEmail(data.email)) {
    return { valid: false, error: 'Geçerli bir e-posta adresi gereklidir' };
  }

  if (data.phone && typeof data.phone !== 'string') {
    return { valid: false, error: 'Geçerli bir telefon numarası girin' };
  }

  if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length === 0) {
    return { valid: false, error: 'Konu gereklidir' };
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    return { valid: false, error: 'Mesaj en az 10 karakter olmalıdır' };
  }

  // Length limits
  if (data.name.length > 100) {
    return { valid: false, error: 'İsim çok uzun' };
  }

  if (data.subject.length > 200) {
    return { valid: false, error: 'Konu çok uzun' };
  }

  if (data.message.length > 5000) {
    return { valid: false, error: 'Mesaj çok uzun' };
  }

  return { valid: true };
}

async function sendEmail(data: ContactFormData, clientIP: string): Promise<{ ok: boolean; error?: string }> {
  try {
    // Check environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactTo = process.env.CONTACT_TO || 'info@lunvera.com.tr';

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.error('Missing SMTP configuration');
      return { ok: false, error: 'E-posta servisi şu anda kullanılamıyor' };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: parseInt(smtpPort, 10) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Format timestamp
    const timestamp = new Date().toLocaleString('tr-TR', {
      timeZone: 'Europe/Istanbul',
    });

    // HTML email body
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          Yeni İletişim Formu Mesajı
        </h2>
        
        <div style="margin: 20px 0;">
          <p><strong>İsim:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>E-posta:</strong> ${escapeHtml(data.email)}</p>
          ${data.phone ? `<p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>` : ''}
          <p><strong>Konu:</strong> ${escapeHtml(data.subject)}</p>
        </div>

        <div style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #1f2937; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1f2937;">Mesaj:</h3>
          <p style="white-space: pre-wrap; word-wrap: break-word;">
            ${escapeHtml(data.message)}
          </p>
        </div>

        <div style="border-top: 1px solid #e5e7eb; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #6b7280;">
          <p>
            <strong>Gönderim Tarihi:</strong> ${timestamp}<br/>
            <strong>İstemci IP:</strong> ${clientIP}
          </p>
        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: smtpUser,
      to: contactTo,
      subject: `[Web Form] ${data.subject} — ${data.name}`,
      html: htmlBody,
      replyTo: data.email,
    });

    return { ok: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { ok: false, error: 'E-posta gönderimi başarısız oldu' };
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const clientIP = getClientIP(request);

    // Rate limiting check
    if (!checkRateLimit(clientIP, 5, 600000)) {
      return NextResponse.json(
        { ok: false, error: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate inputs
    const validation = validateInputs(body);
    if (!validation.valid) {
      return NextResponse.json(
        { ok: false, error: validation.error },
        { status: 400 }
      );
    }

    // Send email
    const emailResult = await sendEmail(body, clientIP);

    if (!emailResult.ok) {
      return NextResponse.json(
        { ok: false, error: emailResult.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { ok: false, error: 'Sunucu hatası oluştu' },
      { status: 500 }
    );
  }
}
