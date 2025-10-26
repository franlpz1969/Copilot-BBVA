import { FinancialData, Task, Transfer, RecommendedAction, CashFlowDataPoint, LiquidityDataPoint, CashFlowProjectionPoint, ConciliationMovement, Account, TpvSummary, CreditLine, KeyOperation, SustainabilityData, TpvData, PayrollBatch, LeasingContract, PayrollHistoryPoint, ComplianceAlert, ProductRecommendation, SimulationScenario, Communication, UnreadEmail, MarketingCampaign } from './types';

export const MOCK_FINANCIAL_DATA: FinancialData = {
  accounts: [
    { id: 'acc-1', name: 'Cuenta Principal', balance: 125340.50, currency: 'EUR' },
    { id: 'acc-2', name: 'Cuenta de Ahorros', balance: 50000.00, currency: 'EUR' },
    { id: 'acc-3', name: 'Cuenta en Dólares', balance: 15000.00, currency: 'USD' },
  ],
  summary: {
    totalBalance: 175340.50,
    income: 45000.00,
    expenses: 22500.00,
    currency: 'EUR',
  },
};

export const TPV_SUMMARY_DATA: TpvSummary = {
  totalSalesMonth: 78450.25,
  transactionsMonth: 1245,
  currency: 'EUR',
  last7DaysSales: [
    { day: 'Lun', sales: 2100 },
    { day: 'Mar', sales: 2500 },
    { day: 'Mié', sales: 2300 },
    { day: 'Jue', sales: 3100 },
    { day: 'Vie', sales: 4500 },
    { day: 'Sáb', sales: 5200 },
    { day: 'Dom', sales: 4800 },
  ],
  previous7DaysSales: [
    { day: 'Lun', sales: 1900 },
    { day: 'Mar', sales: 2200 },
    { day: 'Mié', sales: 2100 },
    { day: 'Jue', sales: 2800 },
    { day: 'Vie', sales: 4100 },
    { day: 'Sáb', sales: 4900 },
    { day: 'Dom', sales: 4500 },
  ],
};

export const TPV_DATA: TpvData = {
    ...TPV_SUMMARY_DATA,
    terminals: [
        { id: 'TPV-001', name: 'TPV Principal', location: 'Tienda Central', status: 'active' },
        { id: 'TPV-002', name: 'TPV Móvil', location: 'Eventos', status: 'active' },
        { id: 'TPV-003', name: 'TPV Almacén', location: 'Almacén', status: 'inactive' },
    ],
    storePerformance: [
        { name: 'Tienda Central', sales: 45200 },
        { name: 'Tienda Norte', sales: 21350 },
        { name: 'Venta Online', sales: 11900.25 },
    ],
    topProducts: [
        { name: 'Servicio de Consultoría Premium', sales: 15000 },
        { name: 'Producto A', sales: 12500 },
        { name: 'Soporte Técnico Extendido', sales: 9800 },
    ]
};

export const PAYROLL_DATA: PayrollBatch[] = [
    { 
        id: 'PAY-JUL24', 
        month: 'Julio 2024', 
        status: 'Pendiente de firma', 
        employeeCount: 52, 
        totalAmount: 89540.75, 
        paymentDate: '28/07/2024',
        incidents: [
            { id: 1, employee: 'Dpto. Ventas', description: 'Coste total del departamento ha superado el presupuesto en un 8%. Se requiere análisis de causa.', severity: 'critical' },
            { id: 2, employee: 'Nuevas Contrataciones', description: "Nueva categoría 'Senior Analyst' sin banda salarial definida. Revisar antes de procesar.", severity: 'warning' },
        ]
    },
    { id: 'PAY-JUN24', month: 'Junio 2024', status: 'Pagada', employeeCount: 51, totalAmount: 85210.50, paymentDate: '28/06/2024', incidents: [] },
    { id: 'PAY-MAY24', month: 'Mayo 2024', status: 'Pagada', employeeCount: 51, totalAmount: 85150.00, paymentDate: '28/05/2024', incidents: [] },
];

