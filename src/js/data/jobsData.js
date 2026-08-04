/* ==========================================================================
   JOBS DATASET & STORAGE MANAGEMENT - NUEVO LEÓN
   Supports localStorage persistence so admin publications appear instantly
   ========================================================================== */

export const JOB_CATEGORIES = [
  { id: 'all', name: 'Todas las Categorías', icon: 'fa-layer-group' },
  { id: 'manufactura', name: 'Ingeniería & Manufactura', icon: 'fa-industry' },
  { id: 'logistica', name: 'Logística & Cadena de Suministro', icon: 'fa-truck-fast' },
  { id: 'mantenimiento', name: 'Mantenimiento e Instalaciones', icon: 'fa-wrench' },
  { id: 'operaciones', name: 'Operaciones & Producción', icon: 'fa-gears' },
  { id: 'tecnologia', name: 'Tecnología & Software', icon: 'fa-code' },
  { id: 'finanzas', name: 'Finanzas & Contabilidad', icon: 'fa-chart-pie' },
  { id: 'salud', name: 'Salud & Ciencias Médicas', icon: 'fa-user-nurse' }
];

export const WORK_MODALITIES = [
  { id: 'all', name: 'Todas las modalidades' },
  { id: 'presencial', name: 'Presencial' },
  { id: 'hibrido', name: 'Híbrido' },
  { id: 'remoto', name: '100% Remoto' }
];

