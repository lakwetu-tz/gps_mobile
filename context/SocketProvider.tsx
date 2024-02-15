import React, { createContext, useContext, useEffect, useState } from 'react';

// Define types for context value and provider props
type SocketContextType = {
    socket: WebSocket | null;
    connect: () => void;
    disconnect: () => void;
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    connect: () => { },
    disconnect: () => { },
});

export const useSocket = () => useContext(SocketContext);

const SOCKET_URL = 'http://192.168.100.115:8000/'; // Replace with your WebSocket server URL

export const SocketProvider: React.FC = ({ children }: any) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        // Connect to WebSocket when the component mounts
        connect();

        // Disconnect from WebSocket when the component unmounts
        return disconnect;
    }, []);

    const connect = () => {
        const ws = new WebSocket(SOCKET_URL);
        ws.onopen = () => {
            console.log('WebSocket connected');
            setSocket(ws);
        };
        ws.onclose = () => {
            console.log('WebSocket disconnected');
            setSocket(null);
        };
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };

    const disconnect = () => {
        if (socket) {
            socket.close();
        }
    };

    return (
        <SocketContext.Provider value={{ socket, connect, disconnect }}>
            {children}
        </SocketContext.Provider>
    );
};