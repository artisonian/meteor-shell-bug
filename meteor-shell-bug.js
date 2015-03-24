// _.ensure(a,b,c,d) ensures that a[b][c][d] exists. If it does not,
// it is created and set to {}. Either way, it is returned.
_.mixin({ensure: function (obj /*, arguments */) {
  for (var i = 1; i < arguments.length; i++) {
    var key = arguments[i];
    if (!(key in obj))
      obj[key] = {};
    obj = obj[key];
  }

  return obj;
}});

Meteor.methods({ensure: function (obj /*, arguments */) {
  _.ensure.apply(null, arguments);
  return obj;
}});

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);

      Meteor.call('ensure', {}, 'a', 'b', 'c', function (err, result) {
        if (err) {
          console.error(err);
          return;
        }

        console.log('ensure', JSON.stringify(result));
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
