
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Account } from '../types';

interface AccountDistributionChartProps {
    data: Account[];
}

const COLORS = ['#072146', '#1464A5', '#007CBE', '#00A3E0', '#008CBB'];
const RADIAN = Math.PI / 180;
// FIX: Add explicit types to the destructured props to match recharts' expected signature.
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AccountDistributionChart: React.FC<AccountDistributionChartProps> = ({ data }) => {
    const chartData = data.filter(acc => acc.currency === 'EUR').map(account => ({
        name: account.name,
        value: account.balance,
    }));

    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)}
                    />
                    <Legend iconSize={10} wrapperStyle={{fontSize: "12px"}}/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AccountDistributionChart;