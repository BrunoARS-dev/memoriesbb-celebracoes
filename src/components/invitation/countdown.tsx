"use client";

import { useEffect, useState } from "react";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(target: string): TimeLeft {
  const difference = Math.max(new Date(target).getTime() - Date.now(), 0);
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

export function Countdown({ target, label }: { target: string; label: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft(target));
    update();
    const interval = window.setInterval(update, 1_000);
    return () => window.clearInterval(interval);
  }, [target]);

  if (!timeLeft) return <div className="countdown-placeholder" aria-hidden="true" />;

  const units = [
    [timeLeft.days, "dias"], [timeLeft.hours, "horas"],
    [timeLeft.minutes, "minutos"], [timeLeft.seconds, "segundos"],
  ] as const;

  return (
    <section className="countdown" aria-label={label}>
      <p className="countdown-label">{label}</p>
      <div className="countdown-grid" aria-live="off">
        {units.map(([value, unit]) => (
          <div className="countdown-unit" key={unit}>
            <strong>{String(value).padStart(2, "0")}</strong><span>{unit}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
