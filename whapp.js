const fs = require('fs');
const fsPromises = require('fs/promises');
const venom = require('venom-bot');
const tokensDir = './tokens'
const sesName = 'futbot'
const sessionPath = `${tokensDir}/${sesName}.json`


class Whatsapp {

    #rsp;
    #devChat;

    constructor(_rsp, _chat) {
        this.#rsp = _rsp;
        this.#devChat = _chat;
    }


    async connect() {

        let client;

        try {
            client = await venom.create(
                
                sesName,

                (base64Qrimg, asciiQR, attempts, urlCode) => {
                    if (base64Qrimg) {
                        console.log('Device has logged out')
                        if (fs.existsSync(tokensDir)) {
                            fs.unlink(sessionPath, (err) => {
                                if (err) console.log('No such file: ', err)
                                else console.log('Session token has been removed.\n')
                            })
                        }
                    }
                },
                (statusSession, session) => {
                    console.log('STATUS SESSION: ', statusSession)
                    console.log('SESSION NAME: ', session)
                },
                {
                    multidevice: true,
                    disableWelcome: true,
                    folderNameToken: 'tokens',
                    mkdirFolderToken:'./data/app',
                    createPathFileToken: true,
                    disableSpins: true,
                    headless: true
                },

            )
            this.#runBot(client)
        } catch (error) {
            console.log(error)
        }



    }


    async #runBot(_client) {


         _client.onMessage((message) => {

            if (message.sender.id === this.#devChat) {
            _client
                .sendText(message.from, this.#rsp.processMessage(message))
                .then((result) => {
                console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
                });
            }
        });


    }


}


module.exports = { Whatsapp };
