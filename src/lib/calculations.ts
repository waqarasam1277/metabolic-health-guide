export type RiskZone = "Low Risk" | "Moderate Risk" | "High Risk";

export function computeBMI(weightKg: number, heightM: number) {
  const bmi = weightKg / (heightM * heightM);
  return Number.isFinite(bmi) ? bmi : 0;
}

export function computeTyG(fastingGlucoseMgDl: number, triglyceridesMgDl: number) {
  const val = (fastingGlucoseMgDl * triglyceridesMgDl) / 2;
  const tyg = Math.log(val);
  return Number.isFinite(tyg) ? tyg : 0;
}

export function computeTgHdl(triglyceridesMgDl: number, hdlMgDl: number) {
  const ratio = triglyceridesMgDl / hdlMgDl;
  return Number.isFinite(ratio) ? ratio : 0;
}

export function getRiskZone(tyg: number): RiskZone {
  if (tyg < 8.0) return "Low Risk";
  if (tyg <= 8.5) return "Moderate Risk";
  return "High Risk";
}
