

export const ROL_OPTIONS = [
  { value: '10', label: 'CEO / Director General / Socio fundador' },
  { value: '8', label: 'Gerente o cargo con poder de decisión (Admin, RRHH, Ops, Finanzas)' },
  { value: '2', label: 'Cargo operativo sin capacidad de decisión' },
];

export const INDUSTRY_OPTIONS = [
  { value: '10', label: 'Agro / Manufactura / Salud / Seguros / Banca' },
  { value: '6', label: 'Sectores relacionados o estratégicamente afines' },
  { value: '3', label: 'Otros sectores' },
];

export const REVENUE_OPTIONS = [
  { value: '10', label: 'Más de 3M USD anuales' },
  { value: '7', label: 'Entre 1M y 3M USD' },
  { value: '4', label: 'Menos de 1M USD' },
  { value: '2', label: 'Desconocida o no disponible' },
];

export const EMPLOYEES_OPTIONS = [
  { value: '10', label: 'Más de 100 empleados' },
  { value: '8', label: 'Entre 50 y 100 empleados' },
  { value: '5', label: 'Entre 20 y 49 empleados' },
  { value: '3', label: 'Menos de 20 empleados' },
];

export const BUDGET_OPTIONS = [
  { value: '10', label: 'Confirmado' },
  { value: '5', label: 'En evaluación' },
  { value: '2', label: 'No definido o no disponible' },
];

export const CLARITY_OPTIONS = [
  { value: '10', label: 'Necesidad clara y directamente relacionada con los servicios' },
  { value: '6', label: 'Necesidad general o parcialmente alineada' },
  { value: '2', label: 'Necesidad poco relacionada o indefinida' },
];

export const SOURCE_OPTIONS = [
  { value: '10', label: 'Referencia directa (cliente, socio, contacto interno)' },
  { value: '6', label: 'Búsqueda activa / inbound (web, redes, eventos)' },
  { value: '3', label: 'Outreach frío o sin referencia' },
];

export const SERVICE_INTEREST_OPTIONS = [
  { value: '10', label: 'Estrategia y Transformación' },
  { value: '10', label: 'IA Operativa & Agentes Inteligentes' },
  { value: '8', label: 'Desarrollo Tecnológico e Implementación' },
  { value: '7', label: 'Servicios Administrados y de Aceleración' },
  { value: '6', label: 'Conocimiento y Capacitación' },
  { value: '4', label: 'Otro / No estoy seguro' },
];

export const WEIGHTED_CRITERIA: string[] = ['role', 'source', 'serviceInterest'];
export const MAX_POSSIBLE_WEIGHTED_SCORE = 110;
