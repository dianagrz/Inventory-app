/**
 * Cliente HTTP genérico para la API REST.
 *
 * La URL base se lee de la variable de entorno EXPO_PUBLIC_API_URL
 * (definida en .env.local).
 */

const API_URL = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/+$/, '');

const TIMEOUT_MS = 10_000;

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type Opciones = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

export async function apiFetch<T>(ruta: string, opciones: Opciones = {}): Promise<T> {
  if (!API_URL) {
    throw new ApiError('Configura EXPO_PUBLIC_API_URL en .env.local para conectar con el servidor.');
  }

  const { body, headers, signal, ...resto } = opciones;

  // Cancela la petición si tarda demasiado o si quien llama la aborta.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const cancelar = () => controller.abort();
  if (signal?.aborted) cancelar();
  signal?.addEventListener('abort', cancelar, { once: true });

  try {
    const respuesta = await fetch(`${API_URL}${ruta}`, {
      ...resto,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined && { 'Content-Type': 'application/json' }),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!respuesta.ok) {
      throw new ApiError(`Error del servidor (${respuesta.status})`, respuesta.status);
    }

    if (respuesta.status === 204) {
      return undefined as T;
    }

    return (await respuesta.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (controller.signal.aborted && !signal?.aborted) {
      throw new ApiError('La solicitud tardó demasiado. Revisa tu conexión.');
    }
    if (signal?.aborted) throw error;
    throw new ApiError('No se pudo conectar con el servidor.');
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', cancelar);
  }
}
