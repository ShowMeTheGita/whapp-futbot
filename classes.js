class Futebolada {

    #gameInProgress;

    #date;
    #time;
    #location;

    #playersCount;
    #players;

    #tba = "<TBA>"
    #acceptedCommands = [
        '!futebolada',
        '!apitofinal',
        '!vou',
        '!naovou',
        '!vai',
        '!naovai',
        '!hora',
        '!dia',
        '!insulto',
        '!status',
        '!help',
        '!campo'
    ]


    constructor() {
        this.#reset();
    }

    #reset() {
        this.#gameInProgress = false;
        this.#date = this.#tba;
        this.#time = this.#tba;
        this.#location = this.#tba;
        this.#playersCount = 0;
        this.#players = {};
    }

    gameIsInProgress() {
        return this.#gameInProgress
    }

    setGameInProgress(_state) {
        this.#gameInProgress = _state;
    }

    setDate(_date) {
        this.#date = _date;
    }

    getDate() {
        return this.#date;
    }

    setTime(_time) {
        this.#time = _time;
    }

    getTime() {
        return this.#time;
    }

    setLocation(_location) {
        this.#location = _location;
    }

    getLocation() {
        return this.#location;
    }

    getPlayersCount() {
        return this.#playersCount;
    }

    getPlayers() {
        return this.#players;
    }

    addPlayer(_playerName) {

        // Check if this.#players is undefined first in order to add player no. 1
        if (this.#players[Object.keys(this.#players).length] === undefined) {
            this.#players[1] = _playerName;
            this.#playersCount = Object.keys(this.#players).length;
        } else {
            let newPlayerNum = this.#playersCount + 1
            this.#players[newPlayerNum] = _playerName;
            this.#playersCount++;
        }

    }

    removePlayer(_name) {

        let playerNumber = Object.keys(this.#players).find(key => this.#players[key] === _name);

        // Reorder this.#players keys
        for (let i = playerNumber; i < Object.keys(this.#players).length; i++) {
            Object.defineProperty(this.#players, i, Object.getOwnPropertyDescriptor(this.#players, parseInt(i) + 1));
        }

        // remove the last index after reordering
        delete this.#players[Object.keys(this.#players).length];
        this.#playersCount--;

    }


    initOrFinishFutebolada() {

        if (!this.#gameInProgress) {
            this.#gameInProgress = true;
        } else {
            this.#reset();
        }

    }

    acceptedCommands() {
        return this.#acceptedCommands;
    }


}

class Responder {

    #ftb;
    #firstLine = '*[🤖 FUTBOT ⚽]*\n\n'
    #lastLine = '\n⚽⚽⚽⚽⚽⚽' // current message design choice is not using this 

    constructor(_ftb) {
        this.#ftb = _ftb;
    }

    #removeFirstWord(_str) {
        const indexOfSpace = _str.indexOf(' ');

        if (indexOfSpace === -1) {
            return '';
        }

        return _str.substring(indexOfSpace + 1);
    }

    #convertPlayersToMsgFormat(_playersObj) {

        let playersForMsg = "";

        for (let i = 1; i <= Object.keys(_playersObj).length; i++) {
            playersForMsg = playersForMsg.concat(i.toString(), " - ", _playersObj[i], '\n')
        }

        return playersForMsg;

    }


    #playerNotGoingMsgs(_name) {

        if (!this.#ftb.gameIsInProgress()) {
            return this.#noGameInProgressMsg();
        } else {
            if (Object.values(this.#ftb.getPlayers()).includes(_name)) {
                this.#ftb.removePlayer(_name);
                return this.#playerRemovedMsg(_name);
            } else {
                return this.#noSuchPlayerPresentMsg(_name);
            }
        }

    }

    #noSuchPlayerPresentMsg(_name) {

        let msg =
            this.#firstLine +
            `*[${_name}] AINDA NÃO ESTÁ no plantel!*\n` +
            '!vou para fazeres para da equipa vencedora\n' +
            '!vai <nome> para aquela menina\n' +
            '!help para veres tudo\n'

        return msg

    }


    #playerRemovedMsg(_name) {

        let giveUpReasons = [
            'LESIONA-SE NOS TREINOS E VAI FICAR NO BANCO!',
            'TERÁ DE MARCAR PRESENÇA NO TRIBUNAL COMO ARGUÍDO NO PROCESSO APITO DOURADO!',
            'TEVE UM DESENTIMENTO COM O TREINADOR!',
            'LEVOU VERMELHO NO JOGO ANTERIOR!',
            'É CHAMADO PARA A SELEÇÃO E NÃO PODERÁ COMPARECER!',
            'SOFREU UMA CONTRAÇÃO NO JOELHO!',
            'FOI EMPRESTADO AO CANELAS E FALTARÁ AO JOGO!'
        ]

        let randomReason = giveUpReasons[Math.floor(Math.random() * giveUpReasons.length)];

        let msg =
            this.#firstLine +
            `❗ *ATUALIZAÇÃO AO 11 INICIAL* ❗\n\n` +
            `🟥 *${_name}* 🟥 ${randomReason}\n` +
            '\n' +
            `*No. de Jogadores:* ${this.#ftb.getPlayersCount()}\n` +
            `*Novo Plantel:*\n${this.#convertPlayersToMsgFormat(this.#ftb.getPlayers())}`

        return msg;

    }


    #playerGoingMsgs(_name) {

        if (!this.#ftb.gameIsInProgress()) {
            return this.#noGameInProgressMsg();
        } else {
            if (Object.values(this.#ftb.getPlayers()).includes(_name)) {
                return this.#playerAlreadyPresentMsg(_name);
            } else {
                this.#ftb.addPlayer(_name);
                return this.#playerAddedMsg(_name);
            }
        }

    }


    #playerAddedMsg(_name) {

        let coaches = [
            'Jorge Jesus',
            'José Mourinho',
            'André Vilas-Boas',
            'Sérgio Conceição',
            'Fernando Santos',
            'Carlos Queiroz',
            'Bruno Lage',
            'Jesualdo Ferreira',
            'Jurgen Klopp',
            'Lopetegui',
            'Nuno Espirito Santo',
            'Paulo Bento'
        ]

        let randomCoach = coaches[Math.floor(Math.random() * coaches.length)];

        let msg =
            this.#firstLine +
            `❗ *ATUALIZAÇÃO AO 11 INICIAL* ❗\n\n` +
            `${randomCoach} confirma a presença de \n🌟 *${_name}* 🌟\n COMO TITULAR!\n` +
            '\n' +
            `*No. de Jogadores:* ${this.#ftb.getPlayersCount()}\n` +
            `*Novo Plantel:*\n${this.#convertPlayersToMsgFormat(this.#ftb.getPlayers())}`

        return msg;

    }


    #playerAlreadyPresentMsg(_name) {

        let msg =
            this.#firstLine +
            `* 🟥 [${_name}] JÁ ESTÁ no 11 inicial!*\n` +
            '!naovou para desistires\n' +
            '!naovai <nome> para mandar esse gajo para o banco\n' +
            '!help para veres tudo\n'

        return msg;

    }

    #finishGameMsgs() {

        if (!this.#ftb.gameIsInProgress()) {
            return this.#noGameInProgressMsg();
        } else {
            this.#ftb.initOrFinishFutebolada();
            return this.#endGameMsg();
        }

    }

    #endGameMsg() {

        let msg =
            this.#firstLine +
            '❗❗*PI, PI, PIIIIIIIIIIII!!!!!*❗❗\n\n' +
            'Partida terminada!\n' +
            '!futebolada para quando os nossos campeões estiverem em forma novamente\n'

        return msg;

    }

    #noGameInProgressMsg() {

        let msg =
            this.#firstLine +
            '*Ainda não decorreu o sorteio. Nenhuma partida a decorrer neste momento*\n' +
            '!futebolada para iniciar\n'

        return msg;

    }


    #initGameMsgs() {

        if (this.#ftb.gameIsInProgress()) {
            return this.#gameAlreadyInProgressMsg();
        } else {
            this.#ftb.initOrFinishFutebolada();
            return this.#newGameMsg();
        }

    }


    #gameAlreadyInProgressMsg() {

        let msg =
            this.#firstLine +
            '*Antes de começar a planear a próxima jornada é preciso jogar esta*\n\n' +
            '!status para ver o atual plantel\n' +
            '!apitofinal para recomeçar de novo\n' +
            '!help para tudo o resto\n'

        return msg;
    }

    #newGameMsg() {
        let msg =
            this.#firstLine +
            '*🚩 ESTÃO ABERTAS AS CONVOCATÓRIAS*\n\n' +
            `*Dia:* ${this.#ftb.getDate()}\n` +
            `*Hora:* ${this.#ftb.getTime()}\n` +
            `*Estádio:* ${this.#ftb.getLocation()}\n\n` +
            `*No. de Jogadores:* ${this.#ftb.getPlayersCount()}\n\n` +
            `*Plantel:* ${this.#convertPlayersToMsgFormat(this.#ftb.getPlayers())}`

        return msg;
    }

    #helpMsg() {

        let helpMessage =
            this.#firstLine +
            '❓ ❓ ❓\n' +
            '*!futebolada* -> Começa a marcar a peladinha\n' +
            '*!apitofinal* -> Limpa tudo para preparar a próxima jornada\n' +
            '*!vou* -> Confirma a tua presença, campeão!\n' +
            '*!naovou* -> Para quando sofreste uma lesão inesperada\n' +
            '*!vai <nome>* -> Alguém a armar-se em conas? Aceita por ele\n' +
            '*!naovai <nome>* -> Desmarca o mitra\n' +
            '*!hora <hora>* -> Define a hora\n' +
            '*!dia <dia>* -> Define o dia\n' +
            '*!insulto <nome>* -> Manda mas é esse gajo foder\n' +
            '*!status* -> Confere o plantel + info sobre a partida\n' +
            '*!help* -> É literalmente isto otário. Chino no olho\n' +
            '❓ ❓ ❓\n'

        return helpMessage;

    }


    #checkStatus() {
        if (!this.#ftb.gameIsInProgress()) {
            return this.#noGameInProgressMsg();
        } else {
            return this.#currentStatusMsg();
        }
    }


    #currentStatusMsg() {

        let msg =
            this.#firstLine +
            '*<<< FUTEBOLADA >>>*\n\n' +
            `*Dia:* ${this.#ftb.getDate()}\n` +
            `*Hora:* ${this.#ftb.getTime()}\n` +
            `*Estádio:* ${this.#ftb.getLocation()}\n\n` +
            `*No. de Jogadores:* ${this.#ftb.getPlayersCount()}\n` +
            `*Titulares:*\n${this.#convertPlayersToMsgFormat(this.#ftb.getPlayers())}` +
            '\n'

        return msg;

    }

    #setDayMsgs(_day) {
        if (!this.#ftb.gameIsInProgress()) {
            return this.#noGameInProgressMsg();
        } else {
            this.#ftb.setDate(_day);
            return this.#dateUpdatedMsg(_day);
        }
    }

    #dateUpdatedMsg(_day) {

        let msg =
            this.#firstLine +
            `❗ *ATUALIZAÇÃO PLANO DE JOGO* ❗\n\n` +
            `*Dia do kick-off*: ${_day}\n`

        return msg;
    }


    #setHourMsgs(_hour) {
        if (!this.#ftb.gameIsInProgress()) {
            return this.#noGameInProgressMsg();
        } else {
            this.#ftb.setTime(_hour);
            return this.#hourUpdatedMsg(_hour);
        }
    }

    #hourUpdatedMsg(_hour) {

        let msg =
            this.#firstLine +
            `❗ *ATUALIZAÇÃO PLANO DE JOGO* ❗\n\n` +
            `*Hora para kick-off*: ${_hour}\n`

        return msg;
    }

    #setLocationMsgs(_location) {

        if (!this.#ftb.gameIsInProgress()) {
            return this.#noGameInProgressMsg();
        } else {
            this.#ftb.setLocation(_location);
            return this.#locationUpdatedMsg(_location);
        }

    }

    #locationUpdatedMsg(_location) {

        let msg =
            this.#firstLine +
            `❗ *ATUALIZAÇÃO PLANO DE JOGO* ❗\n\n` +
            `*Estádio*: ${_location}\n`

        return msg;

    }

    #insultSomeoneMsg(_attacker, _insulted) {

        let insults = [
            `O *${_attacker}* quer que vás para o caralho *${_insulted}*`,
            `De acordo com o *${_attacker}*, o *${_insulted}* está a armar-se em conas outras vez`,
            `*${_attacker}* afia a faca para chinar *${_insulted}* no olho`,
            `O *${_attacker}* quer que tu te fodas *${_insulted}*`,
            `Segundo *${_attacker}*, o *${_insulted}* não saltou e é portanto lampião`
        ]

        let randomInsult = insults[Math.floor(Math.random() * insults.length)];

        let msg =
            this.#firstLine +
            randomInsult

        return msg;

    }


    processMessage(_msg) {

        let firstWordLowerCase = _msg.text.split(' ')[0].toLowerCase();

        if (this.#ftb.acceptedCommands().includes(firstWordLowerCase)) {

            switch (firstWordLowerCase) {

                case '!futebolada':
                    return this.#initGameMsgs();

                case '!apitofinal':
                    return this.#finishGameMsgs();

                case '!vou':
                    let ownPlayerToAdd = _msg.sender.pushname;
                    return this.#playerGoingMsgs(ownPlayerToAdd);

                case '!naovou':
                    let ownPlayerToRemove = _msg.sender.pushname;
                    return this.#playerNotGoingMsgs(ownPlayerToRemove);

                case '!vai':
                    let playerToAdd = this.#removeFirstWord(_msg.content);
                    return this.#playerGoingMsgs(playerToAdd);

                case '!naovai':
                    let playerToRemove = this.#removeFirstWord(_msg.content);
                    return this.#playerNotGoingMsgs(playerToRemove);

                case '!help':
                    return this.#helpMsg();

                case '!status':
                    return this.#checkStatus();

                case '!hora':
                    let hour = this.#removeFirstWord(_msg.content);
                    return this.#setHourMsgs(hour);

                case '!dia':
                    let day = this.#removeFirstWord(_msg.content);
                    return this.#setDayMsgs(day);

                case '!campo':
                    let location = this.#removeFirstWord(_msg.content);
                    return this.#setLocationMsgs(location);

                case '!insulto':
                    let attacker = _msg.sender.pushname;
                    let insulted = this.#removeFirstWord(_msg.content);
                    return this.#insultSomeoneMsg(attacker, insulted);

            }

        }

    }
}

module.exports = { Futebolada, Responder };