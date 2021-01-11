const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[OLUMLU] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[OLUMLU] BOT: ${client.user.username} ismi ile giriş yapıldı!`);

    client.user.setActivity("Losint ♥ Development");
		client.user.setStatus("idle");
};