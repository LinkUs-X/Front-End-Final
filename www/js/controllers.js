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


.controller('AccountCtrl', function($scope) {});
