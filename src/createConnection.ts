import { BotCommands } from './botCommand';
import { create, Whatsapp } from 'venom-bot'
import fs from 'fs'

const tokensDir = './tokens'
const sessionName = 'futbot'
const sessionPath = `${tokensDir}/${sessionName}.json`

export class WhatsappConnection {
    constructor() {
    }

    async getClient(): Promise<Whatsapp> {
        return await create(
            sessionName,
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
                mkdirFolderToken: './data/app',
                createPathFileToken: true,
                disableSpins: true,
                headless: true
            },

        )
    }
}