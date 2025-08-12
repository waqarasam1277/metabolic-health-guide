import React from "react";

type Preset = "bmi" | "tyg" | "tgratio";

type Band = {
  from: number;
  to: number;
  token: "primary" | "accent" | "destructive";
};

type Config = {
  min: number;
  max: number;
  bands: Band[];
};

const PRESETS: Record<Preset, Config> = {
  bmi: {
    min: 10,
    max: 45,
    bands: [
      { from: 18.5, to: 24.9, token: "primary" }, // Normal
      { from: 25, to: 29.9, token: "accent" }, // Overweight
      { from: 30, to: 45, token: "destructive" }, // Obese
    ],
  },
  tyg: {
    min: 6,
    max: 10,
    bands: [
      { from: 6, to: 8, token: "primary" }, // Low
      { from: 8, to: 8.5, token: "accent" }, // Moderate
      { from: 8.5, to: 10, token: "destructive" }, // High
    ],
  },
  tgratio: {
    min: 0,
    max: 8,
    bands: [
      { from: 0, to: 3, token: "primary" }, // Ideal
      { from: 3, to: 4.5, token: "accent" }, // Moderate risk
      { from: 4.5, to: 8, token: "destructive" }, // High risk
    ],
  },
};

const tokenBgMap: Record<Band["token"], string> = {
  primary: "bg-[hsl(var(--primary))]",
  accent: "bg-[hsl(var(--accent))]",
  destructive: "bg-[hsl(var(--destructive))]",
};

export default function RangeGauge({ preset, value }: { preset: Preset; value: number }) {
  const cfg = PRESETS[preset];
  const clamped = Math.min(Math.max(value, cfg.min), cfg.max);
  const toPct = (v: number) => ((v - cfg.min) / (cfg.max - cfg.min)) * 100;

  return (
    <div className="w-full" aria-label={`${preset} gauge`} role="meter" aria-valuemin={cfg.min} aria-valuemax={cfg.max} aria-valuenow={clamped}>
      <div className="relative h-2 w-full rounded bg-muted overflow-hidden">
        {cfg.bands.map((b, i) => {
          const left = toPct(b.from);
          const width = toPct(b.to) - toPct(b.from);
          return (
            <div
              key={i}
              className={`absolute top-0 h-full ${tokenBgMap[b.token]}`}
              style={{ left: `${left}%`, width: `${width}%` }}
            />
          );
        })}
        {/* Pointer */}
        <div
          className="absolute -top-1 h-4 w-0.5 bg-[hsl(var(--ring))] shadow-sm"
          style={{ left: `${toPct(clamped)}%`, transform: "translateX(-50%)" }}
        />
      </div>
    </div>
  );
}
