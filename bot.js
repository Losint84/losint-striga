const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//-----------------------------------------------KOMUTLAR-------------------------------------------------\\



//------------------------------------------------------------------------------------------------------------\\



  
client.on("guildMemberAdd", async (member) => {
  member.roles.add(ayarlar.unregister)
  member.setNickname("TAG İsim | Yaş")
  });
  
  
  
  
  client.on("ready", async () => {
    let botVoiceChannel = client.channels.cache.get(ayarlar.botVoiceChannelID);
    if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot Ses Kanalına Bağlanamıyor."));
  });
  
  
  
  
  client.on("guildMemberAdd", member => {  
      const kanal = member.guild.channels.cache.find(r => r.id === 'REGİSTER KANAL ID');
      const register = `<@&TEYİTÇİ ROL ID>`
      let los = client.users.cache.get(member.id);
      require("moment-duration-format");
        const kurulus = new Date().getTime() - los.createdAt.getTime();  
     
          var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
        var üs = üyesayısı.match(/([0-9])/g)
        üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
        if(üs) {
          üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
            return {
              '0': ``,
              '1': ``,
              '2': ``,
              '3': ``,
              '4': ``,
              '5': ``,
              '6': ``,
              '7': ``,
              '8': ``,
              '9': ``}[d];
            })
          }
    
      var kontrol;
    if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil <:hayirr:793841629533437952>'
    if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir <:evett:793841629009281024>'
      moment.locale("tr");
const embed = new Discord.MessageEmbed()
.setTitle("Skyvester'a Hoşgeldin")
.setThumbnail(member.user.avatarURL({dynamic: true}))
.setDescription(`<a:morkitap:793841630460379168> Sunucu Adı'na Hoşgeldin <@${los.id}> !\n\n<a:yildiz:793841632881279008> Seninle beraber sunucumuz `  + üyesayısı +  ` kişiye ulaştı.\n\n<a:good6:793841629936746496> ` + kontrol + `\n\n<a:dikkat:793841629206806539> <@&795702938202406924> Rolündeki yetkililer seninle ilgilenecektir.\n\n<a:alev:793841628665610250> Kaydını tamamlamak için herhangi bir \`ꏪ The Dark Forest\` odalarından birine girmen yeterlidir.\n\n<a:duyuru:793841629857054791> Tagımızı alarak \`ꏪ\` ailemizin bir parçası olabilirsin.`)
.setFooter("Losint ♥ Code")
.setColor("RANDOM")
kanal.send(register)
kanal.send(embed)
    
//------------------------------------------------------------------------------------------------------------------------------------\\
  
  client.on("guildMemberAdd", member => {
      var moment = require("moment")
      require("moment-duration-format")
      moment.locale("tr")
       var {Permissions} = require('discord.js');
       var x = moment(member.user.createdAt).add(7, 'days').fromNow()
       var user = member.user
       x = x.replace("birkaç saniye önce", " ")
       if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
       const kytsz = member.guild.roles.cache.find(r => r.id === (ayarlar.unregister)) 
       var rol = member.guild.roles.cache.get(ayarlar.şüpheli) 
       var jail = member.guild.roles.cache.get(ayarlar.jailRol)
       var kayıtsız = member.guild.roles.cache.get(kytsz) 
       member.roles.add(rol)
       member.roles.remove(kytsz)
  
    member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
    setTimeout(() => {
    
    }, 1000)
    
    
       }
            else {
    
            }
        });
  
  //------------------------------------------------------------------------------------------------------------------------------------\\
  
  
  //-----------------------TAG-ROL----------------------\\     
  
  client.on("userUpdate", async (losxstg, yeni) => {
    var sunucu = client.guilds.cache.get(ayarlar.Guild); 
    var uye = sunucu.members.cache.get(yeni.id);
    var tag = (ayarlar.tag); 
    var tagrol = (ayarlar.tagRol); 
    var logKanali = (ayarlar.tagLog); 
  
    if (!sunucu.members.cache.has(yeni.id) || yeni.bot || losxstg.username === yeni.username) return;
    
    if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
      try {
        await uye.roles.add(tagrol);
        await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
        await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
      } catch (err) { console.error(err) };
    };
    
    if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
      try {
        await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
        await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
        await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
      } catch(err) { console.error(err) };
    };
  });
  //-----------------------TAG-ROL----------------------\\   
  
  //----------------------TAG-KONTROL----------------------\\     
  
  client.on("guildMemberAdd", member => {
    let sunucuid = (ayarlar.guild); 
    let tag = (ayarlar.tag); 
    let rol = (ayarlar.tagRol); 
  if(member.user.username.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
        .setTimestamp()
       client.channels.cache.get(ayarlar.tagLog).send(tagalma)
  }
  })
  
  //-----------------------TAG-KONTROL----------------------\\  
  
  client.on('message', msg => {
    if (msg.content === prefix + 'tag') {
      msg.channel.send('TAGINIZ');
    }
  });
  
  client.on('message', msg => {
    if (msg.content === 'tag') {
      msg.channel.send('TAGINIZ');
    }
  });
  
  
  client.on('message', msg => {
    if (msg.content === '!tag') {
      msg.channel.send('TAGINIZ');
    }
  });
  
  client.on('message', msg => {
    if (msg.content === '-tag') {
      msg.channel.send('TAGINIZ');
    }
  });   

});
