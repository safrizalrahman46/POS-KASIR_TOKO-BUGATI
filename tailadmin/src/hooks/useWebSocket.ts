import { useEffect, useRef, useCallback } from 'react';

interface WebSocketMessage {
  type: string;
  [key: string]: unknown;
}

export function useWebSocket(
  path: string,
  onMessage: (data: WebSocketMessage) => void
) {
  const wsRef = useRef<WebSocket | null>(null);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const connect = useCallback(() => {
    const baseUrl = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:2000';
    const ws = new WebSocket(`${baseUrl}${path}`);

    ws.onopen = () => console.log(`WebSocket ${path} connected`);
    ws.onclose = () => {
      console.log(`WebSocket ${path} disconnected, reconnecting...`);
      setTimeout(connect, 3000);
    };
    ws.onerror = (err) => console.error(`WebSocket ${path} error:`, err);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessageRef.current(data);
      } catch {
        console.error('Invalid WebSocket message');
      }
    };

    wsRef.current = ws;
  }, [path]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  return wsRef;
}
