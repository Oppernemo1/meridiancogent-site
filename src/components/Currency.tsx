"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  CURRENCIES,
  CURRENCY_STORAGE_KEY,
  PRICE_SHEET_HREF,
  formatPrice,
  isCurrency,
  type Currency,
  type Money,
} from "@/lib/pricing";

/**
 * Which currency prices render in.
 *
 * `initial` is the currency of the static variant being served — middleware
 * picks EUR or USD from the visitor's country and rewrites to the matching
 * pre-built page, so the server HTML is already right for most visitors and
 * crawlers get a complete page. A choice the visitor made with the switch is
 * kept in localStorage (never a cookie) and applied after hydration.
 */
const CurrencyContext = createContext<{
  currency: Currency;
  setCurrency: (currency: Currency) => void;
} | null>(null);

export function CurrencyProvider({
  initial,
  children,
}: {
  initial: Currency;
  children: ReactNode;
}) {
  const [currency, setState] = useState<Currency>(initial);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (isCurrency(stored)) setState(stored);
    } catch {
      // Storage blocked (private mode, disabled site data): keep the default.
    }
  }, []);

  const setCurrency = useCallback((next: Currency) => {
    setState(next);
    try {
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, next);
    } catch {
      // Not remembered, but the switch still works for this page view.
    }
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const value = useContext(CurrencyContext);
  if (!value) throw new Error("useCurrency must be used inside CurrencyProvider");
  return value;
}

/** A price in the current currency, e.g. "€30,000". */
export function Price({ amount }: { amount: Money }) {
  const { currency } = useCurrency();
  return <>{formatPrice(amount[currency], currency)}</>;
}

const LABELS: Record<Currency, string> = { EUR: "EUR €", USD: "USD $" };

export function CurrencySwitch({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <div
      role="group"
      aria-label="Currency"
      className={`inline-flex border border-graphite ${className}`}
    >
      {CURRENCIES.map((option) => {
        const active = option === currency;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => setCurrency(option)}
            className={`min-h-11 px-4 text-small font-semibold transition-colors focus-visible:relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              active
                ? "bg-graphite text-on-dark-primary"
                : "bg-white text-graphite hover:bg-paper"
            }`}
          >
            {LABELS[option]}
          </button>
        );
      })}
    </div>
  );
}

export function PriceSheetLink({ className = "" }: { className?: string }) {
  const { currency } = useCurrency();
  return (
    <a href={PRICE_SHEET_HREF[currency]} download className={className}>
      Download the price sheet (PDF)
      <span className="sr-only">, {currency}</span>
    </a>
  );
}