const INITIAL_JOBS = [
  {
    id: 'daltile-01',
    title: 'Ayudante General (Hombres y Mujeres)',
    company: 'Grupo Daltile San Pedro',
    logoBg: '#00A8E8',
    logoText: 'DLT',
    municipalityId: 'san-pedro',
    municipalityName: 'San Pedro Garza García',
    category: 'manufactura',
    modality: 'presencial',
    salary: '$3,008 - $3,180 MXN / semanal',
    featured: true,
    urgent: true,
    verified: true,
    postedDate: 'Hoy',
    description: 'Excelente oportunidad laboral en Grupo Daltile San Pedro para integrar el equipo de operaciones industriales.',
    requirements: [
      'Hombres y mujeres (18+ años).',
      'Disponibilidad para turnos rotativos (Mañana 6:00 AM, Tarde 2:30 PM, Noche 10:30 PM).',
      'Ganas de trabajar y superarse.'
    ],
    benefits: [
      'Salario semanal no tenemos semana de fondo.',
      'Comedor subsidiado (24 comidas GRATIS al inicio).',
      'Gimnasio GRATIS para empleados.',
      'Prestaciones superiores a la ley y Caja de ahorro.',
      'Aguinaldo de 31 días y Vales de despensa.',
      '11 categorías para crecer laboralmente.'
    ]
  },
  {
    id: 'daltile-02',
    title: 'Electromecánico (Hombres y Mujeres)',
    company: 'Grupo Daltile San Pedro',
    logoBg: '#00A8E8',
    logoText: 'DLT',
    municipalityId: 'san-pedro',
    municipalityName: 'San Pedro Garza García',
    category: 'mantenimiento',
    modality: 'presencial',
    salary: '$3,550 - $4,106 MXN / semanal',
    featured: true,
    urgent: true,
    verified: true,
    postedDate: 'Hoy',
    description: 'Mantenimiento preventivo y correctivo electromecánico en planta industrial Daltile San Pedro.',
    requirements: [
      'Conocimientos o experiencia en mantenimiento electromecánico.',
      'Disponibilidad para turnos rotativos.',
      'Documentación completa.'
    ],
    benefits: [
      'Sueldo semanal de $3,550 a $4,106.',
      'Comedor subsidiado (24 comidas GRATIS al inicio).',
      'Gimnasio GRATIS.',
      'Aguinaldo de 31 días y Vales de despensa.',
      'Caja de ahorro y Préstamos sindicales.',
      'Excelente ambiente laboral.'
    ]
  },
  {
    id: 'daltile-03',
    title: 'Operador Técnico',
    company: 'Grupo Daltile San Pedro',
    logoBg: '#00A8E8',
    logoText: 'DLT',
    municipalityId: 'san-pedro',
    municipalityName: 'San Pedro Garza García',
    category: 'operaciones',
    modality: 'presencial',
    salary: '$3,263 MXN / semanal',
    featured: true,
    urgent: false,
    verified: true,
    postedDate: 'Hoy',
    description: 'Operación técnica de maquinaria e inspección de procesos en planta Daltile San Pedro.',
    requirements: [
      'Hombres y mujeres.',
      'Disponibilidad para turnos rotativos.',
      'Compromiso y puntualidad.'
    ],
    benefits: [
      'Sueldo semanal libre de $3,263.',
      'Sin semana de fondo.',
      'Comedor subsidiado (24 comidas GRATIS).',
      'Gimnasio GRATIS.',
      'Prestaciones superiores a la ley.'
    ]
  },
  {
    id: 'daltile-04',
    title: 'Montacarguista (Ambos Sexos)',
    company: 'Grupo Daltile San Pedro',
    logoBg: '#00A8E8',
    logoText: 'DLT',
    municipalityId: 'san-pedro',
    municipalityName: 'San Pedro Garza García',
    category: 'logistica',
    modality: 'presencial',
    salary: '$3,263 MXN / semanal',
    featured: true,
    urgent: true,
    verified: true,
    postedDate: 'Hoy',
    description: 'Manejo de montacargas y acomodo de material en almacén de planta San Pedro.',
    requirements: [
      'Experiencia en manejo de montacargas.',
      'Hombres y mujeres.',
      'Disponibilidad de turno rotativo.'
    ],
    benefits: [
      'Sueldo semanal de $3,263 sin semana de fondo.',
      'Gimnasio GRATIS.',
      'Comedor subsidiado + 24 comidas gratis iniciales.',
      'Caja de ahorro y préstamos sindicales.',
      'Aguinaldo de 31 días y vales de despensa.'
    ]
  },
  {
    id: 'rosenberger-01',
    title: 'Ayudante General (Contratación Inmediata)',
    company: 'Rosenberger México',
    logoBg: '#EF4444',
    logoText: 'RSB',
    municipalityId: 'apodaca',
    municipalityName: 'Apodaca',
    category: 'manufactura',
    modality: 'presencial',
    salary: '$2,919 MXN / semanal',
    featured: true,
    urgent: true,
    verified: true,
    postedDate: 'Hoy',
    description: 'Ensamble de componentes, manejo de cables de fibra óptica/cobre, empaque e inspección de calidad.',
    requirements: [
      'Hombres y mujeres (18 a 55 años).',
      'Secundaria terminada.',
      'Experiencia básica en fábrica o puesto similar.'
    ],
    benefits: [
      'Sueldo de $417 diarios ($2,919 semanales).',
      'Turno fijo de Tarde (2:00 PM a 10:00 PM).',
      '$800 vales de despensa mensuales + $1,000 bono de asistencia.',
      'Transporte gratuito y Comedor subsidiado ($23.50).',
      '8% fondo de ahorro + 30 días de aguinaldo.',
      'Prestaciones de ley desde el primer día.'
    ]
  },
  {
    id: 'rosenberger-02',
    title: 'Almacenista (Turnos Día o Noche)',
    company: 'Rosenberger México',
    logoBg: '#EF4444',
    logoText: 'RSB',
    municipalityId: 'apodaca',
    municipalityName: 'Apodaca',
    category: 'logistica',
    modality: 'presencial',
    salary: '$2,919 MXN / semanal',
    featured: true,
    urgent: true,
    verified: true,
    postedDate: 'Hoy',
    description: 'Recepción, orden, almacenamiento y preparación de embarques en almacén industrial.',
    requirements: [
      'Hombres y mujeres (18 a 55 años).',
      'Secundaria terminada.',
      'Experiencia mínima en almacén o fábrica.'
    ],
    benefits: [
      'Sueldo semanal de $2,919 ($417 diarios).',
      'Turno fijo a elegir (Día 6:00am - 2:00pm o Noche 10:00pm - 6:00am).',
      '$800 vales mensuales + $1,000 bono mensual.',
      'Transporte gratuito y Comedor subsidiado.',
      '8% fondo de ahorro + 30 días de aguinaldo.'
    ]
  },
  {
    id: 'rosenberger-03',
    title: 'Materialista (Turnos Día o Noche)',
    company: 'Rosenberger México',
    logoBg: '#EF4444',
    logoText: 'RSB',
    municipalityId: 'apodaca',
    municipalityName: 'Apodaca',
    category: 'logistica',
    modality: 'presencial',
    salary: '$2,919 MXN / semanal',
    featured: true,
    urgent: true,
    verified: true,
    postedDate: 'Hoy',
    description: 'Abastecimiento constante de materia prima e insumos a las líneas de producción.',
    requirements: [
      'Hombres y mujeres (18 a 55 años).',
      'Secundaria terminada.',
      'Experiencia como materialista o ayuda general en planta.'
    ],
    benefits: [
      'Sueldo semanal de $2,919 ($417 diarios).',
      'Turnos fijos (Día o Noche).',
      '$800 en vales de despensa + $1,000 bono mensual.',
      'Transporte gratuito.',
      '8% fondo de ahorro y prestaciones de ley.'
    ]
  },
  {
    id: 'mattel-01',
    title: 'Ayudante General – Ensamble de Juguetes',
    company: 'Mattel Escobedo',
    logoBg: '#E5A93C',
    logoText: 'MTL',
    municipalityId: 'escobedo',
    municipalityName: 'General Escobedo',
    category: 'manufactura',
    modality: 'presencial',
    salary: '$2,422 MXN / semanal',
    featured: true,
    urgent: true,
    verified: true,
    postedDate: 'Hoy',
    description: 'Ensamble y empaque de juguetes en la gran planta Mattel Escobedo. ¡Aceptamos reingresos!',
    requirements: [
      'Hombres y mujeres (Desde 18 años, sin límite de edad).',
      'Primaria terminada.',
      'Con o sin experiencia.'
    ],
    benefits: [
      'Turno fijo de tarde (3:00 p.m. a 11:30 p.m.).',
      'Descanso fijo los Domingos.',
      'Transporte gratuito y Comedor subsidiado.',
      '$700 en vales de despensa al mes.',
      'Fondo de ahorro + 30 días de aguinaldo.',
      'Crecimiento laboral.'
    ]
  },
  {
    id: 'mattel-02',
    title: 'Montacarguista (H.S. y/o H.P.)',
    company: 'Mattel Escobedo',
    logoBg: '#E5A93C',
    logoText: 'MTL',
    municipalityId: 'escobedo',
    municipalityName: 'General Escobedo',
    category: 'logistica',
    modality: 'presencial',
    salary: '$3,471 MXN / semanal ($495.99 diarios)',
    featured: true,
    urgent: true,
    verified: true,
    postedDate: 'Hoy',
    description: 'Operación de montacargas hombre sentado y/o hombre parado para movimientos de almacén.',
    requirements: [
      'Hombres y mujeres desde 18 años.',
      'Primaria terminada.',
      'DC3, licencia o diploma de montacargas.'
    ],
    benefits: [
      'Sueldo diario $495.99 ($3,471 semanales).',
      'Turno rotativo.',
      'Transporte gratuito y Comedor subsidiado.',
      '$700 en vales de despensa + Fondo de ahorro.',
      '30 días de aguinaldo y prestaciones de ley.'
    ]
  },
  {
    id: 'venameca-01',
    title: 'Ayudante General – Ingreso Inmediato',
    company: 'Venameca México',
    logoBg: '#10B981',
    logoText: 'VNM',
    municipalityId: 'monterrey',
    municipalityName: 'Monterrey',
    category: 'manufactura',
    modality: 'presencial',
    salary: '$2,587 MXN / semanal libre + Bonos',
    featured: true,
    urgent: true,
    verified: true,
    postedDate: 'Hoy',
    description: 'Trabajo manual en producción con ingreso al día siguiente de tu entrevista.',
    requirements: [
      'Hombres y mujeres (18 a 55 años).',
      'Primaria terminada.',
      'Sin experiencia y sin exámenes médicos.',
      'Buena visión para trabajo manual.'
    ],
    benefits: [
      'Pago semanal libre de $2,587.',
      'Bono semanal de puntualidad/asistencia: $250.',
      'Ayuda de transporte: $125 semanales.',
      'Bonos mensuales de seguridad ($200) y productividad ($500).',
      'Taxi de regreso a casa en turno de tarde.',
      'No maneja semana de fondo ni desfasada.'
    ]
  }
];

const STORAGE_KEY = 'bolsa_trabajo_nl_jobs_v2';

export function getStoredJobs() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_JOBS));
    return [...INITIAL_JOBS];
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return [...INITIAL_JOBS];
  }
}

export function saveNewJob(job) {
  const current = getStoredJobs();
  current.unshift(job);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return current;
}

export function deleteJobById(jobId) {
  let current = getStoredJobs();
  current = current.filter(j => j.id !== jobId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return current;
}

export let JOBS_DATA = getStoredJobs();
