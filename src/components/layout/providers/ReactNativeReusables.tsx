import { PortalHost } from "@rn-primitives/portal";
import { PropsWithChildren } from "react";

type ReactNativeReusablesProps = PropsWithChildren & {};

export default function ReactNativeReusables({
  children,
}: ReactNativeReusablesProps) {
  return (
    <>
      {children}

      <PortalHost />
    </>
  );
}
