angular.module('starter.services', [])


/*
.factory('Links', function($http) {

  var links = [];

    return {
      createlink: function(login, login_new_contact) {
        return $http.post("https://link-us-back.herokuapp.com/users/createuser.json", 
          {user: {login: login, password: password}}).then(function(response){
            user = response.data;
            return user;
        })
      }
  }
})
*/


.factory('Users', function($http) {

  var users = [];

    return {
      createuser: function(login, password) {
        return $http.post("https://link-us-back.herokuapp.com/users/createuser.json", 
          {user: {login: login, password: password}}).then(function(response){
            user = response.data;
            return user.id;
        })
      },
      finduser: function(login, password) {
        return $http.get("https://link-us-back.herokuapp.com/users.json", 
          {user: {login: login, password: password}}).then(function(response){
            user = response.data;
            return user.id;
        })
      }
    }
})

.factory('Cards', function($http) {
  var cards = [];

  return {
    createcard: function(login, password, card_name, first_name, last_name, phone_nbr, facebook_link,
      linkedin_link, email, street, city, postal_code, country, description, picture_url) {

      // find the user id: make a $http.get to find out which userId corresponds to login and password
      // 1. get the whole json of all users 2. iterate to find the matching login 3. assign the userId accordingly
      var userId = 0; // default value for now
      return $http.get("https://link-us-back.herokuapp.com/users.json")
      .then(function(response) {
        users = response.data;
        for (var i = 0; i < users.length; i++) {
          if (users[i].login  === login) {
          userId = users[i].id;
          alert(userId + ", " + i);
          }
        }
        if(userId === 0){
          alert("wrong login");
          userId = 1;
        }
      })
      .then(function(response) {
        // here I have to find a way to stall in order to wait to find the right userId
        return $http.post("https://link-us-back.herokuapp.com/users/" + userId + "/createcard.json",
          {card: {card_name: card_name, first_name: first_name, last_name: last_name, phone_nbr: phone_nbr,
          facebook_link: facebook_link, linkedin_link: linkedin_link, email: email, street: street, city: city,
          postal_code: postal_code, country: country, description: description, picture_url: picture_url}})
      })
      .then(function(response2) {
        card = response2.data;
        return card;
      })
      .then(undefined, function(error) {
        console.log('ERR services > Cards : ', error.message);
      });
    }
  }
})


.factory('Contacts', function() {

  var contacts = [
  {
    id_meet: 0,
    id_card: 2,
    name: "Thomas Bessiere",
    Number: "06693929284",
    email: "thomas.bessiere@isae.fr",
    facebook: "https://www.facebook.com/thomas.bessiere1",
    MeetingPlace: "London, Imperial College",
    MeetingTime: "14:30, 09/10/2016"
  },
  {
    id_meet: 1,
    id_card: 4,
    name: "Ben Sparrow",
    Number: "06693929284",
      email: "abc@de.fr",
    facebook: "https://www.facebook.com/thomas.bessiere1",
    MeetingPlace: "Paris, Polytechnique",
    MeetingTime: "14:30, 10/10/2016"
  },
  {
    id_meet: 2,
    id_card: 6,
    name: "Yves Mégret",
    Number: "06693929284",
      email: "abc@de.fr",
    facebook: "https://www.facebook.com/thomas.bessiere1",
    MeetingPlace: "Cambridge, St John College",
    MeetingTime: "14:30, 11/10/2016"
  }, 
  {

    id_meet: 3,
    id_card: 8,
    name: "Leo Briand",
    Number: "06693929284",
    email: "abc@de.fr",
    facebook: "https://www.facebook.com/thomas.bessiere1",
    MeetingPlace: "LA, St John College",
    MeetingTime: "14:00, 15/10/2016"
  }, 
  {

    id_meet: 4,
    id_card: 10,
    name: "Jack Sparrow",
    Number: "06693929284",
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

/*
.factory('Contacts', function() {
    
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