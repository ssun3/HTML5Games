angular.module('Minesweeper')
  .directive('doubleClick', function($parse) {
    return {
      restrict: 'A', 
      link: function(scope, elem, attrs) {
        var cmd = $parse(attrs.doubleClick);
        elem.on('mousedown', function(e) {
          scope.$apply(function() {
            cmd(scope, {$event: event});
            e.preventDefault();
          });
        });
      }
    };
  });



          var leftButtonDown = false;
          var rightButtonDown = false;

          
          
          $scope.handleDownClick(evt) {
            if evt.which == 1 {
              leftButtonDown = true
            } else if evt.which == 3 {
              rightBottonDown = true;
            }
          };

          $scope.handleUpClick(evt) {
            if evt.which == 1 {
              leftButtonDown = false
            } else if evt.which == 3 {
              rightBottonDown = false;
            }
          };
