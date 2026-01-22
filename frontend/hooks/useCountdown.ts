import { useState, useEffect } from "react";

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
}

/**
 * Hook to get countdown time from a timestamp and duration
 * @param lastPing - Unix timestamp when vault was last pinged (in seconds)
 * @param timeout - Timeout duration in seconds
 * @returns Countdown information with updates every second
 */
export function useCountdown(
  lastPing?: bigint,
  timeout?: bigint
): CountdownTime {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    totalSeconds: 0,
  });

  useEffect(() => {
    if (!lastPing || !timeout) return;

    const updateCountdown = () => {
      const now = Math.floor(Date.now() / 1000);
      const lastPingSeconds = Number(lastPing);
      const timeoutSeconds = Number(timeout);

      const elapsed = now - lastPingSeconds;
      const remaining = timeoutSeconds - elapsed;

      if (remaining <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
          totalSeconds: 0,
        });
        return;
      }

      const days = Math.floor(remaining / 86400);
      const hours = Math.floor((remaining % 86400) / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
        totalSeconds: remaining,
      });
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [lastPing, timeout]);

  return countdown;
}

/**
 * Format countdown time to human-readable string
 */
export function formatCountdown(countdown: CountdownTime): string {
  if (countdown.isExpired) {
    return "Expired";
  }

  if (countdown.days > 0) {
    return `${countdown.days}d ${countdown.hours}h`;
  }

  if (countdown.hours > 0) {
    return `${countdown.hours}h ${countdown.minutes}m`;
  }

  if (countdown.minutes > 0) {
    return `${countdown.minutes}m ${countdown.seconds}s`;
  }

  return `${countdown.seconds}s`;
}

/**
 * Format countdown time with full details
 */
export function formatCountdownFull(countdown: CountdownTime): string {
  if (countdown.isExpired) {
    return "Expired";
  }

  const parts: string[] = [];
  if (countdown.days > 0)
    parts.push(`${countdown.days} day${countdown.days !== 1 ? "s" : ""}`);
  if (countdown.hours > 0)
    parts.push(`${countdown.hours} hour${countdown.hours !== 1 ? "s" : ""}`);
  if (countdown.minutes > 0)
    parts.push(
      `${countdown.minutes} minute${countdown.minutes !== 1 ? "s" : ""}`
    );
  if (countdown.seconds > 0 || parts.length === 0)
    parts.push(
      `${countdown.seconds} second${countdown.seconds !== 1 ? "s" : ""}`
    );

  return parts.slice(0, 2).join(", ");
}
