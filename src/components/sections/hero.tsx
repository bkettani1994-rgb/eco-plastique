"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { whatsappLink } from "@/data/site";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-primary/10 via-white to-primary/5">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        <div className="space-y-6">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold leading-tight text-dark-gray sm:text-4xl md:text-5xl"
          >
            Le confort et la protection pour votre maison
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base leading-relaxed text-gray-600 sm:text-lg"
          >
            Nappes en PVC sur mesure, protège-matelas imperméables et oreillers médicaux de
            qualité pour protéger et améliorer le confort de votre foyer marocain.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/produits"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg"
            >
              Découvrir nos produits
              <ArrowRight size={18} />
            </Link>
            <Link
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary px-6 py-3.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white"
            >
              <MessageCircle size={18} />
              Commander sur WhatsApp
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ImagePlaceholder aspect="video" iconSize={48} label="Eco Plastique" />
        </motion.div>
      </div>
    </section>
  );
}
