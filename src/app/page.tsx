"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./BrsrReport.module.css";

const principles = [
  "Principle 1: Ethics and Transparency",
  "Principle 2: Product Lifecycle",
  "Principle 3: Employee Wellbeing",
  "Principle 4: Stakeholder Engagement",
  "Principle 5: Human Rights",
  "Principle 6: Environment",
  "Principle 7: Policy Advocacy",
  "Principle 8: Inclusive Growth",
  "Principle 9: Customer Value",
];

const BrsrReportPage = () => {
  const [selected, setSelected] = useState<string>(principles[0]);
  const [isLoading, setIsLoading] = useState(false);

  const exportReport = async (type: "pdf" | "word") => {
    setIsLoading(true);
    try {
      const fileName = type === "pdf" ? "BRSR_Report.pdf" : "BRSR_Report.docx";

      const response = await axios.get(
        `http://127.0.0.1:3000/report/download/${type}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Failed to download report");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h3>Index</h3>
        <ul>
          {principles.map((p) => (
            <li
              key={p}
              className={selected === p ? styles.active : ""}
              onClick={() => setSelected(p)}
            >
              {p}
            </li>
          ))}
        </ul>
        <div className={styles.exportButtons}>
          <button onClick={() => exportReport("pdf")} disabled={isLoading}>
            {isLoading ? "Exporting PDF..." : "Export PDF"}
          </button>
          <button onClick={() => exportReport("word")} disabled={isLoading}>
            {isLoading ? "Exporting Word..." : "Export Word"}
          </button>
        </div>
      </aside>
      <main className={styles.content}>
        <h1>{selected}</h1>
        <p>
          This is a placeholder description for <strong>{selected}</strong>.
          <br />
          Future updates will include automated data and formula-driven metrics
          for this principle.
        </p>
      </main>
    </div>
  );
};

export default BrsrReportPage;
