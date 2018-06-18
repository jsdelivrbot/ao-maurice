"use strict";
module.exports = function (controller) {

    var chapters = require('../ldvelh/mysteres-de-sylandra.json');


    controller.hears(['aventure'], 'direct_message,direct_mention,mention', function (bot, message) {

        // console.log("bot", bot);
        // console.log("message", message);

        bot.startPrivateConversation(message, function (err, convo) {

            for (var i = 0; i < chapters.length; i++) {
                var chapter = chapters[i];
                var chapter_buttons = [];
                var chapter_options = [];

                for (var j = 0; j < chapter.options.length; j++) {
                    var curr_option = chapter.options[j];
                    chapter_buttons.push({
                        name: curr_option.title,
                        text: curr_option.title,
                        value: "page_" + curr_option.action,
                        type: "button"
                    });
                    chapter_options.push({
                        pattern: "page_" + curr_option.action,
                        callback: function (response, convo) {
                            bot.replyInteractive(response, {text: response.original_message.text + "\n> *" + response.actions[0].name + "*"});
                            convo.gotoThread(response.actions[0].value);
                        }
                    });
                }// endfor(chapter.options)

                convo.addQuestion({
                    text: chapter.text,
                    attachments: [{
                        fallback: "Choisir une action",
                        callback_id: "page_" + chapter.id,
                        actions: chapter_buttons
                    }]
                }, chapter_options, {}, "page_" + chapter.id + "");
            } // endfor(chapters)

            convo.addQuestion({
                text: "Je suis pret à te faire vivre une aventure !",
                attachments: [{
                    text: "Veux-tu continuer ?",
                    fallback: "Choisir une action",
                    callback_id: 'default',
                    actions: [{
                        name: "oui",
                        text: "Oui",
                        value: 'yes',
                        type: "button"
                    }, {
                        name: "non",
                        text: "Non",
                        value: false,
                        type: "button"
                    }]
                }]
            }, [{
                pattern: "yes",
                callback: function (response, convo) {
                    bot.replyInteractive(response, {text: "C'est parti !"});
                    convo.gotoThread('page_1');
                }
            }, {
                default: true,
                callback: function (response, convo) {
                    bot.replyInteractive(response, {text: "tu n'es pas prêt ?\n OK! À bientôt."});
                    convo.next();
                }
            }], {}, 'default');

            convo.activate();
        });

    });

};