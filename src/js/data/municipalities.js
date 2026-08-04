/* ==========================================================================
   MUNICIPALITIES DATA - NUEVO LEÓN (51 MUNICIPALITIES)
   With vibrant multi-colored palette matching user reference map image
   ========================================================================== */

export const REGIONS = {
  metropolitana: {
    id: 'metropolitana',
    name: 'Área Metropolitana',
    color: '#00A8E8',
    lightColor: '#E5F6FD',
    desc: 'Centro financiero, industrial, comercial y tecnológico de Nuevo León.'
  },
  citricola: {
    id: 'citricola',
    name: 'Región Citrícola',
    color: '#8CE600',
    lightColor: '#F4FFE0',
    desc: 'Zona agrícola, agroindustrial, citrícola y turística.'
  },
  norte: {
    id: 'norte',
    name: 'Región Norte',
    color: '#FF6600',
    lightColor: '#FFF0E5',
    desc: 'Corredor logístico, comercial y frontera internacional.'
  },
  sur: {
    id: 'sur',
    name: 'Región Sur',
    color: '#FF00CD',
    lightColor: '#FFE5F9',
    desc: 'Zona de desarrollo agrícola, minero y ecoturismo.'
  },
  periferica: {
    id: 'periferica',
    name: 'Región Periférica / Este',
    color: '#9933CC',
    lightColor: '#F4E5FF',
    desc: 'Parques industriales en rápido crecimiento y centros manufactureros.'
  }
};

