'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, type Variants, easeOut } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useI18n } from '@/components/I18nProvider';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  honeypot: string;
}

interface FormState {
  isLoading: boolean;
  success: boolean | null;
  error: string | null;
}

export default function ContactPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    success: null,
    error: null,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formStartTime, setFormStartTime] = useState<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setFormStartTime(Date.now());
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'İsim ve soyisim gereklidir';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta adresi gereklidir';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası girin';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Konu gereklidir';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj gereklidir';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mesaj en az 10 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      setFormState({ isLoading: false, success: true, error: null });
      return;
    }

    // Time-based bot check (minimum 2 seconds)
    if (Date.now() - formStartTime < 2000) {
      setFormState({
        isLoading: false,
        success: false,
        error: 'Lütfen biraz daha bekleyin',
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setFormState({ isLoading: true, success: null, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setFormState({
          isLoading: false,
          success: true,
          error: null,
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          honeypot: '',
        });
        setErrors({});
      } else {
        setFormState({
          isLoading: false,
          success: false,
          error: data.error || 'Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin.',
        });
      }
    } catch (err) {
      setFormState({
        isLoading: false,
        success: false,
        error: 'Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin.',
      });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[36vh] md:h-[44vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/34622756/pexels-photo-34622756.jpeg?_gl=1*10zzopw*_ga*MjA2MDM2MDc0OS4xNzYzMjE3OTc4*_ga_8JE65Q40S6*czE3NjMyMjA3NDQkbzIkZzEkdDE3NjMyMjA3ODUkajE5JGwwJGgw)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight drop-shadow-lg">
            İletişim
          </h1>
          <p className="mt-3 text-lg md:text-xl text-white/90 font-light drop-shadow-md">
            Soru ve talepleriniz için bize yazın.
          </p>
        </motion.div>
      </section>

      {/* Info Cards Section */}
      <section className="relative bg-white pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 -mt-10 md:-mt-14 relative z-10"
          >
            {/* Address Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl shadow-lg p-5 sm:p-6 flex items-start gap-4"
            >
              <div className="flex-shrink-0 mt-1">
                <MapPin className="w-6 h-6 text-gray-900" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                  Adres
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Demirhendek Cd. No:49, 06360 Siteler – Altındağ / Ankara – TÜRKİYE
                </p>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl shadow-lg p-5 sm:p-6 flex items-start gap-4"
            >
              <div className="flex-shrink-0 mt-1">
                <Phone className="w-6 h-6 text-gray-900" aria-hidden />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                  Telefon
                </h3>
                <div className="mt-2 flex flex-col space-y-1.5">
                  {[
                    { label: '+90 312 351 40 70', href: 'tel:+903123514070' },
                    { label: '0 536 575 77 57', href: 'tel:+905365757757' },
                    { label: '0 532 296 78 43', href: 'tel:+905322967843' },
                  ].map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="text-base md:text-[17px] text-gray-700 leading-6 font-normal hover:underline"
                      aria-label={`Telefon: ${p.label}`}
                    >
                      {p.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl shadow-lg p-5 sm:p-6 flex items-start gap-4"
            >
              <div className="flex-shrink-0 mt-1">
                <Mail className="w-6 h-6 text-gray-900" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                  E-posta
                </h3>
                <a
                  href="mailto:info@lunvera.com.tr"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  info@lunvera.com.tr
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          >
            {/* Form - LEFT */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >
                {/* Success Alert */}
                {formState.success === true && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
                  >
                    Mesajınız alındı. En kısa sürede sizinle iletişime geçeceğiz.
                  </motion.div>
                )}

                {/* Error Alert */}
                {formState.success === false && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                  >
                    {formState.error}
                  </motion.div>
                )}

                {/* Honeypot (hidden) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    İsim - Soyisim <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={formState.isLoading}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      errors.name
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    placeholder="Adınız ve soyadınız"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Eposta Adresi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={formState.isLoading}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      errors.email
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    placeholder="ornek@email.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={formState.isLoading}
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      errors.phone
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    placeholder="+90 (5XX) XXX XX XX"
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Konu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={formState.isLoading}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      errors.subject
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    placeholder="Konunuz"
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-600">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Mesaj <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={formState.isLoading}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none ${
                      errors.message
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    placeholder="Mesajınızı buraya yazın..."
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formState.isLoading}
                  whileHover={{ scale: formState.isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: formState.isLoading ? 1 : 0.98 }}
                  className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formState.isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Gönderiliyor...
                    </>
                  ) : (
                    'Gönder'
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Map - RIGHT */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps?q=Demirhendek%20Cd%20No:49%2006360%20Altındağ%20Ankara&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                  title="Lunvera Bedding - Ankara Konumu"
                />
              </div>

              {/* Contact Info */}
              <motion.div
                variants={itemVariants}
                className="mt-8 space-y-4 p-6 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                    Adres
                  </h3>
                  <p className="text-sm text-gray-700">
                    Demirhendek Cd. No:49 06360 Siteler – Altındağ / Ankara – TÜRKİYE
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                    Telefon
                  </h3>
                  <p className="text-sm text-gray-700">+90 312 351 40 70</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                    Mobil
                  </h3>
                  <p className="text-sm text-gray-700">
                    0 536 575 77 57 / 0 532 296 78 43
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                    E-posta
                  </h3>
                  <a
                    href="mailto:info@lunvera.com.tr"
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    info@lunvera.com.tr
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                    Web
                  </h3>
                  <a
                    href="https://www.lunvera.com.tr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    www.lunvera.com.tr
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
