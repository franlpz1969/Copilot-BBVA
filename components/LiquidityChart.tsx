import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LIQUIDITY_DATA } from '../constants';

const LiquidityChart: React.FC = () => {
    const formatYAxis = (tickItem: number) => {
        return `${(tickItem / 1000)}k €`;
    };

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    data={LIQUIDITY_DATA}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }}/>
                    <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} />
                    <Tooltip 
                        contentStyle={{ fontSize: '12px', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                        formatter={(value: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)}
                    />
                    <Legend wrapperStyle={{fontSize: "12px"}} />
                    <Line type="monotone" dataKey="liquidity" name="Liquidez Proyectada" stroke="#004481" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LiquidityChart;
