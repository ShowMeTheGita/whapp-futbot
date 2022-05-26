const venom = require('venom-bot');

// Imports for custom created classes
const { Futebolada, Responder } = require("./classes.js");
const ftb = new Futebolada(); 
const rsp = new Responder(ftb);


// Start the app
// Send a message from your dummy number to your phone number after running the application for the first time
// The console.log on line 31 will print the chat id that you need
// Stop the app, uncomment/change the devChat value with the chat id, restart the app
//
//const devChat = ''

//Test chat IDs:
// My test chat -> '34602256248@c.us'


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

    console.log(message.chatId)

    if (message.sender.id === devChat) {
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


