import { GoogleGenAI } from "@google/genai";
import { MOCK_FINANCIAL_DATA, TRANSFERS_DATA, TASKS_DATA, TREASURY_ACCOUNTS, PAYROLL_DATA, LEASING_DATA, KEY_OPERATIONS_DATA, UNREAD_EMAILS_DATA, ACTIVE_CAMPAIGNS_DATA } from '../constants';
import { FaqItem, LinkItem } from "../types";

// FIX: Initialize GoogleGenAI with a named apiKey parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
// FIX: Use a recommended model name. 'gemini-2.5-pro' is a valid model. 'gemini-pro' is deprecated.
const model = 'gemini-2.5-pro';

interface RichResponse {
    text: string;
    imageUrl?: string;
    faqs?: FaqItem[];
    links?: LinkItem[];
    transactional?: {
        id: number;
        provider: string;
        amount: number;
        currency: string;
    }
}

const getRichContentForTopic = (topic: string): Partial<RichResponse> => {
    const contentMap: { [key: string]: Partial<RichResponse> } = {
        "conciliación": {
            imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            faqs: [
                 { 
                    question: "¿Cuál es el flujo de trabajo para una conciliación exitosa?", 
                    answer: [
                        "**1. Importación Automática:** El sistema importa diariamente tus movimientos bancarios.",
                        "**2. Cruce Inteligente:** La IA compara automáticamente los movimientos del banco con tus apuntes contables (facturas, pagos, etc.).",
                        "**3. Revisión de Pendientes:** Solo tienes que centrarte en los movimientos que el sistema no pudo cruzar automáticamente y en las **diferencias**.",
                        "**4. Resolución Asistida:** Usa las sugerencias de la IA para resolver las diferencias con un solo clic."
                    ] 
                },
                { 
                    question: "¿Qué causa una 'diferencia' y cómo la resuelvo?", 
                    answer: "Una diferencia ocurre cuando un apunte y un movimiento bancario no coinciden. Las causas más comunes son:\n* **Comisiones bancarias:** El banco cobra una comisión que no habías registrado.\n* **Pagos parciales:** Un cliente paga solo una parte de una factura.\n* **Errores de tecleo:** Una factura se registró con un importe incorrecto.\n\n**Solución Asistida:** La IA detecta la causa más probable. Por ejemplo, si la diferencia es de **-1.50€**, te sugerirá registrarla como 'comisión bancaria'."
                },
                { 
                    question: "¿Cómo me ayuda la IA a ser más rápido?", 
                    answer: "El Copiloto IA automatiza hasta el **90% del proceso**. En lugar de revisar línea por línea, tu trabajo se reduce a:\n* **Validar las sugerencias** de la IA para las diferencias.\n* **Aprobar los apuntes contables** que el asistente prepara por ti.\n* Consultarle dudas como 'Busca la factura relacionada con este ingreso'."
                },
            ],
            links: [
                { title: "Videotutorial: Proceso de Conciliación", url: "#", type: "video" },
                { title: "Manual de Conciliación Avanzada (PDF)", url: "#", type: "manual" },
            ]
        },
        "transferencias": {
            faqs: [
                 { 
                    question: "¿Qué significa exactamente 'Alto Riesgo'?", 
                    answer: "Una transferencia se marca como 'Alto Riesgo' para **proteger a tu empresa**. La IA lo hace cuando detecta una o más de estas condiciones:\n* **Importe Elevado:** Supera significativamente el umbral de pago habitual de tu empresa.\n* **Destinatario Nuevo:** Es la primera vez que se envía dinero a esta cuenta de destino. La IA te pide una doble verificación para evitar fraudes.\n* **Patrón Inusual:** La frecuencia, el importe o el concepto no coinciden con tu historial de pagos a este proveedor." 
                },
                { 
                    question: "¿Cómo funciona la firma de transferencias si necesito más de un aprobador?", 
                    answer: "La plataforma soporta **flujos de firma mancomunada**. El proceso es el siguiente:\n1. El primer usuario autorizado **prepara y firma** la transferencia.\n2. El sistema notifica automáticamente al **segundo firmante** que tiene una operación pendiente.\n3. La transferencia no se ejecuta hasta que el segundo firmante la aprueba y firma. \n\nPuedes configurar los niveles de firma y autorizaciones desde el panel de 'Administración'."
                },
            ],
            links: [
                { title: "Videotutorial: Flujos de Firma Avanzados", url: "#", type: "video" },
            ]
        },
        "tpv": {
             faqs: [
                { 
                    question: "¿Cómo puedo optimizar las comisiones de mis TPVs?", 
                    answer: "Puedes ver un desglose completo en 'Mis TPVs' > 'Liquidaciones y Comisiones'. Para optimizar, te recomiendo:\n* **Negociar por volumen:** Si tu facturación ha aumentado, podemos renegociar tus tarifas. Pídele a la IA: '**Analiza si puedo optar a mejores comisiones en mis TPVs**'.\n* **Consolidar terminales:** A veces, tener menos terminales con más transacciones puede reducir la cuota fija mensual." 
                },
                { 
                    question: "Un cliente ha reclamado un pago. ¿Qué hago?", 
                    answer: "Eso se llama una **retrocesión** (chargeback). El proceso es:\n1. **Notificación:** Te informaremos del pago disputado y bloquearemos temporalmente los fondos.\n2. **Presenta Evidencia:** Tienes un plazo para aportar pruebas de que la venta fue legítima (ticket de compra, albarán de entrega firmado, etc.).\n3. **Resolución:** El banco del cliente decidirá. **Guardar siempre los justificantes de venta** es tu mejor defensa."
                },
            ],
        },
        "sostenibilidad": {
            imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1740&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            faqs: [
                { 
                    question: "¿Cómo se calcula mi huella de carbono de forma tan precisa?", 
                    answer: "Usamos la **normativa estándar del GHG Protocol**. El proceso es:\n1. **Categorización IA:** Nuestro motor de IA analiza y categoriza todos tus gastos empresariales (ej. un pago en una gasolinera se clasifica como 'Transporte').\n2. **Aplicación de Factores:** A cada categoría se le aplica un 'factor de emisión' oficial, que convierte el gasto en euros a kilogramos de CO₂ equivalente.\n3. **Agregación:** Sumamos todas las emisiones para darte tu huella total y su desglose."
                },
                { 
                    question: "¿Qué beneficios reales obtiene mi empresa al ser más sostenible?", 
                    answer: "Más allá del impacto positivo en el planeta, ser sostenible te aporta ventajas competitivas:\n* **Ahorro de Costes:** Medidas como la eficiencia energética o la optimización de rutas reducen directamente tus facturas.\n* **Mejora de la Imagen de Marca:** Los clientes y el talento joven prefieren empresas comprometidas con la sostenibilidad.\n* **Acceso a Financiación:** Cada vez más, los bancos y fondos de inversión ofrecen mejores condiciones a empresas con un buen rating de sostenibilidad (ESG)."
                },
            ],
            links: [
                 { title: "Guía de Sostenibilidad y Financiación para Pymes (PDF)", url: "#", type: "manual" },
            ]
        }
    };
    return contentMap[topic] || {};
};

