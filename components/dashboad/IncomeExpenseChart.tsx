import { DASHBOARD_DATA } from "@/lib/constant";

export default function IncomeExpenseChart() {
  const { yearlyData } = DASHBOARD_DATA;
  const maxValue = Math.max(...yearlyData.map((d) => Math.max(d.income, d.expenses)));

  return (
    <div className="rounded-lg border border-canvas-border bg-canvas-on-canvas p-6">
      <h2 className="mb-6 text-lg font-semibold text-canvas-text-contrast">Income vs Expenses</h2>

      <div className="space-y-6">
        <div className="flex items-end justify-between gap-2">
          {yearlyData.map((data, idx) => {
            const incomeHeight = (data.income / maxValue) * 150;
            const expenseHeight = (data.expenses / maxValue) * 150;

            return (
              <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-40 w-full items-end justify-center gap-1">
                  <div
                    className="flex-1 rounded-t bg-success-solid opacity-70"
                    style={{ height: `${incomeHeight}px` }}
                    title={`Income: $${data.income}`}
                  ></div>
                  <div
                    className="flex-1 rounded-t bg-alert-solid opacity-70"
                    style={{ height: `${expenseHeight}px` }}
                    title={`Expenses: $${data.expenses}`}
                  ></div>
                </div>
                <span className="text-xs font-medium">{data.month}</span>
              </div>
            );
          })}
        </div>

        <div className="flex gap-6 border-t border-canvas-border pt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-success-solid"></div>
            <span className="text-xs text-canvas-text">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-alert-solid"></div>
            <span className="text-xs text-canvas-text">Expenses</span>
          </div>
        </div>
      </div>
    </div>
  );
}
