import {
  FileText,
  FileSpreadsheet,
  FileDown,
} from "lucide-react";

import type {
  AnalyticsData,
} from "../../types/analytics.types";

import {
  exportPDF,
  exportExcel,
  exportCSV,
} from "../../utils/reportExport";

interface Props {
  analytics: AnalyticsData;
}

const ExportButtons = ({
  analytics,
}: Props) => {

  return (

    <div
      className="
        flex
        flex-wrap
        gap-4
      "
    >

      <button
        onClick={() =>
          exportPDF(
            analytics,
          )
        }
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-red-500
          px-5
          py-3
          font-medium
          text-white
          hover:bg-red-600
        "
      >

        <FileText size={18} />

        Export PDF

      </button>

      <button
        onClick={() =>
          exportExcel(
            analytics,
          )
        }
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-green-600
          px-5
          py-3
          font-medium
          text-white
          hover:bg-green-700
        "
      >

        <FileSpreadsheet size={18} />

        Export Excel

      </button>

      <button
        onClick={() =>
          exportCSV(
            analytics,
          )
        }
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-5
          py-3
          font-medium
          text-white
          hover:bg-blue-700
        "
      >

        <FileDown size={18} />

        Export CSV

      </button>

    </div>

  );

};

export default ExportButtons;