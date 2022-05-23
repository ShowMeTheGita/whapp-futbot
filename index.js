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

    console.log(message)

    if (message.sender.id === '34602256248@c.us' ) {




        let firstWordLowerCase = message.text.split(' ')[0].toLowerCase();
        let toSend = "";

        if(ftb.acceptedCommands().includes(firstWordLowerCase)) {
            
            switch(firstWordLowerCase) {

                case '!futebolada': 
                    toSend = ftb.initFutebolada();
                    break;

                case '!apitofinal':
                    toSend = ftb.finishFutebolada();
                    break;

                case '!vou':
                    let ownPlayerName = message.sender.pushname;
                    console.log(ownPlayerName)
                    toSend = ftb.vouvai(ownPlayerName);
                    break;

                case '!naovou':
                    toSend = ftb.naovounaovai(message.sender.pushname);
                    break;

                case '!vai':
                    let playerToGo = removeFirstWord(message.content);
                    toSend = ftb.vouvai(playerToGo);
                    break;

                case '!naovai':
                    let playerToRemove = removeFirstWord(message.content);
                    toSend = ftb.naovounaovai(playerToRemove);
                    break;

                case '!help':
                    console.log('################### INSIDE THE HELP ###############################')
                    toSend = ftb.help();
                    break;

                case '!status':
                    toSend = ftb.status();
                    break;

                case '!hora':
                    let hour = removeFirstWord(message.content);
                    toSend = ftb.hora(hour);
                    break;

                case '!dia':
                    let day = removeFirstWord(message.content);
                    toSend = ftb.dia(day);
                    break;

                case '!campo':
                    let loc = removeFirstWord(message.content);
                    toSend = ftb.campo(loc);
                    break;
            }
        }        


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



