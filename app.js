var app = angular.module('FixtureApp', ['ngMaterial','timer']);

app.controller('MainCtrl', ['$scope',
    function($scope) {

        $scope.names = [];
        $scope.roundtime = undefined;
        $scope.$watchCollection('names', function(names) {
            $scope.combos = fixtureList(names.length % 2 != 0 ? names.concat([undefined]) : names);
        });

        $scope.timeInterval = $scope.roundtime * 60;
        $scope.timerRunning = true;
        $scope.startTimer = function (){
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
        };
        $scope.stopTimer = function (){
            $scope.$broadcast('timer-stop');
            $scope.timerRunning = false;
        };

        $scope.restartTimer = function (){
            $scope.$broadcast('timer-reset');
            $scope.timerRunning = false;
        };
        var fixtureList = function(names) {
            var combos = [];
            for (var i = 1; i < names.length; i++) {
                var temp = [];
                for (var j = 0; j < names.length / 2; j++) {
                    temp.push([names[j], names[names.length - j - 1]].sort());
                }
                combos.push(temp);
                names.splice(1, 0, names.pop());
                // names.unshift(names.splice(names.length-2,1)[0]);
            }
            return combos;
        }

    }
]);