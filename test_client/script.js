import { Manager } from "socket.io-client";

const SERVER="http://localhost:5050"
const manager = new Manager(SERVER);

const socket = manager.socket("/");