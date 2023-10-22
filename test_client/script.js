import { Manager } from "socket.io-client";

const generateUsername = () => {
    var name = 'Guest'
    var number = Math.floor(Math.random() * 120000);
    return name + String(number);
}

const SERVER="http://localhost:5050";
const USERNAME=generateUsername();
const manager = new Manager(SERVER);

const socket = manager.socket("/");

const greeting = document.querySelector('p');
greeting.innerText = `Hello ${USERNAME}`;

const button1 = document.querySelector('#join');
const button2 = document.querySelector('#leave');
const button3 = document.querySelector('#create');

const sendJoinRoomEvent = (roomID, username) => {
    socket.emit("room:join" , {
        roomID,
        username
    });
};

const sendLeaveRoomEvent = (roomID, username) => {
    socket.emit("room:leave", {
        roomID,
        username
    });
};

button1.addEventListener('click', (event) => {
    event.preventDefault();

    const input = document.querySelector('#room-id');
    var id = input.nodeValue;

    console.log(id);
    localStorage.setItem('roomID', id);
    
    sendJoinRoomEvent(id, USERNAME);

    input.nodeValue = '';
});

button2.addEventListener('click', (event) => {
    event.preventDefault();

    var id = localStorage.getItem('roomID');

    sendLeaveRoomEvent(id, USERNAME);

    localStorage.removeItem('roomID');
});

button3.addEventListener('click', (event) => {
    event.preventDefault();

    var searchParams = new URLSearchParams();
    searchParams.append('name', USERNAME);
    searchParams.append('player_count', 8);

    fetch(SERVER, {
        method: 'POST' ,
        body: searchParams,
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        
        if(localStorage.getItem('roomID')){
            localStorage.removeItem('roomID');
        }
        localStorage.setItem('roomID', data.roomID); 

        sendJoinRoomEvent(data.roomID, USERNAME);
        
    }).catch (error => {
        console.log(error);
    })
});

// // receiving an event
// socket.on("foo", (value) => {
//     // ...
//   });
  
//   // sending an event
//   socket.emit("bar", "abc");