export const getWelcomeSummary = async (): Promise<string> => {
    try {
        const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const context = `
            Hoy es ${today}.
            Resumen del día para Fran López, CFO de Global Tech:
            - Tareas Críticas Pendientes: ${JSON.stringify(KEY_OPERATIONS_DATA.slice(0, 3), null, 2)}
            - Emails Sin Leer Relevantes: ${JSON.stringify(UNREAD_EMAILS_DATA, null, 2)}
            - Campañas de Marketing Activas: ${JSON.stringify(ACTIVE_CAMPAIGNS_DATA, null, 2)}
        `;

        const userContent = `Basado en el siguiente contexto, genera un saludo de bienvenida para Fran López.`;
        
        const response = await ai.models.generateContent({
            model: model,
            contents: [{ parts: [{ text: userContent }] }],
            config: {
                systemInstruction: `Eres "Copiloto IA", un asistente financiero experto para BBVA. Tu propósito es ser la mano derecha de Fran López. Tu primera tarea del día es saludarle cálidamente y darle un resumen conciso y proactivo de su situación actual, basado en los datos que te proporciono. Ve al grano, resalta lo más urgente con **negritas** y ofrécete a ayudarle a gestionar estas tareas. El tono debe ser profesional pero cercano.`,
                temperature: 0.3,
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error generating welcome summary:", error);
        return "¡Buenos días, Fran! No he podido cargar el resumen de hoy, pero estoy aquí para lo que necesites.";
    }
};

export const getProactiveClientInsight = async (context?: 'leasing' | 'payroll'): Promise<{ title: string; text: string }> => {
    // In a real app, this would analyze real-time data. Here we simulate it.

    if (context === 'leasing') {
        const expiringLease = LEASING_DATA.find(l => new Date(l.endDate.split('/').reverse().join('-')) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000));
        if (expiringLease) {
            return {
                title: "Asesor de Leasing IA",
                text: `He detectado que tu contrato de leasing para **${expiringLease.asset}** finaliza en menos de 3 meses. Es un buen momento para empezar a evaluar opciones. ¿Quieres que analice las **mejores ofertas de renovación** o que comparemos con vehículos alternativos más eficientes?`
            }
        }
    }

    if (context === 'payroll') {
        const pendingPayroll = PAYROLL_DATA.find(p => p.status === 'Pendiente de firma');
        if (pendingPayroll && pendingPayroll.incidents.length > 0) {
            return {
                title: "Revisión de Nóminas Asistida por IA",
                text: `Fran, he pre-analizado la remesa de nóminas de **${pendingPayroll.month}**. He detectado **${pendingPayroll.incidents.length} incidencias** que requieren tu atención antes de la firma. Revísalas en el panel de 'Incidencias Detectadas' para asegurar que todo sea correcto.`
            }
        }
         return {
            title: "Revisión de Nóminas Asistida por IA",
            text: `La remesa de **${pendingPayroll?.month}** está lista. No he detectado ninguna incidencia destacable. Todo parece en orden para proceder a la firma.`
        }
    }

    const usdAccount = TREASURY_ACCOUNTS.find(acc => acc.currency === 'USD');
    if (usdAccount && usdAccount.balance > 50000) {
        return {
            title: "Oportunidad: Gestión de Divisas",
            text: `Fran, he notado que tu saldo en la cuenta de USD ha aumentado a **${usdAccount.balance.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}**. Dada la volatilidad actual del mercado, te recomiendo considerar un **seguro de cambio** para proteger el valor de estos fondos al convertirlos a EUR. Puedo mostrarte las opciones disponibles.`
        }
    }
    return {
        title: "Recomendación Proactiva de IA",
        text: "Detectamos un excedente de liquidez de €150,000 en tu cuenta principal. Podrías obtener una rentabilidad estimada de **+€1,200 en 6 meses** invirtiendo en un fondo conservador, sin afectar tu operativa."
    }
};

export const getFinancialAdvice = async (prompt: string): Promise<string> => {
  try {
    const lowerCasePrompt = prompt.toLowerCase();
    
    // --- MOCK TRANSACTIONAL LOGIC ---
    if (lowerCasePrompt.includes('pagar') || lowerCasePrompt.includes('transferir a')) {
        const transfer = TRANSFERS_DATA.find(t => lowerCasePrompt.includes(t.provider.toLowerCase()));
        if (transfer) {
            const transactionalResponse: RichResponse = {
                text: `He preparado la transferencia para **${transfer.provider}**. Por favor, revísala y apruébala.`,
                transactional: { id: transfer.id, provider: transfer.provider, amount: transfer.amount, currency: transfer.currency }
            };
            return JSON.stringify(transactionalResponse);
        }
    }
    
     if (lowerCasePrompt.includes('resolver') && lowerCasePrompt.includes('diferencia')) {
        const transactionalResponse: RichResponse = {
            text: "He analizado la diferencia de -€150.50. Parece corresponder a una **comisión de mantenimiento trimestral** no registrada. ¿Quieres que cree el apunte contable correspondiente para saldarla?",
            transactional: { id: 99, provider: 'Comisión Bancaria', amount: 150.50, currency: 'EUR' }
        };
        return JSON.stringify(transactionalResponse);
    }
    
    if (lowerCasePrompt.includes('contratar') && lowerCasePrompt.includes('tpv')) {
        return JSON.stringify({
            text: "¡Excelente! Para contratar un nuevo TPV, necesito algunos datos. He preparado un formulario de solicitud. ¿Quieres que lo abramos para completarlo juntos?"
        })
    }
    
    if (lowerCasePrompt.includes('corregir') && lowerCasePrompt.includes('incidencia')) {
         return JSON.stringify({
            text: "Entendido. La incidencia del **Dpto. de Ventas** se debe a un gasto extraordinario en una campaña. He ajustado la previsión presupuestaria para el próximo trimestre. ¿Quieres que aplique el cambio?"
        })
    }

    const financialDataContext = `
      Datos Financieros de la Empresa:
      Cuentas: ${JSON.stringify(MOCK_FINANCIAL_DATA.accounts, null, 2)}
      Resumen Financiero: ${JSON.stringify(MOCK_FINANCIAL_DATA.summary, null, 2)}
      Tareas Pendientes: ${JSON.stringify(TASKS_DATA, null, 2)}
      Últimas Transferencias: ${JSON.stringify(TRANSFERS_DATA, null, 2)}
    `;

    const userContent = `Basado en el siguiente contexto de datos, responde a mi pregunta.\n\n${financialDataContext}\n\nPregunta: "${prompt}"`;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: userContent }] }],
      config: {
        systemInstruction: `Eres "Copiloto IA", un asistente financiero experto para la plataforma BBVA Net Cash. Tu usuario es Fran López, el CFO de la empresa. Tu propósito es ser su mano derecha: proactivo, perspicaz y resolutivo. Ayúdalo a interpretar datos, anticipar problemas, optimizar la tesorería y ejecutar tareas de forma segura. Sé conciso, directo y utiliza un tono profesional y cercano. Utiliza **negritas** para resaltar cifras o conceptos clave.`,
        temperature: 0.2,
      }
    });
    
    let richContent: Partial<RichResponse> = {};
    if(lowerCasePrompt.includes('conciliación')) richContent = getRichContentForTopic('conciliación');
    else if(lowerCasePrompt.includes('transferencia')) richContent = getRichContentForTopic('transferencias');
    else if(lowerCasePrompt.includes('sostenibilidad') || lowerCasePrompt.includes('carbono')) richContent = getRichContentForTopic('sostenibilidad');
    else if(lowerCasePrompt.includes('tpv')) richContent = getRichContentForTopic('tpv');

    const finalResponse: RichResponse = {
// FIX: The correct way to get the text is from `response.text`.
        text: response.text,
        ...richContent
    };

    return JSON.stringify(finalResponse);

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    const errorResponse: RichResponse = {
        text: "No se pudo obtener una respuesta del asistente de IA."
    };
    return JSON.stringify(errorResponse);
  }
};