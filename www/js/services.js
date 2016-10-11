angular.module('starter.services', [])

.factory('Contacts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var contacts = [{
    id: 0,
    name: 'Ben Sparrow',
    Phone: 2093810381294,
    MeetingPlace: 'London, Imperial College',
    MeetingTime: '14:30, 09/10/2016'
  }, {
    id: 0,
    name: 'Thomas bessiere',
    Phone: 2093810381294,
    MeetingPlace: 'London, Imperial College',
    MeetingTime: '14:30, 09/10/2016'
  }, {
    id: 0,
    name: 'Yves Megret',
    Phone: 2093810381294,
    MeetingPlace: 'London, Imperial College',
    MeetingTime: '14:30, 09/10/2016'
  }];

  return {
    all: function() {
      return contacts;
    },
    remove: function(contact) {
      contacts.splice(contacts.indexOf(contact), 1);
    },
    get: function(contactId) {
      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id === parseInt(contactId)) {
          return contacts[i];
        }
      }
      return null;
    }
  };
});
