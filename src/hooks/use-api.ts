import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

type Estado<T> = {
  datos: T | undefined;
  error: string | null;
  /** Para qué dependencias se obtuvieron los datos (null = hay que volver a cargar). */
  clave: string | null;
  recargando: boolean;
};

/**
 * Ejecuta una función asíncrona (normalmente una llamada a la API) y expone
 * sus estados: datos, cargando, error. También permite recargar (pull-to-refresh).
 *
 * Ejemplo:
 *   const { datos, cargando, error, recargar } = useApi((signal) => getCategorias(signal), []);
 */
export function useApi<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  dependencias: readonly unknown[],
) {
  const clave = JSON.stringify(dependencias);
  const [estado, setEstado] = useState<Estado<T>>({
    datos: undefined,
    error: null,
    clave: null,
    recargando: false,
  });

  // Guarda siempre la versión más reciente de fn para usarla en recargar().
  const fnRef = useRef(fn);
  useLayoutEffect(() => {
    fnRef.current = fn;
  });
  const controllerRef = useRef<AbortController | null>(null);

  const cargar = useCallback(async (claveActual: string) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const datos = await fnRef.current(controller.signal);
      if (controller.signal.aborted) return;
      setEstado({ datos, error: null, clave: claveActual, recargando: false });
    } catch (e) {
      if (controller.signal.aborted) return;
      const mensaje = e instanceof Error ? e.message : 'Ocurrió un error inesperado.';
      setEstado((prev) => ({ ...prev, error: mensaje, clave: claveActual, recargando: false }));
    }
  }, []);

  // Carga los datos al montar la pantalla y cada vez que cambian las dependencias.
  useEffect(() => {
    cargar(clave);
    return () => controllerRef.current?.abort();
  }, [clave, cargar]);

  // Mientras los datos no correspondan a las dependencias actuales, está cargando.
  const cargando = estado.clave !== clave;

  return {
    datos: estado.datos,
    error: cargando ? null : estado.error,
    cargando,
    recargando: estado.recargando,
    /** Vuelve a pedir los datos mostrando el indicador de "jalar para recargar". */
    recargar: () => {
      setEstado((prev) => ({ ...prev, recargando: true }));
      cargar(clave);
    },
    /** Vuelve a intentar después de un error, mostrando la pantalla de carga. */
    reintentar: () => {
      setEstado((prev) => ({ ...prev, error: null, clave: null }));
      cargar(clave);
    },
  };
}
