angular.module('starter.services', [])

/*
.factory('Contacts', function() {
  // Might use a resource here that returns a JSON array

    
  // With Heroku
  var contacts = [];

  return {
    all: function(userId) {
      return $http.get("http://link-us-back.herokuapp.com/"+ userId +  ".json")
        .then(function(response) {
          contacts = response.data;
          return contacts;
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
});
*/



.factory('Contacts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var contacts = [
  {
    id_meet: 0,
    id_card: 2,
    name: "Thomas Bessiere",
    Number: 06693929284,
    facebook: "https://www.facebook.com/thomas.bessiere1",
    MeetingPlace: "London, Imperial College",
    MeetingTime: "14:30, 09/10/2016"
  },
  {
    id_meet: 1,
    id_card: 4,
    name: "Ben Sparrow",
    Number: 06693929284,
      email: "abc@de.fr",
    facebook: "https://www.facebook.com/thomas.bessiere1",
    MeetingPlace: "Paris, Polytechnique",
    MeetingTime: "14:30, 10/10/2016"
  },
  {
    id_meet: 2,
    id_card: 6,
    name: "Yves Mégret",
    Number: 06693929284,
      email: "abc@de.fr",
    facebook: "https://www.facebook.com/thomas.bessiere1",
    MeetingPlace: "Cambridge, St John College",
    MeetingTime: "14:30, 11/10/2016"
  }, 
  {

    id_meet: 3,
    id_card: 8,
    name: "Leo Briand",
    Number: 06693929284,
    email: "abc@de.fr",
    facebook: "https://www.facebook.com/thomas.bessiere1",
    MeetingPlace: "LA, St John College",
    MeetingTime: "14:00, 15/10/2016"
  }, 
  {

    id_meet: 4,
    id_card: 10,
    name: "Jack Sparrow",
    Number: 06693929284,
      email: "abc@de.fr",
    facebook: "https://www.facebook.com/thomas.bessiere1",
    MeetingPlace: "NYC, St John College",
    MeetingTime: "14:00, 15/10/2016"
  }
];

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
});