export const PAYROLL_HISTORY_DATA: PayrollHistoryPoint[] = [
    { month: 'Ene 24', totalAmount: 84900, employeeCount: 50 },
    { month: 'Feb 24', totalAmount: 85050, employeeCount: 50 },
    { month: 'Mar 24', totalAmount: 85100, employeeCount: 51 },
    { month: 'Abr 24', totalAmount: 85120, employeeCount: 51 },
    { month: 'May 24', totalAmount: 85150, employeeCount: 51 },
    { month: 'Jun 24', totalAmount: 85210, employeeCount: 51 },
    { month: 'Jul 24', totalAmount: 89540, employeeCount: 52 },
];

export const LEASING_DATA: LeasingContract[] = [
    { id: 'LS-01', asset: 'Audi A6 Renting', type: 'Vehículo', monthlyFee: 850, startDate: '01/09/2022', endDate: '31/08/2025', provider: 'BBVA AutoRenting' },
    { id: 'LS-02', asset: 'Servidores Dell PowerEdge', type: 'Equipo informático', monthlyFee: 1200, startDate: '15/01/2023', endDate: '14/01/2026', provider: 'Dell Financial Services' },
    { id: 'LS-03', asset: 'Oficina Central', type: 'Inmobiliario', monthlyFee: 4500, startDate: '01/03/2020', endDate: '28/02/2027', provider: 'BBVA Inmuebles' },
    { id: 'LS-04', asset: 'Flota de reparto (3 furgonetas)', type: 'Vehículo', monthlyFee: 1500, startDate: '01/11/2023', endDate: '31/10/2026', provider: 'BBVA AutoRenting' },
];

export const CREDIT_LINE_DATA: CreditLine = {
  totalLimit: 200000,
  amountDrawn: 75000,
  availableCredit: 125000,
  currency: 'EUR',
  nextPaymentDate: '30/07/2024',
  nextPaymentAmount: 2500,
};

export const KEY_OPERATIONS_DATA: KeyOperation[] = [
  { id: 1, type: 'Pago', title: 'Aprobar pago a Proveedor Digital', details: 'Factura #2024-125', amount: 3500, currency: 'EUR', dueDate: 'Vence en 2 días' },
  { id: 2, type: 'Conciliación', title: 'Conciliar cuenta ES...8123', details: '8 transacciones pendientes', dueDate: 'Urgente' },
  { id: 3, type: 'Nóminas', title: 'Firma de nóminas de Julio', details: 'Pendiente de revisión final', amount: 45870.50, currency: 'EUR', dueDate: 'Antes del 28/07' },
  { id: 4, type: 'Impuestos', title: 'Presentación Modelo 303 (IVA)', details: 'Periodo Q2 2024', amount: 12450.70, currency: 'EUR', dueDate: 'Vence en 5 días' },
  { id: 5, type: 'Revisión', title: 'Revisar desviación presupuestaria', details: 'Dpto. Marketing', dueDate: 'Esta semana' },
];

export const TASKS_DATA: Task[] = [
    { id: 1, title: 'Aprobar pago a Proveedor Digital', description: 'vence en 2 días' },
    { id: 2, title: 'Conciliar cuenta ES...8123', description: '3 transacciones pendientes' },
    { id: 3, title: 'Revisar desviación presupuestaria', description: 'Dpto. Marketing' },
];

export const CASH_FLOW_PROJECTION_DATA: CashFlowProjectionPoint[] = [
  { name: 'Sem 1', projection: 80000, balance: 50000 },
  { name: 'Sem 2', projection: 95000, balance: 70000 },
  { name: 'Sem 3', projection: 90000, balance: 60000 },
  { name: 'Sem 4', projection: 110000, balance: 85000 },
  { name: 'Sem 5', projection: 105000, balance: 80000 },
];

