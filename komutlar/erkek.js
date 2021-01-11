const { dc, MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ayar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
if(![(ayar.teyitçi)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 

  
//KANALLAR VE ROLLER + TAG
let tag = (ayar.tag)
const numara = await db.fetch('case')
const kayıtlı = (ayar.erkekrol)
const kayıtlı2 = (ayar.erkekrol2) 
const kayıtsız = (ayar.kayitsiz)
const chat = message.guild.channels.cache.find(r => r.id === (ayar.chat))
const kanal = message.guild.channels.cache.find(r => r.id === (ayar.kayıtkanal))
const emoji = message.guild.emojis.cache.find(r => r.name === (ayar.emojiisim))

if(!kayıtlı) return message.reply('Kayıtlı Rolü Ayarlanmamış.') 
if(!kayıtsız) return message.reply('Kayıtsız Rolü Ayarlanmamış.') 
  
  
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if(!member) return message.channel.send('Kimi Kayıt Etmem Gerekiyor ?')
let losxstg = message.guild.member(member)
let isim = args[1]
let yas = args[2]
if(!isim) return message.reply('İsim Belirt.')
if(!yas) return message.reply('Yaş Belirt.')
  
  
//İSİM - ROL DEĞİŞME
losxstg.setNickname(`${tag} ${isim} | ${yas}`)  
losxstg.roles.add(kayıtlı)
losxstg.roles.remove(kayıtsız)

//DB LER
db.add(`yetkili.${message.author.id}.toplam`, 1)
db.add(`yetkili.${message.author.id}.erkek`, 1)
let kayıtlar = db.get(`yetkili.${message.author.id}.toplam`);
let erkek = db.fetch(`yetkili.${message.author.id}.erkek`); 
db.add('case', 1)
if(numara === null) numara = "0"
if(numara === undefined) numara = "0"
moment.locale("tr");
db.set(`rol.${message.guild.id}`, (ayar.erkekrol))
db.push(`isim.${message.guild.id}`, {
  userID: member.id, 
  isim: isim,
  yas: yas,
  tag: tag,
  rol: Erkek
})
  
//CHAT EMBED
const chatembed = new MessageEmbed()
  .setColor("ffffff")
  .setDescription(`• <@${losxstg.user.id}> Aramıza Hoşgeldin, Keyifli Vakitler Geçirmeni Dilerim.`)
chat.send(chatembed)
  
  
//ONAY EMBED
const embed = new MessageEmbed()
.setDescription(`• <@${losxstg.user.id}>, <@${message.author.id}> tarafından ${erkekrol} olarak kaydedildi.
• İsmin \`${tag} ${isim} | ${yas}\` Olarak Değiştirildi.
• <@${message.author.id}> Tebrikler Toplamda ${kayıtlar} Kaydın Oldu !`)
.setFooter(`Kayıt Numarası: **#${numara}**`)
.setColor('00fff1')
message.react(emoji)
message.channel.send(embed)

//DM LOG EMBED
const dmlogembed = new MessageEmbed()
  .setTitle(`Bilgilendirme`)
  .setDescription(`• \`${message.guild.name}\` Sunucusunda, <@${message.author.id}> Tarafından \`${rol}\` Olarak Kaydedildin.
• İsmin \`${tag} ${isim} | ${yas}\` Olarak Değiştirildi.`)
  .setFooter(`Eğer Yanlışlık Varsa Yetkililere Bildir.`)
  .setColor('BLUE')
member.send(dmlogembed)
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["erkek", "e", "man", "boy"],
    permLevel: 0
};

exports.help = {
    name: "erkek"
}

