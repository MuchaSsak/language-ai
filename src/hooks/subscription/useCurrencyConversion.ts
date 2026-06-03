import currencyConversion, {
  CurrencyConversionServiceProps,
} from "@/services/subscription/currencyConversion";
import { useQuery } from "@tanstack/react-query";

export default function useCurrencyConversion({
  baseCurrency,
  targetCurrency,
}: CurrencyConversionServiceProps) {
  const query = useQuery({
    queryKey: ["currencyConversion", baseCurrency, targetCurrency],
    queryFn: () => currencyConversion({ baseCurrency, targetCurrency }),
  });

  return query;
}
