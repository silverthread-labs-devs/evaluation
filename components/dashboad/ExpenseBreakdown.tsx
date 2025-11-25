import { DASHBOARD_DATA } from "@/lib/constant";

export default function ExpenseBreakdown() {
  const { expenses } = DASHBOARD_DATA;
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="rounded-lg border border-canvas-border bg-canvas-on-canvas p-6">
      <h2 className="mb-6 text-lg font-semibold text-canvas-text-contrast">Expense Breakdown</h2>

      <div className="space-y-4">
        {expenses.map((expense) => (
          <div key={expense.id}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{expense.icon}</span>
                <div>
                  <p className="text-sm font-medium">{expense.category}</p>
                  <p className="text-xs text-canvas-text">${expense.amount}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-canvas-text">{expense.percentage}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-canvas-border">
              <div
                className="h-2 rounded-full bg-primary-solid"
                style={{ width: `${expense.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-canvas-border pt-4">
        <div className="flex justify-between">
          <span className="font-medium">Total Expenses</span>
          <span className="font-bold text-alert-text">${totalExpenses.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
