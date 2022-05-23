// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');

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

    console.log(message)

    if (message.body === 'Hi') {
      client
        .sendText(message.from, 'Como é caralho tudo em ordem --automated message test ..')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });


}



