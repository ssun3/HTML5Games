angular.module('Minesweeper')
  .directive('centerClick', function($parse) {
    return {
      restrict: 'A', 
      link: function(scope, elem, attrs) {
        var cmd = $parse(attrs.centerClick);
        elem.on('mousedown', function(e) {
          if (e.which == 2) {
            scope.$apply(function() {
                cmd(scope)
                e.stopPropagation();
            }
          }
        };
      }
    };
  });




// //check if spot is compelte: 

// if spot is uncovered
//   and spot.content != "mine" 
//     spot
//     spot.flags = spot. countFlags (same method as counting mines)

//     if spot.flags == spot.content

//       spot.complete = true 


// double click:

// check if spot.complete
//   if spot.complete then 
//     open all spot complete spots directly connected to it that is not a flag. 
      


// When opening a spot.content = 0 
//   open all the number and empty spots directly connected to it. //



