module.exports = function(controller) {
  
  controller.hears(['^facts$','^blagues$'], 'direct_message', function(bot, message) {
    
    controller.storage.teams.get(message.team, function(err, team) {
      
      if (!team || !team.facts || team.facts.length == 0) {
        bot.reply(message, 'Je ne me souviens de rien. Racontes en moi avec `addfact _fact_`.');
      } else {
        var text = 'Voici les facts dont je me souviens: \n' + generateFactList(team);
        bot.reply(message, text);
      }  
    });
    
  });
  
  controller.hears(['^addfact (.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
    
    var newfact = message.match[1];
    
    controller.storage.teams.get(message.team, function(err, team) {
      
      if (!team){
        team = {};
        team.team_id = message.team_id;
      }
      if (!team.facts) {
        team.facts = [];
      }
      
      team.facts.push(newfact);
      
      controller.storage.teams.save(team, function(err, saved) {
        if (err) {
          bot.reply(message, 'Je ne sais pas quoi faire... :sob:, ' + err);
        } else {
          bot.api.reactions.add({
            name: 'thumbsup',
            channel: message.channel,
            timestamp: message.ts
          });
        }
      });
      
    });
  });
  
  controller.hears(['^remfact (.*)'],'direct_message,direct_mention,mention', function(bot, message) {
  
    var number = message.match[1];
    
    if (isNaN(number)) {
      bot.reply(message, 'Peux-tu être plus précis ?');
    } else {
      number = parseInt(number) - 1;
      
      controller.storage.teams.get(message.team, function(err, team) {
        
        if (!team) {
          team = {};
          team.team_id = message.team_id;
        }
        
        if (!team.facts) {
          team.facts = [];
        }
        
        if (number < 0 || number >= team.facts.length){
          bot.reply(message, 'Désolé, je ne comprend rien a ce que tu raconte. Il y a '+ team.facts.length +' facts dans ma liste.');
        } else {
          var item = team.facts.splice(number,1);
          
          controller.storage.teams.save(team, function(err, saved) {
            if (err) {
              bot.reply(message, 'Je ne sais pas quoi faire... :sob:, ' + err);
            } else {
              bot.reply(message,'~'+ item +'~');
              
              if (team.facts.length > 0) {
                bot.reply(message, 'Il reste maintenant ' + team.facts.length + ' facts dans ma liste.');
              } else {
                bot.reply(message, 'Quoi ?! je ne me souviens de rien...');
              }
            }
          });
        }
        
      });
    }    
  });
  
  controller.hears(['fact (.*)','fact','blague','blague (.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
    console.log(message);
    var number = message.match[1];
    
    controller.storage.teams.get(message.team, function(err, team) {      
      if (!team || !team.facts || team.facts.length == 0) {
        bot.reply(message, 'Je ne me souviens de rien. Racontes en moi avec `addfact _fact_`.');
      } else {
        if (!number || isNaN(number)) {
          var text = getRandomFact(team);
          bot.reply(message, text);
        } else {
          number = parseInt(number) - 1;
          
          bot.reply(message, '>' + team.facts[number]);
          
        }
      }  
    });
  });
  
  
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function generateFactList(team) {
    var text = '';
    
    for (var t = 0; t < team.facts.length; t++) {
      text = text + '> `#'+ (t+1) +'`) ' + team.facts[t] + '\n';
    }
    
    return text;
  }
  
  function getRandomFact(team) {
    var text = '';
    var t = getRandomIntInclusive(0, team.facts.length);
    text = '>' + team.facts[t] + '\n';
    
    return text;
  }
  
};