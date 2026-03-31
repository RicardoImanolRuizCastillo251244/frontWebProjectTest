import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

/**
 * Connecta al backend Socket.IO. Lee token de localStorage si no se provee.
 * Usa Vite env var `VITE_API_URL` para la URL del backend (p.ej. https://api.example.com)
 */
export function connectSocket(token?: string) {
  if (socket) return socket;

  const apiUrl = import.meta.env.VITE_API_URL || (window as any).__API_URL__ || 'http://localhost:3000';
  const authToken = token || localStorage.getItem('token') || undefined;

  socket = io(apiUrl, {
    auth: { token: authToken },
    transports: ['websocket'],
    withCredentials: true,
  });

  socket.on('connect_error', (err) => {
    console.error('Socket connect_error', err);
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
