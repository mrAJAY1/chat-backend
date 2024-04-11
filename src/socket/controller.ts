import { Socket } from "socket.io";

export default {
  onConnection: (socket: Socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  },
};
