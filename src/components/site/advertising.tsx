export function Advertising() {
  return (
    <section id="advertising" className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
        <p className="mono-label text-accent">Advertising</p>
        <h2 className="mt-3 text-3xl md:text-[2.4rem] leading-[1.12] font-bold tracking-[-0.01em] text-white">
          Your message, on our
          <br className="hidden sm:block" /> machine&nbsp;screens.
        </h2>
        <p className="mt-4 max-w-[56ch] text-[0.9375rem] leading-relaxed text-white/70">
          Every machine carries a display screen in daily use. The hosting
          institution decides what plays. Its own messaging comes first, and
          the remaining slots are open to advertisers whose content the
          institution approves.
        </p>

        <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-px bg-white/15 border border-white/15 rounded-lg overflow-hidden">
          {[
            {
              step: "Pick your placements",
              body: "Machines sit in campuses, hospitals, workplaces and public facilities. Choose the sites that match your audience.",
            },
            {
              step: "Send your content",
              body: "Submit the material you want on screen with your preferred run period.",
            },
            {
              step: "Host approval, then it plays",
              body: "The institution hosting the machine reviews and approves what appears on its site. Approved content runs on the screen's advertising slots.",
            },
          ].map((s) => (
            <div key={s.step} className="bg-primary p-6 md:p-8">
              <h3 className="text-base font-bold text-white">{s.step}</h3>
              <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-white/65">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <a
            href="#contact"
            data-interest="advertising"
            className="bg-white text-primary text-sm font-semibold px-6 py-3.5 rounded-md hover:bg-mist transition-colors w-fit"
          >
            Advertise on our screens
          </a>
          <p className="text-[0.8125rem] text-white/55">
            Rates and available placements on request.
          </p>
        </div>
      </div>
    </section>
  );
}
