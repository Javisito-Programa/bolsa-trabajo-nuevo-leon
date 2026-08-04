/* ==========================================================================
   JOBS DATASET & STORAGE MANAGEMENT - NUEVO LEÓN
   Supports localStorage persistence so admin publications appear instantly
   ========================================================================== */

export const JOB_CATEGORIES = [
  { id: 'all', name: 'Todas las Categorías', icon: 'fa-layer-group' },
  { id: 'tecnologia', name: 'Tecnología & Software', icon: 'fa-code' },
  { id: 'manufactura', name: 'Ingeniería & Manufactura', icon: 'fa-industry' },
  { id: 'finanzas', name: 'Finanzas & Contabilidad', icon: 'fa-chart-pie' },
  { id: 'logistica', name: 'Logística & Cadena de Suministro', icon: 'fa-truck-fast' },
  { id: 'salud', name: 'Salud & Ciencias Médicas', icon: 'fa-user-nurse' },
  { id: 'comercial', name: 'Ventas & Desarrollo de Negocio', icon: 'fa-briefcase' },
  { id: 'recursos-humanos', name: 'Recursos Humanos & Talento', icon: 'fa-users' }
];

export const WORK_MODALITIES = [
  { id: 'all', name: 'Todas las modalidades' },
  { id: 'presencial', name: 'Presencial' },
  { id: 'hibrido', name: 'Híbrido' },
  { id: 'remoto', name: '100% Remoto' }
];

