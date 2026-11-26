/**
 * Servicio del catálogo: todas las llamadas a la API de categorías y productos.
 *
 * Por ahora apunta a DummyJSON (https://dummyjson.com) como API de prueba.
 * Para cambiar a la API definitiva:
 *   1. Define EXPO_PUBLIC_API_URL en .env.local
 *   2. Ajusta RUTAS a los endpoints de tu API
 *   3. Ajusta los mapeadores a los nombres de campo de tu JSON
 */

import { apiFetch } from '@/api/client';

// ---------------------------------------------------------------------------
// Tipos que usa la app (independientes del formato de la API)
// ---------------------------------------------------------------------------

export type Categoria = {
  id: string;
  nombre: string;
  icono: string;
  color: string;
  /** Opcional: solo se muestra si la API lo envía. */
  totalProductos?: number;
};

export type Producto = {
  id: string;
  categoriaId: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
};

// ---------------------------------------------------------------------------
// Endpoints
// ---------------------------------------------------------------------------

const CAMPOS_PRODUCTO = 'title,description,price,thumbnail,category';

const RUTAS = {
  categorias: '/products/categories',
  productosDeCategoria: (id: string) =>
    `/products/category/${encodeURIComponent(id)}?limit=0&select=${CAMPOS_PRODUCTO}`,
};

// ---------------------------------------------------------------------------
// Formato de DummyJSON
// ---------------------------------------------------------------------------

type CategoriaApi = { slug: string; name: string; url: string };

type ProductoApi = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
  category: string;
};

type RespuestaProductosApi = {
  products: ProductoApi[];
  total: number;
  skip: number;
  limit: number;
};

// ---------------------------------------------------------------------------
// Mapeadores: convierten el JSON de la API al formato que usa la app.
// ---------------------------------------------------------------------------

/** DummyJSON no envía íconos: se asignan por slug. */
const ICONOS: Record<string, string> = {
  beauty: '💄',
  fragrances: '🌸',
  furniture: '🛋️',
  groceries: '🛒',
  'home-decoration': '🖼️',
  'kitchen-accessories': '🍳',
  laptops: '💻',
  'mens-shirts': '👔',
  'mens-shoes': '👞',
  'mens-watches': '⌚',
  'mobile-accessories': '🎧',
  motorcycle: '🏍️',
  'skin-care': '🧴',
  smartphones: '📱',
  'sports-accessories': '⚽',
  sunglasses: '🕶️',
  tablets: '📲',
  tops: '👕',
  vehicle: '🚗',
  'womens-bags': '👜',
  'womens-dresses': '👗',
  'womens-jewellery': '💍',
  'womens-shoes': '👠',
  'womens-watches': '⌚',
};

const COLORES = ['#3b82f6', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

/** Elige siempre el mismo color para el mismo slug. */
function colorPara(slug: string) {
  let hash = 0;
  for (const letra of slug) hash = (hash * 31 + letra.charCodeAt(0)) >>> 0;
  return COLORES[hash % COLORES.length];
}

function mapearCategoria(json: CategoriaApi): Categoria {
  return {
    id: json.slug,
    nombre: json.name,
    icono: ICONOS[json.slug] ?? '📦',
    color: colorPara(json.slug),
  };
}

function mapearProducto(json: ProductoApi): Producto {
  return {
    id: String(json.id),
    categoriaId: json.category,
    nombre: json.title,
    descripcion: json.description ?? '',
    precio: Number(json.price),
    imagen: json.thumbnail,
  };
}

// ---------------------------------------------------------------------------
// Funciones públicas
// ---------------------------------------------------------------------------

export async function getCategorias(signal?: AbortSignal): Promise<Categoria[]> {
  const json = await apiFetch<CategoriaApi[]>(RUTAS.categorias, { signal });
  return json.map(mapearCategoria);
}

/** DummyJSON no tiene endpoint para una sola categoría: se busca en la lista. */
export async function getCategoria(id: string, signal?: AbortSignal): Promise<Categoria | null> {
  const categorias = await getCategorias(signal);
  return categorias.find((c) => c.id === id) ?? null;
}

export async function getProductosPorCategoria(
  categoriaId: string,
  signal?: AbortSignal,
): Promise<Producto[]> {
  const json = await apiFetch<RespuestaProductosApi>(RUTAS.productosDeCategoria(categoriaId), {
    signal,
  });
  return json.products.map(mapearProducto);
}
