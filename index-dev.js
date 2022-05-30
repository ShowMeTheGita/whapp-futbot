const { Futebolada, Responder } = require("./classes.js");
const { Whatsapp } = require('./whapp.js');

// In order to not log in with the PROD token, delete the whole ./data folder before the first run on dev
// Start dev environment with node index-dev.js
// Scan QR code
// You can now restart the app and the QR code will no longer be requested


// My devchat 34602256248@c.us
// Change the value of devChat to one from your testing number
const devChat = '34602256248@c.us';
const ftb = new Futebolada();
const rsp = new Responder(ftb);
const whapp = new Whatsapp(rsp, devChat);

whapp.connect();

