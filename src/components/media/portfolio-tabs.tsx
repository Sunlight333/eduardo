"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { cx } from "@/lib/utils";

export type PortfolioTab = { id: string; label: string; count: number; panel: ReactNode };

export function PortfolioTabs({ tabs, initialTab }: { tabs: PortfolioTab[]; initialTab?: string }) {
  const [selected, setSelected] = useState(
    tabs.some((t) => t.id === initialTab) ? (initialTab as string) : tabs[0].id,
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent, index: number) {
    const offsets: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    if (!(event.key in offsets)) return;
    event.preventDefault();
    const next = (index + offsets[event.key] + tabs.length) % tabs.length;
    setSelected(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Portfólio" className="bg-sand-200/70 inline-flex rounded-full p-1">
        {tabs.map((tab, index) => {
          const isSelected = tab.id === selected;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={isSelected}
              aria-controls={`painel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(tab.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={cx(
                "rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-6",
                isSelected ? "bg-ink-900 text-sand-50 shadow" : "text-ink-700 hover:text-ink-950",
              )}
            >
              {tab.label}
              <span className={cx("ml-2 text-xs tabular-nums", isSelected ? "text-brand-400" : "text-stone-500")}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`painel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== selected}
          className="mt-10"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}

/** Lê ?tab= para abrir direto na aba certa (ex.: redirects das galerias). */
export function PortfolioTabsFromUrl({ tabs }: { tabs: PortfolioTab[] }) {
  const tab = useSearchParams().get("tab") ?? undefined;
  return <PortfolioTabs key={tab} tabs={tabs} initialTab={tab} />;
}
