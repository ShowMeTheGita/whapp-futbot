// Required imports
const venom = require('venom-bot');

// Imports for custom created classes
const { Futebolada, Responder } = require("./classes.js");
const ftb = new Futebolada(); 
const rsp = new Responder(ftb);

const whatsappChatsToRunIn = [
  '351915226805-1555439720@g.us', // FutLolies
  '34602256248@c.us' // Test chat
]


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


    if (whatsappChatsToRunIn.includes(message.sender.id) || whatsappChatsToRunIn.includes(message.chat.id) ) {

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