// Vibrant colors matching the user reference map image (lime green, magenta, orange, violet, yellow, teal, brown, etc.)
export const MUNICIPALITIES = [
  // 1. ÁREA METROPOLITANA
  {
    id: 'monterrey',
    name: 'Monterrey',
    region: 'metropolitana',
    color: '#339933', // Forest green
    isCapital: true,
    totalJobs: 4820,
    topIndustries: ['Finanzas y Bancos', 'Tecnología de Información', 'Comercio', 'Servicios Médicos'],
    description: 'Capital del estado y motor financiero de México. Concentra corporativos globales y universidades de prestigio.',
    coords: { x: 440, y: 480, r: 24 }
  },
  {
    id: 'san-pedro',
    name: 'San Pedro Garza García',
    region: 'metropolitana',
    color: '#9933CC', // Violet
    totalJobs: 2950,
    topIndustries: ['Corporativos Globales', 'Consultoría Financiera', 'Software & Tech', 'Inmobiliario'],
    description: 'Sede de los corporativos trasnacionales más importantes y mayor desarrollo financiero.',
    coords: { x: 410, y: 500, r: 20 }
  },
  {
    id: 'san-nicolas',
    name: 'San Nicolás de los Garza',
    region: 'metropolitana',
    color: '#00C8C8', // Cyan Teal
    totalJobs: 2180,
    topIndustries: ['Siderurgia & Metalmecánica', 'Educación Superior', 'Manufactura', 'Logística'],
    description: 'Hub educativo e industrial tradicional con fuerte presencia siderúrgica y tecnológica.',
    coords: { x: 450, y: 450, r: 19 }
  },
  {
    id: 'guadalupe',
    name: 'Guadalupe',
    region: 'metropolitana',
    color: '#FF6600', // Vivid Orange
    totalJobs: 1840,
    topIndustries: ['Comercio & Retail', 'Manufactura Ligera', 'Servicios', 'Logística'],
    description: 'Punto clave para parques industriales urbanos, centros comerciales y logística metropolitana.',
    coords: { x: 480, y: 485, r: 20 }
  },
  {
    id: 'apodaca',
    name: 'Apodaca',
    region: 'metropolitana',
    color: '#FFD700', // Yellow
    totalJobs: 3410,
    topIndustries: ['Electrónica & Tech', 'Aeroespacial', 'Automotriz', 'Parques Industriales'],
    description: 'Capital industrial y tecnológica de NL. Alberga el Aeropuerto Internacional y más de 70 parques industriales.',
    coords: { x: 500, y: 440, r: 22 }
  },
  {
    id: 'escobedo',
    name: 'General Escobedo',
    region: 'metropolitana',
    color: '#FF00CD', // Magenta
    totalJobs: 1420,
    topIndustries: ['Manufactura Automotriz', 'Centros de Distribución', 'Alimentos & Bebidas', 'Construcción'],
    description: 'Corredor industrial del norte metropolitano especializado en manufactura y distribución.',
    coords: { x: 425, y: 430, r: 20 }
  },
  {
    id: 'santa-catarina',
    name: 'Santa Catarina',
    region: 'metropolitana',
    color: '#8CE600', // Lime Green
    totalJobs: 1960,
    topIndustries: ['Vehículos Eléctricos & Tech', 'Automotriz', 'Química', 'Manufactura Avanzada'],
    description: 'Hub de electromovilidad y manufactura avanzada, puerta de entrada al Parque La Huasteca.',
    coords: { x: 370, y: 500, r: 21 }
  },
  {
    id: 'juarez',
    name: 'Juárez',
    region: 'metropolitana',
    color: '#E60000', // Bright Red
    totalJobs: 780,
    topIndustries: ['Manufactura de Ensamblaje', 'Comercio Local', 'Servicios de Transporte', 'Construcción'],
    description: 'Municipio en acelerada expansión residencial e industrial al oriente del área metropolitana.',
    coords: { x: 530, y: 495, r: 18 }
  },
  {
    id: 'garcia',
    name: 'García',
    region: 'metropolitana',
    color: '#A55252', // Brownish Coral
    totalJobs: 1120,
    topIndustries: ['Ensambladoras Automotrices', 'Materiales de Construcción', 'Energía', 'Industria Pesada'],
    description: 'Polo de expansión pesada e industrial con grandes complejos automotrices y parques industriales.',
    coords: { x: 340, y: 450, r: 21 }
  },

  // 2. REGIÓN CITRÍCOLA
  {
    id: 'montemorelos',
    name: 'Montemorelos',
    region: 'citricola',
    color: '#8CE600', // Lime
    totalJobs: 430,
    topIndustries: ['Agroindustria Citrícola', 'Procesamiento de Alimentos', 'Salud & Educación', 'Comercio'],
    description: 'Corazón citrícola del estado, famoso por la producción y exportación de naranja y derivados.',
    coords: { x: 530, y: 600, r: 17 }
  },
  {
    id: 'linares',
    name: 'Linares',
    region: 'citricola',
    color: '#FF00CD', // Magenta Pink
    totalJobs: 620,
    topIndustries: ['Pueblo Mágico / Turismo', 'Dulces Tradicionales', 'Manufactura Agropecuaria', 'Educación'],
    description: 'Pueblo Mágico histórico con creciente parque industrial tecnológico y agrícola.',
    coords: { x: 580, y: 670, r: 18 }
  },
  {
    id: 'allende',
    name: 'Allende',
    region: 'citricola',
    color: '#FF6600', // Orange
    totalJobs: 380,
    topIndustries: ['Transporte de Carga', 'Logística de Carga Pesada', 'Ecoturismo', 'Citricultura'],
    description: 'Capital nacional del transporte de carga pesada y logística de carreteras.',
    coords: { x: 490, y: 565, r: 16 }
  },
  {
    id: 'hualahuises',
    name: 'Hualahuises',
    region: 'citricola',
    color: '#A55252',
    totalJobs: 110,
    topIndustries: ['Artesanía en Talabartería', 'Agricultura', 'Ganadería'],
    description: 'Conocido por su producción artesanal de artículos de piel y talabartería tradicional.',
    coords: { x: 560, y: 640, r: 13 }
  },
  {
    id: 'general-teran',
    name: 'General Terán',
    region: 'citricola',
    color: '#00C8C8',
    totalJobs: 190,
    topIndustries: ['Ganadería de Registro', 'Citricultura', 'Energía Renovable'],
    description: 'Extenso municipio agrícola, ganadero y cuna de la música norteña.',
    coords: { x: 590, y: 580, r: 16 }
  },
  {
    id: 'rayones',
    name: 'Rayones',
    region: 'citricola',
    color: '#339933',
    totalJobs: 75,
    topIndustries: ['Cultivo de Nueces', 'Ecoturismo de Montaña', 'Agricultura'],
    description: 'Rincón de la Sierra Madre reconocido por sus nogales y paisajes de cañones.',
    coords: { x: 460, y: 620, r: 13 }
  },

  // 3. REGIÓN NORTE
  {
    id: 'sabinas-hidalgo',
    name: 'Sabinas Hidalgo',
    region: 'norte',
    color: '#FF6600', // Orange
    totalJobs: 310,
    topIndustries: ['Industria Textil', 'Comercio Fronterizo', 'Ganadería', 'Servicios'],
    description: 'Centro comercial y confección textil del norte del estado con conexión directa a la frontera.',
    coords: { x: 430, y: 300, r: 17 }
  },
  {
    id: 'anahuac',
    name: 'Anáhuac',
    region: 'norte',
    color: '#8CE600', // Bright Lime
    totalJobs: 490,
    topIndustries: ['Puente Internacional Colombia', 'Comercio Exterior', 'Aduanas & Logística', 'Agricultura'],
    description: 'Único municipio fronterizo de NL con Estados Unidos, sede del Puerto Internacional Colombia.',
    coords: { x: 380, y: 150, r: 19 }
  },
  {
    id: 'bustamante',
    name: 'Bustamante',
    region: 'norte',
    color: '#FF00CD',
    totalJobs: 140,
    topIndustries: ['Pueblo Mágico / Turismo', 'Panadería Tradicional', 'Ecoturismo (Grutas)'],
    description: 'Oasis del norte de NL, Pueblo Mágico famoso por sus Grutas de Bustamante y pan artesanal.',
    coords: { x: 390, y: 310, r: 14 }
  },
  {
    id: 'lampazos',
    name: 'Lampazos de Naranjo',
    region: 'norte',
    color: '#00C8C8',
    totalJobs: 120,
    topIndustries: ['Ganadería Vacuna', 'Turismo Histórico', 'Agricultura'],
    description: 'Tierra de héroes históricos, tradición ganadera y paisajes del desierto norteño.',
    coords: { x: 350, y: 220, r: 15 }
  },
  {
    id: 'vallecillo',
    name: 'Vallecillo',
    region: 'norte',
    color: '#A55252',
    totalJobs: 60,
    topIndustries: ['Extracción de Cantera', 'Ganadería', 'Agricultura'],
    description: 'Reconocido históricamente por su cantera de piedra rosa y tradición ganadera.',
    coords: { x: 460, y: 250, r: 13 }
  },
  {
    id: 'villaldama',
    name: 'Villaldama',
    region: 'norte',
    color: '#9933CC',
    totalJobs: 90,
    topIndustries: ['Minería Tradicional', 'Agricultura', 'Ganadería'],
    description: 'Antiguo real de minas rodeado de la Sierra de Gomas y fértiles tierras.',
    coords: { x: 410, y: 330, r: 13 }
  },

  // 4. REGIÓN SUR
  {
    id: 'galeana',
    name: 'Galeana',
    region: 'sur',
    color: '#FF00CD', // Large Pink/Magenta region matching reference map
    totalJobs: 280,
    topIndustries: ['Cultivo de Papa & Papa Semilla', 'Minería de Yeso', 'Ecoturismo (Pozo del Gavilán)'],
    description: 'El municipio de mayor extensión territorial en el estado, líder nacional en producción de papa.',
    coords: { x: 470, y: 760, r: 22 }
  },
  {
    id: 'doctor-arroyo',
    name: 'Doctor Arroyo',
    region: 'sur',
    color: '#8CE600', // Lime Green
    totalJobs: 190,
    topIndustries: ['Agricultura de Invernadero', 'Comercio Regional', 'Servicios de Salud'],
    description: 'Principal polo comercial y de servicios del altiplano del sur de Nuevo León.',
    coords: { x: 500, y: 870, r: 19 }
  },
  {
    id: 'aramberri',
    name: 'Aramberri',
    region: 'sur',
    color: '#FF00CD', // Magenta
    totalJobs: 110,
    topIndustries: ['Cultivo de Aguacate & Tomate', 'Forestal', 'Ecoturismo'],
    description: 'Valle intermontano fértil famoso por la producción de aguacate criollo y hortalizas.',
    coords: { x: 550, y: 810, r: 15 }
  },
  {
    id: 'mier-y-noriega',
    name: 'Mier y Noriega',
    region: 'sur',
    color: '#FF6600', // Orange
    totalJobs: 50,
    topIndustries: ['Agricultura de Temporal', 'Ganadería Caprina', 'Artesanías'],
    description: 'El municipio ubicado más al sur de Nuevo León, en los límites con San Luis Potosí.',
    coords: { x: 480, y: 920, r: 12 }
  },
  {
    id: 'iturbide',
    name: 'Iturbide',
    region: 'sur',
    color: '#9933CC',
    totalJobs: 80,
    topIndustries: ['Ecoturismo de Aventura', 'Forestal', 'Investigación Astronómica (UANL)'],
    description: 'Municipio en el corazón de la Sierra Madre con clima templado de pino y encino.',
    coords: { x: 480, y: 690, r: 14 }
  },
  {
    id: 'general-zaragoza',
    name: 'General Zaragoza',
    region: 'sur',
    color: '#339933', // Forest green
    totalJobs: 95,
    topIndustries: ['Turismo de Naturaleza (El Salto)', 'Truticultura', 'Forestal'],
    description: 'Paraíso natural famoso por sus cascadas, ríos cristalinos y bosques alpinos.',
    coords: { x: 530, y: 840, r: 14 }
  },

  // 5. REGIÓN PERIFÉRICA / ESTE
  {
    id: 'cadereyta',
    name: 'Cadereyta Jiménez',
    region: 'periferica',
    color: '#FF6600', // Bright Orange matching reference
    totalJobs: 1350,
    topIndustries: ['Refinería & Petroquímica', 'Escobas Artesanales', 'Logística de Hidrocarburos', 'Comercio'],
    description: 'Sede de la Refinería Ing. Héctor R. Lara Sosa de PEMEX y polo petroquímico.',
    coords: { x: 540, y: 510, r: 21 }
  },
  {
    id: 'santiago',
    name: 'Santiago',
    region: 'periferica',
    color: '#FFD700', // Yellow
    totalJobs: 540,
    topIndustries: ['Pueblo Mágico / Turismo', 'Gastronomía & Hotelería', 'Comercio', 'Deportes Acuáticos'],
    description: 'Pueblo Mágico junto a la Presa de la Boca y la Cola de Caballo, referente turístico estatal.',
    coords: { x: 460, y: 550, r: 18 }
  },
  {
    id: 'pesqueria',
    name: 'Pesquería',
    region: 'periferica',
    color: '#FF00CD', // Pink Magenta
    totalJobs: 2450,
    topIndustries: ['Automotriz (KIA Motors)', 'Siderurgia Avanzada (Ternium)', 'Energía', 'Procesado'],
    description: 'Llamado el "Nuevo Milagro Industrial", epicentro de las plantas de KIA y Ternium.',
    coords: { x: 570, y: 460, r: 21 }
  },
  {
    id: 'cienega-de-flores',
    name: 'Ciénega de Flores',
    region: 'periferica',
    color: '#A55252',
    totalJobs: 1180,
    topIndustries: ['Manufactura Industrial', 'Gastronomía (Machacado)', 'Logística'],
    description: 'Polo industrial con grandes parques corporativos y cuna del machacado con huevo.',
    coords: { x: 460, y: 390, r: 18 }
  },
  {
    id: 'salinas-victoria',
    name: 'Salinas Victoria',
    region: 'periferica',
    color: '#8CE600', // Lime
    totalJobs: 1290,
    topIndustries: ['Parque Industrial Hofusan', 'Manufactura Global', 'Logística', 'Ganadería'],
    description: 'Hogar del mega parque industrial Hofusan con inversiones tecnológicas de clase mundial.',
    coords: { x: 430, y: 370, r: 19 }
  },
  {
    id: 'el-carmen',
    name: 'El Carmen',
    region: 'periferica',
    color: '#FF6600',
    totalJobs: 410,
    topIndustries: ['Manufactura de Componentes', 'Construcción', 'Comercio'],
    description: 'Municipio periférico con rápido crecimiento de vivienda e industrias de ensamble.',
    coords: { x: 415, y: 405, r: 15 }
  },
  {
    id: 'general-zuazua',
    name: 'General Zuazua',
    region: 'periferica',
    color: '#FFD700',
    totalJobs: 390,
    topIndustries: ['Desarrollo Residencial', 'Comercio', 'Empacadoras'],
    description: 'Conocido por su crecimiento urbano acelerado y tradición en la elaboración de empalmes.',
    coords: { x: 490, y: 410, r: 16 }
  },
  {
    id: 'marin',
    name: 'Marín',
    region: 'periferica',
    color: '#339933',
    totalJobs: 160,
    topIndustries: ['Agropecuaria (UANL)', 'Investigación Agrícola', 'Lácteos'],
    description: 'Sede de la Facultad de Agronomía de la UANL e investigación agropecuaria.',
    coords: { x: 520, y: 420, r: 14 }
  },
  {
    id: 'higueras',
    name: 'Higueras',
    region: 'periferica',
    color: '#9933CC',
    totalJobs: 70,
    topIndustries: ['Producción de Quesos', 'Orégano', 'Ganadería Caprina'],
    description: 'Famoso por la Feria del Orégano y la elaboración artesanal de quesos de cabra.',
    coords: { x: 500, y: 370, r: 13 }
  },
  {
    id: 'hidalgo',
    name: 'Hidalgo',
    region: 'periferica',
    color: '#FF00CD',
    totalJobs: 210,
    topIndustries: ['Cementera & Caleras', 'Turismo de Escalada (Potrero Chico)'],
    description: 'Capital del deporte de escalada en roca en Potrero Chico e industria del cemento.',
    coords: { x: 370, y: 380, r: 15 }
  },
  {
    id: 'abasolo',
    name: 'Abasolo',
    region: 'periferica',
    color: '#00C8C8',
    totalJobs: 65,
    topIndustries: ['Extracción de Piedra', 'Agricultura', 'Ganadería'],
    description: 'Pequeño y apacible municipio entre las montañas del norte periférico.',
    coords: { x: 395, y: 370, r: 12 }
  },
  {
    id: 'mina',
    name: 'Mina',
    region: 'periferica',
    color: '#FFD700', // Yellow Large West region
    totalJobs: 130,
    topIndustries: ['Paleontología & Museo Bernabé', 'Minería', 'Ganadería Desertícola'],
    description: 'Rico en fósiles prehistóricos, petroglifos de Boca de Potrerillos y desierto.',
    coords: { x: 320, y: 360, r: 18 }
  },
  {
    id: 'cerralvo',
    name: 'Cerralvo',
    region: 'periferica',
    color: '#A55252',
    totalJobs: 180,
    topIndustries: ['Ciudad de Sabinas/Cerralvo', 'Comercio', 'Ganadería Vacuna'],
    description: 'La población más antigua de Nuevo León, fundada en 1582 como Ciudad de León.',
    coords: { x: 580, y: 370, r: 16 }
  },
  {
    id: 'agualeguas',
    name: 'Agualeguas',
    region: 'periferica',
    color: '#FF6600',
    totalJobs: 85,
    topIndustries: ['Ganadería de Exportación', 'Turismo Cultural', 'Agricultura'],
    description: 'Municipio del nororiente de gran tradición ganadera y relevancia histórica.',
    coords: { x: 550, y: 320, r: 15 }
  },
  {
    id: 'general-trevino',
    name: 'General Treviño',
    region: 'periferica',
    color: '#E60000', // Red
    totalJobs: 50,
    topIndustries: ['Ganadería', 'Agricultura'],
    description: 'Tranquilo municipio ganadero cerca de los límites con Tamaulipas.',
    coords: { x: 610, y: 330, r: 12 }
  },
  {
    id: 'melchor-ocampo',
    name: 'Melchor Ocampo',
    region: 'periferica',
    color: '#FFD700',
    totalJobs: 45,
    topIndustries: ['Agricultura', 'Ganadería Caprina'],
    description: 'Uno de los municipios más pequeños del estado en territorio y población.',
    coords: { x: 630, y: 350, r: 11 }
  },
  {
    id: 'paras',
    name: 'Parás',
    region: 'periferica',
    color: '#FF00CD',
    totalJobs: 40,
    topIndustries: ['Ganadería', 'Agricultura'],
    description: 'Ubicado en el extremo nororiente del estado.',
    coords: { x: 550, y: 270, r: 12 }
  },
  {
    id: 'los-aldamas',
    name: 'Los Aldamas',
    region: 'periferica',
    color: '#9933CC',
    totalJobs: 55,
    topIndustries: ['Ganadería Vacuna', 'Agricultura'],
    description: 'Población agrícola a orillas del Río San Juan.',
    coords: { x: 640, y: 390, r: 12 }
  },
  {
    id: 'los-ramones',
    name: 'Los Ramones',
    region: 'periferica',
    color: '#8CE600',
    totalJobs: 95,
    topIndustries: ['Estación de Gas Natural', 'Agricultura', 'Ganadería'],
    description: 'Punto clave en la red de gasoductos de México (Los Ramones).',
    coords: { x: 600, y: 440, r: 14 }
  },
  {
    id: 'china',
    name: 'China',
    region: 'periferica',
    color: '#339933', // Forest green large region east
    totalJobs: 240,
    topIndustries: ['Pesca Deportiva (Presa El Cuchillo)', 'Ganadería', 'Comercio'],
    description: 'Hogar de la Presa El Cuchillo, embalse vital para el abastecimiento de agua y pesca.',
    coords: { x: 660, y: 470, r: 18 }
  },
  {
    id: 'general-bravo',
    name: 'General Bravo',
    region: 'periferica',
    color: '#E60000', // Red large East region matching reference
    totalJobs: 130,
    topIndustries: ['Comercio Carretero', 'Ganadería', 'Gas Natural'],
    description: 'Paso obligatorio en la carretera Monterrey - Reynosa / McAllen.',
    coords: { x: 690, y: 440, r: 15 }
  },
  {
    id: 'doctor-coss',
    name: 'Doctor Coss',
    region: 'periferica',
    color: '#9933CC',
    totalJobs: 35,
    topIndustries: ['Ganadería', 'Agricultura'],
    description: 'Municipio rural fronterizo con el estado de Tamaulipas.',
    coords: { x: 700, y: 410, r: 11 }
  },
  {
    id: 'los-herreras',
    name: 'Los Herreras',
    region: 'periferica',
    color: '#FF6600',
    totalJobs: 50,
    topIndustries: ['Ganadería', 'Agricultura'],
    description: 'Comunidad agrícola tradicional del este de Nuevo León.',
    coords: { x: 620, y: 410, r: 12 }
  }
];
