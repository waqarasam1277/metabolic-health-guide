import React from "react";

const ReferenceValues = () => {
  return (
    <section className="mt-4 rounded-md border bg-card/50 p-4">
      <h4 className="font-medium mb-2">Reference Values</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <div className="font-semibold mb-1">BMI</div>
          <ul className="space-y-1 text-muted-foreground">
            <li>Normal: 18.5–24.9</li>
            <li>Overweight: 25–29.9</li>
            <li>Obese: ≥30</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-1">TyG Index</div>
          <ul className="space-y-1 text-muted-foreground">
            <li>Low: &lt; 8.0</li>
            <li>Moderate: 8.0–8.5</li>
            <li>High: &gt; 8.5</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-1">TG/HDL Ratio</div>
          <ul className="space-y-1 text-muted-foreground">
            <li>Ideal: &lt; 3.0</li>
            <li>Moderate risk: 3.0–4.5</li>
            <li>High risk: &gt; 4.5</li>
          </ul>
        </div>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        <div className="font-semibold mb-1">Clinical Importance</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            High BMI increases risk for cardiovascular diseases, diabetes, and metabolic syndrome.
          </li>
          <li>
            Elevated TyG Index is linked with insulin resistance and higher risk of type 2 diabetes.
          </li>
          <li>
            High TG/HDL ratio is associated with atherosclerosis and heart disease.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ReferenceValues;
