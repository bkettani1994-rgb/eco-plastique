export default function Loading() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="h-9 w-64 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-4 w-80 animate-pulse rounded-xl bg-gray-100" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4">
              <div className="aspect-square w-full animate-pulse rounded-xl bg-gray-200" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-9 w-full animate-pulse rounded-xl bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
