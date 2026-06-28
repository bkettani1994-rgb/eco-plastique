"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/data/site";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-dark-gray sm:text-4xl">Contactez-nous</h1>
          <p className="mt-2 text-gray-600">
            Une question, une commande sur mesure ? Notre équipe vous répond rapidement.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-4 rounded-2xl bg-light-gray p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-medium text-dark-gray">{siteConfig.phoneDisplay}</p>
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
                <p className="text-sm text-gray-500">WhatsApp</p>
                <p className="font-medium text-dark-gray">Discuter avec nous</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl bg-light-gray p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-dark-gray">{siteConfig.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-light-gray p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Adresse</p>
                <p className="font-medium text-dark-gray">{siteConfig.address}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-light-gray p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <h2 className="text-xl font-semibold text-dark-gray">
                  Merci, nous vous répondrons rapidement
                </h2>
                <p className="text-sm text-gray-500">
                  Votre message a bien été envoyé à notre équipe.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-dark-gray">
                    Nom
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-dark-gray">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium text-dark-gray">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium text-dark-gray"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray outline-none focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg"
                >
                  Envoyer le message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
