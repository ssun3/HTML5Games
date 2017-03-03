angular.module('Minesweeper')
  .directive('rightClick', function($parse) {
    return {
      restrict: 'A', 
      link: function(scope, elem, attrs) {
        var cmd = $parse(attrs.rightClick);
        elem.on('contextmenu', function(e) {
          scope.$apply(function() {
            cmd(scope);
            e.preventDefault();
          });
        });
      }
    };
  });

