import { serviceLog } from "@/lib/utils";

export type CurrencyConversionServiceProps = {
  baseCurrency: string;
  targetCurrency: string | null;
};

export default async function currencyConversion({
  baseCurrency,
  targetCurrency,
}: CurrencyConversionServiceProps) {
  if (!targetCurrency) return 1;
  if (baseCurrency === targetCurrency) return 1;

  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?from=${baseCurrency}&to=${targetCurrency}`,
    );

    if (!response.ok) throw new Error("Failed to fetch exchange rate");

    const data = await response.json();

    // Returns 1:1 ratio
    serviceLog("currencyConversion", data.rates[targetCurrency] ?? 1);
    return data.rates[targetCurrency] ?? 1;
  } catch (err) {
    console.error(err);
    return 1;
  }
}
