module.exports = function(controller) {

  controller.hears('^talk$','direct_message', function(bot, message) {

    bot.startConversation(message, function(err, convo) {
      
      convo.addQuestion('Question 1',[
      {
        pattern: 'done',
        callback: function(response,convo) {
          convo.gotoThread('page_2');
        }
      },
      {
        pattern: 'nope',
        callback: function(response,convo) {
          convo.say('plop');
          convo.next();
        }
      },
      {
        default: true,
        callback: function(response,convo) {
          // just repeat the question
          convo.repeat();
          convo.next();
        }
      }
    ],{},'default');
      
      convo.addQuestion('Question 2',[
      {
        pattern: 'done',
        callback: function(response,convo) {
          convo.next();
        }
      },
      {
        pattern: 'nope',
        callback: function(response,convo) {
          convo.next();
        }
      },
      {
        default: true,
        callback: function(response,convo) {
          // just repeat the question
          convo.repeat();
          convo.next();
        }
      }
    ],{},'page_2');
      

    });
      
  });
  
}