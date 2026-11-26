import { ApiError, apiFetch } from '@/api/client';

export type Categoria = {
  id: string;
  nombre: string;
  icono: string;
  color: string;
  totalProductos: number;
};

export type Producto = {
  id: string;
  categoriaId: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
};

type CategoriaConProductos = {
  categoria: Categoria;
  productos: Producto[];
};

export function getCategorias(signal?: AbortSignal): Promise<Categoria[]> {
  return apiFetch<Categoria[]>('/api/categorias', { signal });
}

export async function getProductosPorCategoria(
  categoriaId: string,
  signal?: AbortSignal,
): Promise<CategoriaConProductos | null> {
  try {
    return await apiFetch<CategoriaConProductos>(
      `/api/categorias/${encodeURIComponent(categoriaId)}/productos`,
      { signal },
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
