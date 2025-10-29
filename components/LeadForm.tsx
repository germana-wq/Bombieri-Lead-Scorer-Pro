import React, { useState, useEffect } from 'react';
import { LeadData } from '../types';
import { ROL_OPTIONS, INDUSTRY_OPTIONS, REVENUE_OPTIONS, EMPLOYEES_OPTIONS, BUDGET_OPTIONS, CLARITY_OPTIONS, SOURCE_OPTIONS, SERVICE_INTEREST_OPTIONS } from '../constants';

interface LeadFormProps {
  initialData: LeadData;
  onSubmit: (data: LeadData) => void;
  onReset: () => void;
  isScoring: boolean;
}

const TextInput: React.FC<{
    id: keyof LeadData;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}> = ({ id, label, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      required
    />
  </div>
);


const SelectInput: React.FC<{
  id: keyof LeadData;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}> = ({ id, label, value, onChange, options }) => {
  const isSelected = value !== '0';
  const baseClasses = "block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none sm:text-sm transition-colors duration-200 ease-in-out";
  
  const stateClasses = isSelected 
    ? "border-green-500 text-neutral-dark focus:ring-green-500 focus:border-green-500"
    : "border-gray-300 text-gray-500 focus:ring-primary focus:border-primary";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${stateClasses}`}
      >
        <option value="0" disabled>Seleccione una opción...</option>
        {options.map(option => (
          <option key={option.value} value={option.value} className="text-neutral-dark">{option.label}</option>
        ))}
      </select>
    </div>
  );
};


const LeadForm: React.FC<LeadFormProps> = ({ initialData, onSubmit, onReset, isScoring }) => {
  const [formData, setFormData] = useState<LeadData>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const handleReset = () => {
    setFormData(initialData);
    onReset();
  }
  
  const isSubmitDisabled = isScoring || !formData.firstName.trim() || !formData.lastName.trim() ||
    Object.entries(formData).some(([key, value]) => {
      if (['firstName', 'lastName', 'needDetails'].includes(key)) {
        return false;
      }
      return value === '0';
    });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput id="firstName" label="Nombre" value={formData.firstName} onChange={handleChange} placeholder="Ej: María" />
        <TextInput id="lastName" label="Apellido" value={formData.lastName} onChange={handleChange} placeholder="Ej: González" />
      </div>
      <SelectInput id="role" label="Rol del contacto" value={formData.role} onChange={handleChange} options={ROL_OPTIONS} />
      <SelectInput id="industry" label="Industria" value={formData.industry} onChange={handleChange} options={INDUSTRY_OPTIONS} />
      <SelectInput id="revenue" label="Facturación anual estimada" value={formData.revenue} onChange={handleChange} options={REVENUE_OPTIONS} />
      <SelectInput id="employees" label="Cantidad de colaboradores" value={formData.employees} onChange={handleChange} options={EMPLOYEES_OPTIONS} />
      <SelectInput id="budget" label="Presupuesto asignado" value={formData.budget} onChange={handleChange} options={BUDGET_OPTIONS} />
      <SelectInput id="clarity" label="Claridad de la necesidad" value={formData.clarity} onChange={handleChange} options={CLARITY_OPTIONS} />
      
      <div>
        <label htmlFor="needDetails" className="block text-sm font-medium text-gray-700 mb-1">Detalle de la necesidad</label>
        <textarea
          id="needDetails"
          name="needDetails"
          rows={3}
          value={formData.needDetails}
          onChange={handleChange}
          placeholder="Describa brevemente el problema, requerimiento o contexto que motiva el contacto..."
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>

      <SelectInput id="source" label="Origen del lead" value={formData.source} onChange={handleChange} options={SOURCE_OPTIONS} />
      <SelectInput id="serviceInterest" label="Interés por tipo de servicio" value={formData.serviceInterest} onChange={handleChange} options={SERVICE_INTEREST_OPTIONS} />

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-dark-altern focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            {isScoring ? 'Calificando...' : 'Calificar Lead'}
        </button>
        <button
            type="button"
            onClick={handleReset}
            disabled={isScoring}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50"
        >
            Limpiar
        </button>
      </div>
    </form>
  );
};

export default LeadForm;