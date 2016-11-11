angular.module('starter.services', [])


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

.factory('Links', function($http) {

  var links = [];

    return {
      createlink: function(myCardId, userid) {
        return $http.post("https://link-us-back.herokuapp.com/users/" + userid + "/createrequest.json", {link_request: {card_id: myCardId, lat: 48.713549, lng: 2.215676} }); //return instruction to create a link of which take: return  $http.get("https://link-us-back.herokuapp.com/users/" + userid + "/createrequest")
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
               
      get: function(contactCardId) {
      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].card_id === parseInt(contactCardId)) {
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
})

.factory('Cards', function($http) {
  var cards = [];

  return {
    createcard: function(card_name, first_name, last_name, phone_nbr, facebook_link,
      linkedin_link, email, street, city, postal_code, country, description, picture_url, userId) {

        console.log("hey jude" + userId);

        return $http.post("https://link-us-back.herokuapp.com/users/" + userId + "/createcard.json",
          {card: {card_name: card_name, first_name: first_name, last_name: last_name, phone_nbr: phone_nbr,
          facebook_link: facebook_link, linkedin_link: linkedin_link, email: email, street: street, city: city,
          postal_code: postal_code, country: country, description: description, picture_url: picture_url}})
      .then(function(response) {
        card = response.data;
        return card;
      })
      .then(undefined, function(error) {
        console.log('ERR services > Cards : ', error.message);
      });
    },
    all: function(userId) {
      return $http.get("https://link-us-back.herokuapp.com/cards.json"). 
      then(function(response){

        cards = [];
        cards_data = response.data;
        cards_data = cards_data.cards;

        for(var i = 0; i < cards_data.length; i++) {
          console.log(cards_data[i].user_id);
          if(cards_data[i].user_id===userId) {
            cards.push(cards_data[i]);
            console.log("good news" + cards_data[i].user_id);
          }
        }

        console.log(cards);
        return cards;
      })
    },
    /*
    get: function(cardId) {
      return $http.get("https://link-us-back.herokuapp.com/cards.json"). 
      then(function(response){
        cards_data = response.data;
        cards_data = cards_data.cards;
        for(var i = 0; i < cards_data.length; i++) {
          if(cards_data[i].id===cardId) {
            cards = cards_data[i];
            return cards;
          }
        }
        return null;
      })
    },
    
    */
    get: function(cardId) {
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].id === parseInt(cardId)) {
          console.log("lolilol" + cards[i].user_id)
          return cards[i];
        }
      }
      return null;
       },
  
  }
});


