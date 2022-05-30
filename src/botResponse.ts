import { Commands } from './enums/commands.enum';
import { BotCommands } from './botCommand';

export class BotResponses {

    trataEvento(command: Commands) {
        let botCommand: BotCommands = new BotCommands();

        switch (command) {
            case Commands.START: {
                botCommand.SetStart();
                break;
            }

            case Commands.END: {
                break;
            }

            case Commands.REUSE: {
                // TODO not implement! IMPLEMENT
                break;
            }

            // !vai -> proprio; !vai Ze -> adiciona o nome Zé
            case Commands.GO: {
                break;
            }

            case Commands.DOESNTGO: {
                break;
            }

            case Commands.HOUR: {
                break;
            }

            case Commands.DAY: {
                break;
            }

            case Commands.INSULT: {
                break;
            }

            case Commands.STATUS: {
                break;
            }

            case Commands.FIELD: {
                break;
            }

            case Commands.HELP: {
                break;
            }

            default: {
                // TODO COMANDO NÃO RECONHECIDO TREATMENT
                break;
            }
        }
    }
}