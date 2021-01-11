const { MessageEmbed } = require("discord.js")
const db = require('quick.db');
const ayar = require('../ayarlar.json');
module.exports.run = async (client, message, users, args) => {

    let embed = new MessageEmbed()
    .setColor("RANDOM")
    .setFooter("Losint ❤️ Code");
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;


    message.channel.send(embed.setDescription(`
    __**Kullanıcı Bilgisi;**__
    
    \`Kullanıcı Adı:\` **${member.user.tag}**
    \`ID:\` **${member.id}**
    \`Oluşturulma Tarihi:\` **${moment(member.user.createdAt).format("DD/MM/YY HH:mm:ss")}**

    __**Sunucu İçi Bilgisi;**__

    \`Rolleri:\` ${member.roles.cache.size > 8 ? `Çok Fazla Rolün Mevcut (${member.roles.cache.size})` : member.roles.cache.filter(x => x.name !== "@everyone").map(roles => roles).join(",")}
    \`Takma İsim:\` **${member.displayName.replace("`", "")}**
    \`Katılma Tarihi:\` **${moment(member.joinedAt).format("DD/MM/YY HH:mm:ss")}**
    `)
    .setTimestamp()
    .setThumbnail(`${member.user.avatarURL({dynamic: true})}`));
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kbilgi', 'kullanıcıbilgi', 'info'],
  permLevel: 0,
}

exports.help = {
      name: "kbilgi"
  
}