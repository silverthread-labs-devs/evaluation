import { DASHBOARD_DATA } from "@/lib/constant";

export default function BudgetOverview() {
  const { budgets } = DASHBOARD_DATA;

  return (
    <div className="rounded-lg border border-canvas-border bg-canvas-on-canvas p-6">
      <h2 className="mb-4 text-lg font-semibold text-canvas-text-contrast">Budget Overview</h2>

      <div className="space-y-4">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const remaining = budget.limit - budget.spent;
          const isWarning = percentage > 80;
          const isOk = percentage <= 80;

          return (
            <div key={budget.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{budget.icon}</span>
                  <span className="text-sm font-medium">{budget.category}</span>
                </div>
                <span className="text-xs text-canvas-text">${budget.spent} / ${budget.limit}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-canvas-border">
                <div
                  className={`h-2 rounded-full transition-all ${isWarning ? "bg-warning-solid" : isOk ? "bg-success-solid" : "bg-alert-solid"}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-canvas-text">${remaining} remaining</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