export const TRANSFERS_DATA: Transfer[] = [
    { id: 1, concept: 'Tech S.L.', provider: 'Tech S.L.', amount: 2500.00, currency: 'EUR', date: '25 Dic 2023', risk: 'Bajo riesgo', responsible: 'Elena García' },
    { id: 2, concept: 'Global Imports Inc.', provider: 'Global Imports Inc.', amount: 150000.00, currency: 'EUR', date: '28 Dic 2023', risk: 'Alto riesgo', responsible: 'Carlos Rodríguez' },
    { id: 3, concept: 'Nóminas', provider: 'Nóminas', amount: 45870.50, currency: 'EUR', date: '30 Dic 2023', risk: 'Medio riesgo', responsible: 'RRHH' },
    { id: 4, concept: 'Alquiler', provider: 'Alquiler', amount: 5000.00, currency: 'EUR', date: '01 Ene 2024', risk: 'Bajo riesgo', responsible: 'Elena García' },
    { id: 5, concept: 'Marketing Digital', provider: 'Marketing Digital', amount: 7200.00, currency: 'EUR', date: '02 Ene 2024', risk: 'Medio riesgo', responsible: 'Carlos Rodríguez' },
    { id: 6, concept: 'Servidores AWS', provider: 'Servidores AWS', amount: 1250.75, currency: 'EUR', date: '03 Ene 2024', risk: 'Bajo riesgo', responsible: 'Elena García' },
    { id: 7, concept: 'Suministros Oficina', provider: 'Suministros Oficina', amount: 850.00, currency: 'EUR', date: '04 Ene 2024', risk: 'Bajo riesgo', responsible: 'Elena García' },
    { id: 8, concept: 'Asesoría Legal', provider: 'Asesoría Legal', amount: 3500.00, currency: 'EUR', date: '05 Ene 2024', risk: 'Medio riesgo', responsible: 'Carlos Rodríguez' },
    { id: 9, concept: 'Compra de Equipo', provider: 'Compra de Equipo', amount: 25000.00, currency: 'EUR', date: '08 Ene 2024', risk: 'Alto riesgo', responsible: 'Carlos Rodríguez' },
    { id: 10, concept: 'Pago a Freelancer', provider: 'Pago a Freelancer', amount: 1800.00, currency: 'EUR', date: '10 Ene 2024', risk: 'Bajo riesgo', responsible: 'Elena García' },
    { id: 11, concept: 'Viajes y Dietas', provider: 'Viajes y Dietas', amount: 4200.00, currency: 'EUR', date: '12 Ene 2024', risk: 'Medio riesgo', responsible: 'RRHH' },
];

export const TREASURY_ACCOUNTS: Account[] = [
    { id: '1', name: 'Cuenta Corriente', number: 'ES...4567', balance: 675120.00, currency: 'EUR', risk: 'Bajo' },
    { id: '2', name: 'Cuenta de Crédito', number: 'ES...8910', balance: 50210.50, currency: 'EUR', risk: 'Medio' },
    { id: '3', name: 'Cuenta de Ahorros', number: 'ES...1234', balance: 325010.00, currency: 'EUR', risk: 'Bajo' },
    { id: '4', name: 'Cuenta Divisas', number: 'US...5678', balance: 85000.00, currency: 'USD', risk: 'Alto' },
    { id: '5', name: 'Depósito a Plazo', number: 'ES...6789', balance: 200000.00, currency: 'EUR', risk: 'Bajo' },
];

export const SUGGESTED_ACTIONS_TREASURY: RecommendedAction[] = [
    { id: 1, title: 'Aprobar transferencia para pago de nóminas', description: 'Vencimiento: Hoy', icon: 'approval', linkText:'' },
    { id: 2, title: 'Revisar factura de proveedor "Soluciones Tech"', description: 'Importe: €5,200.00', icon: 'report', linkText:'' },
    { id: 3, title: 'Contactar cliente "Global Inc." por pago vencido', description: 'Retraso de 15 días', icon: 'contact', linkText:'' },
    { id: 4, title: 'Analizar informe de gastos de Q3', description: 'Generado por IA el 25/10', icon: 'analyze', linkText:'' },
];

