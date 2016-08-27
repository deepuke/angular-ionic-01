(function() {
  'use strict';

  angular.module('testTodo').controller('mainCtrl', mainController);
  mainController.$inject = ['$scope', '$ionicModal', 'localStorageService'];

  function mainController($scope, $ionicModal, localStorageService) {
    var taskData = 'taskData';
    $scope.tasks = [];
    $scope.task = {};
    $ionicModal.fromTemplateUrl('new-task-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.newTaskModal = modal;
    });

    $scope.getTasks = function() {
      if (localStorageService.get(taskData)) {
        $scope.tasks = localStorageService.get(taskData);
      } else {
        $scope.tasks = [];
      }
    }
    $scope.createTask = function() {
      //creates a new task
      $scope.tasks.push($scope.task);
      localStorageService.set(taskData, $scope.tasks);
      $scope.task = {};
      //close new task modal
      $scope.newTaskModal.hide();
    }
    $scope.removeTask = function(index) {
      //removes a task
      $scope.tasks.splice(index, 1);
      localStorageService.set(taskData, $scope.tasks);
    }
    $scope.completeTask = function(index) {
      //updates a task as completed
      if (index !== -1) {
        $scope.tasks[index].completed = true;
      }

      localStorageService.set(taskData, $scope.tasks);
    }


    $ionicModal.fromTemplateUrl('new-task-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
  }
})();
