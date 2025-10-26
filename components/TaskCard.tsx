
import React from 'react';
import { Task } from '../types';
import { ArrowRightIcon } from './icons';

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
    return (
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center justify-between">
            <div>
                <p className="font-semibold text-gray-800">{task.title}</p>
                <p className="text-sm text-gray-500">{task.description}</p>
                <p className="text-xs font-medium text-red-600 mt-1">{task.dueDate}</p>
            </div>
            <button className="text-gray-400 hover:text-bbva-blue">
                <ArrowRightIcon className="h-5 w-5" />
            </button>
        </div>
    );
};

export default TaskCard;
