import { Server as SocketServer } from "socket.io";
import http from "http";
import controller from "./controller";

/**
 * @param {http.Server} server
 * @returns {void}
 * @description handles the socket.io implementations
 */
export default (server: http.Server): void => {
  const io = new SocketServer(server, {
    pingTimeout: 60000,
    cors: {
      origin: "*",
    },
  });

  // handle connection
  io.on("connection", controller.onConnection);
};
