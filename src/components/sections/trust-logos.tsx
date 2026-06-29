const partnerLogos = [
  "Maroc Telecom",
  "CTM Livraison",
  "Glovo",
  "Amana",
  "Aramex",
  "Jumia",
  "Decathlon Maroc",
];

export function TrustLogos() {
  const logos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="border-y border-gray-100 bg-light-gray py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-wide text-gray-500">
          Ils nous font confiance
        </p>
        <div className="scrollbar-hide overflow-hidden">
          <div className="flex w-max animate-marquee gap-12">
            {logos.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="flex h-14 min-w-[160px] items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-gray-400 shadow-sm"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
