
import React from 'react';
import DashboardCard from './DashboardCard';

const FiltersSidebar: React.FC = () => {
    return (
        <DashboardCard title="Filtros">
            <div className="space-y-4">
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
                    <select id="status" name="status" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-bbva-accent focus:border-bbva-accent sm:text-sm rounded-md">
                        <option>Todos</option>
                        <option>Completado</option>
                        <option>Pendiente</option>
                        <option>Fallido</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="account" className="block text-sm font-medium text-gray-700">Cuenta</label>
                    <select id="account" name="account" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-bbva-accent focus:border-bbva-accent sm:text-sm rounded-md">
                        <option>Todas</option>
                        <option>Cuenta Principal</option>
                        <option>Cuenta de Ahorros</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Importe</label>
                    <input type="range" id="amount" name="amount" min="0" max="20000" className="mt-1 block w-full" />
                </div>
                <button className="w-full bg-bbva-blue text-white py-2 px-4 rounded-md hover:bg-opacity-90">
                    Aplicar Filtros
                </button>
            </div>
        </DashboardCard>
    );
};

export default FiltersSidebar;
