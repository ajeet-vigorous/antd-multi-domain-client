import io from 'socket.io-client';
import { CONST } from "../../appRedux/sagas/HTTP"

let socket = null;

let userId = JSON.parse(localStorage.getItem(`user_id_tvs99`))?.data?.userId
let fullDomain = window.location.hostname;
let domain = fullDomain.replace(/^admin\./, '');

export const initSocket = () => {
    if (!socket) {
        socket = io(CONST.SOCKET_URL, {
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: Infinity, 
            reconnectionDelay: 1000, 
            reconnectionDelayMax: 5000, 
            randomizationFactor: 0.5
        });
     
        socket.emit('reconnect', {userId, domain}, () => {
            console.warn('Socket reConnect');
        });

      
        socket.on('connect', () => {
            console.warn('Socket connected');
            // setTimeout(() => {
            //     socket.disconnect();
            //     console.warn('Socket disconnected after 3 seconds');
            // }, 3000);
        });

        socket.on('disconnect', () => {
            console.warn('Socket disconnected');
            reconnectSocket();

            // socket.socket.reconnect();
            // console.log( socket.socket.reconnect(), "1");
        
         
            
        });

        socket.on('reconnect', (attemptNumber) => {
        
            console.warn(`Socket reconnected after ${attemptNumber} attempts`);
        });

        socket.on('reconnect_attempt', () => {
            console.warn('Attempting to reconnect...');
        });

        socket.on('reconnect_error', (error) => {
            console.error('Reconnection attempt failed:', error);
        });
    }

    return socket;
};
const reconnectSocket = () => {
    if (socket) {
        socket.connect();
        console.warn('Socket reconnected');
    }
};

export const getSocket = () => {
    return socket;
};
