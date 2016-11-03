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
.factory('logStatus', function ($http) {
  
  var service = {
    isLogged: false //default
  };

  return service;

  /*
  return{
    modifyStatus: function(newStatus){  // will be considered only when called
      isLogged = newStatus;
    },
    getStatus: function(){
      isLogged: isLogged;
      return isLogged;
    },

    // isLogged: isLogged
  };
  */
})

.factory('currentId', function($http){

  var service = {
    userId: 16  //default
  };

  return service;
})

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
        var userId = -1; // default value for now
        return $http.get("https://link-us-back.herokuapp.com/users.json"/*, 
          {user: {login: login, password: password}}*/).then(function(response){
            users = response.data;
            for (var i = 0; i < users.length; i++) {
              if (users[i].login  === login && users[i].password  === password) {
              userId = users[i].id;
              user = users[i];
              return userId;
              }
            }
            return -1;
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
    },
    all: function(userId) {
      return $http.get("https://link-us-back.herokuapp.com/cards.json"). 
      //return $http.get("https://api-shows-tonight.herokuapp.com/shows.json").
      then(function(response){
        cards = response.data.cards;
        for(var i = 0; i < cards.length; i++) {
          if(cards[i].user_id===userId) {
            cards.push(cards[i]);
          }
        }
        return cards;
      })
    },
    get: function(cardId) {
      return $http.get("https://link-us-back.herokuapp.com/cards.json"). 
      //return $http.get("https://api-shows-tonight.herokuapp.com/shows.json").
      then(function(response){
        cards = response.data.cards;
        for(var i = 0; i < cards.length; i++) {
          if(cards[i].card_id===cardId) {
            return cards[i];
          }
        }
        return null;
      })
    },
  }
})

.factory('Contacts', function($http) {

  var contacts = [];

    return {

      all: function(userId) {
        return $http.get("https://link-us-back.herokuapp.com/users/" + userId + "/showlinksbyuser.json"). 
          //return $http.get("https://api-shows-tonight.herokuapp.com/shows.json").
          then(function(response){
            contacts = response.data;
            contacts = contacts.links;
            return contacts; 
            })
            
        },
               
      get: function(contactId) {
      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].card_id === parseInt(contactId)) {
          return contacts[i];
        }
      }
      return null;
       },
      /*
      getloca: function(contact) {
            var loc = "";
            geocoder = new google.maps.Geocoder();
            var lat = 41.32;
            var lng = 3.21;
          
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                       loc =  "Location: " + results[1].formatted_address;
                        
                    }
                }
            });
            
      return loc;
      }
      */
    }
});

