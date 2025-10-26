
import React from 'react';
import DashboardCard from './DashboardCard';
import { ArrowRightIcon } from './icons';

const ConciliationSidebar: React.FC = () => {
    return (
        <DashboardCard title="Resumen de Conciliación">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Movimientos conciliados</span>
                    <span className="font-semibold">2</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-gray-600">Movimientos pendientes</span>
                    <span className="font-semibold">2</span>
                </div>
                 <div className="flex justify-between items-center text-red-600">
                    <span className="font-medium">Diferencias encontradas</span>
                    <span className="font-bold">1</span>
                </div>
                <div className="border-t pt-4 mt-4 space-y-3">
                     <button className="w-full flex justify-between items-center text-left bg-gray-100 p-3 rounded-lg hover:bg-gray-200">
                        <div>
                            <p className="font-semibold">Iniciar conciliación automática</p>
                            <p className="text-xs text-gray-500">El sistema intentará conciliar los movimientos pendientes.</p>
                        </div>
                        <ArrowRightIcon className="h-5 w-5 text-gray-500" />
                    </button>
                     <button className="w-full flex justify-between items-center text-left bg-gray-100 p-3 rounded-lg hover:bg-gray-200">
                        <div>
                            <p className="font-semibold">Cargar extracto bancario</p>
                            <p className="text-xs text-gray-500">Sube un nuevo fichero para conciliar.</p>
                        </div>
                        <ArrowRightIcon className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
            </div>
        </DashboardCard>
    );
};

export default ConciliationSidebar;
