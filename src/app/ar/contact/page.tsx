"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/data/site";
import { submitContact } from "@/lib/submit-lead";

export default function ContactPageAr() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSending(true);
    await submitContact(form);
    setSending(false);
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <section dir="rtl" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-dark-gray sm:text-4xl">اتصل بنا</h1>
          <p className="mt-2 text-gray-600">
            سؤال أو طلب حسب المقاس؟ فريقنا يردّ عليك بسرعة.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-4 rounded-2xl bg-light-gray p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">الهاتف</p>
                <p dir="ltr" className="font-medium text-dark-gray">{siteConfig.phoneDisplay}</p>
              </div>
            </div>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-light-gray p-5 transition-colors hover:bg-primary/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">واتساب</p>
                <p className="font-medium text-dark-gray">تحدّث معنا</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl bg-light-gray p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                <p dir="ltr" className="font-medium text-dark-gray">{siteConfig.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-light-gray p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">العنوان</p>
                <p className="font-medium text-dark-gray">الدار البيضاء، المغرب</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-light-gray p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <h2 className="text-xl font-semibold text-dark-gray">
                  شكراً، سنردّ عليك بسرعة
                </h2>
                <p className="text-sm text-gray-500">
                  تم إرسال رسالتك إلى فريقنا بنجاح.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-dark-gray">
                    الاسم
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-dark-gray">
                    البريد الإلكتروني
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium text-dark-gray">
                    الهاتف
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium text-dark-gray">
                    الرسالة
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray outline-none focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg disabled:opacity-70"
                >
                  {sending ? "جارٍ الإرسال…" : "إرسال الرسالة"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
