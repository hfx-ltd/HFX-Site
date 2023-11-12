// import io from "socket.io-client";
import io from "socket.io-client";
import { baseURL } from "./axios";

// const baseUrl = "http://192.168.1.24:8080"; // process.env.REACT_APP_BASE_URL;

const socket = io.connect(baseURL, {
  transports: ["websocket"],
  reconnectionAttempts: 15,
});

export default socket;
