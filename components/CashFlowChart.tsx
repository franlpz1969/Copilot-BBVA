import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CASH_FLOW_DATA } from '../constants';

const CashFlowChart: React.FC = () => {
    const formatYAxis = (tickItem: number) => {
        return `${(tickItem / 1000)}k`;
    };

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart
                    data={CASH_FLOW_DATA}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} />
                    <Tooltip 
                        contentStyle={{ fontSize: '12px', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                        formatter={(value: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)}
                    />
                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                    <Bar dataKey="income" fill="#004481" name="Ingresos" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="#4ddbff" name="Gastos" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CashFlowChart;
