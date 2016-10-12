angular.module('starter.services', [])

.factory('Contacts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var contacts = [{
    id_meet: 0,
    id_card: 3,
    MeetingPlace: 'London, Imperial College',
    MeetingTime: '14:30, 09/10/2016'
  }, {
    id_meet: 1,
    id_card: 3,
    MeetingPlace: 'Paris, Polytechnique',
    MeetingTime: '14:30, 10/10/2016'
  }, {
    id_meet: 2,
    id_card: 1,
    MeetingPlace: 'Cambridge, St John College',
    MeetingTime: '14:30, 11/10/2016'
  }, {

    id_meet: 3,
    id_card: 3,
    MeetingPlace: 'LA, St John College',
    MeetingTime: '14:00, 15/10/2016'
  }, {

    id: 4,
    id_card: 3,
    MeetingPlace: 'NYC, St John College',
    MeetingTime: '14:00, 15/10/2016'
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
        if (contacts[i].id_meet === parseInt(contactId)) {
          return contacts[i];
        }
      }
      return null;
    }
  };
})


.factory('Cards', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var cards = [{
    id: 0,
    name: 'Ben Sparrow',
    Phone: 2093810381294, 
    email: 'ben.sparrow@polytechnique.edu',
    facebook: 'https://www.facebook.ben.com/sparrow1',
  }, {
    id: 1,
    name: 'Thomas bessiere',
    Phone: 2093810381294,
    email: 'thomas.bessiere@polytechnique.edu',
    facebook: 'https://www.facebook.ben.com/thomas.bessiere1',
  }, {
    id: 2,
    name: 'Yves Megret',
    Phone: 2093810381294,
    email: 'yves.megret@polytechnique.edu',
    facebook: 'https://www.facebook.ben.com/yves.megret1',
  }];

  

  return {
    all: function() {
      return cards;
    },
    remove: function(card) {
      cards.splice(cards.indexOf(card), 1);
    },
    get: function(cardId) {
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].id === parseInt(cardId)) {
          return cards[i];
        }
      }
      return null;
    }
  };
})