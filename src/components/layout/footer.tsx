"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, AtSign, MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { navLinks, siteConfig, socialLinks, whatsappLink } from "@/data/site";
import { Newsletter } from "@/components/newsletter";

const socialIcons = { Facebook: Globe, Instagram: AtSign };

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-gray text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <Image
            src="https://res.cloudinary.com/diptsoc4h/image/upload/v1782939698/EcoPlastique-logo_htt8s1.png"
            alt={siteConfig.businessName}
            width={140}
            height={44}
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <p className="text-sm leading-relaxed text-gray-400">{siteConfig.description}</p>
          <div className="flex items-center gap-3 pt-2">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.label as keyof typeof socialIcons];
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-primary"
                >
                  {Icon ? <Icon size={18} /> : null}
                </a>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-primary" />
              {siteConfig.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-primary" />
              {siteConfig.email}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              {siteConfig.address}
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <MessageCircle size={16} className="text-primary" />
                Discuter sur WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Newsletter
          </h3>
          <p className="text-sm text-gray-400">
            Recevez nos offres et nouveautés directement par e-mail.
          </p>
          <Newsletter />
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-gray-500">
        © {year} {siteConfig.businessName}. Tous droits réservés.
      </div>
    </footer>
  );
}