const INITIAL_JOBS = [
  {
    id: 'sp-01',
    title: 'Senior Cloud Architecture Lead (AWS / Azure)',
    company: 'Softtek Global Solutions',
    logoBg: '#00A8E8',
    logoText: 'STK',
    municipalityId: 'san-pedro',
    municipalityName: 'San Pedro Garza García',
    category: 'tecnologia',
    modality: 'hibrido',
    salary: '$75,000 - $95,000 MXN / mes',
    featured: true,
    urgent: false,
    verified: true,
    postedDate: 'Hace 2 horas',
    description: 'Buscamos un Arquitecto de Nube Senior para liderar la transformación digital de clientes corporativos multinacionales en Valle Oriente.',
    requirements: [
      'Más de 6 años de experiencia en arquitectura multicloud (AWS/Azure).',
      'Certificación AWS Solutions Architect Professional o equivalente.',
      'Inglés avanzado fluído (C1/C2).',
      'Experiencia en infraestructura como código (Terraform, CloudFormation).'
    ],
    benefits: [
      'Seguro de Gastos Médicos Mayores (SGMM) familiar.',
      'Fondo de ahorro del 13% y vales de despensa.',
      'Bono anual por desempeño corporativo.',
      'Esquema 100% nómina con prestaciones superiores.'
    ]
  },
  {
    id: 'mty-01',
    title: 'Lead Full-Stack Developer (React & Node.js)',
    company: 'Epicor Software México',
    logoBg: '#E5A93C',
    logoText: 'EPC',
    municipalityId: 'monterrey',
    municipalityName: 'Monterrey',
    category: 'tecnologia',
    modality: 'remoto',
    salary: '$60,000 - $80,000 MXN / mes',
    featured: true,
    urgent: true,
    verified: true,
    postedDate: 'Hoy',
    description: 'Desarrollador Full Stack para crear soluciones ERP de nueva generación en nuestro centro de desarrollo en Pabellón M.',
    requirements: [
      '4+ años con React.js, TypeScript y Node.js (Express/NestJS).',
      'Manejo sólido de PostgreSQL y MongoDB.',
      'Conocimientos en CI/CD y Docker/Kubernetes.'
    ],
    benefits: ['100% Trabajo Remoto opcional', 'Presupuesto anual de educación/certificaciones', 'Seguro SGMM + Dental', 'Laptop de última generación']
  },
  {
    id: 'apo-01',
    title: 'Ingeniero de Automatización & Robótica PLC',
    company: 'Nidec Global Appliance',
    logoBg: '#00A8E8',
    logoText: 'NDC',
    municipalityId: 'apodaca',
    municipalityName: 'Apodaca',
    category: 'manufactura',
    modality: 'presencial',
    salary: '$42,000 - $55,000 MXN / mes',
    featured: true,
    urgent: true,
    verified: true,
    postedDate: 'Hoy',
    description: 'Programación de celdas robóticas Fanuc/ABB y controladores Siemens S7-1500 en Parque Industrial Apodaca.',
    requirements: ['Ingeniería en Mecatrónica, Electrónica o Control.', '3+ años de experiencia comprobable en integración de líneas industriales.', 'Programación ladder y Allen Bradley.'],
    benefits: ['Transporte de personal gratuito', 'Comedor subsidiado al 80%', 'Fondo de ahorro 13%', 'Bono de puntualidad']
  },
  {
    id: 'pes-01',
    title: 'Ingeniero Principal de Ensamble Automotriz',
    company: 'KIA México',
    logoBg: '#EF4444',
    logoText: 'KIA',
    municipalityId: 'pesqueria',
    municipalityName: 'Pesquería',
    category: 'manufactura',
    modality: 'presencial',
    salary: '$50,000 - $65,000 MXN / mes',
    featured: true,
    urgent: true,
    verified: true,
    postedDate: 'Hace 1 hora',
    description: 'Optimización de líneas de ensamble final para vehículos eléctricos en la mega planta de Pesquería.',
    requirements: ['Ingeniería Mecánica, Industrial o Automotriz.', '4+ años en plantas armadoras OEM.', 'Manejo de metodologías KAIZEN y 5S.'],
    benefits: ['Descuento exclusivo en compra de autos KIA', 'Transporte directo desde Mty/Guadalupe/Apodaca', 'Comedor corporativo', 'Seguro de gastos médicos']
  },
  {
    id: 'sc-01',
    title: 'Senior Systems Engineer - Electromobilidad',
    company: 'Tesla / Subcontratista Tecnológico',
    logoBg: '#EF4444',
    logoText: 'TSL',
    municipalityId: 'santa-catarina',
    municipalityName: 'Santa Catarina',
    category: 'tecnologia',
    modality: 'hibrido',
    salary: '$70,000 - $90,000 MXN / mes',
    featured: true,
    urgent: true,
    verified: true,
    postedDate: 'Hace 5 horas',
    description: 'Integración de sistemas de prueba para paquetes de baterías y controladores de potencia en Santa Catarina.',
    requirements: ['Ingeniería en Electrónica, Mecatrónica o Sistemas Embobados.', 'Experiencia en protocolos CAN bus, Ethernet industrial.', 'Inglés fluído indispensable.'],
    benefits: ['Opciones de acciones corporativas (RSUs)', 'SGMM de cobertura amplia', 'Horarios flexibles', 'Capacitación en EE.UU.']
  },
  {
    id: 'sp-02',
    title: 'Gerente de Análisis Financiero & M&A',
    company: 'Grupo Financiero Banregio',
    logoBg: '#10B981',
    logoText: 'BRG',
    municipalityId: 'san-pedro',
    municipalityName: 'San Pedro Garza García',
    category: 'finanzas',
    modality: 'presencial',
    salary: '$68,000 - $82,000 MXN / mes',
    featured: true,
    urgent: true,
    verified: true,
    postedDate: 'Hace 4 horas',
    description: 'Responsable de la evaluación financiera de proyectos de inversión, fusiones y adquisiciones estratégicas corporativas.',
    requirements: [
      'Licenciatura en Finanzas, Economía o Ingeniería Industrial con Maestría en Finanzas.',
      'Experiencia mínima de 5 años en banca de inversión o corporativa.',
      'Dominio avanzado de modelos financieros complejos en Excel y Bloomberg Terminal.',
      'Inglés de negocios avanzado.'
    ],
    benefits: [
      'Plan de pensión corporativo.',
      '30 días de aguinaldo y 70% prima vacacional.',
      'Club social y deportivo corporativo.',
      'Seguro de vida de 48 meses de sueldo.'
    ]
  }
];

const STORAGE_KEY = 'bolsa_trabajo_nl_jobs_v1';

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
