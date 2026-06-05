import axios, { isAxiosError } from 'axios';

/**
 * Cliente HTTP central para toda la app.
 *
 * Resuelve el baseURL desde la variable de entorno `VITE_API_URL`:
 *   - Desarrollo: si no está definida, usa `/api` y Vite la proxy-ea
 *     al backend local (`https://localhost:7177`) según `vite.config.ts`.
 *   - Producción (Vercel/Render): se inyecta en build-time desde las
 *     Environment Variables del host. Ej: `https://gymapp-j93y.onrender.com`.
 *     El código se encarga de concatenar `/api` al final.
 *
 * ¿Por qué `/api` se agrega acá y no en cada servicio?
 * Porque los servicios asumen que el `baseURL` ya incluye el prefijo del
 * backend (concatenan paths que empiezan con `/Cliente`, no con `/api/Cliente`).
 * Encapsularlo acá evita que se rompa cada vez que alguien agregue un endpoint.
 *
 * Mantener un único cliente permite agregar después:
 *   - Interceptors de request (auth headers, logging)
 *   - Interceptors de response (manejo global de 401/403/500, toasts)
 *   - Refresh tokens
 *   - Retry policy
 */
const apiBase = import.meta.env.VITE_API_URL;
const baseURL = apiBase
  ? `${apiBase.replace(/\/+$/, '')}/api`   // prod: "https://host" -> "https://host/api"
  : '/api';                                 // dev: usa el proxy de Vite

export const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { isAxiosError };
