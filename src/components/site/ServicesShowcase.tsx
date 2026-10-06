import { AnimatePresence, motion } from "motion/react";
import {
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
} from "react";
import { useTranslation } from "react-i18next";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import {
  AdvisoryFigure,
  AiFigure,
  AutomationFigure,
  ProductFigure,
} from "~/components/site/figures";
import { selectContactTopic } from "~/lib/contact-schema";
import { cn } from "~/lib/utils";

type ServiceTopic = "product" | "automation" | "ai" | "advisory";

const SERVICES: Array<{ topic: ServiceTopic; Figure: ComponentType }> = [
  { topic: "product", Figure: ProductFigure },
  { topic: "automation", Figure: AutomationFigure },
  { topic: "ai", Figure: AiFigure },
  { topic: "advisory", Figure: AdvisoryFigure },
];

/** APG tabs: one tablist, vertical on lg, horizontal scroll row below. */
export function ServicesShowcase() {
  const { t } = useTranslation("home");
  const ga = useGoogleAnalytics();
  const [selected, setSelected] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const { topic, Figure } = SERVICES[selected];

  const select = (i: number) => {
    setSelected(i);
    tabs.current[i]?.focus();
    tabs.current[i]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const last = SERVICES.length - 1;
    const next: Record<string, number> = {
      ArrowDown: selected === last ? 0 : selected + 1,
      ArrowRight: selected === last ? 0 : selected + 1,
      ArrowUp: selected === 0 ? last : selected - 1,
      ArrowLeft: selected === 0 ? last : selected - 1,
      Home: 0,
      End: last,
    };
    if (e.key in next) {
      e.preventDefault();
      select(next[e.key]);
    }
  };

  const steps = t("process.steps", { returnObjects: true }) as string[];

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6">
        <div
          role="tablist"
          aria-label={t("sections.services")}
          onKeyDown={onKeyDown}
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {SERVICES.map((s, i) => {
            const isSelected = i === selected;
            return (
              <button
                key={s.topic}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`service-tab-${s.topic}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="service-panel"
                aria-labelledby={`service-title-${s.topic}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelected(i)}
                className={cn(
                  "shrink-0 cursor-pointer text-left transition-[background-color,box-shadow] duration-150",
                  "rounded-full px-4 py-2.5 lg:rounded-[18px] lg:px-5 lg:py-4",
                  isSelected
                    ? "bg-surface shadow-[var(--core-highlight),0_0_0_1px_var(--line-soft),var(--shadow-soft)]"
                    : "shadow-[inset_0_0_0_1px_var(--line-soft)] hover:bg-fg/[0.03] lg:shadow-none",
                )}
              >
                <span
                  id={`service-title-${s.topic}`}
                  className={cn(
                    "block whitespace-nowrap text-[15px] font-semibold tracking-[-0.01em] lg:text-[18px]",
                    isSelected ? "text-fg" : "text-fg-muted",
                  )}
                >
                  {t(`services.${s.topic}.title`)}
                </span>
                <span className="mt-1.5 hidden max-w-[44ch] text-[15px] leading-6 text-fg-muted lg:block">
                  {t(`services.${s.topic}.description`)}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="service-panel"
          role="tabpanel"
          aria-labelledby={`service-tab-${topic}`}
          className="lg:col-span-7"
        >
          <div className="shell">
            <div className="core relative h-[260px] overflow-hidden sm:h-[340px] lg:h-[380px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={topic}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Figure />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-4 px-1">
            <p className="max-w-[48ch] text-[15px] leading-6 text-fg-muted lg:hidden">
              {t(`services.${topic}.description`)}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ul
                aria-label={t("services.deliverablesLabel")}
                className="flex flex-wrap gap-2"
              >
                {(
                  t(`services.${topic}.deliverables`, {
                    returnObjects: true,
                  }) as string[]
                ).map((item) => (
                  <li
                    key={item}
                    className="inline-flex h-8 items-center gap-1.5 rounded-full bg-surface px-3 text-[13px] text-fg shadow-[0_0_0_1px_var(--line-soft)]"
                  >
                    <span
                      aria-hidden="true"
                      className="text-[11px] text-accent"
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  ga.event("select_content", {
                    content_type: "service_card",
                    item_id: topic,
                  });
                  selectContactTopic(topic);
                }}
                className="link-underline shrink-0 self-start text-[15px] font-medium text-fg sm:self-center"
              >
                {t("cards.cta")} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h3 className="text-[14px] font-medium text-fg-muted">
          {t("process.title")}
        </h3>
        <ol className="well mt-3 grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 !rounded-[22px] p-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step}
              className="relative flex items-start gap-3 rounded-[16px] bg-surface p-4 shadow-[0_0_0_1px_var(--line-soft)]"
            >
              <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/12 text-[12px] font-semibold tabular-nums text-accent">
                {i + 1}
              </span>
              <span className="text-[15px] font-medium leading-6 text-fg">
                {step}
              </span>
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-[11px] top-1/2 z-10 hidden size-5 -translate-y-1/2 items-center justify-center rounded-full bg-bg text-[11px] text-fg-muted shadow-[0_0_0_1px_var(--line-soft)] lg:inline-flex"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
