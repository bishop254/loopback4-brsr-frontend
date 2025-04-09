"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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
  
      const response = await axios.post(
        `http://127.0.0.1:3000/report/download/${type}`,
        { selected },
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
    <div className="flex min-h-screen bg-muted/50">
      <aside className="w-64 border-r p-4 bg-white">
        <h3 className="text-lg font-semibold mb-4">BRSR Report Index</h3>
        <ScrollArea className="h-[60vh] pr-2">
          <ul className="space-y-2">
            {principles.map((p) => (
              <li
                key={p}
                onClick={() => setSelected(p)}
                className={cn(
                  "cursor-pointer p-2 rounded-md hover:bg-muted transition",
                  selected === p ? "bg-primary text-primary-foreground" : ""
                )}
              >
                {p}
              </li>
            ))}
          </ul>
        </ScrollArea>
        <div className="mt-6 space-y-2">
          <Button
            onClick={() => exportReport("pdf")}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Exporting PDF..." : "Export PDF"}
          </Button>
          <Button
            variant="outline"
            onClick={() => exportReport("word")}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Exporting Word..." : "Export Word"}
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-4">{selected}</h1>
            <p>
              This is a placeholder description for <strong>{selected}</strong>.
              <br />
              Future updates will include automated data and formula-driven
              metrics for this principle.
            </p>
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Report Structure</h2>
              <ul>
                <li>Page 1: Index</li>
                <li>Page 2: Selected Principle Details</li>
                <li>Further sections will follow based on the selected principle</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BrsrReportPage;
