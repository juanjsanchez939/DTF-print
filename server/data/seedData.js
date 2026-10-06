// Datos iniciales (placeholder) del catálogo DTF Print.
// Se usan tanto para el seed de MongoDB como para el modo "en memoria".

export const seedCategories = [
  { name: 'Cerámica', slug: 'ceramica', order: 1 },
  { name: 'Plastico', slug: 'plastico', order: 2 },
  { name: 'Carton', slug: 'carton', order: 3 },
  { name: 'Insumos', slug: 'insumos', order: 4 },
  { name: 'Madera', slug: 'madera', order: 5 },
  { name: 'Polimero', slug: 'polimero', order: 6 },
  { name: 'Papel', slug: 'papel', order: 7 },
  { name: 'Textil', slug: 'textil', order: 8 },
  { name: 'Otras categorias', slug: 'otras-categorias', order: 9 },
  { name: 'Insumos para DTF', slug: 'insumos-para-dtf', order: 10 },
  { name: 'Lata', slug: 'lata', order: 11 },
];

export const seedProducts = [
  { id: '01', name: 'Riñonera', price: 9300, category: 'Otras categorias', image: '/products/01.webp', stock: 18, description: 'Riñonera práctica y resistente, ideal para el día a día.' },
  { id: '02', name: 'Estuche crsital celeste', price: 3800, category: 'Plastico', image: '/products/02.webp', stock: 12, description: 'Estuche rígido celeste con cierre, para lentes o accesorios.' },
  { id: '03', name: 'Gorra trucker', price: 3800, category: 'Textil', image: '/products/03.webp', stock: 25, description: 'Gorra trucker con malla trasera, sublimable a todo color.' },
  { id: '04', name: 'Camiseta argentina de microfibra', price: 5000, category: 'Textil', image: '/products/04.webp', stock: 20, description: 'Camiseta deportiva de microfibra, liviana y transpirable.' },
  { id: '05', name: 'Portacosmetico grande', price: 6500, category: 'Otras categorias', image: '/products/05.webp', stock: 9, description: 'Portacosmético amplio para viajes o uso diario.' },
  { id: '06', name: 'Kit jardin chico', price: 3600, category: 'Otras categorias', image: '/products/06.webp', stock: 14, description: 'Kit de herramientas de jardín, compacto y resistente.' },
  { id: '07', name: 'Morral jardin tela grande', price: 3700, category: 'Otras categorias', image: '/products/07.webp', stock: 11, description: 'Morral de tela grande, ideal para cargar todo.' },
  { id: '08', name: 'Remera spum natural niño', price: 4800, category: 'Textil', image: '/products/08.webp', stock: 30, description: 'Remera de algodón suave para niños.' },
  { id: '09', name: 'Funda para tabala de asado con manija', price: 4800, category: 'Otras categorias', image: '/products/09.webp', stock: 8, description: 'Funda protectora para tabla de asado con manija.' },
  { id: '10', name: 'Cartera cordura', price: 6100, category: 'Otras categorias', image: '/products/10.webp', stock: 16, description: 'Cartera de cordura resistente con cierre.' },
  { id: '11', name: 'Canilleras niño', price: 6000, category: 'Otras categorias', image: '/products/11.webp', stock: 22, description: 'Canilleras deportivas para niños.' },
  { id: '12', name: 'Canilleras adulto', price: 8200, category: 'Otras categorias', image: '/products/12.webp', stock: 19, description: 'Canilleras deportivas para adultos.' },
  { id: '13', name: 'Posa vaso goma tela', price: 300, category: 'Cerámica', image: '/products/13.webp', stock: 40, description: 'Posavasos de goma y tela, personalizable.' },
  { id: '14', name: 'Funda celular con cierre', price: 1500, category: 'Otras categorias', image: '/products/14.webp', stock: 26, description: 'Funda para celular con cierre, protección total.' },
  { id: '15', name: 'Mochila infantil holográfica', price: 8500, category: 'Textil', image: '/products/15.webp', stock: 13, description: 'Mochila infantil con acabado holográfico.' },
  { id: '16', name: 'Billetera de hombre', price: 3300, category: 'Otras categorias', image: '/products/16.webp', stock: 21, description: 'Billetera con múltiples compartimentos y acabado resistente.' },
  { id: '17', name: 'Azucarera y Yerbera de neopren', price: 5000, category: 'Cerámica', image: '/products/17.webp', stock: 10, description: 'Set azucarera y yerbera de neopren, aislante.' },
  { id: '18', name: 'Servilleta tropical grande', price: 500, category: 'Textil', image: '/products/18.webp', stock: 35, description: 'Servilleta de tela grande con estampado tropical.' },
  { id: '19', name: 'Servilleta tropical blanco', price: 400, category: 'Textil', image: '/products/19.webp', stock: 32, description: 'Servilleta de tela blanca, clásica y versátil.' },
  { id: '20', name: 'Remera algodón negro niño', price: 4800, category: 'Textil', image: '/products/20.webp', stock: 28, description: 'Remera de algodón negro para niños.' },
  { id: '21', name: 'Remera algodón negro adulto', price: 6000, category: 'Textil', image: '/products/21.webp', stock: 24, description: 'Remera de algodón negro para adultos.' },
  { id: '22', name: 'Tela termoadhesiva 30x69', price: 2200, category: 'Insumos para DTF', image: '/products/22.webp', stock: 50, description: 'Tela termoadhesiva para DTF, 30x69 cm.' },
  { id: '23', name: 'Set de bebe', price: 7000, category: 'Textil', image: '/products/23.webp', stock: 7, description: 'Set completo para bebé, suave y delicado.' },
  { id: '24', name: 'Riñonera cuadrada o circular', price: 3800, category: 'Otras categorias', image: '/products/24.webp', stock: 15, description: 'Riñonera versátil, cuadrada o circular.' },
];
