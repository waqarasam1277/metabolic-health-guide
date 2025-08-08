import type { RiskZone } from "./calculations";

export type Advice = {
  diet: string;
  exercise: string;
  monitoring: string;
};

export function generateAdvice(bmi: number, diagnosis: "No" | "Prediabetes" | "Diabetes", risk: RiskZone): Advice {
  // Simple rules-based recommendations (no external API needed)
  const obese = bmi >= 30;
  const overweight = bmi >= 25 && bmi < 30;

  let diet = "Emphasize whole foods, vegetables, lean proteins, and reduce added sugars.";
  let exercise = "Aim for at least 150 minutes/week of moderate activity.";
  let monitoring = "Annual check-up with fasting glucose and lipids.";

  if (overweight) {
    diet = "Increase fiber (25–30g/day), replace refined carbs with whole grains, avoid sugary drinks.";
    exercise = "30–45 min brisk walking 5 days/week; add 2 resistance sessions.";
  }
  if (obese) {
    diet = "Structured calorie deficit with high-fiber, high-protein meals; limit ultra-processed foods.";
    exercise = "Start with 30 min/day, progress to 45–60; prioritize low-impact cardio + strength training.";
  }

  if (diagnosis === "Prediabetes") {
    monitoring = "Recheck HbA1c in 3–6 months; screen BP and waist circumference.";
  }
  if (diagnosis === "Diabetes") {
    monitoring = "HbA1c every 3 months until stable; annual eye and kidney screening; foot checks.";
  }

  if (risk === "High Risk") {
    diet += " Consider dietitian referral.";
    exercise += " Gradually increase intensity under supervision if needed.";
  }

  return { diet, exercise, monitoring };
}
