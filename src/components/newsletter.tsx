"use client";

import { useState } from "react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <h3 className="mb-3 text-sm font-semibold text-white">Newsletter</h3>
      {submitted ? (
        <p className="text-sm text-white/80">Merci pour votre inscription !</p>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
          className="flex gap-2"
        >
          <input
            type="email"
            required
            placeholder="Votre email"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            S&apos;abonner
          </button>
        </form>
      )}
    </div>
  );
}
