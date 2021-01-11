Selamlar!
Bu botu glitch denen sitede kullanan aklı yarım kardeşim.
Herhangi bir çalınma söz konusunda yetkililerden bir şey beklemeyin
Eğer tokenin çalınmasını istemiyorsanız bot.js dosyasında alttaki "client.login(ayarlar.token)"
yazan yeri "client.login(process.env.token)" diye değiştir ve .env dosyasında soldaki boş kısma "token" yazıp sağ tarafada tokeninizi yazdığınız zaman bu işler sona ericktir.
Bunun dışında bot tamamen ayarlar.json'dan ayarlamalıdır.
Şimdiden iyi kullanımlar.

İmza: losint