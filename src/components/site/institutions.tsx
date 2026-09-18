"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TABS = [
  {
    id: "campuses",
    label: "Campuses",
    title: "Universities, colleges and schools",
    body: "Students refill between lectures instead of buying single-use bottles. The machine runs at high capacity through class changes, and the screen can carry campus announcements.",
  },
  {
    id: "hospitals",
    label: "Hospitals",
    title: "Hospitals and clinics",
    body: "Reliable purified water for staff, patients and visitors, with spillage control that matters in clinical corridors. Messaging on the screen stays under the facility's control.",
  },
  {
    id: "workplaces",
    label: "Workplaces",
    title: "Offices, factories and sites",
    body: "One less thing for facilities teams to manage. Cashless payment suits access-controlled sites, and servicing visits are scheduled, not reactive.",
  },
  {
    id: "public",
    label: "Public",
    title: "Shopping centres and public facilities",
    body: "Refill points where foot traffic already is. Dry floors, prepaid access and a screen the centre can use for its own messaging first.",
  },
];

const SPLIT = [
  {
    who: "The host provides",
    items: ["A suitable location", "A water supply", "Electrical power"],
  },
  {
    who: "Smart H₂O provides",
    items: [
      "Installation and commissioning",
      "Filter changes and sanitation",
      "Servicing and customer support",
    ],
  },
];

export function Institutions() {
  return (
    <section id="institutions" className="bg-mist border-y border-rule">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
        <h2 className="text-2xl md:text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-primary">
          Wherever people gather.
        </h2>
        <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-foreground/75">
          Every host site is different, but the split stays the same: you
          provide the basics, we run the machine.
        </p>

        <Tabs defaultValue="campuses" className="mt-10 md:mt-14">
          <TabsList className="bg-paper border border-rule h-auto p-1 flex flex-wrap justify-start gap-1 rounded-lg">
            {TABS.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-white text-sm font-semibold px-4 py-2.5 rounded-md text-steel"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {TABS.map((t) => (
            <TabsContent key={t.id} value={t.id} className="mt-6">
              <h3 className="text-lg md:text-xl font-bold text-primary">
                {t.title}
              </h3>
              <p className="mt-3 max-w-[62ch] text-[0.875rem] leading-relaxed text-foreground/75">
                {t.body}
              </p>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 md:mt-16 grid sm:grid-cols-2 gap-px bg-rule border border-rule rounded-lg overflow-hidden">
          {SPLIT.map((s) => (
            <div key={s.who} className="bg-paper p-6 md:p-8">
              <p className="mono-label text-primary">{s.who}</p>
              <ul className="mt-4 space-y-2.5">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="text-[0.875rem] leading-relaxed text-foreground/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[0.8125rem] text-steel">
          Final terms per site are set out in the institutional agreement.
        </p>
      </div>
    </section>
  );
}
