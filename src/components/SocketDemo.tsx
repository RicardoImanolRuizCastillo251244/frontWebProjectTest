import React, { useEffect, useState } from 'react';
import { connectSocket, disconnectSocket, joinPartido, onEvento } from '../services/socket';

export default function SocketDemo() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const s = connectSocket();

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    s.on('connect', onConnect);
    s.on('disconnect', onDisconnect);

    const offNuevoJugador = onEvento('nuevoJugador', (p) => {
      setMessages((m) => [`Nuevo jugador: ${p.usuario}`, ...m]);
    });

    const offNuevaReta = onEvento('nuevaReta', (p) => {
      setMessages((m) => [`Nueva reta: ${JSON.stringify(p.detalles)}`, ...m]);
    });

    return () => {
      offNuevoJugador();
      offNuevaReta();
      s.off('connect', onConnect);
      s.off('disconnect', onDisconnect);
      disconnectSocket();
    };
  }, []);

  const handleJoin = async () => {
    try {
      await joinPartido(1);
      setMessages((m) => ['Joined partido 1', ...m]);
    } catch (err: any) {
      setMessages((m) => [`Join error: ${err?.message || JSON.stringify(err)}`, ...m]);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h3>Socket Demo</h3>
      <p>Connected: {connected ? 'yes' : 'no'}</p>
      <button onClick={handleJoin}>Join partido 1</button>
      <div style={{ marginTop: 12 }}>
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
    </div>
  );
}
