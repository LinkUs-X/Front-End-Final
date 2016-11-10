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

  $scope.logout = function() {
    logStatus.isLogged = false;
  };
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

.controller('LinkCtrl', function($scope, $stateParams, $ionicModal, Cards, logStatus, currentId, Links) {

  $scope.cards = [];

  $scope.currentId = currentId;
  $scope.userid = currentId.userId;
  var userid = currentId.userId;

  $scope.$watch('currentId.userId', function (newVal, oldVal, scope) {
    if(newVal) {
      scope.userid = newVal;
      userid = newVal;
      Cards.all(newVal)
      .then(function(response){
        scope.cards = response;
      })
    }
  });

  // create user
  $ionicModal.fromTemplateUrl('templates/modallinkus.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modallinkus = modal;
  });

  $scope.openModallinkus = function() {
    $scope.modallinkus.show();
  };
  $scope.closeModallinkus = function() {
    $scope.modallinkus.hide();
  };

  $scope.linkus = function(myCardId) {
    $scope.closeModallinkus();
    return Links.createlink(myCardId, userid)
    /*
    .then(function(response) {
      return 1;
    })*/;

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
  $scope.contact = Contacts.get($stateParams.contactCardId);  
  //$scop.loc = Contacts.getloca($scope.contact);
})

.controller('AccountCtrl', function($scope, $stateParams, $ionicModal, Users, Cards, logStatus, currentId) {

  $scope.cards = [];

  $scope.currentId = currentId;
  $scope.userid = currentId.userId;
  var userId = currentId.userId;

    $scope.$watch('currentId.userId', function (newVal, oldVal, scope) {
      if(newVal) {
        // console.log("hey" + newVal);
        scope.userid = newVal;
        userId = newVal;
        Cards.all(newVal) //checkuser returns the userId
        .then(function(response) {
          scope.cards = response;
        })
      }
    });

    /*
  $scope.logout = function() {
    logStatus.isLogged = false;
    currentId.userId = -1;
  };
  */


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

  $scope.createcard = function(card_name, first_name, last_name, phone_nbr, facebook_link, 
        linkedin_link, email, street, city, postal_code, country, description, picture_url) {

    return Cards.createcard(card_name, first_name, last_name, phone_nbr, facebook_link, 
        linkedin_link, email, street, city, postal_code, country, description, picture_url, userId)
    .then(function(response) {
      console.log("Card", card);
      $scope.closeModalcreatecard();

      $scope.$watch('currentId.userId', function (newVal, oldVal, scope) { // modification de currrentId.userId -> appelle le callback function
      if(newVal) {
        // console.log("hey" + newVal);
        scope.userid = newVal;
        userId = newVal;
        Cards.all(newVal) //checkuser returns the userId
        .then(function(response) {
          scope.cards = response;
        })
      }
    });

    })
  }

})

.controller('CardDetailCtrl', function($scope, $stateParams, Cards, logStatus) {
  $scope.card = Cards.get($stateParams.cardId);  
})