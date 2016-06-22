var visitorCenter = angular.module('VisitorCenter', ['ngResource']);

visitorCenter.factory("Visitor", function($resource) {
  return $resource("visitors/:id", {id: '@id'}, {
    index: {method: 'GET', isArray: true, responseType: 'json'},
    update: {method: 'PUT', responseType: 'json'}
  });
})

visitorCenter.controller("visitorsController", function($scope, Visitor) {
  $scope.visitors = Visitor.index()

  $scope.addVisitor = function() {
    visitor = Visitor.save($scope.newVisitor);

    $scope.visitors.push(visitor);
    $scope.newVisitor = {}
  }

  $scope.deleteVisitor = function(index) {
    visitor = $scope.visitors[index]
    Visitor.delete(visitor);
    $scope.visitors.splice(index, 1);
  }

  $scope.editVisitor = function(visitor) {
    $scope.updateVisitor = angular.copy(visitor);
  }

  $scope.updateVisitorF = function(visitor) {
    Visitor.update(visitor, function(response) {
      $scope.visitors.map(function(v, i) {
        if (v.id == visitor.id) {
          $scope.visitors[i] = angular.copy(visitor);
          return;
        }
        console.log("log");

      });
      $('#myModal').modal('hide');
    });
  }
});

visitorCenter.directive("visitor", function() {
  return {
    restrict: 'AEC',
    templateUrl: "/assets/angular/visitor.html"
  }
});

visitorCenter.directive("edit", function() {
  return {
    retrict: 'AEC',
    scope: true,
    templateUrl: "/assets/angular/edit_modal.html"
  }
});
