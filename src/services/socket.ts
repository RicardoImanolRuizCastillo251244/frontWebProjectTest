import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

import { API_ORIGIN } from './api';

/**
 * Connecta al backend Socket.IO. Lee token de localStorage si no se provee.
 * Usa Vite env var `VITE_API_URL` para la URL del backend (p.ej. https://api.example.com)
 */
export function connectSocket(token?: string) {
  if (socket) return socket;

  // Prefer API_ORIGIN (set in api.ts) if available; fall back to VITE_API_URL or localhost
  // API_ORIGIN is the origin without the /api path so socket.io connects to the correct endpoint.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - may be undefined at build time
  const apiOrigin = API_ORIGIN || import.meta.env.VITE_API_URL || (window as any).__API_URL__ || 'http://localhost:3000';
  const authToken = token || localStorage.getItem('token') || undefined;

  socket = io(apiOrigin, {
    auth: { token: authToken },
    transports: ['websocket'],
    withCredentials: true,
  });

  socket.on('connect_error', (err) => {
    console.error('Socket connect_error', err);
    try {
      const msg = err && (err.message || err.toString && err.toString());
      if (msg && /unauthorized|unauth|401/i.test(msg)) {
        // notify app auth flow to logout and redirect
        window.dispatchEvent(new Event('auth:unauthorized'));
      }
    } catch (e) {}
  });

  socket.on('connect', () => {
    console.info('Socket conectado', socket?.id);
  });

  socket.on('disconnect', (reason) => {
    console.info('Socket desconectado', reason);
  });

  return socket;
}

export function disconnectSocket() {
  if (!socket) return;
  socket.disconnect();
  socket = null;
}

export function joinPartido(idMatch: number) {
  if (!socket) return Promise.reject(new Error('Socket no conectado'));
  return new Promise((resolve, reject) => {
    socket!.emit('joinPartido', { idMatch }, (ack: any) => {
      if (ack && ack.ok) return resolve(ack);
      return reject(ack || new Error('No ack'));
    });
  });
}

export function leavePartido(idMatch: number) {
  if (!socket) return Promise.reject(new Error('Socket no conectado'));
  return new Promise((resolve, reject) => {
    socket!.emit('leavePartido', { idMatch }, (ack: any) => {
      if (ack && ack.ok) return resolve(ack);
      return reject(ack || new Error('No ack'));
    });
  });
}

export function onEvento(event: string, cb: (payload: any) => void) {
  if (!socket) return () => {};
  socket.on(event, cb);
  return () => socket && socket.off(event, cb);
}
