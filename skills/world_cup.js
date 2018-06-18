"use strict";
module.exports = function (controller) {

    // add event handlers to controller
    // such as hears handlers that match triggers defined in code
    // or controller.studio.before, validate, and after which tie into triggers
    // defined in the Botkit Studio UI.

    const users = require('../worldcup/users.json');
    const countries = require('../worldcup/countries.json');
    const events = require('../worldcup/matches.json');

    const day_name = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const month_name = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];

    function str_pad(n) {
        return String("00" + n).slice(-2);
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    controller.hears(['worldcup', '^wc$'], 'direct_message,direct_mention,mention', function (bot, message) {

        let nextMatch;
        let dateNow = new Date();
        let dateEnd = new Date().setHours(dateNow.getHours() + 24);
        for (var i = 0; i < events.length; i++) {
            let item = events[i];
            let itemDate = new Date(item.date);
            if (itemDate > dateNow && itemDate <= dateEnd) {
                nextMatch = item;
                break;
            }
        }

        function getNextMatch(eventDate) {
            let match_str;
            for (var i = 0; i < events.length; i++) {
                let matchItem = events[i];
                if (matchItem.date === eventDate) {
                    let matchDate = new Date(matchItem.date);
                    let team1 = getTeam(matchItem.teams[0]);
                    let team2 = getTeam(matchItem.teams[1]);

                    let team1User = getUserByTeam(team1.id);
                    let team2User = getUserByTeam(team2.id);

                    match_str = "Le prochain match opposera: \n";
                    match_str += team1.icon + " *" + team1.name + "* (_<@" + team1User.name + ">_) vs. " + team2.icon + " *" + team2.name + "* (_<@" + team2User.name + ">_)\n";
                    match_str += " le _" + day_name[matchDate.getDay()] + " " + str_pad(matchDate.getDate()) + ' ' + month_name[matchDate.getMonth()] + " " + matchDate.getFullYear() + "_";
                    match_str += " à _" + str_pad(matchDate.getHours()) + "h" + str_pad(matchDate.getMinutes()) + "_";
                }
            }

            return match_str;
        }

        function getTeam(teamID) {
            for (var i = 0; i < countries.length; i++) {
                if (countries[i].id === teamID) {
                    return countries[i];
                }
            }
        }

        function getUserByTeam(teamID) {
            let user;
            for (var i = 0; i < users.length; i++) {
                let curr_user = users[i];
                for (var j = 0; j < curr_user.teams.length; j++) {
                    if (curr_user.teams[j] === teamID) {
                        user = curr_user;
                    }
                }
            }

            bot.api.users.info({user: user.id}, function (err, info) {
                user = info.user;
            });

            return user;
        }

        bot.reply(message, getNextMatch(nextMatch.date));

    });
    controller.hears(['^wc list$'], 'direct_message,direct_mention,mention', function (bot, message) {

        let reply_with_attachments = {
            'username': 'Maurice',
            'text': 'Voici la liste des prochains matchs.',
            'attachments': getMatchList()
        };

        function getTeam(teamID) {
            for (var i = 0; i < countries.length; i++) {
                if (countries[i].id === teamID) {
                    return countries[i];
                }
            }
        }

        function getUserByTeam(teamID) {
            let user;
            for (var i = 0; i < users.length; i++) {
                let curr_user = users[i];
                for (var j = 0; j < curr_user.teams.length; j++) {
                    if (curr_user.teams[j] === teamID) {
                        user = curr_user;
                    }
                }
            }

            bot.api.users.info({user: user.id}, function (err, info) {
                user = info.user;
            });

            return user;
        }

        function getMatchList() {
            let attachments = [];
            for (var i = 0; i < events.length; i++) {
                let card = {};
                let matchItem = events[i];
                let matchDate = new Date(matchItem.date);

                if (matchDate >= new Date()) {
                    let team1 = getTeam(matchItem.teams[0]);
                    let team2 = getTeam(matchItem.teams[1]);
                    let team1User = getUserByTeam(team1.id);
                    let team2User = getUserByTeam(team2.id);

                    card.title = team1.name + " " + team1.icon + " vs. " + team2.icon + " " + team2.name;
                    card.fallback = card.title;
                    card.text = "<@" + team1User.name + "> vs. <@" + team2User.name + "> \n";
                    card.text += "le _" + day_name[matchDate.getDay()] + " " + str_pad(matchDate.getDate()) + ' ' + month_name[matchDate.getMonth()] + " " + matchDate.getFullYear() + "_";
                    card.text += " à _" + str_pad(matchDate.getHours()) + "h" + str_pad(matchDate.getMinutes()) + "_";
                    card.color = getRandomColor();

                    attachments.push(card);
                }
            }

            return attachments;
        }


        // bot.reply(message, reply_with_attachments);

        bot.startPrivateConversation(message, function (err, convo) {
            convo.say(reply_with_attachments);
        });
    });
};