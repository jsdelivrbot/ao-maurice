"use strict";

module.exports = function(controller) {

    controller.hears('adventures', 'direct_message', function(bot, message) {

        controller.storage.teams.get('adventures', function(err, data) {
          var adventures = data;
          for (const key in adventures) {
            console.log(key,adventures[key]);
          }
        });

        //bot.reply(message,'Hello yourself!');
    });

};