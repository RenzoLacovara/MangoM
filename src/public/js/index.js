// eslint-disable-next-line no-undef
const socket = io();

socket.emit(
  "mensaje",
  "Hola soy un cliente emitiendo un evento por websocket!"
);
socket.on("evento", (data) => {
  console.log(data);
});
socket.on("evento para todos", (data) => {
  console.log(data);
});
socket.on("evento global", (data) => {
  console.log(data);
});