export const CONCILIATION_MOVEMENTS: ConciliationMovement[] = [
    { id: 1, date: '25/07/2024', concept: 'Pago a Proveedor TechSolutions S.L.', amount: -1250.00, status: 'conciled' },
    { id: 2, date: '24/07/2024', concept: 'Ingreso Cliente Innovate Corp', amount: 5880.50, status: 'conciled' },
    { id: 3, date: '23/07/2024', concept: 'Transferencia a cuenta de ahorro', amount: -10000.00, status: 'difference' },
    { id: 4, date: '22/07/2024', concept: 'Pago nóminas mes de Julio', amount: -34120.98, status: 'pending' },
    { id: 5, date: '21/07/2024', concept: 'Abono TPV Ventas Online', amount: 3450.25, status: 'pending' },
    { id: 6, date: '20/07/2024', concept: 'Pago Alquiler Oficina', amount: -2500.00, status: 'conciled' },
    { id: 7, date: '19/07/2024', concept: 'Ingreso Cliente Digital World', amount: 12500.00, status: 'pending' },
    { id: 8, date: '18/07/2024', concept: 'Devolución de Impuestos', amount: 4200.00, status: 'pending' },
    { id: 9, date: '17/07/2024', concept: 'Pago Suministro Eléctrico', amount: -450.75, status: 'pending' },
    { id: 10, date: '16/07/2024', concept: 'Ingreso por Servicios Profesionales', amount: 7500.00, status: 'pending' },
    { id: 11, date: '15/07/2024', concept: 'Compra de Software', amount: -899.00, status: 'pending' },
    { id: 12, date: '14/07/2024', concept: 'Pago a Marketing Associates', amount: -5000.00, status: 'pending' },
    { id: 13, date: '13/07/2024', concept: 'Ingreso Cliente Sureste', amount: 8200.00, status: 'pending' },
    { id: 14, date: '12/07/2024', concept: 'Pago de tasas municipales', amount: -320.00, status: 'conciled' },
];

export const CONCILIATION_ACTIONS: RecommendedAction[] = [
    { id: 1, title: 'Resolver diferencia de -€150.50', description: 'El asistente ha detectado que la diferencia en la transferencia a la cuenta de ahorro podría ser una comisión no registrada.', icon: 'difference', linkText: 'Resolver con IA' },
    { id: 2, title: 'Aprobar remesa de pagos', description: 'La remesa de pagos a proveedores de esta semana está lista para su aprobación.', icon: 'approval', linkText: 'Aprobar remesa' },
];

export const RECOMMENDED_ACTIONS_DATA: RecommendedAction[] = [
    { id: 1, title: 'Revisar partida con diferencia', description: 'Diferencia de €150.50 en transferencia.', icon: 'difference', linkText: 'Revisar ahora' },
    { id: 2, title: 'Aprobar remesa de pagos', description: 'Remesa a proveedores lista para aprobación.', icon: 'approval', linkText: 'Aprobar remesa' },
    { id: 3, title: 'Nuevo informe disponible', description: 'Informe de tesorería de Julio 2024 generado.', icon: 'report', linkText: 'Ver informe' },
];

export const CASH_FLOW_DATA: (CashFlowDataPoint & { netFlow: number })[] = [
    { date: 'Ene', income: 45000, expenses: 22500, netFlow: 22500 },
    { date: 'Feb', income: 52000, expenses: 31000, netFlow: 21000 },
    { date: 'Mar', income: 48000, expenses: 25000, netFlow: 23000 },
    { date: 'Abr', income: 61000, expenses: 34000, netFlow: 27000 },
    { date: 'May', income: 55000, expenses: 29000, netFlow: 26000 },
    { date: 'Jun', income: 65000, expenses: 41000, netFlow: 24000 },
];

export const LIQUIDITY_DATA: LiquidityDataPoint[] = [
    { month: 'Enero', liquidity: 175340 },
    { month: 'Febrero', liquidity: 196340 },
    { month: 'Marzo', liquidity: 219340 },
    { month: 'Abril', liquidity: 246340 },
    { month: 'Mayo', liquidity: 272340 },
    { month: 'Junio', liquidity: 300340 },
];

