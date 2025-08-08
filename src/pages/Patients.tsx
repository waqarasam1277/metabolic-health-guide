import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { RiskZone } from "@/lib/calculations";

export type AssessmentRow = {
  id?: string;
  created_at?: string;
  full_name: string;
  age: number;
  gender: string;
  bmi: number;
  tyg: number;
  tg_hdl_ratio: number;
  diabetes_diagnosis: string;
  risk_zone: RiskZone;
};

const STORAGE_KEY = "metabolic_assessments";

const Patients = () => {
  const [rows, setRows] = useState<AssessmentRow[]>([]);
  const [riskFilter, setRiskFilter] = useState<"All" | RiskZone>("All");
  const [dxFilter, setDxFilter] = useState<"All" | "No" | "Prediabetes" | "Diabetes">("All");
  const [sortBy, setSortBy] = useState<"date" | "risk">("date");
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Patients - Metabolic Risk Calculator";
  }, []);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setRows(local as AssessmentRow[]);
  }, []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    let list = rows.filter((r) =>
      (riskFilter === "All" || r.risk_zone === riskFilter) &&
      (dxFilter === "All" || r.diabetes_diagnosis === dxFilter) &&
      (search.length === 0 || r.full_name.toLowerCase().includes(search))
    );
    if (sortBy === "risk") {
      const order: Record<RiskZone, number> = { "High Risk": 2, "Moderate Risk": 1, "Low Risk": 0 } as const;
      list = list.sort((a, b) => order[b.risk_zone] - order[a.risk_zone]);
    } else {
      list = list.sort((a, b) => (new Date(b.created_at || 0).getTime()) - (new Date(a.created_at || 0).getTime()));
    }
    return list;
  }, [rows, riskFilter, dxFilter, sortBy, query]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <section className="container py-10">
        <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight mb-1">Patients</h1>
            <p className="text-muted-foreground">Saved assessments with risk categories.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="secondary"><a href="/">New assessment</a></Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="text-sm block mb-1">Search name</label>
                <Input placeholder="e.g., Jane" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div>
                <label className="text-sm block mb-1">Risk</label>
                <Select value={riskFilter} onValueChange={(v) => setRiskFilter(v as any)}>
                  <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Low Risk">Low Risk</SelectItem>
                    <SelectItem value="Moderate Risk">Moderate Risk</SelectItem>
                    <SelectItem value="High Risk">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm block mb-1">Diagnosis</label>
                <Select value={dxFilter} onValueChange={(v) => setDxFilter(v as any)}>
                  <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Prediabetes">Prediabetes</SelectItem>
                    <SelectItem value="Diabetes">Diabetes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm block mb-1">Sort by</label>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                  <SelectTrigger><SelectValue placeholder="date" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="risk">Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>BMI</TableHead>
                    <TableHead>TyG</TableHead>
                    <TableHead>TG/HDL</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((r) => (
                    <TableRow key={r.id || r.full_name + (r.created_at || "")}>
                      <TableCell className="font-medium">{r.full_name}</TableCell>
                      <TableCell>{r.age}</TableCell>
                      <TableCell>{r.gender}</TableCell>
                      <TableCell>{r.bmi.toFixed(1)}</TableCell>
                      <TableCell>{r.tyg.toFixed(2)}</TableCell>
                      <TableCell>{r.tg_hdl_ratio.toFixed(2)}</TableCell>
                      <TableCell>{r.diabetes_diagnosis}</TableCell>
                      <TableCell>{r.risk_zone}</TableCell>
                      <TableCell>{r.created_at ? new Date(r.created_at).toLocaleString() : ""}</TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-muted-foreground">No records yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Patients;
