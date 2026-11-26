const categorias = [
  { id: 'computadoras', nombre: 'Computadoras', icono: '💻', color: '#2563eb' },
  { id: 'celulares', nombre: 'Celulares', icono: '📱', color: '#7c3aed' },
  { id: 'muebles', nombre: 'Muebles', icono: '🛋️', color: '#b45309' },
  { id: 'cocina', nombre: 'Cocina', icono: '🍳', color: '#be185d' },
  { id: 'deportes', nombre: 'Deportes', icono: '🏀', color: '#047857' },
  { id: 'despensa', nombre: 'Despensa', icono: '🛒', color: '#0e7490' },
];

const CDN_IMAGENES = 'https://cdn.dummyjson.com/product-images';

// Los precios del catálogo son de ejemplo y están expresados en MXN.
const productos = [
  {
    id: 'macbook-pro-14',
    categoriaId: 'computadoras',
    nombre: 'MacBook Pro de 14 pulgadas',
    descripcion: 'Laptop de aluminio con pantalla de 14 pulgadas para edición y desarrollo.',
    precio: 32999,
    imagen: `${CDN_IMAGENES}/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp`,
  },
  {
    id: 'asus-zenbook-pro',
    categoriaId: 'computadoras',
    nombre: 'ASUS Zenbook Pro Duo',
    descripcion: 'Laptop con pantalla secundaria para trabajar con varias herramientas a la vez.',
    precio: 28499,
    imagen: `${CDN_IMAGENES}/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp`,
  },
  {
    id: 'lenovo-yoga-920',
    categoriaId: 'computadoras',
    nombre: 'Lenovo Yoga 920',
    descripcion: 'Laptop convertible con pantalla táctil y bisagra de 360 grados.',
    precio: 14499,
    imagen: `${CDN_IMAGENES}/laptops/lenovo-yoga-920/thumbnail.webp`,
  },
  {
    id: 'iphone-13-pro',
    categoriaId: 'celulares',
    nombre: 'iPhone 13 Pro',
    descripcion: 'Teléfono de 6.1 pulgadas con tres cámaras traseras.',
    precio: 12499,
    imagen: `${CDN_IMAGENES}/smartphones/iphone-13-pro/thumbnail.webp`,
  },
  {
    id: 'iphone-x',
    categoriaId: 'celulares',
    nombre: 'iPhone X',
    descripcion: 'Teléfono de 5.8 pulgadas con pantalla OLED y reconocimiento facial.',
    precio: 5499,
    imagen: `${CDN_IMAGENES}/smartphones/iphone-x/thumbnail.webp`,
  },
  {
    id: 'oppo-a57',
    categoriaId: 'celulares',
    nombre: 'OPPO A57',
    descripcion: 'Teléfono Android para llamadas, mensajería y uso diario.',
    precio: 2999,
    imagen: `${CDN_IMAGENES}/smartphones/oppo-a57/thumbnail.webp`,
  },
  {
    id: 'sofa-colombo',
    categoriaId: 'muebles',
    nombre: 'Sofá Colombo',
    descripcion: 'Sofá tapizado de líneas rectas con cojines amplios para la sala.',
    precio: 16999,
    imagen: `${CDN_IMAGENES}/furniture/annibale-colombo-sofa/thumbnail.webp`,
  },
  {
    id: 'mesa-de-noche',
    categoriaId: 'muebles',
    nombre: 'Mesa de noche',
    descripcion: 'Mesa auxiliar de madera color cerezo con espacio para guardar objetos.',
    precio: 2099,
    imagen: `${CDN_IMAGENES}/furniture/bedside-table-african-cherry/thumbnail.webp`,
  },
  {
    id: 'silla-saarinen',
    categoriaId: 'muebles',
    nombre: 'Silla ejecutiva Saarinen',
    descripcion: 'Silla tapizada con respaldo curvo para un escritorio o sala de juntas.',
    precio: 5899,
    imagen: `${CDN_IMAGENES}/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp`,
  },
  {
    id: 'espatula-bambu',
    categoriaId: 'cocina',
    nombre: 'Espátula de bambú',
    descripcion: 'Utensilio para mezclar y voltear alimentos en sartenes antiadherentes.',
    precio: 79.9,
    imagen: `${CDN_IMAGENES}/kitchen-accessories/bamboo-spatula/thumbnail.webp`,
  },
  {
    id: 'wok-acero',
    categoriaId: 'cocina',
    nombre: 'Wok de acero al carbono',
    descripcion: 'Sartén hondo para saltear verduras, carnes y fideos.',
    precio: 649,
    imagen: `${CDN_IMAGENES}/kitchen-accessories/carbon-steel-wok/thumbnail.webp`,
  },
  {
    id: 'tabla-de-cortar',
    categoriaId: 'cocina',
    nombre: 'Tabla de cortar',
    descripcion: 'Tabla de madera para preparar ingredientes y servir alimentos.',
    precio: 219,
    imagen: `${CDN_IMAGENES}/kitchen-accessories/chopping-board/thumbnail.webp`,
  },
  {
    id: 'balon-americano',
    categoriaId: 'deportes',
    nombre: 'Balón de fútbol americano',
    descripcion: 'Balón con cordones y textura rugosa para entrenar pases.',
    precio: 389,
    imagen: `${CDN_IMAGENES}/sports-accessories/american-football/thumbnail.webp`,
  },
  {
    id: 'guante-beisbol',
    categoriaId: 'deportes',
    nombre: 'Guante de béisbol',
    descripcion: 'Guante con bolsillo profundo para practicar recepciones.',
    precio: 749,
    imagen: `${CDN_IMAGENES}/sports-accessories/baseball-glove/thumbnail.webp`,
  },
  {
    id: 'balon-basquetbol',
    categoriaId: 'deportes',
    nombre: 'Balón de básquetbol',
    descripcion: 'Balón con superficie texturizada para entrenar en cancha.',
    precio: 449,
    imagen: `${CDN_IMAGENES}/sports-accessories/basketball/thumbnail.webp`,
  },
  {
    id: 'manzana',
    categoriaId: 'despensa',
    nombre: 'Manzana roja',
    descripcion: 'Manzana fresca de pulpa firme. Precio por pieza.',
    precio: 12.5,
    imagen: `${CDN_IMAGENES}/groceries/apple/thumbnail.webp`,
  },
  {
    id: 'aceite-cocina',
    categoriaId: 'despensa',
    nombre: 'Aceite de cocina',
    descripcion: 'Aceite vegetal para cocinar y preparar aderezos.',
    precio: 49.9,
    imagen: `${CDN_IMAGENES}/groceries/cooking-oil/thumbnail.webp`,
  },
  {
    id: 'pepino',
    categoriaId: 'despensa',
    nombre: 'Pepino fresco',
    descripcion: 'Pepino para ensaladas y botanas. Precio por pieza.',
    precio: 15,
    imagen: `${CDN_IMAGENES}/groceries/cucumber/thumbnail.webp`,
  },
];

const productosPorCategoria = new Map(
  categorias.map(({ id }) => [id, productos.filter((producto) => producto.categoriaId === id)]),
);

export const categoriasConTotales = categorias.map((categoria) => ({
  ...categoria,
  totalProductos: productosPorCategoria.get(categoria.id).length,
}));

export function consultarCategoria(id) {
  const categoria = categoriasConTotales.find((elemento) => elemento.id === id);
  return categoria ? { categoria, productos: productosPorCategoria.get(id) } : null;
}
