import axios, { isAxiosError } from 'axios';

/**
 * Cliente HTTP central para toda la app.
 *
 * Resuelve el baseURL desde la variable de entorno `VITE_API_URL`:
 *   - Desarrollo: si no está definida, cae a `/api` y Vite la proxy-ea
 *     al backend local (`https://localhost:7177`) según `vite.config.ts`.
 *   - Producción (Vercel/Render): se inyecta en build-time desde las
 *     Environment Variables del host. Ej: `https://gymapp-j93y-onrender.com/api`.
 *
 * Mantener un único cliente permite agregar después:
 *   - Interceptors de request (auth headers, logging)
 *   - Interceptors de response (manejo global de 401/403/500, toasts)
 *   - Refresh tokens
 *   - Retry policy
 */
const baseURL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { isAxiosError };
