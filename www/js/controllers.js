angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('ContactsCtrl', function($scope, Contacts) {
  $scope.contacts = Contacts.all();
/*    
.controller('ContactsCtrl', function($scope, Contacts) {
  $scope.contacts = [];
  Contacts.all().then(function(apiShows) { $scope.contacts = apiContacts;
  });
    */
})


.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts) {
  $scope.contact = Contacts.get($stateParams.contactId); 

})


.controller('AccountCtrl', function($scope, $stateParams, $ionicModal, Users, Cards) {

  // create user
  $ionicModal.fromTemplateUrl('templates/modalcreateuser.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalcreateuser = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modalcreatecard.html', {
  scope: $scope,
  animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalcreatecard = modal;
  });

  // createuser
  $scope.openModalcreateuser = function() {
    $scope.modalcreateuser.show();
  };
  $scope.closeModalcreateuser = function() {
    $scope.modalcreateuser.hide();
  };

  $scope.createuser = function(login, password) {
    return Users.createuser(login, password)
    .then(function(response) {
      console.log("User", user);
      alert("New user has been created ");
      $scope.closeModalcreateuser();
    })
  }

  // create card
  $scope.openModalcreatecard = function() {
    $scope.modalcreatecard.show();
  };
  $scope.closeModalcreatecard = function() {
    $scope.modalcreatecard.hide();
  };

  $scope.createcard = function(login, password, card_name, first_name, last_name, phone_nbr, facebook_link, 
        linkedin_link, email, street, city, postal_code, country, description, picture_url) {

    return Cards.createcard(login, password, card_name, first_name, last_name, phone_nbr, facebook_link, 
        linkedin_link, email, street, city, postal_code, country, description, picture_url)
    .then(function(response) {
      console.log("Card", card);
      alert("New card has been created ");
      $scope.closeModalcreatecard();
    })
  }
});