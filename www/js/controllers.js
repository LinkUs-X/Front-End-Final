angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('ContactsCtrl', function($scope, Contacts) {
  $scope.contacts = Contacts.all();
  //$scope.contact = Contacts.get($stateParams.contactId);
  //$scope.card = Cards.get(contacts.contactId);
})

.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts, Cards) {
  $scope.contact = Contacts.get($stateParams.contactId);
  $scope.card = Cards.get($stateParams.contactId);
})

.controller('AccountCtrl', function($scope) {});
