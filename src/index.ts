import { WhatsappConnection } from './createConnection';
import { Whatsapp } from 'venom-bot';


import 'dotenv';

const boot = async () => {
    const futloliesChat = process.env.CHAT_LINK;
    // const whapp = new Whatsapp(rsp, futloliesChat); // usar WhatsappConnection

    // const ftb = new Futebolada();
    // const rsp = new Responder(ftb);
    const connection = new WhatsappConnection();
    const client: Whatsapp = await connection.getClient();

    try {
        client.onMessage((incomingMessage) => {
            const message = BotResponses.resolve(incomingMessage);

            // if (message.sender.id === this.#devChat) {
            client
                .sendText(incomingMessage.from, message)
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
            // }
        });
    } catch (error) {
        console.log('defineEvent error')
    }


    const cliente = whapp.connect();
}

boot();

