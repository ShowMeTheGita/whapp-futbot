const qrcode = require('qrcode-terminal');
const { Client , LocalAuth } = require('whatsapp-web.js');

class Whatsapp {

    #rsp;
    #devChat;
    #client

    constructor(_rsp, _chat) {
        this.#rsp = _rsp;
        this.#chat = _chat;
    }

    prepare(){

        this.#setupClient();
        this.#generateQRCode();
        this.#readyCheck();
        
    }

    run() {

        this.#client.on('message', (message) => {
            console.log(message)
            console.log(message.body)

            if (message.from === this.#chat) {
                this.#client.sendMessage(message.from, this.#rsp.processMessage(message.body, message._data.notifyName), )
            }

        });


    }

    #setupClient() {

        let auth = new LocalAuth('./wwebjs_auth');
        console.log(auth);

        this.#client = new Client({
            authStrategy: auth,
        });
   
        this.#client.initialize();

    }

    #generateQRCode() {

        this.#client.on('qr', (qr) => {
            qrcode.generate(qr, { small: true });
        });

        /*this.#client.on('authenticated', () => {
            console.log('AUTHENTICATED');
        });*/

    }

    #readyCheck() {

        this.#client.on('ready', () => {
            console.log('Client is ready!');
        });

    }


}

module.exports = { Whatsapp };
