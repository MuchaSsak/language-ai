import MissingConsentProvider from "@/components/layout/providers/MissingConsentProvider";
import ToastProvider from "@/components/layout/providers/ToastProvider";
import { PropsWithChildren } from "react";

type NavigationProvidersProps = PropsWithChildren & {};

export default function NavigationProviders({
  children,
}: NavigationProvidersProps) {
  return (
    <MissingConsentProvider>
      <ToastProvider>{children}</ToastProvider>
    </MissingConsentProvider>
  );
}
