import React from 'react';
import { Transfer } from '../types';

interface TransferCardProps {
    transfer: Transfer;
}

const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
};

const TransferCard: React.FC<TransferCardProps> = ({ transfer }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-between">
            <div className="flex-1">
                <p className="font-semibold text-bbva-blue">{transfer.concept}</p>
                <p className="text-sm text-gray-500">{transfer.origin} → {transfer.destination}</p>
            </div>
            <div className="flex items-center space-x-8">
                <div className="text-right">
                    <p className="font-bold text-lg">{transfer.amount.toLocaleString('es-ES', { style: 'currency', currency: transfer.currency })}</p>
                    <p className="text-sm text-gray-500">{transfer.date}</p>
                </div>
                <div>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusStyles[transfer.status]}`}>
                        {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TransferCard;
