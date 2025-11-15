# Contact Page Setup Guide

## Installation

### 1. Install Nodemailer
```bash
npm install nodemailer
npm install -D @types/nodemailer
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local` and fill in your SMTP credentials:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_TO=info@lunvera.com.tr
```

### 3. Gmail Setup (Recommended)

If using Gmail:

1. Enable 2-Factor Authentication on your Google Account
2. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Copy the generated 16-character password
3. Use this password as `SMTP_PASS` in `.env.local`

### 4. Other Email Providers

**Outlook/Hotmail:**
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

**SendGrid:**
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

**Custom SMTP:**
Use your provider's SMTP settings.

## Files Created

- `app/iletisim/page.tsx` - Contact page with form and map
- `app/api/contact/route.ts` - Email API endpoint
- `.env.example` - Environment variables template

## Features

✅ Client-side form validation
✅ Server-side input validation
✅ Rate limiting (5 requests per 10 minutes per IP)
✅ Honeypot spam protection
✅ Bot detection (2-second minimum before submit)
✅ Responsive design with Tailwind CSS
✅ Framer Motion animations
✅ Google Maps embed
✅ Contact info display
✅ Success/error alerts
✅ Loading spinner during submission
✅ Accessibility (aria labels, focus rings)
✅ Turkish localization

## Testing

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Navigate to `/iletisim`

3. Fill out the form and submit

4. Check your email inbox for the contact form submission

## Security Notes

- Honeypot field catches obvious bots
- Rate limiting prevents spam abuse
- 2-second minimum delay prevents rapid-fire submissions
- Server-side validation prevents malicious input
- Email addresses are HTML-escaped to prevent injection
- SMTP credentials stored in environment variables (never committed)

## Customization

### Change Email Recipient
Edit `CONTACT_TO` in `.env.local`

### Adjust Rate Limit
In `app/api/contact/route.ts`, modify the `checkRateLimit()` call:
```typescript
checkRateLimit(clientIP, 10, 300000) // 10 requests per 5 minutes
```

### Modify Form Fields
Edit the form fields in `app/iletisim/page.tsx` and update validation in `app/api/contact/route.ts`

## Troubleshooting

**"Cannot find module 'nodemailer'"**
- Run `npm install nodemailer @types/nodemailer`

**"Missing SMTP configuration"**
- Check that `.env.local` exists and has all required variables
- Restart the dev server after adding env variables

**"Email not sending"**
- Verify SMTP credentials are correct
- Check that your email provider allows SMTP connections
- Look at server logs for detailed error messages

**"Rate limit exceeded"**
- Wait 10 minutes or restart the dev server (clears in-memory rate limit)

## Notes

- The rate limiter is in-memory and resets on server restart
- For production, consider using a persistent rate limiter (Redis, etc.)
- The contact info block on the right side displays business details
- Google Maps embed uses the business address from the form
