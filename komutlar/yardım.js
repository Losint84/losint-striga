const { MessageEmbed } = require("discord.js")
module.exports.run = async (client, message, users, args) => {

    let yardım = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`${client.user.username} - Komutlar`)
    .setDescription(`**\`Genel\`**
    » \`.say\`: **Sunucunun İstatistiklerini Gösterir**
    
    **\`Yetkili\`**
    » \`.erkek/kız <isim> <yas>\`: **Belirtilen Kullanıcıyı Kayıt Edersiniz**
    » \`.stat\`: **Etiketlediğin & Kendi Kayıtların Hakkında Bilgi Verir**
    » \`.topteyit\`: **Toplam Teyit Sıralamasını Gösterir**
    » \`.kayıtsız\`: **Etiketlediğin Kullanıcıyı Kayıtsıza Atar**
    » \`.isimler @Üye\`: **Kullanıcının İsimlerini Gösterir**`)
  .setThumbnail(message.author.avatarURL({dynamic: true}))
  .setFooter("Developed by Losint")
  message.channel.send(yardım)
    
     
    
  };


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım', 'help'],
  permLevel: 0,
}

exports.help = {
      name: "yardım"
  
}
