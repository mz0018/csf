import { io } from "socket.io-client";

let socket;

export const connectSocket = (officeId) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL);

    socket.on("connect", () => {
      // console.log("Connected to Socket.io:", socket.id);

      if (officeId) {
        socket.emit("joinOffice", officeId);
      }
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
