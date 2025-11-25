export const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "CTA", href: "#cta" },
];

export const BRAND = {
    name: "FlowLedger",
    tagline: "Financial Intelligence",
};

// Dashboard hardcoded data
export const DASHBOARD_DATA = {
  monthlyBalance: {
    current: 4180,
    previous: 4010,
    percentageChange: 4.2,
  },
  monthlyIncome: 5420,
  monthlyExpenses: 1240,
  savingsRate: 77,
  
  expenses: [
    { id: 1, category: "Groceries", amount: 340, percentage: 27, icon: "🛒", color: "bg-success-bg" },
    { id: 2, category: "Transportation", amount: 280, percentage: 23, icon: "🚗", color: "bg-primary-bg" },
    { id: 3, category: "Entertainment", amount: 220, percentage: 18, icon: "🎬", color: "bg-info-bg" },
    { id: 4, category: "Utilities", amount: 180, percentage: 14, icon: "💡", color: "bg-warning-bg" },
    { id: 5, category: "Other", amount: 220, percentage: 18, icon: "📦", color: "bg-alert-bg" },
  ],

  recentTransactions: [
    { id: 1, description: "Whole Foods Market", category: "Groceries", amount: -85.50, date: "Today", type: "expense" },
    { id: 2, description: "Salary Deposit", category: "Income", amount: 5420, date: "Nov 22", type: "income" },
    { id: 3, description: "Uber", category: "Transportation", amount: -18.75, date: "Nov 20", type: "expense" },
    { id: 4, description: "Netflix Subscription", category: "Entertainment", amount: -15.99, date: "Nov 18", type: "expense" },
    { id: 5, description: "Electric Bill", category: "Utilities", amount: -120, date: "Nov 15", type: "expense" },
    { id: 6, description: "Gas Station", category: "Transportation", amount: -52.30, date: "Nov 14", type: "expense" },
    { id: 7, description: "Amazon Purchase", category: "Shopping", amount: -47.82, date: "Nov 12", type: "expense" },
    { id: 8, description: "Freelance Payment", category: "Income", amount: 350, date: "Nov 10", type: "income" },
  ],

  budgets: [
    { category: "Groceries", limit: 500, spent: 340, icon: "🛒" },
    { category: "Transportation", limit: 400, spent: 280, icon: "🚗" },
    { category: "Entertainment", limit: 300, spent: 220, icon: "🎬" },
    { category: "Utilities", limit: 250, spent: 180, icon: "💡" },
  ],

  yearlyData: [
    { month: "Jan", income: 5420, expenses: 1200 },
    { month: "Feb", income: 5420, expenses: 1150 },
    { month: "Mar", income: 5420, expenses: 1300 },
    { month: "Apr", income: 5420, expenses: 1180 },
    { month: "May", income: 5420, expenses: 1240 },
    { month: "Jun", income: 5420, expenses: 1100 },
    { month: "Jul", income: 5420, expenses: 1350 },
    { month: "Aug", income: 5420, expenses: 1200 },
    { month: "Sep", income: 5420, expenses: 1290 },
    { month: "Oct", income: 5420, expenses: 1220 },
    { month: "Nov", income: 5420, expenses: 1240 },
    { month: "Dec", income: 5420, expenses: 1100 },
  ],
};