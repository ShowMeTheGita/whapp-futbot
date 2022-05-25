// Required imports
const venom = require('venom-bot');

// Imports for custom created classes
const { Futebolada, Responder } = require("./classes.js");
const ftb = new Futebolada(); 
const rsp = new Responder(ftb);




venom
  .create({
    session: 'futbot', //name of session
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

      client
        .sendText(message.from, rsp.processMessage(message))
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });


}



