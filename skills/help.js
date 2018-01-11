module.exports = function(controller) {

  controller.hears('^help$','direct_message,direct_mention',function(bot,message) {
    
    var reply_with_attachments = {
      'username': 'Maurice' ,
      'text': 'Comment puis-je vous aider ?',
      'attachments': [
        {
          'fallback': 'Je raconte des blagues',
          'title': 'Je raconte des blagues',
          'text': '- Quand on me le demande avec `fact` \n'+
                  '- Je peux énumérer celles que je connais: `facts` \n'+
                  '- Tu peux m\'en apprendre avec `addfact _blague_` \n' +
                  '- Si tu as un Flashouilleur... `remfact _numéro_` fonctionne aussi.',
          'color': '#7CD197'
        }
        //,
        // {
        //   'title': 'Do you want to interact with my buttons?',
        //   'callback_id': '123',
        //   'attachment_type': 'default',
        //   'actions': [
        //     {
        //       'name':'yes',
        //       'text': 'Yes',
        //       'value': 'yes',
        //       'type': 'button',
        //     },
        //     {
        //       'name':'no',
        //       'text': 'No',
        //       'value': 'no',
        //       'type': 'button',
        //     }
        //   ]
        // }
      ]
    }

    bot.reply(message, reply_with_attachments);
    
  });

  
}
