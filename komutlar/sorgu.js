const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.some(r => [(ayar.teyitçi)].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))
    return message.reply("Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.")
 
 let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    
  
 if(!kullanıcı) {

    let erkek = db.fetch(`yetkili.${message.author.id}.erkek`);
    let kadın = db.fetch(`yetkili.${message.author.id}.kadin`);
    let kayıtlar = db.fetch(`yetkili.${message.author.id}.toplam`);  
    

    if(erkek === null) erkek = "0"
    if(erkek === undefined) erkek = "0"
    if(kadın === null) kadın = "0"
    if(kadın === undefined) kadın = "0"
    if(kayıtlar === null) kayıtlar = "0"
    if(kayıtlar === undefined) kayıtlar = "0"

    const kayıtlar2 = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL ({ dynamic: true}))
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`• Toplam Kayıtlar:  \`${kayıtlar}\`
    • Toplam Erkek Kayıtların: \`${erkek}\`
    • Toplam Kadın Kayıtların: \`${kadın}\`
    `)
    .setFooter("Losint ❤️ Code")
    return message.channel.send(kayıtlar2)


};



if(kullanıcı) {
let erkek1 = db.fetch(`yetkili.${message.author.id}.erkek`);
let kadin1 = db.fetch(`yetkili.${message.author.id}.kadin`); 
let kayıtlar1 = await db.fetch(`yetkili.${kullanıcı.id}.toplam`);  
    

if(kayıtlar1 === null) kayıtlar1 = "0"
if(kayıtlar1 === undefined) kayıtlar1 = "0"
if(erkek1 === null) erkek1 = "0"
if(erkek1 === undefined) erkek1 = "0"
if(kadin1 === null) kadin1 = "0"
if(kadin1 === undefined) kadin1 = "0"
const kayıtlar3 = new Discord.MessageEmbed()
.setThumbnail(kullanıcı.avatarURL ({ dynamic: true})) 
.setAuthor(`${kullanıcı.username}`)
.setDescription(`• Toplam Kayıtların: \`${kayıtlar1}\`
• Toplam Erkek Kayıtların: \`${erkek1}\`
• Toplam Kadın Kayıtların: \`${kadin1}\`
`)
.setFooter("Losint ❤️ Code")
return message.channel.send(kayıtlar3)
}

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["stat", "kayıtlar", "kayıt-kontrol"],
    permLvl: 0,
}

exports.help = {
      name: "stat"
  
}