class Futebolada {

    #isBeingScheduled;
    #location;
    #date;
    #time;
    #players;
    #playersMessageFormat;
    #playersCount;

    #tba = "<tba>"
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
        '!location'
    ]

    
    constructor() {
        this.#initialState();
    }

    #initialState() {
        this.#isBeingScheduled = false;
        this.#date = this.#tba;
        this.#time = this.#tba;
        this.#location = this.#tba;
        this.#playersCount = 0;
        this.#players = {};
        this.#playersMessageFormat = "";
    }

    #setDate(_date) {
        this.#date = _date;
    }

    #setTime(_time) {
        this.#time = _time;
    }

    #setLocation(_location) {
        this.#location = _location;
    }

    #addPlayer(_playerName) {

        console.log(_playerName);

        // Check if this.#players is undefined first in order to add player no. 1
        if (this.#players[Object.keys(this.#players).length] === undefined) {
            this.#players[1] = _playerName;
            console.log(this.#players[1]);
            this.#playersCount = Object.keys(this.#players).length;
            console.log(this.#playersCount);
            this.#convertPlayersToMessageFormat();
            console.log(this.#playersMessageFormat)
        } else {
            let newPlayerNum = this.#playersCount + 1
            this.#players[newPlayerNum] = _playerName;
            this.#playersCount++;
            this.#convertPlayersToMessageFormat();
        }

    }

    removePlayer(_name) {

        if (this.#playersCount === 0) {
            console.log("There are no players to remove. Nothing to do")
        }

        let playerNumber = Object.keys(this.#players).find(key => this.#players[key] === _name);

        // Reorder this.#players keys
        for (let i = playerNumber; i < Object.keys(this.#players).length; i++) {
	        Object.defineProperty(this.#players, i, Object.getOwnPropertyDescriptor(this.#players, i+1));
        }

        // remove the last index after reordering
        delete this.#players[Object.keys(this.#players).length];
        this.#playersCount--;
        this.#convertPlayersToMessageFormat();

    }

    #convertPlayersToMessageFormat() {

        let messageFormat = "";

        for (let i = 1; i <= Object.keys(this.#players).length; i++) {
            messageFormat = messageFormat.concat(i.toString(), " - ", this.#players[i], '\n')
        }

        this.#playersMessageFormat = messageFormat;

    }


    initFutebolada() {

        if (this.#isBeingScheduled) {
            return this.#gameAlreadyInProgressMessage();
        } else {
            this.#isBeingScheduled = true;
            return this.#gameStatusMessage();
        }

    }

    finishFutebolada() {

        if (this.#isBeingScheduled) {
            this.#initialState();
            return this.#finishMessage();
        } else {
            return this.#noGameInProgressMessage();
        }

    }

    #finishMessage() {

        let msg = 
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽\n' +
        '❗❗*PI, PI, PIIIIIIIIIIII!!!!!*❗❗\n' +
        'Partida terminada!\n' +
        '!futebolada para quando os nossos campeões estiverem em forma novamente\n' +
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽'

        return msg;

    }


    naovounaovai(_name) {

        if (!this.#isBeingScheduled) {
            return this.#noGameInProgressMessage();
        } else {
            if (Object.values(this.#players).includes(_name)) {
                this.removePlayer(_name);
                return this.#playerRemovedMessage(_name);
            } else {
                return this.#noSuchPlayerPresentMessage();
            }
        }

    }

    #noSuchPlayerPresentMessage() {

        let msg = 
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽\n' +
        '*Esse jogador NÃO ESTÁ no plantel!*\n' +
        '!vou para fazeres para da equipa vencedora, !vai <nome> para aquela menina, !help para veres tudo\n' +
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽'

    }

    #playerRemovedMessage(_name) {

        let msg =
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽\n' +
        `❗ *ATUALIZAÇÃO PLANTEL* ❗\n` +
        `*${_name} LESIONA-SE NOS TREINOS E FICA NO BANCO!*\n` +
        '\n' +
        `*No. de Jogadores:* ${this.#playersCount}\n` +
        `*Jogadores:*\n${this.#playersMessageFormat}` +
        '\n' +
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽'

        return msg;

    }


    vouvai(_name) {

        console.log("GOT HEREEEEEEEEEEEEEEEEEEEEEEEEE")

        if (!this.#isBeingScheduled) {
    
            return this.#noGameInProgressMessage();
        } else {
            if (Object.values(this.#players).includes(_name)) {
                console.log("FIRST PART OF THE ELSE")
                return this.#playerAlreadyPresentMessage();
            } else {
                console.log("SECOND PART")
                this.#addPlayer(_name);
                console.log(this.#players[1])
                console.log(this.#players[0]);
                return this.#newPlayerMessage(_name);
            }
        }

    }


    #newPlayerMessage(_name) {

        let msg =
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽\n' +
        `❗ *ATUALIZAÇÃO PLANTEL* ❗\n` +
        `*${_name} CONFIRMA PRESENÇA NO PLANTEL!*\n` +
        '\n' +
        `*No. de Jogadores:* ${this.#playersCount}\n` +
        `*Jogadores:*\n${this.#playersMessageFormat}` +
        '\n' +
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽'

        return msg;

    }

    #playerAlreadyPresentMessage() {

        let msg = 
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽\n' +
        '*Esse jogador já está no plantel!*\n' +
        '!naovou para desistires, !naovai <nome> para meter alguém no banco, !help para veres tudo\n' +
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽'

        return msg;

    }


    #gameStatusMessage() {

        let msg =
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽\n' +
        '\n' +
        '*FUTEBOLADA*\n' +
        '\n' +
        `*Dia:* ${this.#date}\n` +
        `*Hora:* ${this.#time}\n` +
        `*Local:* ${this.#location}\n` +
        '\n' +
        `*No. de Jogadores:* ${this.#playersCount}\n` +
        `*Jogadores:*\n${this.#playersMessageFormat}` +
        '\n' +
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽'

        return msg;

    }

    #gameAlreadyInProgressMessage() {

        let msg = 
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽\n' +
        '*Antes de começar a planear a próxima jornada é preciso jogar esta*\n' +
        '!status para ver o atual plantel ou !apitofinal para recomeçar de novo\n' +
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽'

        return msg;

    }

    #noGameInProgressMessage() {

        let msg = 
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽\n' +
        '*Ainda não decorreu o sorteio. Nenhuma partida a decorrer neste momento*\n' +
        '!futebolada para iniciar\n' +
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽'

        return msg;

    }

    help() {

        let helpMessage = 
        '❓❓❓❓❓❓❓❓❓❓❓❓❓\n' +
        '*!futebolada* -> Começa a marcar a peladinha\n' +
        '*!apitofinal* -> Limpa tudo para preparar a próxima jornada\n' +
        '*!vou* -> Confirma a tua presença, campeão!\n' +
        '*!naovou* -> Para quando sofreste uma lesão inesperada\n' +
        '*!vai <nome>* -> Alguém a armar-se em conas? Aceita por ele\n' +
        '*!naovai <numero>* -> Desmarca o mitra\n' +
        '*!hora <hora>* -> Define a hora\n' +
        '*!dia <dia>* -> Define o dia\n' +
        '*!insulto <nome>* -> Manda mas é esse gajo foder\n' +
        '*!status* -> Confere o plantel + info sobre a partida\n' +
        '*!help* -> É literalmente isto otário. Chino no olho\n' + 
        '❓❓❓❓❓❓❓❓❓❓❓❓❓'
    
        return helpMessage;

    }
    
    status() {
        if (!this.#isBeingScheduled) {
            return this.#noGameInProgressMessage();
        } else {
            return this.#gameStatusMessage();
        }
    }

    hora(_hour) {
        if (!this.#isBeingScheduled) {
            return this.#noGameInProgressMessage();
        } else {
            this.#setTime(_hour);
            return this.#hourUpdatedMessage(_hour);
        }
    }

    #hourUpdatedMessage(_hour) {

        let msg =
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽\n' +
        `❗ *ATUALIZAÇÃO PLANO DE JOGO* ❗\n` +
        `Nova hora para kickoff: ${_hour}\n` +
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽'

        return msg;
    }

    dia(_day) {
        if (!this.#isBeingScheduled) {
            return this.#noGameInProgressMessage();
        } else {
            this.#setDate(_day);
            return this.#dateUpdatedMessage(_day);
        }
    }

    #dateUpdatedMessage(_day) {

        let msg =
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽\n' +
        `❗ *ATUALIZAÇÃO PLANO DE JOGO* ❗\n` +
        `Dia do kickoff: ${_day}\n` +
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽'

        return msg;
    }
    
    campo(_location) {

        if (!this.#isBeingScheduled) {
            return this.#noGameInProgressMessage();
        } else {
            this.#setLocation(_location);
            return this.#locationUpdatedMessage(_location);
        }

    }

    #locationUpdatedMessage(_location) {

        let msg =
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽\n' +
        `❗ *ATUALIZAÇÃO PLANO DE JOGO* ❗\n` +
        `Estádio: ${_location}\n` +
        '⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽'

        return msg;

    }

    acceptedCommands() {
        return this.#acceptedCommands;
    }


}

module.exports = {Futebolada};