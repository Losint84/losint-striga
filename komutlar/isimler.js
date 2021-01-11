const { MessageEmbed } = require("discord.js")
const db = require('quick.db');
const ayar = require('../ayarlar.json');
module.exports.run = async (client, message, users, args) => {

    if(!message.member.roles.cache.some(r => [(ayar.teyitçi)].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))
    return message.reply("Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.")
    
//------------------------------------------------KAYITLAR-----------------------------------------------\\  

let user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let isim = message.mentions.members.first() || message.guild.members.get(args[0]);
var sayi = 1 
let data = db.get(`isim.${message.guild.id}`)
let rol = db.fetch(`rol.${message.guild.id}`)
if(!data) return message.channel.send(new MessageEmbed()
    .setColor("0x2f3136") 
    .setThumbnail(user.user.avatarURL ({ dynamic: true}))      
    .setDescription(`${isim} Adlı Kullanıcı Daha Önce Kayıt Olmamış.`)
    .setColor("0x2f3136"))
let isimler = data.filter(x => x.userID === isim.id).map(x => `**#${sayi++}** \`${(ayar.tag)} ${x.isim} | ${x.yas}\`  (<@&${rol}>)\n`).join("\n")
if(isimler === null) isimler = "Kullanıcı Hiç Kayıt Olmamış"
if(isimler === undefined) isimler = "Kullanıcı Hiç Kayıt Olmamış"
//------------------------------------------------KAYITLAR-----------------------------------------------\\      


const embed = new MessageEmbed()
.setColor("0x2f3136")
        .setThumbnail(user.user.avatarURL ({ dynamic: true}))     
    .setAuthor(`Bu Kullanıcı ${sayi-1} Kere Kayıt Olmuş`) 
    .setDescription(`${isimler}`)
    .setColor("0x2f3136")
message.channel.send(embed)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['isimler', 'names'],
  permLevel: 0,
}

exports.help = {
      name: "isimler"
  
}