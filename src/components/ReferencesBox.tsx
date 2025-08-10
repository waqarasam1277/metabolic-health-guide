const ReferencesBox = () => {
  return (
    <aside className="rounded-md border bg-muted p-4 text-sm leading-relaxed">
      <h5 className="font-medium mb-2">References & Medical Notes</h5>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          TyG index = ln[(fasting glucose × triglycerides) / 2]; Risk thresholds: Low &lt; 8.0, Moderate 8.0–8.5, High &gt; 8.5.
        </li>
        <li>
          BMI = weight / height². General categories: Underweight &lt;18.5, Normal 18.5–24.9, Overweight 25–29.9, Obese ≥30.
        </li>
        <li>
          TG/HDL-C ratio is a surrogate of atherogenic dyslipidemia; higher values suggest increased cardiometabolic risk.
        </li>
        <li>
          These tools aid clinical judgment and do not replace professional diagnosis or individualized care.
        </li>
      </ul>
    </aside>
  );
};

export default ReferencesBox;
