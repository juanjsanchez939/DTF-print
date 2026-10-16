// Datos iniciales del catálogo DTF Print.
// Se usan tanto para el seed de MongoDB como para el modo "en memoria".
// Fuente de productos e imágenes: sistema continuo (sublimables).
// Los precios son PLACEHOLDER: la tienda de origen no publica precios.

export const seedCategories = [
  { name: 'Cerámica', slug: 'ceramica', order: 1 },
  { name: 'Polimero', slug: 'polimero', order: 2 },
  { name: 'Carton', slug: 'carton', order: 3 },
  { name: 'Madera', slug: 'madera', order: 4 },
  { name: 'Textil', slug: 'textil', order: 5 },
];

export const seedProducts = [
  { id: '01', name: 'Bandeja A3 de madera y cristal', price: 12000, category: 'Madera', image: '/products/01.webp', stock: 12, description: 'Bandeja sublimable de madera brillante, tamaño A3 (29 × 42,8 cm), desarmable. Sublimación: 200°C por 60 s. Se entrega por unidad en bolsa.' },
  { id: '02', name: 'Vaso de café térmico 200 cc', price: 9500, category: 'Polimero', image: '/products/02.webp', stock: 20, description: 'Vaso térmico de doble pared con tapa, 200 cc. Superficie blanca brillante lista para sublimar. Estampado: 180°C, 180 s.' },
  { id: '03', name: 'Caja para vino de madera y cristal 40 × 9,5 cm', price: 11000, category: 'Madera', image: '/products/03.webp', stock: 10, description: 'Caja de madera brillante sublimable para botellas de vino. Sublimación: 200°C. Presentación por unidad en bolsa.' },
  { id: '04', name: 'Caja de cartón sublimable para tazas con ventana', price: 3200, category: 'Carton', image: '/products/04.webp', stock: 40, description: 'Caja de cartón blanco 10 × 10 × 10 cm con ventana transparente, ideal para tazas sublimadas. Estampado: 180°C, 40 s.' },
  { id: '05', name: 'Jarro térmico con tapa 450 cc', price: 10500, category: 'Polimero', image: '/products/05.webp', stock: 15, description: 'Jarro de polímero blanco brillante de 450 cc con tapa. Retiene 4 veces más temperatura que la cerámica. Sublimación: 180°C, 180 s.' },
  { id: '06', name: 'Mate de polímero blanco 300 cc', price: 8500, category: 'Polimero', image: '/products/06.webp', stock: 18, description: 'Mate de polímero blanco de 300 cc con tapa a rosca y correa. Resistente a golpes y lavaplatos. Sublimación: 180°C, 180 s.' },
  { id: '07', name: 'Taza de polímero recta blanca 350 cc', price: 6500, category: 'Polimero', image: '/products/07.webp', stock: 35, description: 'Taza recta de polímero blanco de alta calidad, 350 cc, con acabado fotográfico. Sublimación: 180°C, 180 s.' },
  { id: '08', name: 'Chop de polímero 650 cc', price: 9000, category: 'Polimero', image: '/products/08.webp', stock: 22, description: 'Chop cilíndrico de polímero blanco de 650 cc (17 cm de alto). Imágenes fijadas químicamente, resisten rayaduras y lavaplatos.' },
  { id: '09', name: 'Vaso o lapicero de polímero 450 cc', price: 7000, category: 'Polimero', image: '/products/09.webp', stock: 24, description: 'Vaso de polímero blanco de 450 cc con superficie lisa para transferencias de alta definición. Sublimación: 180°C, 180 s.' },
  { id: '10', name: 'Posavasos de cartón blanco (pack 60)', price: 15000, category: 'Carton', image: '/products/10.webp', stock: 8, description: 'Pack de 60 posavasos redondos (10 planchas × 6) de cartón blanco brillante, 9 cm de diámetro. Sublimación: 180°C, 60 s.' },
  { id: '11', name: 'Termo Hoppy de polímero 500 cc', price: 12000, category: 'Polimero', image: '/products/11.webp', stock: 14, description: 'Termo de doble capa de 500 cc (23 cm). Acabado brillante, resistencia a golpes y lavavajillas. Sublimación: 180°C, 180 s.' },
  { id: '12', name: 'Cantimplora de polímero con bombilla 400 cc', price: 9500, category: 'Polimero', image: '/products/12.webp', stock: 16, description: 'Cantimplora de polímero de 400 cc con bombilla y tapa intercambiable. Sublimación: 180°C, 160 s.' },
  { id: '13', name: 'Rompecabezas de cartón 8 piezas', price: 5500, category: 'Carton', image: '/products/13.webp', stock: 26, description: 'Rompecabezas de cartón blanco brillante de 8 piezas (15 × 21 cm), sin marco. Sublimación: 180-190°C, 60 s.' },
  { id: '14', name: 'Cazuelita sublimable de polímero', price: 4500, category: 'Polimero', image: '/products/14.webp', stock: 30, description: 'Cazuelita de polímero sublimable de 8,2 × 4,2 cm. Ideal para souvenirs y detalles personalizados.' },
  { id: '15', name: 'Porta celular de madera y cristal (pack x5)', price: 12000, category: 'Madera', image: '/products/15.webp', stock: 9, description: 'Soporte de madera brillante desarmable, 7,4 × 16 cm. Pack de 5 unidades. Sublimación: 200°C, 60 s.' },
  { id: '16', name: 'Taza apilable de polímero SubliPol 325 cc', price: 6800, category: 'Polimero', image: '/products/16.webp', stock: 28, description: 'Taza blanca de polímero de 325 cc, apilable para ahorrar espacio. Colores nítidos con calidad fotográfica. Sublimación: 180°C, 180 s.' },
  { id: '17', name: 'Caja de cartón sublimable para tazas', price: 3000, category: 'Carton', image: '/products/17.webp', stock: 42, description: 'Caja blanca de cartón de 10 × 10 × 10 cm para sublimar y personalizar tazas. Sublimación: 180-190°C, 60 s.' },
  { id: '18', name: 'Taza importada de cerámica blanca 11 oz', price: 8500, category: 'Cerámica', image: '/products/18.webp', stock: 20, description: 'Taza de cerámica blanca importada de 11 oz con coating resistente y paredes rectas. Sublimación: 190°C, 190 s.' },
  { id: '19', name: 'Cartón sublimable A4', price: 2500, category: 'Carton', image: '/products/19.webp', stock: 50, description: 'Cartón blanco sublimable en formato A4 (21 × 29,7 cm) para transferencias térmicas. Sublimación: 180-190°C, 60 s.' },
  { id: '20', name: 'Rompecabezas de cartón forma corazón (x10)', price: 9500, category: 'Carton', image: '/products/20.webp', stock: 12, description: 'Pack de 10 rompecabezas de cartón blanco brillante en forma de corazón (20 × 14 cm). Sublimación: 180-190°C, 60 s.' },
  { id: '21', name: 'Gorra trucker sublimable adulto', price: 7500, category: 'Textil', image: '/products/21.webp', stock: 30, description: 'Gorra trucker corte new lista para sublimar, disponible en 23 colores. Superficie amplia y plana para diseños full color.' },
  { id: '22', name: 'Gorra trucker adulto', price: 7000, category: 'Textil', image: '/products/22.webp', stock: 32, description: 'Gorra trucker sublimable con amplia zona de impresión en frente y laterales. Disponible en 30 colores base.' },
  { id: '23', name: 'Gorra vintage 100% algodón', price: 8000, category: 'Textil', image: '/products/23.webp', stock: 25, description: 'Gorra de corte vintage en algodón puro, apta para sublimación. Disponible en 31 colores.' },
  { id: '24', name: 'Tapa para cazuelita sublimable', price: 3000, category: 'Polimero', image: '/products/24.webp', stock: 34, description: 'Tapa de polímero sublimable para cazuelitas. Personalización full color por transferencia térmica.' },
];
