// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const { Futebolada } = require("./futebolada.js");

const ftb = new Futebolada(); 

function removeFirstWord(str) {
  const indexOfSpace = str.indexOf(' ');

  if (indexOfSpace === -1) {
    return '';
  }

  return str.substring(indexOfSpace + 1);
}


venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {

    if (message.isGroupMsg && message.chat.id === '351915226805-1555439720@g.us') {

        // group chat code will go here

    }

    if (message.sender.id === '34602256248@c.us' ) {

        let firstWordLowerCase = message.text.split(' ')[0].toLowerCase();
        let toSend = "";

            



      client
        .sendText(message.from, toSend)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });


}



