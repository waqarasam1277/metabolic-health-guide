const ReferencesBox = () => {
  return (
    <aside className="rounded-md border bg-muted p-4 text-sm leading-relaxed">
      <h5 className="font-medium mb-3">References & Medical Importance</h5>

      <div className="space-y-3">
        <div>
          <div className="font-medium">BMI</div>
          <ul className="list-disc pl-5">
            <li>Normal: 18.5–24.9</li>
            <li>Overweight: 25–29.9</li>
            <li>Obese: ≥30</li>
          </ul>
        </div>

        <div>
          <div className="font-medium">TyG Index</div>
          <ul className="list-disc pl-5">
            <li>Low: &lt; 8.0</li>
            <li>Moderate: 8.0–8.5</li>
            <li>High: &gt; 8.5</li>
          </ul>
        </div>

        <div>
          <div className="font-medium">TG/HDL Ratio</div>
          <ul className="list-disc pl-5">
            <li>Ideal: &lt; 3.0</li>
            <li>Moderate risk: 3.0–4.5</li>
            <li>High risk: &gt; 4.5</li>
          </ul>
        </div>

        <div className="text-muted-foreground">
          <p>High BMI increases risk for cardiovascular diseases, diabetes, and metabolic syndrome.</p>
          <p>Elevated TyG Index is linked with insulin resistance and higher risk of type 2 diabetes.</p>
          <p>High TG/HDL ratio is associated with atherosclerosis and heart disease.</p>
          <p className="mt-1">These tools support, not replace, professional clinical judgment.</p>
        </div>
      </div>
    </aside>
  );
};

export default ReferencesBox;
