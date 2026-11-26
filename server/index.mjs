import { createServer } from 'node:http';

import { categoriasConTotales, consultarCategoria } from './catalogo.mjs';

const METODOS = 'GET, HEAD, OPTIONS';
const RUTA_PRODUCTOS = /^\/api\/categorias\/([^/]+)\/productos$/;
const ID_CATEGORIA = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function responderJson(respuesta, metodo, estado, datos) {
  const json = JSON.stringify(datos);
  respuesta.writeHead(estado, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(json),
  });
  respuesta.end(metodo === 'HEAD' ? undefined : json);
}

const servidor = createServer((solicitud, respuesta) => {
  const { method: metodo, url } = solicitud;
  respuesta.setHeader('Access-Control-Allow-Origin', '*');
  respuesta.setHeader('Cache-Control', 'no-store');

  // Solo interesa la ruta. Los parámetros de consulta se ignoran.
  const ruta = url.split('?')[0].replace(/\/$/, '');
  const rutaProductos = ruta.match(RUTA_PRODUCTOS);

  if (ruta !== '/api/salud' && ruta !== '/api/categorias' && !rutaProductos) {
    return responderJson(respuesta, metodo, 404, { error: 'La ruta no existe.' });
  }

  if (metodo === 'OPTIONS') {
    respuesta.writeHead(204, {
      Allow: METODOS,
      'Access-Control-Allow-Methods': METODOS,
      'Access-Control-Allow-Headers': 'Accept, Content-Type',
    });
    return respuesta.end();
  }

  if (metodo !== 'GET' && metodo !== 'HEAD') {
    respuesta.setHeader('Allow', METODOS);
    return responderJson(respuesta, metodo, 405, { error: 'Método no permitido.' });
  }

  if (ruta === '/api/salud') {
    return responderJson(respuesta, metodo, 200, { estado: 'ok' });
  }

  if (ruta === '/api/categorias') {
    return responderJson(respuesta, metodo, 200, categoriasConTotales);
  }

  let id;
  try {
    id = decodeURIComponent(rutaProductos[1]);
  } catch {
    return responderJson(respuesta, metodo, 400, { error: 'Identificador de categoría inválido.' });
  }

  if (!ID_CATEGORIA.test(id)) {
    return responderJson(respuesta, metodo, 400, { error: 'Identificador de categoría inválido.' });
  }

  const datos = consultarCategoria(id);
  if (!datos) {
    return responderJson(respuesta, metodo, 404, { error: 'La categoría no existe.' });
  }

  return responderJson(respuesta, metodo, 200, datos);
});

const host = process.env.HOST || '0.0.0.0';
const puerto = Number(process.env.PORT || 3000);

servidor.listen(puerto, host, () => {
  console.log(`API de catálogo escuchando en ${host}:${servidor.address().port}`);
});
