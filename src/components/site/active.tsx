export function Active() {
  return (
    <section id="active" className="bg-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
        <div className="border-t-2 border-accent pt-6">
          <p className="mono-label text-primary">Smart H₂O Active</p>
          <h2 className="mt-3 text-xl md:text-2xl font-bold text-primary">
            Hydrate. Perform. Recover.
          </h2>
          <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-foreground/75">
            Branded bottles and hydration accessories for people who train,
            play and work hard.
          </p>
          <a
            href="#contact"
            data-interest="smart-h2o-active"
            className="mt-6 inline-block border border-primary text-primary text-sm font-semibold px-6 py-3 rounded-md hover:bg-secondary transition-colors"
          >
            Ask about Active products
          </a>
        </div>
      </div>
    </section>
  );
}
