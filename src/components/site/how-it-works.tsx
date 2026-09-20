export function HowItWorks() {
  const STAGES = [
    {
      step: "01",
      title: "Site assessment",
      body: "We visit, check water, power and foot traffic, and pick the spot.",
    },
    {
      step: "02",
      title: "Institutional agreement",
      body: "Terms in writing: what the host provides, what we cover.",
    },
    {
      step: "03",
      title: "Installation and commissioning",
      body: "Delivered, installed, commissioned. Refilling starts.",
    },
    {
      step: "04",
      title: "Maintenance and monitoring",
      body: "Scheduled filters, sanitation, servicing and local response.",
    },
  ];

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.01em] text-primary">
          From first call to first&nbsp;refill.
        </h2>

        <ol className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 lg:gap-x-12">
          {STAGES.map((s) => (
            <li key={s.step} className="border-t-2 border-rule pt-5">
              <p className="mono-label text-steel">{s.step}</p>
              <h3 className="mt-2.5 text-base font-bold text-primary">
                {s.title}
              </h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-foreground/75 max-w-[30ch]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-[0.8125rem] text-steel max-w-[56ch]">
          Assessments in Windhoek are arranged directly with our team.
        </p>
      </div>
    </section>
  );
}
