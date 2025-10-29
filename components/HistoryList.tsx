import React, { useState } from 'react';
import { HistoricLead } from '../types';
import ScoreDisplay from './ScoreDisplay';
import RecommendationsDisplay from './RecommendationsDisplay';

interface HistoryListProps {
    history: HistoricLead[];
    onExport: () => void;
    onClear: () => void;
}

const PriorityBadge: React.FC<{ priority: string; size?: 'sm' | 'xs' }> = ({ priority, size = 'xs' }) => {
    const baseClasses = "font-semibold rounded-full";
    const sizeClasses = size === 'sm' ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs";
    let colorClasses = "";
    switch (priority) {
        case 'Alta': colorClasses = 'bg-green-100 text-green-800'; break;
        case 'Media': colorClasses = 'bg-yellow-100 text-yellow-800'; break;
        case 'Baja': colorClasses = 'bg-red-100 text-red-800'; break;
        default: colorClasses = 'bg-gray-100 text-gray-800';
    }
    return <span className={`${baseClasses} ${sizeClasses} ${colorClasses}`}>{priority}</span>;
}

const DetailItem: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
  (value && value !== 'N/A') ? (
    <div className="py-2">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm text-neutral-dark">{value}</p>
    </div>
  ) : null
);

const HistoryDetailView: React.FC<{ lead: HistoricLead; onClose: () => void; }> = ({ lead, onClose }) => {
    return (
        <div className="flex flex-col h-full animate-fade-in">
            <div className="flex items-center mb-4">
                <button onClick={onClose} title="Volver al historial" className="p-2 -ml-2 text-gray-500 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="ml-2">
                    <h3 className="font-sora text-xl text-primary truncate">{`${lead.readableData.firstName} ${lead.readableData.lastName}`}</h3>
                    <p className="text-xs text-gray-500">{new Date(lead.id).toLocaleString()}</p>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto -mr-4 pr-4 space-y-6">
                <div>
                    <h4 className="font-sora text-lg text-dark-altern border-b pb-2 mb-2">Información del Lead</h4>
                    <div className="grid grid-cols-2 gap-x-4">
                        <DetailItem label="Rol" value={lead.readableData.role} />
                        <DetailItem label="Industria" value={lead.readableData.industry} />
                        <DetailItem label="Facturación" value={lead.readableData.revenue} />
                        <DetailItem label="Colaboradores" value={lead.readableData.employees} />
                        <DetailItem label="Presupuesto" value={lead.readableData.budget} />
                        <DetailItem label="Origen" value={lead.readableData.source} />
                        <DetailItem label="Claridad Necesidad" value={lead.readableData.clarity} />
                        <DetailItem label="Servicio de Interés" value={lead.readableData.serviceInterest} />
                    </div>
                    <DetailItem label="Detalle de la Necesidad" value={lead.readableData.needDetails} />
                </div>
                <div>
                    <h4 className="font-sora text-lg text-dark-altern border-b pb-2 mb-4">Evaluación</h4>
                    <div className="space-y-6">
                       <div className="flex items-center justify-center">
                         <ScoreDisplay score={lead.scoreResult.finalScore} />
                       </div>
                       <RecommendationsDisplay recommendations={lead.recommendations} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const HistoryList: React.FC<HistoryListProps> = ({ history, onExport, onClear }) => {
    const [selectedLead, setSelectedLead] = useState<HistoricLead | null>(null);

    if (selectedLead) {
        return <HistoryDetailView lead={selectedLead} onClose={() => setSelectedLead(null)} />;
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-sora text-2xl text-primary">Historial</h2>
                <div className="flex items-center gap-2">
                    <button onClick={onExport} title="Exportar a CSV" className="p-2 text-gray-500 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full disabled:opacity-50" disabled={history.length === 0}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button onClick={onClear} title="Limpiar historial" className="p-2 text-gray-500 hover:text-accent-motion focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-motion rounded-full disabled:opacity-50" disabled={history.length === 0}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto -mr-4 pr-4">
                {history.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center text-gray-500">
                        <p>Aún no hay leads calificados.<br/>El historial aparecerá aquí.</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {history.map((lead) => {
                            const score = lead.scoreResult.finalScore;
                            const scoreColor = score > 7.5 ? 'border-green-400' : score > 4.5 ? 'border-yellow-400' : 'border-red-400';

                            return (
                                <li 
                                    key={lead.id} 
                                    onClick={() => setSelectedLead(lead)} 
                                    className="p-3 rounded-lg border-l-4 bg-light-altern hover:bg-white hover:shadow-md cursor-pointer transition-all duration-200"
                                    style={{ borderColor: score > 7.5 ? '#22c55e' : score > 4.5 ? '#eab308' : '#D32210' }}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-primary truncate">{`${lead.readableData.firstName} ${lead.readableData.lastName}`.trim() || 'Lead sin nombre'}</p>
                                            <p className="text-xs text-gray-500">{new Date(lead.id).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <PriorityBadge priority={lead.recommendations.priority} />
                                            <div className={`font-sora font-bold text-lg`}>
                                                {score.toFixed(1)}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default HistoryList;