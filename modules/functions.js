module.exports = (client) => {

  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m=>m.author.id == msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };

  // async function dropPoints() {
  //   if (message.channel.type !== 'text') return;
  //   console.log('Shit\'s happening');
  //   const actions = ['mine', 'drill', 'blob', 'coin'];
  //   const score = client.points.get(`${message.guild.id}-${message.author.id}`) || { points: 1, level: 0, user: message.author.id, guild: message.guild.id };
  //   const settings = client.settings.get(message.guild.id);
  //   const pickMethod = `${actions[Math.floor(Math.random() * actions.length)]}`;
  //   const response = await client.awaitReply(message, `Respond with ${settings.prefix}${pickMethod} to get a random amount of Blob Coins!`);
  //   if ([`${pickMethod}`].includes(response.toLowerCase())) {
  //     console.log('Blob Coin mined!');
  //     await response.delete();
  //     const points = (parseInt(settings.chatDrop));
  //     score.points += points;
  //     message.channel.send(`${message.author.username} grabbed the coins!`);
  //   }
  //   client.points.set(`${message.guild.id}-${message.author.id}`, score);
  // }

  // setInterval(dropPoints, 300000);

  // client.matchLetters = async (client, message);

  client.clean = async (client, text) => {
    if (text && text.constructor.name == 'Promise')
      text = await text;
    if (typeof evaled !== 'string')
      text = require('util').inspect(text, {depth: 0});

    text = text
      .replace(/`/g, '`' + String.fromCharCode(8203))
      .replace(/@/g, '@' + String.fromCharCode(8203))
      .replace(client.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0');

    return text;
  };

  client.getSettings = (id) => {
    const defaults = client.settings.get('default');
    let guild = client.settings.get(id);
    if (typeof guild != 'object') guild = {};
    const returnObject = {};
    Object.keys(defaults).forEach((key) => {
      returnObject[key] = guild[key] ? guild[key] : defaults[key];
    });
    return returnObject;
  };
  
  client.writeSettings = (id, newSettings) => {
    const defaults = client.settings.get('default');
    let settings = client.settings.get(id);
    if (typeof settings != 'object') settings = {};
    for (const key in newSettings) {
      if (defaults[key] !== newSettings[key])  {
        settings[key] = newSettings[key];
      }
    }
    client.settings.set(id, settings);
  };


  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  client.wait = require('util').promisify(setTimeout);

  process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    console.error('Uncaught Exception: ', errorMsg);
    process.exit(1);
  });

  process.on('unhandledRejection', err => {
    console.error('Uncaught Promise Error: ', err);
  });
};