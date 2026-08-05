/* ==========================================================================
   TRANSPORTE DE PERSONAL - RUTAS Y PUNTOS DE ABORDO (NUEVO LEÓN)
   Parsed from official TREGAR / Rosenberger routes specification PDF & Special Express Stops
   ========================================================================== */

export const TRANSPORT_ROUTES = [
  {
    id: 'R-EXPRESS',
    name: '⭐ Ruta Especial Exprés - Puntos Directos',
    municipality: 'Juárez / Apodaca / Guadalupe',
    color: '#E5A93C',
    stops: [
      { id: 1, name: 'S-Mart Santa Cruz', lat: 25.6740, lng: -100.1510, ta: '06:00 AM', tb: '14:00 PM', tc: '22:00 PM', mapUrl: 'https://maps.app.goo.gl/D4VWNbC21riGgzDM7?g_st=ac' },
      { id: 2, name: 'Telcel Sun Mall VIP', lat: 25.6690, lng: -100.1380, ta: '06:15 AM', tb: '14:15 PM', tc: '22:15 PM', mapUrl: 'https://maps.app.goo.gl/jLvi2LdTxjCNhcmG7' },
      { id: 3, name: 'Monumento a Juárez', lat: 25.6510, lng: -100.0960, ta: '06:25 AM', tb: '14:25 PM', tc: '22:25 PM', mapUrl: 'https://maps.app.goo.gl/ZEwXt23EHiLG5gen7?g_st=ac' },
      { id: 4, name: 'Farmacias Guadalajara Villas de San Juan', lat: 25.6450, lng: -100.0820, ta: '06:35 AM', tb: '14:35 PM', tc: '22:35 PM', mapUrl: 'https://maps.app.goo.gl/RFvnse91yXxTpJoTA?g_st=ac' },
      { id: 5, name: 'Seven Eleven Santa Isabel', lat: 25.7180, lng: -100.1470, ta: '06:50 AM', tb: '14:50 PM', tc: '22:50 PM', mapUrl: 'https://maps.app.goo.gl/S5X8t4q2oST1eDf68?g_st=ac' },
      { id: 6, name: 'Polivalente Anzures', lat: 25.7050, lng: -100.1590, ta: '07:00 AM', tb: '15:00 PM', tc: '23:00 PM', mapUrl: 'https://maps.app.goo.gl/K1yb4TEb7iTyxiiSA?g_st=ac' },
      { id: 7, name: 'Gasera Entronque a Juárez', lat: 25.7350, lng: -100.1620, ta: '07:15 AM', tb: '15:15 PM', tc: '23:15 PM', mapUrl: 'https://maps.app.goo.gl/6bgR2R65nwXGvXrg7?g_st=ac' },
      { id: 8, name: 'Carnicería Méndez', lat: 25.7650, lng: -100.1450, ta: '07:35 AM', tb: '15:35 PM', tc: '23:35 PM', mapUrl: 'https://maps.app.goo.gl/LuKMgzBy2ivzqdLU9?g_st=ac' }
    ]
  },
  {
    id: 'R-1',
    name: 'Ruta 1: Anzures – Santa Isabel',
    municipality: 'Apodaca / Juárez',
    color: '#00A8E8',
    stops: [
      { id: 1, name: 'Ruiz Cortines y Cam. a San Roque (Farmacia Guadalajara)', lat: 25.7112, lng: -100.1654, ta: '04:35', tb: '12:35', tc: '20:35' },
      { id: 2, name: 'San Remo y Milán (Expendio de Agua)', lat: 25.7085, lng: -100.1620, ta: '04:37', tb: '12:37', tc: '20:37' },
      { id: 3, name: 'Bahía Central y C. Gales (OXXO Polivalente)', lat: 25.7050, lng: -100.1590, ta: '04:39', tb: '12:39', tc: '20:39' },
      { id: 4, name: 'Av. Siracusa y Gales (Puesto de Pollos Asados)', lat: 25.7032, lng: -100.1550, ta: '04:41', tb: '12:41', tc: '20:41' },
      { id: 5, name: 'Av. del Río y Loma Alegre (Mercadito)', lat: 25.7010, lng: -100.1520, ta: '04:43', tb: '12:43', tc: '20:43' },
      { id: 6, name: 'Av. Sta Isabel y Av. de los Navegantes (Depósito La Pasadita)', lat: 25.7150, lng: -100.1480, ta: '04:51', tb: '12:51', tc: '20:51' },
      { id: 7, name: 'Av. Santa Bárbara y Av. Santa María (Bodega Aurrera)', lat: 25.7210, lng: -100.1430, ta: '04:56', tb: '12:56', tc: '20:56' },
      { id: 12, name: 'Ruiz Cortines y Nápoles (7-Eleven Nápoles)', lat: 25.7280, lng: -100.1550, ta: '05:10', tb: '13:10', tc: '21:10' },
      { id: 15, name: 'Entronque Juárez - Dulces Nombres (Parabús)', lat: 25.7350, lng: -100.1620, ta: '05:19', tb: '13:19', tc: '21:19' },
      { id: 17, name: 'Carretera Apodaca - Juárez y Lomas del Tibet (OXXO)', lat: 25.7420, lng: -100.1680, ta: '05:25', tb: '13:25', tc: '21:25' }
    ]
  },
  {
    id: 'R-2',
    name: 'Ruta 2: Juárez',
    municipality: 'Juárez / Guadalupe',
    color: '#E5A93C',
    stops: [
      { id: 1, name: 'Av. Los Portales y Cam. a San Mateo (Farmacia GDL)', lat: 25.6550, lng: -100.0890, ta: '04:30', tb: '12:20', tc: '20:30' },
      { id: 3, name: 'Eloy Cavazos y P.° San Patricio (Entrada San Patricio)', lat: 25.6590, lng: -100.0950, ta: '04:35', tb: '12:25', tc: '20:35' },
      { id: 4, name: 'Av. Los Cántaros y María Bonita (Plaza Peatonal B. Aurrera)', lat: 25.6630, lng: -100.1020, ta: '04:38', tb: '12:28', tc: '20:38' },
      { id: 8, name: 'Carr. Reynosa - Villa Juárez (Parabús Soriana Hiper)', lat: 25.6720, lng: -100.1250, ta: '04:57', tb: '12:47', tc: '20:57' },
      { id: 9, name: 'Carr. Reynosa y Cam. a San Roque (Mi Tienda del Ahorro)', lat: 25.6750, lng: -100.1380, ta: '05:00', tb: '12:50', tc: '21:00' },
      { id: 12, name: 'C. 18 de Marzo y Matías Casas (Frente Tacos Cheko)', lat: 25.6820, lng: -100.1550, ta: '05:12', tb: '13:02', tc: '21:12' },
      { id: 15, name: 'Israel Cavazos y Ruiz Cortines (Soriana Hiper Valle Soleado)', lat: 25.6980, lng: -100.1780, ta: '05:28', tb: '13:18', tc: '21:28' }
    ]
  },
  {
    id: 'R-3',
    name: 'Ruta 3: Pueblo Nuevo, Tréboles y Las Flores',
    municipality: 'Apodaca',
    color: '#10B981',
    stops: [
      { id: 1, name: 'Carr. Juárez Apodaca (Puente Peatonal Merco)', lat: 25.7580, lng: -100.1750, ta: '04:50', tb: '12:50', tc: '20:50' },
      { id: 2, name: 'Río Pilón y Río Nilo (Frente a TKT Six)', lat: 25.7610, lng: -100.1780, ta: '04:54', tb: '12:54', tc: '20:54' },
      { id: 4, name: 'Río Missouri y Portal de Huinalá (Parque)', lat: 25.7680, lng: -100.1820, ta: '05:01', tb: '13:01', tc: '21:01' },
      { id: 9, name: 'Av. Tréboles y Encanto (OXXO Sector A)', lat: 25.7750, lng: -100.1890, ta: '05:18', tb: '13:18', tc: '21:18' },
      { id: 10, name: 'Av. Tréboles y Del Prado (Préstamo Salinas)', lat: 25.7790, lng: -100.1920, ta: '05:19', tb: '13:19', tc: '21:19' },
      { id: 14, name: 'Av. del Colector y Córdoba (Parabús frente a Bodega)', lat: 25.7860, lng: -100.1980, ta: '05:26', tb: '13:26', tc: '21:26' },
      { id: 16, name: 'Av. las Flores y Estambul (OXXO)', lat: 25.7920, lng: -100.2020, ta: '05:28', tb: '13:28', tc: '21:28' }
    ]
  },
  {
    id: 'R-4',
    name: 'Ruta 4: San Martín – Cantoral',
    municipality: 'Pesquería / Apodaca',
    color: '#8B5CF6',
    stops: [
      { id: 1, name: 'Av. Lucca y Plácido Domingo (Bodega Aurrera)', lat: 25.7890, lng: -100.0450, ta: '05:20', tb: '13:20', tc: '21:20' },
      { id: 2, name: 'Av. Lucca y Cuco Sánchez (OXXO)', lat: 25.7920, lng: -100.0480, ta: '05:22', tb: '13:22', tc: '21:22' },
      { id: 3, name: 'Av. Lucca y Cantautores Mexicanos (Parabús Parque Unión)', lat: 25.7950, lng: -100.0520, ta: '05:23', tb: '13:23', tc: '21:23' },
      { id: 4, name: 'Av. Lucca y Roma (Farmacias Similares)', lat: 25.7980, lng: -100.0560, ta: '05:24', tb: '13:24', tc: '21:24' },
      { id: 6, name: 'Av. Roma y Melfi (Préstamo Express)', lat: 25.8030, lng: -100.0610, ta: '05:27', tb: '13:27', tc: '21:27' },
      { id: 8, name: 'Av. Venecia y Roma (Parabús Escuela)', lat: 25.8080, lng: -100.0660, ta: '05:30', tb: '13:30', tc: '21:30' }
    ]
  },
  {
    id: 'R-5',
    name: 'Ruta 5: Colinas',
    municipality: 'Pesquería',
    color: '#EC4899',
    stops: [
      { id: 1, name: 'Paseo las Haciendas y Av. Hacienda Real (Caseta Ventas)', lat: 25.7720, lng: -100.0210, ta: '04:30', tb: '12:25', tc: '20:30' },
      { id: 3, name: 'Limonero y Granado (Plaza)', lat: 25.7780, lng: -100.0290, ta: '04:45', tb: '12:40', tc: '20:45' },
      { id: 5, name: 'Av. Central y Per. Centro (Farmacia Guadalajara)', lat: 25.7830, lng: -100.0350, ta: '04:48', tb: '12:43', tc: '20:48' },
      { id: 9, name: 'Av. Central (Parabús Merco)', lat: 25.7900, lng: -100.0420, ta: '04:57', tb: '12:52', tc: '20:57' },
      { id: 14, name: 'Blvd. Rogelio Pérez A. y Colinas de Sta Engracia (Bodega Aurrera)', lat: 25.7980, lng: -100.0510, ta: '05:10', tb: '13:05', tc: '21:10' }
    ]
  },
  {
    id: 'R-6',
    name: 'Ruta 6: Santa María',
    municipality: 'Pesquería',
    color: '#F59E0B',
    stops: [
      { id: 1, name: 'Av. San Francisco y Terra (OXXO frente a escuela)', lat: 25.7820, lng: -100.0120, ta: '04:50', tb: '12:50', tc: '20:50' },
      { id: 4, name: 'Av. San Fernando y C. Padua (OXXO Padua)', lat: 25.7880, lng: -100.0180, ta: '04:57', tb: '12:57', tc: '20:57' },
      { id: 7, name: 'Av. San Francisco y C. Amaretto (Aurrera Toscana)', lat: 25.7940, lng: -100.0240, ta: '05:04', tb: '13:04', tc: '21:04' },
      { id: 11, name: 'Av. San Francisco y C. Ponti (Parabús Mi Tienda)', lat: 25.8020, lng: -100.0310, ta: '05:12', tb: '13:12', tc: '21:12' }
    ]
  },
  {
    id: 'R-7',
    name: 'Ruta 7: La Fe',
    municipality: 'San Nicolás / Guadalupe / Apodaca',
    color: '#3B82F6',
    stops: [
      { id: 1, name: 'Campestre y Casa Blanca (Pizzas Deprizza)', lat: 25.7280, lng: -100.2250, ta: '04:30', tb: '12:30', tc: '20:30' },
      { id: 3, name: 'Av. Félix Galván (Walmart La Fe Parabús Lateral)', lat: 25.7320, lng: -100.2310, ta: '04:44', tb: '12:44', tc: '20:44' },
      { id: 4, name: 'Av. Acapulco y Av. Benito Juárez (Parabús Puente Peatonal)', lat: 25.7380, lng: -100.2380, ta: '04:52', tb: '12:52', tc: '20:52' },
      { id: 6, name: 'Av. Acapulco y Mixcoac (Parabús Merco sobre Acapulco)', lat: 25.7420, lng: -100.2430, ta: '05:01', tb: '13:01', tc: '21:01' },
      { id: 11, name: 'Julián Treviño y Baja California Nte (Siberlandia)', lat: 25.7520, lng: -100.2520, ta: '05:15', tb: '13:15', tc: '21:15' },
      { id: 13, name: 'Carr. Dulces Nombres y San Benito (OXXO)', lat: 25.7580, lng: -100.2580, ta: '05:24', tb: '13:24', tc: '21:24' }
    ]
  },
  {
    id: 'R-8',
    name: 'Ruta 8: Las Margaritas',
    municipality: 'Apodaca',
    color: '#14B8A6',
    stops: [
      { id: 1, name: 'Carretera a Huinalá y Orquídea (Parabús S-Mart)', lat: 25.7620, lng: -100.1550, ta: '04:35', tb: '12:35', tc: '20:35' },
      { id: 4, name: 'Av. Teléfonos y Calle San Juan (Centro Dental Montealbán)', lat: 25.7680, lng: -100.1620, ta: '04:47', tb: '12:47', tc: '20:47' },
      { id: 7, name: 'Rhodesia y Reforma (OXXO)', lat: 25.7740, lng: -100.1690, ta: '04:56', tb: '12:56', tc: '20:56' },
      { id: 9, name: 'Prol. Rhodesia y Villa de San Carlos (Farmacia GDL)', lat: 25.7790, lng: -100.1740, ta: '05:06', tb: '13:06', tc: '21:06' },
      { id: 13, name: 'Cam. a San Javier y Juárez Apodaca (Parabús B. Aurrera)', lat: 25.7880, lng: -100.1820, ta: '05:25', tb: '13:25', tc: '21:25' }
    ]
  },
  {
    id: 'R-9',
    name: 'Ruta 9: Metroplex',
    municipality: 'Apodaca',
    color: '#6366F1',
    stops: [
      { id: 1, name: 'E Sexta y N 23 (Michoacana)', lat: 25.7950, lng: -100.2620, ta: '04:30', tb: '12:30', tc: '20:30' },
      { id: 4, name: 'Av. Concordia y Cam. Real Sta Rosa (Farmacia GDL)', lat: 25.8020, lng: -100.2690, ta: '04:40', tb: '12:40', tc: '20:40' },
      { id: 6, name: 'Ant. Cam. a Huinalá y Av. de la Paz (Fte Farmacia GDL)', lat: 25.8110, lng: -100.2780, ta: '05:03', tb: '13:03', tc: '21:03' },
      { id: 9, name: 'Porfirio Díaz y Desierto del Sahara (OXXO)', lat: 25.8180, lng: -100.2850, ta: '05:19', tb: '13:19', tc: '21:19' }
    ]
  },
  {
    id: 'R-10',
    name: 'Ruta 10: Palmas y Santa Elena',
    municipality: 'General Zuazua / Apodaca',
    color: '#D97706',
    stops: [
      { id: 1, name: 'Blvd. Alcalá (Parabús OXXO Portal de Alcalá)', lat: 25.8850, lng: -100.1250, ta: '04:30', tb: '12:20', tc: '20:20' },
      { id: 2, name: 'Carr. Zuazua y Av. Guadalupe (Parabús Misión Sta Elena)', lat: 25.8890, lng: -100.1320, ta: '04:48', tb: '12:38', tc: '20:38' },
      { id: 3, name: 'Av. Santa Elena y Av. Tarragona (Bodega Aurrera)', lat: 25.8930, lng: -100.1380, ta: '04:58', tb: '12:48', tc: '20:48' },
      { id: 6, name: 'Av. Santa Elena y Av. del Lago (Bodega Aurrera)', lat: 25.8990, lng: -100.1450, ta: '05:03', tb: '12:53', tc: '20:53' },
      { id: 9, name: 'Carretera Zuazua (Parabús Mirador de Apodaca)', lat: 25.9050, lng: -100.1520, ta: '05:09', tb: '12:59', tc: '20:59' }
    ]
  },
  {
    id: 'R-11',
    name: 'Ruta 11: Valle del Roble',
    municipality: 'Cadereyta / Juárez',
    color: '#059669',
    stops: [
      { id: 1, name: 'Av. del Valle y Av. del Roble (Frente a Bodega)', lat: 25.6120, lng: -99.9850, ta: '04:21', tb: '12:21', tc: '20:21' },
      { id: 7, name: 'Carr. Reynosa y San Antonio (Parada Ruta 150)', lat: 25.6210, lng: -99.9920, ta: '04:34', tb: '12:34', tc: '20:34' },
      { id: 10, name: 'Carr. Reynosa (Bodega Aurrera Fte Colinas de la Morena)', lat: 25.6280, lng: -100.0010, ta: '04:43', tb: '12:43', tc: '20:43' },
      { id: 11, name: 'Av. Teófilo Salinas y Arturo B. de la Garza (Parada Teófilo)', lat: 25.6340, lng: -100.0080, ta: '04:45', tb: '12:45', tc: '20:45' },
      { id: 16, name: 'Av. Paseo de San Juan y Av. Teófilo Salinas (Farmacia GDL)', lat: 25.6420, lng: -100.0160, ta: '05:10', tb: '13:10', tc: '21:10' }
    ]
  },
  {
    id: 'R-12',
    name: 'Ruta 12: Guadalupe',
    municipality: 'Guadalupe',
    color: '#DC2626',
    stops: [
      { id: 1, name: '20 de Noviembre y Circunvalación Norte (Centro Cuidado Animal)', lat: 25.6850, lng: -100.2450, ta: '04:40', tb: '12:35', tc: '20:40' },
      { id: 4, name: 'Av. Guadalajara y Torre de Pisa (Casa de Préstamos Prestar)', lat: 25.6920, lng: -100.2520, ta: '04:54', tb: '12:49', tc: '20:54' },
      { id: 6, name: 'Av. Guadalajara y Hermosillo (Bodega Aurrera Express)', lat: 25.6980, lng: -100.2580, ta: '04:59', tb: '12:54', tc: '20:59' },
      { id: 9, name: 'Av. Héctor Caballero y El Arenal (Michoacana)', lat: 25.7050, lng: -100.2650, ta: '05:06', tb: '13:01', tc: '21:06' },
      { id: 12, name: 'Av. Miguel Alemán y Apodaca Huinalá (Parabús Casino Vivento)', lat: 25.7120, lng: -100.2720, ta: '05:20', tb: '13:15', tc: '21:20' }
    ]
  },
  {
    id: 'R-13',
    name: 'Ruta 13: Cadereyta',
    municipality: 'Cadereyta Jiménez',
    color: '#7C3AED',
    stops: [
      { id: 1, name: 'Del Sabino y Olivos (Kiosko frente a Sumerca)', lat: 25.5920, lng: -99.9810, ta: '04:20', tb: '12:15', tc: '20:20' },
      { id: 3, name: 'Cam. Ejidal y Av. Río Bello (Pollos Asados)', lat: 25.5960, lng: -99.9860, ta: '04:25', tb: '12:20', tc: '20:25' },
      { id: 7, name: 'Álvaro Obregón y Lázaro Cárdenas (Hosp PEMEX fte OXXO)', lat: 25.6020, lng: -99.9920, ta: '04:36', tb: '12:31', tc: '20:36' },
      { id: 10, name: 'Av. Morelos (Carnicería La Popular)', lat: 25.6080, lng: -99.9980, ta: '04:45', tb: '12:40', tc: '20:45' },
      { id: 11, name: 'Av. Morelos y Cuauhtémoc (Sumerca)', lat: 25.6120, lng: -100.0030, ta: '04:48', tb: '12:43', tc: '20:48' }
    ]
  },
  {
    id: 'R-14',
    name: 'Ruta 14: Santa Mónica',
    municipality: 'Juárez / Guadalupe',
    color: '#2563EB',
    stops: [
      { id: 1, name: 'Cam. a las Espinas y C. San Jacinto (Mercadia)', lat: 25.6620, lng: -100.1210, ta: '04:30', tb: '12:30', tc: '20:30' },
      { id: 4, name: 'Av. Acueducto y Priv. Santa Isabel (7 Eleven)', lat: 25.6690, lng: -100.1280, ta: '04:35', tb: '12:35', tc: '20:35' },
      { id: 7, name: 'Av. Eloy Cavazos y Av. Sierra Vista (Parabús Bodega)', lat: 25.6750, lng: -100.1350, ta: '04:45', tb: '12:45', tc: '20:45' },
      { id: 9, name: 'Av. Héctor Caballero y C. Margarita (Bodega Aurrera)', lat: 25.6820, lng: -100.1420, ta: '04:54', tb: '12:54', tc: '20:54' },
      { id: 12, name: 'Av. las Torres y C. Bertha Pérez (OXXO)', lat: 25.6890, lng: -100.1490, ta: '05:01', tb: '13:01', tc: '21:01' }
    ]
  },
  {
    id: 'R-15',
    name: 'Ruta 15: San Nicolás Santa Rosa',
    municipality: 'San Nicolás / Apodaca',
    color: '#0284C7',
    stops: [
      { id: 1, name: 'Del Girasol y Fresnos (Frente TKT Six)', lat: 25.7520, lng: -100.2850, ta: '04:20', tb: '12:20', tc: '20:20' },
      { id: 5, name: 'Av. Guatemala y Hda. San Carlos (OXXO)', lat: 25.7590, lng: -100.2920, ta: '04:37', tb: '12:37', tc: '20:37' },
      { id: 8, name: 'Av. Concordia y C. O Primera (Frente Farmacia GDL)', lat: 25.7660, lng: -100.2990, ta: '04:45', tb: '12:45', tc: '20:45' },
      { id: 11, name: 'Av. Estelaris y Av. E-Sexta (Frente OXXO)', lat: 25.7730, lng: -100.3060, ta: '04:52', tb: '12:52', tc: '20:52' },
      { id: 15, name: 'Real Santa Rosa y C. Halcón (Sumerca)', lat: 25.7810, lng: -100.3140, ta: '05:10', tb: '13:10', tc: '21:10' }
    ]
  }
];
