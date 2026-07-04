import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

import type {
  AnalyticsData,
} from "../types/analytics.types";

// ==========================================
// PDF
// ==========================================

export const exportPDF = (
  analytics: AnalyticsData,
) => {

  const pdf = new jsPDF();

  pdf.setFontSize(20);

  pdf.text(
    "TeamFlow Analytics Report",
    14,
    18,
  );

  pdf.setFontSize(12);

  pdf.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    28,
  );

  autoTable(pdf, {

    startY: 40,

    head: [["Metric", "Value"]],

    body: [

      ["Projects", analytics.overview.totalProjects],

      ["Tasks", analytics.overview.totalTasks],

      ["Completed Tasks", analytics.overview.completedTasks],

      ["Pending Tasks", analytics.overview.pendingTasks],

      ["Overdue Tasks", analytics.overview.overdueTasks],

      ["Open RCAs", analytics.overview.openRCAs],

    ],

  });

  pdf.save("TeamFlow_Report.pdf");

};

// ==========================================
// EXCEL
// ==========================================

export const exportExcel = (
  analytics: AnalyticsData,
) => {

  const workbook =
    XLSX.utils.book_new();

  const worksheet =
    XLSX.utils.json_to_sheet([

      analytics.overview,

    ]);

  XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Overview",

  );

  XLSX.writeFile(
    workbook,
    "TeamFlow_Report.xlsx",
  );

};

// ==========================================
// CSV
// ==========================================

export const exportCSV = (
  analytics: AnalyticsData,
) => {

  const worksheet =
    XLSX.utils.json_to_sheet([

      analytics.overview,

    ]);

  const csv =
    XLSX.utils.sheet_to_csv(
      worksheet,
    );

  const blob = new Blob(

    [csv],

    {
      type:
        "text/csv;charset=utf-8;",
    },

  );

  saveAs(
    blob,
    "TeamFlow_Report.csv",
  );

};