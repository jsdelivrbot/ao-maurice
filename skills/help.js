"use strict";
module.exports = function (controller) {

    controller.hears('^help$', 'direct_message,direct_mention', function (bot, message) {

        var reply_with_attachments = {
            'username': 'Maurice',
            'text': 'Comment puis-je vous aider ?',
            'attachments': [
                {
                    'fallback': 'Je raconte des blagues',
                    'title': 'Je raconte des blagues :joy: :speech_balloon:',
                    'text': '- Quand on me le demande avec `fact` \n' +
                    '- Je peux énumérer celles que je connais: `facts` \n' +
                    '- Tu peux m\'en apprendre avec `addfact _blague_` \n' +
                    '- Si tu as un Flashouilleur... `remfact _numéro_` fonctionne aussi.',
                    'color': '#7CD197'
                },
                {
                    'fallback': 'Tu veux vivre une super aventure ?',
                    'title': 'Tu veux vivre une super aventure ? :crossed_swords: :shield:',
                    'text': 'Demande le moi avec `aventure`',
                    'color': '#439FE0'
                },
                {
                    'fallback': 'Soccer Worldcup 2018',
                    'title': 'Soccer Worldcup 2018 :soccer: :trophy:',
                    'text': '- Tu veux savoir quel est le prochain match ? Demande moi avec `worldcup` ou `wc` \n' +
                    '- Tu veux avoir la liste de tous les prochains match ? Demande moi avec `wc list`',
                    'color': '#ff0000'
                },
                {
                    'fallback': 'Vous voulez insérer des choses dans mon cerveau ? ',
                    'title': 'Vous voulez insérer des choses dans mon cerveau ? :brain: :vibration_mode:',
                    'text': 'Rien de plus simple, inscris toi sur `https://glitch.com/` et demande les droits '+ 
                            'à <@U0T2AUH6H>. Si il accepte, tu auras accès à mon magnifique cerveau.',
                    'color': '#fed28a'
                }
            ]
        };

        bot.reply(message, reply_with_attachments);

    });
};
