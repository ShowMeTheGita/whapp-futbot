const { Futebolada, Responder } = require("./classes.js");
const { Whatsapp } = require('./whapp.js');

const devChat = '34602256248@c.us';
const ftb = new Futebolada();
const rsp = new Responder(ftb);
const whapp = new Whatsapp(rsp, devChat);

whapp.connect();

