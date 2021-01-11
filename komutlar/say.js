const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const moment = require('moment')
const prefix = ayarlar.prefix;

let tag = "ヤ";
let cetoplam = message.guild.memberCount
let ceonline = message.guild.members.cache.filter(o => o.user.presence.status !== "offline").size
let cesesli = message.guild.members.cache.filter(s => s.voiceChannel).size 
let cetagli = message.guild.members.cache.filter(t => t.user.username.includes(tag)).size
let cebooster = message.guild.roles.cache.get('782876847113240579').members.size

  const mapping = {
  "0": "<a:0_:784533993206186034>",
  "1": "<a:1_:784534041411059753>",
  "2": "<a:2_:784534081958314037>",
  "3": "<a:3_:784534129185128528>",
  "4": "<a:4_:784534157740867624>",
  "5": "<a:5_:784534182301925446>",  //EMOJİLERİNİZ
  "6": "<a:6_:784534208571113512>",
  "7": "<a:7_:784534236358377522>",
  "8": "<a:8_:784534323318620210>",
  "9": "<a:9_:784534355656966154>",
};



let toplam =  
    `${cetoplam}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
let online =  
    `${ceonline}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")

let sesli =  
    `${cesesli}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
let tagli =  
    `${cetagli}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
let booster =  
    `${cebooster}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")



const embed2 = new Discord.MessageEmbed()
.setColor('PURPLE')
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`**• Toplam Üye ・ ${toplam}
• Aktif Üye ・ ${online}
• Sesteki Üye ・ ${sesli}
• Taglı Üye ・ ${tagli}
• Booster Üye ・ ${booster}**`)  
message.channel.send(embed2)
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['say'],
    permLevel: 0,
}

exports.help = {
      name: "say"  
  
}