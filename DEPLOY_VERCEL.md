Guía rápida: configurar Vercel para usar WebSockets con el backend

1) Variables de entorno en Vercel (Project -> Settings -> Environment Variables):
- `VITE_API_URL`: URL pública de tu backend (p.ej. `https://mi-backend.up.railway.app`).
- `VITE_ENABLE_SOCKET_DEMO`: opcional, para mostrar el demo (setear `true` para habilitar).

2) Flujo de despliegue:
- Push a la rama vinculada en GitHub; Vercel desplegará automáticamente.
- Asegúrate que `VITE_API_URL` apunte al dominio del backend y que `FRONTEND_URL` esté configurado en el backend (Railway) para permitir CORS.

3) Notas:
- El cliente Socket usa la variable Vite `VITE_API_URL`. En tiempo de build Vite sustituye `import.meta.env.VITE_API_URL`.
- Para conectar sockets en producción, tu backend debe aceptar conexiones desde el origen del frontend (configurado en `FRONTEND_URL` en Railway).

4) Localmente:
- Puedes ejecutar el frontend con:
```bash
VITE_API_URL=https://tu-backend.local npm run dev
```
- Habilita el demo con `VITE_ENABLE_SOCKET_DEMO=true` si quieres ver el componente de ejemplo.
