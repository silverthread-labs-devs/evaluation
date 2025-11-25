import { DASHBOARD_DATA } from "@/lib/constant";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function RecentTransactions() {
  const { recentTransactions } = DASHBOARD_DATA;

  return (
    <div className="rounded-lg border border-canvas-border bg-canvas-on-canvas p-6">
      <h2 className="mb-4 text-lg font-semibold text-canvas-text-contrast">Recent Transactions</h2>

      <div className="space-y-3">
        {recentTransactions.slice(0, 6).map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between rounded-md bg-canvas-bg p-3">
            <div className="flex items-center gap-3">
              {transaction.type === "income" ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-bg">
                  <ArrowDownRight className="h-4 w-4 text-success-text" />
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-alert-bg">
                  <ArrowUpRight className="h-4 w-4 text-alert-text" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium">{transaction.description}</p>
                <p className="text-xs text-canvas-text">{transaction.date}</p>
              </div>
            </div>
            <span
              className={`text-sm font-semibold ${
                transaction.type === "income" ? "text-success-text" : "text-alert-text"
              }`}
            >
              {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full rounded-md border border-canvas-border py-2 text-sm font-medium hover:bg-canvas-bg">
        View all transactions
      </button>
    </div>
  );
}
