import React, { createContext, useContext } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

export const SocketProvider: React.FC = ({ children }: any) => {
    const socket = io('http://gps-backend.imc.co.tz:8000');
    // const socket = io('http://192.168.100.115:3300');

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};