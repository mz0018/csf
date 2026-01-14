let io;

function initSocket(server) {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174", "http://192.168.110.16"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);

    socket.on("joinOffice", (officeId) => {
      if (!officeId) return;
      const roomName = `office-${officeId}`;
      socket.join(roomName);
      console.log(`Socket ${socket.id} joined ${roomName}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}

function notifyNewQueue(queueTicket) {
  if (io && queueTicket?.officeId) {
    const roomName = `office-${queueTicket.officeId}`;
    io.to(roomName).emit("newQueue", queueTicket);
  }
}

function notifyStatusUpdate(queueTicket) {
  if (io && queueTicket?.officeId) {
    const roomName = `office-${queueTicket.officeId}`;
    io.to(roomName).emit("statusUpdate", {
      queueNumber: queueTicket.queueNumber,
      status: queueTicket.status
    });
  }
}

module.exports = { initSocket, notifyNewQueue, notifyStatusUpdate };
