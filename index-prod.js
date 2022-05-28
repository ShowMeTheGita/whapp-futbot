const { Futebolada, Responder } = require("./classes.js");
const { Whatsapp } = require('./whapp.js');

const futloliesChat = '351915226805-1555439720@g.us';
const ftb = new Futebolada();
const rsp = new Responder(ftb);
const whapp = new Whatsapp(rsp, futloliesChat);

whapp.connect();