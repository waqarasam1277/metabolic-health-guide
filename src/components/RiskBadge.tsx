import type { RiskZone } from "@/lib/calculations";
import { cn } from "@/lib/utils";

const RiskBadge = ({ risk, className }: { risk: RiskZone; className?: string }) => {
  const styles =
    risk === "Low Risk"
      ? "bg-success/10 text-success border-success/20"
      : risk === "Moderate Risk"
      ? "bg-warning/10 text-warning border-warning/20"
      : "bg-destructive/10 text-destructive border-destructive/20";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
        styles,
        className
      )}
      aria-label={`Risk category: ${risk}`}
    >
      {risk}
    </span>
  );
};

export default RiskBadge;
