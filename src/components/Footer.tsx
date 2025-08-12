import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <section className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article aria-labelledby="ref-bmi">
            <h2 id="ref-bmi" className="text-sm font-semibold mb-2">BMI Reference</h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Normal: 18.5–24.9</li>
              <li>Overweight: 25–29.9</li>
              <li>Obese: ≥30</li>
            </ul>
          </article>
          <article aria-labelledby="ref-tyg">
            <h2 id="ref-tyg" className="text-sm font-semibold mb-2">TyG Index Reference</h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Low: &lt; 8.0</li>
              <li>Moderate: 8.0–8.5</li>
              <li>High: &gt; 8.5</li>
            </ul>
          </article>
          <article aria-labelledby="ref-tg-hdl">
            <h2 id="ref-tg-hdl" className="text-sm font-semibold mb-2">TG/HDL Ratio Reference</h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Ideal: &lt; 3.0</li>
              <li>Moderate risk: 3.0–4.5</li>
              <li>High risk: &gt; 4.5</li>
            </ul>
          </article>
        </div>
        <div className="mt-6">
          <h2 className="text-sm font-semibold mb-2">Clinical Importance</h2>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>High BMI increases risk for cardiovascular diseases, diabetes, and metabolic syndrome.</li>
            <li>Elevated TyG Index is linked with insulin resistance and higher risk of type 2 diabetes.</li>
            <li>High TG/HDL ratio is associated with atherosclerosis and heart disease.</li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
