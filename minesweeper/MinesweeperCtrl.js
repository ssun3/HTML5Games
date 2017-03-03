angular.module('Minesweeper')
        .controller('MinesweeperCtrl', function ($scope) {

          function createMinefield() {
            var minefield = {};
            minefield.rows = [];

            for(var i = 0; i < 9; i++) {
              var row = {};
              row.spots = [];

              for(var j = 0; j < 9; j++) {
                var spot = {};
                spot.isCovered = true;
                spot.content = 0;
                spot.flag = false;
                spot.flagCount = 0;
                spot.complete = false;
                spot.row = i ;
                spot.column = j ; 
                spot.counted = false; 
                row.spots.push(spot);
              }

              minefield.rows.push(row);
            }

            placeManyRandomMines(minefield);
            calculateAllNumbers(minefield);
            return minefield;
          }

          $scope.minefield = createMinefield();
          
          $scope.uncoverSpot = function(spot) {
            spot.isCovered = false;
            if(spot.content == "mine") {
              $scope.loseMessage = true;
              uncoverAllSpots($scope.minefield);
              console.log("lose")
            } else {
                if(hasWon($scope.minefield)) {
                  console.log("win")
                  $scope.winMessage = true;
                }
            }
            return;
          };


          function checkSurroundingSpots(spot) {
            var queue = [];
            queue.push(spot); 
            while (queue.length > 0 ){
                var thisSpot = queue.pop();
                var row = thisSpot.row;
                var column = thisSpot.column;
                var minefield = $scope.minefield;  

                if (row > 0) {
                  if (column > 0) {
                    var spot = getSpot(minefield, row - 1, column -1);
                    if(!(spot.flag || spot.content =="mine")) {
                      $scope.uncoverSpot(spot);
                      console.log("push1")
                      if(spot.content == 0 && !spot.counted) {
                        queue.push(spot);
                        console.log("push1")
                      }
                    }
                  }
                  var spot = getSpot(minefield, row - 1, column);
                  if (!(spot.flag || spot.content =="mine")) {
                    $scope.uncoverSpot(spot);
                    if(spot.content == 0 && !spot.counted) {
                        queue.push(spot);
                      }
                  }

                  if (column < 8) {
                    var spot = getSpot(minefield, row - 1, column + 1);
                    if(!(spot.flag || spot.content =="mine")) {
                      $scope.uncoverSpot(spot);
                      if(spot.content == 0 && !spot.counted) {
                        queue.push(spot);
                      }
                    }
                  }

                }
              

                if (column > 0) {
                  var spot = getSpot(minefield, row , column - 1);
                    if(!(spot.flag || spot.content =="mine")) {
                      $scope.uncoverSpot(spot);
                      if(spot.content == 0 && !spot.counted) {
                        queue.push(spot);
                      }
                    }
                }

                if (column < 8) {
                  var spot = getSpot(minefield, row, column + 1);
                    if(!(spot.flag || spot.content =="mine")) {
                      $scope.uncoverSpot(spot);
                      if(spot.content == 0 && !spot.counted) {
                        queue.push(spot);
                      }
                    }
                }

                if (row < 8) {
                  if (column > 0) {
                    var spot = getSpot(minefield, row + 1, column - 1);
                    if(!(spot.flag || spot.content =="mine")) {
                      $scope.uncoverSpot(spot);
                      if(spot.content == 0 && !spot.counted) {
                        queue.push(spot);
                      }
                    }
                  }

                  var spot = getSpot(minefield, row + 1, column);
                  if(!(spot.flag || spot.content =="mine")) {
                    $scope.uncoverSpot(spot);
                    if(spot.content == 0 && !spot.counted) {
                        queue.push(spot);
                      }
                  }

                  if (column < 8) {
                    var spot = getSpot(minefield, row + 1, column + 1);
                    if(!spot.flag) {
                      $scope.uncoverSpot(spot);
                      console.log("push2 " + row + " " + column );
                      if(spot.content == 0 && !spot.counted) {
                        queue.push(spot);
                      }
                    }
                  }
                }
                thisSpot.counted = true; 

              
            }
          } 


          $scope.handleClick = function(event, spot) {
            var row = spot.row;
            var column = spot.column;
            var minefield = $scope.minefield

            console.log(row + " " + column);
            
            if (event.shiftKey) {
              if (!(spot.isCovered || spot.content == "mine")) { 
                var thisSpot = checkSpotComplete(minefield, row, column);
                if (thisSpot.complete) {
                  uncoverSurroundingSpots(minefield, row, column);
                }
              }
            } else {
              $scope.uncoverSpot(spot);
              if (spot.content == 0) {
                checkSurroundingSpots(spot);
              }
            }
          };
          


          function checkSpotComplete(minefield, row, column) {
            var thisSpot = calculateNumberFlags(minefield, row, column)
            if (thisSpot.flagCount == thisSpot.content) {
              thisSpot.complete = true; 
            } else {
              thisSpot.complete = false;
            }
            return thisSpot

          }


          function uncoverSurroundingSpots(minefield, row, column) {
            if (row > 0) {
              if (column > 0) {
                var spot = getSpot(minefield, row - 1, column -1);
                if(!spot.flag) {
                  $scope.uncoverSpot(spot);
                  if (spot.content == 0) {
                  checkSurroundingSpots(spot);
                  }
              }
              var spot = getSpot(minefield, row - 1, column);
              if (!spot.flag) {
                $scope.uncoverSpot(spot);
                  if (spot.content == 0) {
                  checkSurroundingSpots(spot);
                  }
                }
              }

              if (column < 8) {
                var spot = getSpot(minefield, row - 1, column + 1);
                if(!spot.flag) {
                  $scope.uncoverSpot(spot);
                  if (spot.content == 0) {
                  checkSurroundingSpots(spot);
                  }
                }
              }

            }

            if (column > 0) {
              var spot = getSpot(minefield, row , column - 1);
                if(!spot.flag) {
                  $scope.uncoverSpot(spot);
                  if (spot.content == 0) {
                  checkSurroundingSpots(spot);
                  }
                }
            }

            if (column < 8) {
              var spot = getSpot(minefield, row, column + 1);
                if(!spot.flag) {
                  $scope.uncoverSpot(spot);
                  if (spot.content == 0) {
                  checkSurroundingSpots(spot);
                  }
                }
            }

            if (row < 8) {
              if (column > 0) {
                var spot = getSpot(minefield, row + 1, column - 1);
                if(!spot.flag) {
                  $scope.uncoverSpot(spot);
                  if (spot.content == 0) {
                  checkSurroundingSpots(spot);
                  }
                }
              }

              var spot = getSpot(minefield, row + 1, column);
              if(!spot.flag) {
                $scope.uncoverSpot(spot);
                  if (spot.content == 0) {
                  checkSurroundingSpots(spot);
                  }
              }

              if (column < 8) {
                var spot = getSpot(minefield, row + 1, column + 1);
                if(!spot.flag) {
                  $scope.uncoverSpot(spot);
                  if (spot.content == 0) {
                  checkSurroundingSpots(spot);
                  }
                }
              }
            }
            

          }



          function calculateNumberFlags(minefield, row, column) {
            var thisSpot = getSpot(minefield,row,column);

            var flagCount = 0;

            if (row > 0) {
              if (column > 0) {
                var spot = getSpot(minefield, row - 1, column -1);
                if(spot.flag) {
                  flagCount++;
                }
              }
              var spot = getSpot(minefield, row - 1, column);
              if (spot.flag) {
                flagCount ++;
              }

              if (column < 8) {
                var spot = getSpot(minefield, row - 1, column + 1);
                if(spot.flag) {
                  flagCount++;
                }
              }

            }

            if (column > 0) {
              var spot = getSpot(minefield, row , column - 1);
                if(spot.flag) {
                  flagCount++;
                }
            }

            if (column < 8) {
              var spot = getSpot(minefield, row, column + 1);
                if(spot.flag) {
                  flagCount++;
                }
            }

            if (row < 8) {
              if (column > 0) {
                var spot = getSpot(minefield, row + 1, column - 1);
                if(spot.flag) {
                  flagCount++;
                }
              }

              var spot = getSpot(minefield, row + 1, column);
              if(spot.flag) {
                flagCount++;
              }

              if (column < 8) {
                var spot = getSpot(minefield, row + 1, column + 1);
                if(spot.flag) {
                  flagCount++;
                }
              }
            }

            
            thisSpot.flagCount = flagCount;
            return thisSpot;
            

          }


          function getSpot(minefield, row, column) {
            return minefield.rows[row].spots[column];
          }

          function placeRandomMine(minefield) {
            var row = Math.round(Math.random() * 8);
            var column = Math.round(Math.random() * 8);
            var spot = getSpot(minefield, row, column);
            spot.content = "mine";
          }

          function placeManyRandomMines(minefield) {
            for(var i = 0; i < 10; i++) {
              placeRandomMine(minefield);
            }
          }

          function calculateNumber(minefield, row, column) {
            var thisSpot = getSpot(minefield,row,column);

            if (thisSpot.content == "mine") {
              return;
            }

            var mineCount = 0;

            if (row > 0) {
              if (column > 0) {
                var spot = getSpot(minefield, row - 1, column -1);
                if(spot.content == "mine") {
                  mineCount++;
                }
              }
              var spot = getSpot(minefield, row - 1, column);
              if (spot.content == "mine") {
                mineCount ++;
              }

              if (column < 8) {
                var spot = getSpot(minefield, row - 1, column + 1);
                if(spot.content == "mine") {
                  mineCount++;
                }
              }

            }

            if (column > 0) {
              var spot = getSpot(minefield, row , column - 1);
                if(spot.content == "mine") {
                  mineCount++;
                }
            }

            if (column < 8) {
              var spot = getSpot(minefield, row, column + 1);
                if(spot.content == "mine") {
                  mineCount++;
                }
            }

            if (row < 8) {
              if (column > 0) {
                var spot = getSpot(minefield, row + 1, column - 1);
                if(spot.content == "mine") {
                  mineCount++;
                }
              }

              var spot = getSpot(minefield, row + 1, column);
              if(spot.content == "mine") {
                mineCount++;
              }

              if (column < 8) {
                var spot = getSpot(minefield, row + 1, column + 1);
                if(spot.content == "mine") {
                  mineCount++;
                }
              }
            }

            
            thisSpot.content = mineCount;
            

          }

          function calculateAllNumbers(minefield) {
            for(var x = 0; x < 9; x++) {
              for (var y = 0; y < 9; y++) {
                calculateNumber(minefield, x, y);
              }
            }
          }

          function hasWon(minefield) {
            for (var x = 0; x < 9; x++) {
              for (var y = 0; y < 9; y++) {
                var spot = getSpot(minefield, x, y);
                if (spot.isCovered && spot.content != "mine") {
                  return false;
                }
                if (!spot.isCovered && spot.content == "mine" ){
                  return false;
                }
              }
            }
            return true;
          }

          function uncoverAllSpots(minefield) {
            for (var x = 0; x < 9; x++) {
              for (var y = 0; y < 9; y++) {
                var spot = getSpot(minefield, x, y);
                spot.isCovered = false;
              }  
            }
          } 


      });