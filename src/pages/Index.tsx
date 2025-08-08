import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { computeBMI, computeTgHdl, computeTyG, getRiskZone, type RiskZone } from "@/lib/calculations";
import { generateAdvice, type Advice } from "@/lib/advice";


const schema = z.object({
  fullName: z.string().min(2, "Enter full name"),
  age: z.coerce.number().int().min(0).max(120),
  gender: z.enum(["Male", "Female"]),
  weight: z.coerce.number().positive(),
  height: z.coerce.number().positive(),
  fastingGlucose: z.coerce.number().positive(),
  triglycerides: z.coerce.number().positive(),
  hdl: z.coerce.number().positive(),
  hba1c: z.coerce.number().positive(),
  diagnosis: z.enum(["No", "Prediabetes", "Diabetes"]),
});

type FormValues = z.infer<typeof schema>;

type AssessmentRecord = {
  id?: string;
  created_at?: string;
  full_name: string;
  age: number;
  gender: string;
  weight_kg: number;
  height_m: number;
  fasting_glucose: number;
  triglycerides: number;
  hdl: number;
  hba1c: number;
  diabetes_diagnosis: string;
  bmi: number;
  tyg: number;
  tg_hdl_ratio: number;
  risk_zone: RiskZone;
  summary: string;
  advice: Advice;
};

const STORAGE_KEY = "metabolic_assessments";

const Index = () => {
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<AssessmentRecord | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { gender: "Male", diagnosis: "No" } });

  const values = watch();
  const live = useMemo(() => {
    if (!values.height || !values.weight || !values.fastingGlucose || !values.triglycerides || !values.hdl) return null;
    const bmi = computeBMI(values.weight, values.height);
    const tyg = computeTyG(values.fastingGlucose, values.triglycerides);
    const ratio = computeTgHdl(values.triglycerides, values.hdl);
    const risk = getRiskZone(tyg);
    return { bmi, tyg, ratio, risk };
  }, [values.height, values.weight, values.fastingGlucose, values.triglycerides, values.hdl]);

  useEffect(() => {
    document.title = "Metabolic Risk Calculator";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Assess diabetes and metabolic risk with BMI, TyG index and TG/HDL ratio.");
  }, []);

  const onSubmit = async (data: FormValues) => {
    const bmi = computeBMI(data.weight, data.height);
    const tyg = computeTyG(data.fastingGlucose, data.triglycerides);
    const tg_hdl_ratio = computeTgHdl(data.triglycerides, data.hdl);
    const risk_zone = getRiskZone(tyg);
    const summary = `${data.age}-year-old ${data.gender.toLowerCase()} with ${data.diagnosis.toLowerCase()} status; TyG ${tyg.toFixed(2)} indicates ${risk_zone.toLowerCase()} risk.`;
    const advice = generateAdvice(bmi, data.diagnosis, risk_zone);

    const record: AssessmentRecord = {
      full_name: data.fullName,
      age: data.age,
      gender: data.gender,
      weight_kg: data.weight,
      height_m: data.height,
      fasting_glucose: data.fastingGlucose,
      triglycerides: data.triglycerides,
      hdl: data.hdl,
      hba1c: data.hba1c,
      diabetes_diagnosis: data.diagnosis,
      bmi,
      tyg,
      tg_hdl_ratio,
      risk_zone,
      summary,
      advice,
    };

    setSaving(true);
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const withId = { ...record, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([withId, ...existing]));
    setResult(withId);
    toast("Saved locally", { description: "Connect Supabase to store assessments securely." });
    setSaving(false);
    reset();
  };

  const setDemo = () => {
    setValue("fullName", "John Doe");
    setValue("age", 48);
    setValue("gender", "Male");
    setValue("weight", 82);
    setValue("height", 1.75);
    setValue("fastingGlucose", 110);
    setValue("triglycerides", 180);
    setValue("hdl", 42);
    setValue("hba1c", 6.1);
    setValue("diagnosis", "Prediabetes");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <section className="container py-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">Metabolic Risk Calculator</h1>
        <p className="text-muted-foreground mb-6">Enter patient data to compute BMI, TyG index and TG/HDL-C ratio, then save results.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Jane Smith" {...register("fullName")} />
                    {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" inputMode="numeric" {...register("age")} />
                    {errors.age && <p className="text-sm text-destructive mt-1">{errors.age.message}</p>}
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <Select onValueChange={(v) => setValue("gender", v as any)} defaultValue={"Male"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-sm text-destructive mt-1">{errors.gender.message}</p>}
                  </div>
                  <div>
                    <Label>Diabetes diagnosis</Label>
                    <Select onValueChange={(v) => setValue("diagnosis", v as any)} defaultValue={"No"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Diagnosis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Prediabetes">Prediabetes</SelectItem>
                        <SelectItem value="Diabetes">Diabetes</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.diagnosis && <p className="text-sm text-destructive mt-1">{errors.diagnosis.message}</p>}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" type="number" step="0.1" {...register("weight")} />
                    {errors.weight && <p className="text-sm text-destructive mt-1">{errors.weight.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="height">Height (m)</Label>
                    <Input id="height" type="number" step="0.01" {...register("height")} />
                    {errors.height && <p className="text-sm text-destructive mt-1">{errors.height.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="fastingGlucose">Fasting Glucose (mg/dL)</Label>
                    <Input id="fastingGlucose" type="number" step="1" {...register("fastingGlucose")} />
                    {errors.fastingGlucose && <p className="text-sm text-destructive mt-1">{errors.fastingGlucose.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="triglycerides">Triglycerides (mg/dL)</Label>
                    <Input id="triglycerides" type="number" step="1" {...register("triglycerides")} />
                    {errors.triglycerides && <p className="text-sm text-destructive mt-1">{errors.triglycerides.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="hdl">HDL (mg/dL)</Label>
                    <Input id="hdl" type="number" step="1" {...register("hdl")} />
                    {errors.hdl && <p className="text-sm text-destructive mt-1">{errors.hdl.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="hba1c">HbA1c (%)</Label>
                    <Input id="hba1c" type="number" step="0.1" {...register("hba1c")} />
                    {errors.hba1c && <p className="text-sm text-destructive mt-1">{errors.hba1c.message}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Compute & Save"}</Button>
                  <Button type="button" variant="secondary" onClick={setDemo}>Fill demo</Button>
                  <Button asChild variant="outline">
                    <a href="/patients">View patients</a>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
              {live ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Metric label="BMI" value={live.bmi.toFixed(1)} />
                    <Metric label="TyG index" value={live.tyg.toFixed(2)} />
                    <Metric label="TG/HDL-C" value={live.ratio.toFixed(2)} />
                    <Metric label="Risk" value={live.risk} />
                  </div>
                  <p className="text-sm text-muted-foreground">TyG risk thresholds: Low &lt; 8.0 • Moderate 8.0–8.5 • High &gt; 8.5</p>
                </div>
              ) : (
                <p className="text-muted-foreground">Enter values to preview results.</p>
              )}

              {result && (
                <div className="mt-6 space-y-4">
                  <Separator />
                  <h3 className="font-medium">Summary</h3>
                  <p className="text-sm leading-relaxed">{result.summary}</p>
                  <div>
                    <h4 className="font-medium mb-2">Personalized Advice</h4>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li><strong>Diet:</strong> {result.advice.diet}</li>
                      <li><strong>Exercise:</strong> {result.advice.exercise}</li>
                      <li><strong>Monitoring:</strong> {result.advice.monitoring}</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

const Metric = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-md border p-4 bg-card/50">
    <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
    <div className="text-xl font-semibold">{value}</div>
  </div>
);

export default Index;
