import { toast } from "@/components/layout/providers/ToastProvider";
import useCompleteAchievement from "@/hooks/achievements/useCompleteAchievement";
import { hookLog } from "@/lib/utils";
import { useLingui } from "@lingui/react/macro";
import { useEffect, useRef, useState } from "react";

const TIMEOUT_MS = 5_000;
const MIN_PRESSES_FOR_SUCCESS = __DEV__ ? 2 : 14;

type UseSecretPressHookProps = {
  pressesForSuccess?: number;
  isSilent?: boolean;
  grantAchievement?: boolean;
  onSuccess?: () => void;
};

export default function useSecretPress({
  pressesForSuccess,
  isSilent = false,
  grantAchievement = true,
  onSuccess,
}: UseSecretPressHookProps = {}) {
  const { t } = useLingui();
  const [presses, setPresses] = useState(0);
  const [isSuccess, setIsSuccess] = useState(__DEV__);
  const previousPresses = useRef(0);
  const { mutate: achieve } = useCompleteAchievement();

  useEffect(() => {
    if (presses >= (pressesForSuccess ?? MIN_PRESSES_FOR_SUCCESS)) {
      if (
        previousPresses.current < (pressesForSuccess ?? MIN_PRESSES_FOR_SUCCESS)
      ) {
        hookLog("useSecretPress", presses);

        const nextSuccess = !isSuccess;
        setIsSuccess(nextSuccess);

        onSuccess?.();
        if (isSilent) return;
        toast({
          type: "info",
          text1: nextSuccess ? t`Secret found!` : t`Hid the secret! 😉`,
        });
      }
    }

    previousPresses.current = presses;

    const timeoutId = setTimeout(() => {
      setPresses(0);
    }, TIMEOUT_MS);

    return () => clearTimeout(timeoutId);
  }, [presses, isSuccess, pressesForSuccess, onSuccess, isSilent, t]);

  function handleSecretPress() {
    setPresses((prev) => prev + 1);

    if (!grantAchievement) return;
    achieve({
      achievementType: "find-a-secret",
    });
  }

  function reset() {
    setIsSuccess(false);
    setPresses(0);
  }

  //   TODO:
  return { handleSecretPress, isSuccess: true, reset };
}
