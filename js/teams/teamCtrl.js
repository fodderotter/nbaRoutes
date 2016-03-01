var app = angular.module('nbaRoutes');
// the resolved data from the router needs to be injected into the controller
app.controller('teamCtrl', function ($scope, $stateParams, teamService, teamData) {
	$scope.teamData = teamData;
	$scope.newGame = {};
	$scope.showNewGameForm = false;
	$scope.toggleNewGameForm = function() {
		$scope.showNewGameForm = !$scope.showNewGameForm;
		console.log($scope.showNewGameForm);
	}
	if($stateParams.team === "utahjazz") {
		$scope.homeTeam = "Utah Jazz";
		$scope.logoPath = "/images/jazz-logo.png"
	}
	else if ($stateParams.team === "losangeleslakers") {
		$scope.homeTeam = "Los Angeles Lakers";
		$scope.logoPath = "/images/lakers-logo.png"
	}
	else {
		$scope.homeTeam = "Miami Heat";
		$scope.logoPath = "/images/heat-logo.png"
	}
	$scope.submitGame = function() {
		$scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();
		teamService.addNewGame($scope.newGame)
		.then(function() {
			teamService.getTeamData($scope.newGame.homeTeam)
			.then(function(response) {
				$scope.teamData = response;
				$scope.newGame = {};
				$scope.showNewGameForm = false;
			})
		});
	}
});
