import { DASHBOARD_DATA } from "@/lib/constant";
import BalanceCard from "@/components/dashboad/BalanceCard";
import ExpenseBreakdown from "@/components/dashboad/ExpenseBreakdown";
import RecentTransactions from "@/components/dashboad/RecentTransactions";
import BudgetOverview from "@/components/dashboad/BudgetOverview";
import IncomeExpenseChart from "@/components/dashboad/IncomeExpenseChart";
import { ProtectedLayout } from "@/components/ProtectedLayout";

export default function DashboardPage() {
  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-canvas-base px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-canvas-text-contrast">Financial Dashboard</h1>
            <p className="mt-1 text-sm text-canvas-text">November 2024</p>
          </div>

          {/* Top Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <BalanceCard />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-2">
              <ExpenseBreakdown />
              <IncomeExpenseChart />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <BudgetOverview />
              <RecentTransactions />
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
