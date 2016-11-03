angular.module('starter.controllers', [])


.controller('HomeCtrl', function($scope, $stateParams, $ionicModal, logStatus) {

})

.controller('StateCtrl', function($scope, $stateParams, $ionicModal, logStatus) {

  $scope.logStatus = logStatus;
  $scope.isLogged = logStatus.isLogged;

  $scope.$watch('logStatus.isLogged', function (newVal, oldVal, scope) {
    if(newVal) { 
      scope.isLogged = newVal;
    }
  });

})

.controller('LoginCtrl', function($scope, $stateParams, $ionicModal, Users, Cards, logStatus, currentId) {

  // finduser
  $ionicModal.fromTemplateUrl('templates/modallogin.html', {
  scope: $scope,
  animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modallogin = modal;
  });

  $scope.openModallogin = function() {
    $scope.modallogin.show();
  };
  $scope.closeModallogin = function() {
    $scope.modallogin.hide();
  };

  $scope.finduser = function(login, password) {
    return Users.finduser(login, password) //checkuser returns the userId
    .then(function(response) {

      //tests
      console.log(response);

      //not used for now
      localStorage.setItem('userid', response);
      localStorage.setItem('isLogged', true);

      // change logStatus
      logStatus.isLogged = true;
      // change currentId
      currentId.userId = response;

    }).then(function(response){

      //tests
      console.log(logStatus.isLogged);
      var testid = String(localStorage.getItem('userid'));
      var testStatus = String(localStorage.getItem('isLogged'));
      console.log("local Storage id:" + testid);
      console.log('local Storage status:' + testStatus);

      $scope.closeModallogin();
    })
    .then(undefined, function(error) {
        console.log('ERR services > Users : ', error.message);
    });
  }
})

.controller('CreateCtrl', function($scope, $stateParams, $ionicModal, Users, Cards, logStatus, currentId) {
  // create user
  $ionicModal.fromTemplateUrl('templates/modalcreateuser.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalcreateuser = modal;
  });

  $scope.openModalcreateuser = function() {
    $scope.modalcreateuser.show();
  };
  $scope.closeModalcreateuser = function() {
    $scope.modalcreateuser.hide();
  };

  $scope.createuser = function(login, password) {
    return Users.createuser(login, password)
    .then(function(response) {

      //tests
      console.log("User", user);
      console.log(response);

      //not used yet
      localStorage.setItem('userid', response);
      localStorage.setItem('isLogged', true);

      // change logStatus
      logStatus.isLogged = true;
      // change currentId
      currentId.userId = response;
    }).then(function(response){

      // tests
      console.log(logStatus.isLogged);

      $scope.closeModalcreateuser();
    });
  }
})

.controller('ContactsCtrl', function($scope, Contacts, logStatus, currentId) {
    $scope.contacts = [];
    // userId = currentId.userId; //localStorage.getItem('userid', response);
    // userId = parseInt(localStrage.getItem('userid'));

    /*
    Contacts.all(userId) //checkuser returns the userId
    .then(function(response) {
        $scope.contacts = response;
    })
    */
    $scope.currentId = currentId;
    $scope.userid = currentId.userId;

    $scope.$watch('currentId.userId', function (newVal, oldVal, scope) {
      if(newVal) {
        // console.log("hey" + newVal);
        scope.userid = newVal;
        Contacts.all(newVal) //checkuser returns the userId
        .then(function(response) {
          scope.contacts = response;
        })
      }
    });
}) 


.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts, logStatus) {
  $scope.contact = Contacts.get($stateParams.contactId);  
  //$scop.loc = Contacts.getloca($scope.contact);
})

.controller('AccountCtrl', function($scope, $stateParams, $ionicModal, Users, Cards, logStatus, currentId) {

  $scope.cards = [];

  $scope.currentId = currentId;
  $scope.userid = currentId.userId;

    $scope.$watch('currentId.userId', function (newVal, oldVal, scope) {
      if(newVal) {
        // console.log("hey" + newVal);
        scope.userid = newVal;
        Cards.all(newVal) //checkuser returns the userId
        .then(function(response) {
          scope.cards = response;
        })
      }
    });


  $ionicModal.fromTemplateUrl('templates/modalcreatecard.html', {
  scope: $scope,
  animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalcreatecard = modal;
  });

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
})

.controller('CardDetailCtrl', function($scope, $stateParams, Cards, logStatus) {
  $scope.card = Cards.get($stateParams.cardId);  
  //$scop.loc = Contacts.getloca($scope.contact);
});