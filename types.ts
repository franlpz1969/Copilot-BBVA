// FIX: Removed mock data and circular imports. This file should only contain type definitions.
export interface Account {
  id: string;
  name: string;
  number?: string;
  balance: number;
  currency: string;
  risk?: 'Bajo' | 'Medio' | 'Alto';
}

export interface FinancialData {
  accounts: Account[];
  summary: {
    totalBalance: number;
    income: number;
    expenses: number;
    currency: string;
  };
}

export interface TpvSummary {
  totalSalesMonth: number;
  transactionsMonth: number;
  currency: string;
  last7DaysSales: { day: string; sales: number }[];
  previous7DaysSales: { day: string; sales: number }[];
}

export interface TpvData extends TpvSummary {
    terminals: { id: string; name: string; location: string; status: 'active' | 'inactive' }[];
    storePerformance: { name: string; sales: number }[];
    topProducts: { name: string; sales: number }[];
}

export interface PayrollIncident {
    id: number;
    employee: string;
    description: string;
    severity: 'warning' | 'critical';
}

export interface PayrollBatch {
    id: string;
    month: string;
    status: 'Pendiente de firma' | 'Procesada' | 'Pagada';
    employeeCount: number;
    totalAmount: number;
    paymentDate: string;
    incidents: PayrollIncident[];
}

export interface LeasingContract {
    id: string;
    asset: string;
    type: 'Vehículo' | 'Equipo informático' | 'Inmobiliario';
    monthlyFee: number;
    startDate: string;
    endDate: string;
    provider: string;
}


export interface CreditLine {
  totalLimit: number;
  amountDrawn: number;
  availableCredit: number;
  currency: string;
  nextPaymentDate: string;
  nextPaymentAmount: number;
}

export type KeyOperationType = 'Pago' | 'Conciliación' | 'Nóminas' | 'Impuestos' | 'Revisión' | 'Transferencia';

export interface KeyOperation {
  id: number;
  type: KeyOperationType;
  title: string;
  details: string;
  amount?: number;
  currency?: string;
  dueDate: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate?: string;
}

export interface CashFlowProjectionPoint {
  name: string;
  projection: number;
  balance: number;
}

export type TransferRisk = 'Bajo riesgo' | 'Medio riesgo' | 'Alto riesgo';

export interface Transfer {
  id: number;
  concept: string;
  provider: string;
  amount: number;
  currency: string;
  date: string;
  risk: TransferRisk;
  responsible: string;
  status?: 'completed' | 'pending' | 'failed';
  origin?: string;
  destination?: string;
}

export interface RecommendedAction {
  id: number;
  title: string;
  description: string;
  icon: 'approval' | 'report' | 'contact' | 'analyze' | 'difference';
  linkText: string;
}

export type ConciliationStatus = 'conciled' | 'pending' | 'difference';

export interface ConciliationMovement {
  id: number;
  date: string;
  concept: string;
  amount: number;
  status: ConciliationStatus;
}

export interface CashFlowDataPoint {
  date: string;
  income: number;
  expenses: number;
}

export interface LiquidityDataPoint {
  month: string;
  liquidity: number;
}

export interface SustainabilityData {
  currentMonthFootprint: number;
  previousMonthFootprint: number;
  sectorAverageFootprint: number;
  historicalFootprint: { month: string; footprint: number }[];
  breakdown: { name: string; footprint: number; color: string }[];
  recommendations: { id: number; title: string; description: string; impact: string; impactValue: number; category: 'Transporte' | 'Suministros' | 'Viajes' | 'Otros'; }[];
  kpis: {
    emissionsPerEmployee: number;
    emissionsPerRevenue: number;
  };
}

export interface FaqItem {
    question: string;
    answer: string | string[];
}

export interface LinkItem {
    title: string;
    url: string;
    type: 'video' | 'manual';
}

export interface SimulationResult {
    newRevenue: number;
    newMargin: number;
    newCashFlow: number;
}

export interface PayrollHistoryPoint {
    month: string;
    totalAmount: number;
    employeeCount: number;
}

export interface ComplianceAlert {
  id: number;
  type: 'Documento' | 'Impuestos' | 'Legal';
  title: string;
  details: string;
  dueDate: string;
  severity: 'high' | 'medium' | 'low';
  targetScreen?: string;
}

export interface ProductRecommendation {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: 'credit-card' | 'chart-bar' | 'shield-check';
  targetScreen?: string;
}

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  impact: {
    revenue: number; // percentage change
    margin: number; // percentage change
    cashFlow: number; // percentage change
  }
}

export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: string;
}

export interface ChatSession {
  id: number;
  title: string;
  date: string;
  messages: ChatMessage[];
}