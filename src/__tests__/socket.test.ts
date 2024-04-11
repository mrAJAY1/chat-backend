import server from "../socket";
import clientIo, { Socket as ClientIo } from "socket.io-client";
import http from "http";

describe("socket", () => {
  let io: ClientIo;
  let httpServer: http.Server;
  beforeEach((done) => {
    httpServer = http.createServer();
    server(httpServer);
    httpServer.listen(5000, () => {
      console.log("Socket started");
      done();
    });

    io = clientIo("http://localhost:5000");
  });

  afterEach((done) => {
    io.close();
    httpServer.close();
    done();
  });

  it("should test if the socket initiallization is working", () => {
    expect(server).toBeDefined();
    expect(io).toBeDefined();
  });

  it("Should connect to the server", (done) => {
    io.on("connect", () => {
      expect(io.connected).toBe(true);
    });

    io.on("disconnect", () => {
      console.log("disconnected");
      expect(io.disconnected).toBe(false);
    });
  });
});
