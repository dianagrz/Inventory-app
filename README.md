# Inventory App

Catálogo de productos en React Native y Expo. La app muestra seis categorías y consulta sus 18 productos en una API REST de Node.js.

## Ejecutar el proyecto

Usa Node.js 22.13 o superior. Desde la raíz del proyecto, instala las dependencias e inicia la API.

```bash
npm ci
npm run api
```

La API usa el puerto 3000 por defecto. Verifica que `http://localhost:3000/api/salud` responda `{"estado":"ok"}`. Si el puerto está ocupado, ejecuta `PORT=3001 npm run api` y usa ese puerto también en la configuración de Expo.

En otra terminal, copia `.env.example` a `.env.local` y configura `EXPO_PUBLIC_API_URL` con la dirección del servidor sin el sufijo `/api`.

| Dónde pruebas la app | URL base de la API con el puerto predeterminado |
| --- | --- |
| Navegador o simulador de iOS en la misma computadora | `http://localhost:3000` |
| Emulador oficial de Android | `http://10.0.2.2:3000` |
| Teléfono físico en la misma Wi-Fi | Dirección IP local de la computadora, por ejemplo `http://192.168.1.50:3000` |

Para navegador, ejecuta `npm run web` y abre la URL que muestra Expo. Para Expo Go, ejecuta `npm start` y escanea el QR con un dispositivo compatible con SDK 58. La versión web usa Expo Router en modo SPA.

## Probar la API

| Ruta | Respuesta |
| --- | --- |
| `GET /api/salud` | Estado del servidor. |
| `GET /api/categorias` | Categorías y cantidad de productos por categoría. |
| `GET /api/categorias/cocina/productos` | Categoría Cocina y sus tres productos. |

## Verificar el frontend

```bash
npm run lint
npx tsc --noEmit
```