export const SUSTAINABILITY_DATA: SustainabilityData = {
  currentMonthFootprint: 1850, // kg CO2
  previousMonthFootprint: 2100,
  sectorAverageFootprint: 2400,
  historicalFootprint: [
    { month: 'Ene', footprint: 2200 },
    { month: 'Feb', footprint: 2150 },
    { month: 'Mar', footprint: 2100 },
    { month: 'Abr', footprint: 2000 },
    { month: 'May', footprint: 1950 },
    { month: 'Jun', footprint: 1850 },
  ],
  breakdown: [
    { name: 'Transporte', footprint: 800, color: '#072146' },
    { name: 'Suministros', footprint: 650, color: '#1464A5' },
    { name: 'Viajes', footprint: 250, color: '#007CBE' },
    { name: 'Otros', footprint: 150, color: '#7CDEFF' },
  ],
  recommendations: [
    { id: 1, title: 'Optimizar rutas de transporte', description: 'Usar software de optimización para reducir distancias.', impact: 'Reduce hasta 120 kg CO2/mes', impactValue: 120, category: 'Transporte' },
    { id: 2, title: 'Cambiar a proveedor de energía verde', description: 'Contrata un proveedor con certificado de origen 100% renovable.', impact: 'Reduce hasta 400 kg CO2/mes', impactValue: 400, category: 'Suministros' },
    { id: 3, title: 'Fomentar videoconferencias', description: 'Sustituye 2 viajes nacionales al mes por reuniones virtuales.', impact: 'Ahorra 80 kg CO2 y ~€400/mes', impactValue: 80, category: 'Viajes' },
  ],
  kpis: {
    emissionsPerEmployee: 35.58, // kg CO2 / empleado
    emissionsPerRevenue: 23.58, // kg CO2 / 1000€ facturados
  }
};

export const COMPLIANCE_ALERTS_DATA: ComplianceAlert[] = [
    { id: 1, type: 'Impuestos', title: 'Notificación a Hacienda requerida', details: 'Transferencia a Global Imports Inc. supera el umbral. Notificar antes del 30/08.', dueDate: 'Vence en 8 días', severity: 'high', targetScreen: 'Transferencias' },
    { id: 2, type: 'Documento', title: 'Actualizar poder notarial', details: 'El poder del apoderado Juan Pérez caduca pronto.', dueDate: 'Vence en 15 días', severity: 'medium', targetScreen: 'Tesorería' },
    { id: 3, type: 'Legal', title: 'Presentación de Cuentas Anuales', details: 'Fecha límite para el depósito en el Registro Mercantil.', dueDate: 'Vence en 22 días', severity: 'high', targetScreen: 'Tesorería' },
    { id: 4, type: 'Impuestos', title: 'Liquidación IVA Trimestral', details: 'Preparar y presentar el modelo 303 para el T3.', dueDate: 'Próximo mes', severity: 'medium', targetScreen: 'Tesorería' },
];

export const PRODUCT_RECOMMENDATIONS_DATA: ProductRecommendation[] = [
    { id: 1, title: 'Seguro de Cambio de Divisa', description: 'Protege tu margen de beneficio de la volatilidad del USD/EUR por tu alta exposición en la cuenta en dólares.', category: 'Gestión de Riesgo', icon: 'shield-check', targetScreen: 'Tesorería' },
    { id: 2, title: 'Línea de Crédito para Importación', description: 'Financia tus compras internacionales a Global Imports Inc. con condiciones preferentes y agiliza los pagos.', category: 'Financiación', icon: 'credit-card', targetScreen: 'Tesorería' },
    { id: 3, title: 'Fondo de Inversión de Renta Fija', description: 'Rentabiliza el excedente de liquidez de tu cuenta de ahorros con un producto de bajo riesgo.', category: 'Inversión', icon: 'chart-bar', targetScreen: 'Tesorería' },
];

export const SIMULATION_SCENARIOS_DATA: SimulationScenario[] = [
    { id: 'inv', title: 'Invertir Excedente de Liquidez', description: 'Invierte €50,000 del excedente de tesorería en un fondo de bajo riesgo (2.5% TAE).', impact: { revenue: 0, margin: 0.1, cashFlow: -10 } },
    { id: 'log', title: 'Optimizar Logística (-5% Costes)', description: 'Implementa un nuevo software de rutas para reducir los costes de transporte y entrega un 5%.', impact: { revenue: 0, margin: 2, cashFlow: 5 } },
    { id: 'pri', title: 'Ajuste de Precios (+3%)', description: 'Aplica un incremento moderado del 3% en tu catálogo de productos principal.', impact: { revenue: 3, margin: 3.5, cashFlow: 3 } },
];

