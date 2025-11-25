import { DASHBOARD_DATA } from "@/lib/constant";
import { TrendingUp } from "lucide-react";

export default function BalanceCard() {
  const { monthlyBalance, monthlyIncome, monthlyExpenses, savingsRate } = DASHBOARD_DATA;

  return (
    <>
      <div className="rounded-lg border border-canvas-border bg-canvas-on-canvas p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-canvas-text uppercase">Net Balance</p>
            <p className="mt-2 text-3xl font-bold text-canvas-text-contrast">${monthlyBalance.current.toLocaleString()}</p>
            <div className="mt-2 flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-success-text" />
              <span className="text-sm text-success-text">+{monthlyBalance.percentageChange}% vs last month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-canvas-border bg-canvas-on-canvas p-6">
        <p className="text-xs font-medium text-canvas-text uppercase">Monthly Income</p>
        <p className="mt-2 text-3xl font-bold text-success-text">${monthlyIncome.toLocaleString()}</p>
        <p className="mt-2 text-xs text-canvas-text">+12.5% increase</p>
      </div>

      <div className="rounded-lg border border-canvas-border bg-canvas-on-canvas p-6">
        <p className="text-xs font-medium text-canvas-text uppercase">Monthly Expenses</p>
        <p className="mt-2 text-3xl font-bold text-alert-text">${monthlyExpenses.toLocaleString()}</p>
        <p className="mt-2 text-xs text-canvas-text">-8.3% decrease</p>
      </div>

      <div className="rounded-lg border border-canvas-border bg-canvas-on-canvas p-6">
        <p className="text-xs font-medium text-canvas-text uppercase">Savings Rate</p>
        <p className="mt-2 text-3xl font-bold text-primary-text">{savingsRate}%</p>
        <p className="mt-2 text-xs text-canvas-text">of income saved</p>
      </div>
    </>
  );
}
