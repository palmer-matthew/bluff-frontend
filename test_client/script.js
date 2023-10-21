import { Manager } from "socket.io-client";

function generateUsername(){
   var name = 'Guest'
   var number = Math.floor(Math.random() * 120000);
   return name + String(number);
}

const SERVER="http://localhost:5050";
const USERNAME=generateUsername();
const manager = new Manager(SERVER);

const socket = manager.socket("/");

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');

button1.addEventListener('click', (event) => {
    event.preventDefault();

    const input = document.querySelector('#room-id');
    var id = input.nodeValue;

    localStorage.setItem('roomID', id);
    
    socket.emit("room:join" , {
        roomID: id,
        username: USERNAME
    });

    input.nodeValue = '';
});

button2.addEventListener('click', (event) => {
    event.preventDefault();

    var id = localStorage.getItem('roomID');

    socket.emit("room:join", {
        roomID: id,
        username: USERNAME
    });

    localStorage.removeItem('roomID');
});

button3.addEventListener('click', (event) => {
    event.preventDefault();
});

// // receiving an event
// socket.on("foo", (value) => {
//     // ...
//   });
  
//   // sending an event
//   socket.emit("bar", "abc");