export const COMMUNICATIONS_HISTORY_DATA: Communication[] = [
    {
        id: 'comm-1',
        channel: 'Copilot AI',
        date: 'Ayer, 14:30',
        summary: 'Análisis de gastos de Q2',
        agent: 'Copiloto IA',
        details: 'El cliente solicitó un resumen de los gastos del último trimestre. Se identificó un aumento del 20% en Marketing, concentrado en Publicidad Online debido a una nueva campaña de verano.',
        messages: [
            { sender: 'user', text: 'Analiza mis gastos del último trimestre' },
            { sender: 'agent', text: 'Claro, Fran. He analizado los gastos de Q2. El total es de 75.500€. La partida que más ha aumentado es Marketing, con un incremento del 20% respecto a Q1, principalmente por la nueva campaña de verano. ¿Quieres que te muestre el desglose?' }
        ]
    },
    {
        id: 'comm-2',
        channel: 'Call Center',
        date: 'Hace 2 días, 10:15',
        summary: 'Consulta sobre comisiones de TPV',
        agent: 'Sonia García',
        details: 'El cliente llamó para informarse sobre las comisiones aplicadas a su TPV de la Tienda Central. Se le explicó el desglose de tarifas y se le informó sobre la posibilidad de renegociar por volumen de facturación. Se envió un email con el resumen.'
    },
    {
        id: 'comm-3',
        channel: 'WhatsApp',
        date: 'Hace 3 días, 16:45',
        summary: 'Bloqueo temporal de tarjeta de empresa',
        agent: 'Bot de Asistencia',
        details: 'El cliente reportó la pérdida de la tarjeta de empresa (acabada en *4567). Se procedió al bloqueo inmediato a través del bot de WhatsApp. Se le informó que una nueva tarjeta será enviada a su domicilio fiscal.',
        messages: [
            { sender: 'user', text: 'He perdido mi tarjeta de empresa' },
            { sender: 'bot', text: 'Entendido. Por seguridad, necesito que me confirmes los últimos 4 dígitos de la tarjeta que has perdido.' },
            { sender: 'user', text: 'Termina en 4567' },
            { sender: 'bot', text: 'Gracias, Fran. He procedido al bloqueo inmediato de la tarjeta acabada en *4567. Se ha solicitado una nueva que llegará a tu domicilio fiscal en 3-5 días laborables. ¿Necesitas algo más?' },
            { sender: 'user', text: 'No, gracias' }
        ]
    },
    {
        id: 'comm-4',
        channel: 'Copilot AI',
        date: 'Hace 4 días, 09:15',
        summary: 'Preparación de transferencia a Global Imports',
        agent: 'Copiloto IA',
        details: 'Se preparó una transferencia de 150,000 EUR para un nuevo proveedor, Global Imports Inc. Se marcó como de Alto Riesgo, requiriendo doble verificación, lo cual fue aceptado por el cliente.'
    },
    {
        id: 'comm-5',
        channel: 'Oficina',
        date: 'La semana pasada',
        summary: 'Reunión de planificación de leasing',
        agent: 'Carlos Fernández',
        details: 'Reunión en la oficina para discutir la renovación del leasing del Audi A6. Se presentaron varias opciones de vehículos, incluyendo modelos híbridos y eléctricos, con sus respectivas proyecciones de ahorro en combustible y beneficios fiscales.'
    }
];

export const UNREAD_EMAILS_DATA: UnreadEmail[] = [
    { id: 'email-1', from: 'Proveedor Logístico', subject: 'URGENTE: Retraso en entrega de mercancía', isUrgent: true },
    { id: 'email-2', from: 'Asociación de Empresarios', subject: 'Invitación al networking de Septiembre', isUrgent: false },
];

export const ACTIVE_CAMPAIGNS_DATA: MarketingCampaign[] = [
    { id: 'camp-1', name: 'Campaña de Verano 2024', description: 'Promoción de servicios de consultoría con un 15% de descuento.', status: 'active' },
];