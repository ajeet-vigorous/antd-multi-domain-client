import { io } from "socket.io-client";

let socket;

export const getAviatorSocket = ({ aviatorSocketData }) => {

  if (!socket && aviatorSocketData?.socketURL) {
    socket = io(`${aviatorSocketData.socketURL}`, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000
    });
  }

  return socket;
};

export const disconnectAviatorSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
