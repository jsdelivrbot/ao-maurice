"use strict";
module.exports = function (controller) {

    controller.hears('^help$', 'direct_message,direct_mention', function (bot, message) {

        var reply_with_attachments = {
            'username': 'Maurice',
            'text': 'Comment puis-je vous aider ?',
            'attachments': [
                {
                    'fallback': 'Je raconte des blagues',
                    'title': 'Je raconte des blagues',
                    'text': '- Quand on me le demande avec `fact` \n' +
                    '- Je peux énumérer celles que je connais: `facts` \n' +
                    '- Tu peux m\'en apprendre avec `addfact _blague_` \n' +
                    '- Si tu as un Flashouilleur... `remfact _numéro_` fonctionne aussi.',
                    'color': '#7CD197',
                    'thumb_url': ''
                },
                {
                    'fallback': 'Tu veux vivre une super aventure ?',
                    'title': 'Tu veux vivre une super aventure ?',
                    'text': 'Demande le moi avec `aventure`',
                    'color': '#439FE0',
                    'thumb_url': 'https://cdn4.iconfinder.com/data/icons/miscellaneous-icons-1/200/misc_game_combat-512.png'
                }
            ]
        };

        bot.reply(message, reply_with_attachments);

    });
};
