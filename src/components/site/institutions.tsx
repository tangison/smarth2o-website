"use client";

import Link from "next/link";
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
    id: "government",
    label: "Government",
    title: "Government offices and public institutions",
    body: "A prepaid, self-service refill point suits access-controlled buildings and public counters alike. Usage is visible, servicing is scheduled, and the screen carries the office's own notices first.",
  },
  {
    id: "centres",
    label: "Centres",
    title: "Shopping centres and public facilities",
    body: "Refill points where foot traffic already is. Dry floors, prepaid access and a screen the centre can use for its own messaging first.",
  },
  {
    id: "gyms",
    label: "Gyms and sport",
    title: "Gyms and sports facilities",
    body: "Members refill training bottles before and after sessions. High throughput at peak hours, and a natural fit with Smart H₂O Active bottles sold or handed out on site.",
  },
  {
    id: "workplaces",
    label: "Workplaces",
    title: "Offices, factories and sites",
    body: "One less thing for facilities teams to manage. Cashless payment suits access-controlled sites, and servicing visits are scheduled, not reactive.",
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
    <section className="bg-mist">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
        <h2 className="text-2xl md:text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-primary">
          Six kinds of host&nbsp;site.
        </h2>
        <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-foreground/75">
          Every host site is different, but the split stays the same: you
          provide the basics, we run the machine.
        </p>

        <Tabs defaultValue="campuses" className="mt-10 md:mt-14">
          <TabsList className="bg-paper border border-rule h-auto p-1 flex flex-wrap justify-start gap-1 rounded-full">
            {TABS.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-white text-sm font-semibold px-4 py-2.5 rounded-full text-steel"
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

        <div className="mt-12 md:mt-16 grid sm:grid-cols-2 gap-px bg-rule border border-rule rounded-2xl overflow-hidden">
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

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <Link
            href="/contact?interest=host-machine"
            className="bg-primary text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-foreground transition-colors w-fit"
          >
            Host a machine
          </Link>
          <p className="text-[0.8125rem] text-steel">
            Final terms per site are set out in the institutional agreement.
          </p>
        </div>
      </div>
    </section>
  );
}
