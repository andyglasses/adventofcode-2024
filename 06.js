async function run(){
    var input = getInput().trim().split('\n').map(function(x) { return x.trim().split('').map(y => y.trim()); });
    var yLength = input.length;
    var xLength = input[0].length;
    const grid = [];
    var guardX = -1;
    var guardY = -1;
    var moveX = 0;
    var moveY = 0;
    for(var y =0; y < yLength; y++){
        var row = input[y];
        var rowObj = [];
        for(var x = 0; x < xLength; x++){
            var cell = row[x];
            var obj = { blocked: false, x: x, y:y, traveled: false }
            if(cell == '#'){
                obj.blocked = true;
            } else if(cell == '^' ){
                guardX = x;
                guardY = y;
                moveX = 0;
                moveY = -1;
            }else if(cell == '>' ){
                guardX = x;
                guardY = y;
                moveX = 1;
                moveY = 0;
            }else if(cell == '<' ){
                guardX = x;
                guardY = y;
                moveX = -1;
                moveY = 0;
            }else if(cell == 'v' ){
                guardX = x;
                guardY = y;
                moveX = 0;
                moveY = 1;
            }
            rowObj.push(obj);
        }
        grid.push(rowObj);
    }

    grid[guardY][guardX].traveled = true;
    draw(grid, xLength, yLength, guardX, guardY);
    while(inside(guardX, guardY, xLength, yLength)){
        //await sleep(100);
        var nextCellInside = inside(guardX + moveX, guardY + moveY, xLength, yLength);
        if(!nextCellInside){
            guardX += moveX;
            guardY += moveY;
            //draw(grid, xLength, yLength, guardX, guardY);
            continue;
        }
        var nextCell = grid[guardY + moveY][guardX + moveX];
        if(nextCell.blocked){
            if(moveY == -1){
                moveY = 0;
                moveX = 1;
            } else if(moveY == 1){
                moveY = 0;
                moveX = -1;
            } else if(moveX == -1){
                moveY = -1;
                moveX = 0;
            } else {
                moveY = 1;
                moveX = 0;
            }
        } else {
            guardX += moveX;
            guardY += moveY;
            nextCell.traveled = true;
        }
        //draw(grid, xLength, yLength, guardX, guardY);
    }
    draw(grid, xLength, yLength, guardX, guardY);
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function draw(grid, xLength, yLength, guardX, guardY){
    console.clear();
    var traveledCount = 0;
    for(var y = 0; y < yLength; y++){
        var row = '';
        for(var x = 0; x <  xLength; x++){
            if(grid[y][x].blocked){
                row = row + '#'
            } else if(x == guardX && y == guardY){
                row = row + 'G'
            } else if(grid[y][x].traveled) {
                row = row + 'X'
                traveledCount++;
            } else {
                row = row + '.';
            }
        }
        console.log(row);
    }
    console.log('traveled', traveledCount)
  }

  function inside(guardX, guardY, xLength, yLength){
    return guardX >= 0 && guardX < xLength && guardY >= 0 && guardY < yLength;
  }
  
  function getInput(){
   /* return `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;*/
    return `...#..................#...................#......................#..............................#.............................#...
....#.......................#........#.#..............##...........#.....#..........#..........................#..................
.............#........................................................................#.........#.#..#..#..........#..............
..........#.......#..........#..................#........##...................#..............#....................................
....................#..........................................................#..#.....................................#.........
....#............................#..............................................#.....................#..........##....#..........
.......#.............#......................................................................#.............#.........#.............
....###......................#....#...........#.....#................................#..........................#.................
..........#..#...........#..#........................................................#.....#...........#................#.........
..#....#......#....#....#...................................................................#.....................................
....................#............#............................................#......#....#...............................#.......
..........#.......#.........#.......#.............................................................................................
.......#...#.......................................#...................#..........................................................
.......#........#............................#.....#.......#..............................................#..................#...#
.....................#.................................#................#...#...............#.....#.#..........................#..
.....#..........................................#......................#.............##..............................#........#...
.....#......#.........................#..........................#..........................................................#..#..
.#......#.............#......#.................................................#.....#...................##......#................
.............................................................................##...................................................
........................................#.......................................#........#.............................#.#.......#
...........#.....................................#.............................#......#......#..#....................#..#.........
.............................................#.......................#..................##....#.....#.............................
........................#..............................................................#..........................................
#..............#.........................#........#...#...............#..............#..................#....................##...
...#...#.............................#.......#................................................#........................#....#.....
.....#.........................#..#.......................#..........#.....................#..................#.#.....#...........
..................#........#..#.......#...................................................................................#....#..
..#...#...............................................#.#..#........................................................#....#......#.
...............#...............#..........................#............................#..........#.............#.................
............#.....#........#.........................................................#........#........#.....#........#......#....
............................#.........#....#........#.....#...#.............#.................................#...................
........#..................#....#..........................................................#.#.#..................................
....................................................................................................................#.............
#............#.............#..................#......................................................................#............
...............................#....#..........#...........##........................................................#.........#.#
................#.........................................#.................................................#........#............
..............................................#............#................#........#........................#...................
..................#.........#..........................#.............#...............#............#....................#..........
........................#...#...............................................#..............#.....#.....................#..........
...........#.......................................#..............................#..................#....#...##..................
#...............#..................#...............................#...............................#.....................#........
.............#...............................................................##...................................................
.................#.............#.......................#...#............#.#....#................................#...........#.....
#......#......#..................................##.................#.#...............................#...........................
.#...............#..........#...............................................#...#..........#..........#...........................
.....................................#............................#....#.............................................#...#........
......#...#.............#.#....................#.........#..........##.................................#..........#..........#....
.............................#..................#....#..............##.......................#.#.....#........#...................
.................................................#.#......................................................#................#......
......................................#..........................................#......#.........................................
#....................#...........................................................#..................#.............................
.....#.........#...................................................#....#.#....#.#.........#......................................
........#..........#......#.............#................................#.....#................#.................................
...........#................................#...........#..........#......#.............#........................#................
.......#...............#....................#..#................................................#.................................
.....................#.........#..#............#..........#...........#...........#...............................#...............
................#...#........#...........#..........................................................#..#...................#......
.........................................................#.....................#...#......................#.#....................#
................#......#....#.#..............#............#.......................................................................
..........#.....................................#......................................................................#..........
#......................................#.......#.....##..#.....................#.........#.......#................................
........#...#..............#....................#................................#..............................................#.
.##............................................................................#......#................................#..........
.#........................#..............#..............................................#........#.....#.......#..................
#......................................#.....................#...................................................................#
............................#.....#.....#............#...............#...#.......#.........#......................................
.#.........................#.......................#.........#.......#.................#............................#..#..........
.............................................................................................................#........##..........
...........#...#...#.#................#.....................................#........#............................................
......#.......................#..........#.......#................................................................#...............
........#....#........#..................#....##.....#............#..............................#...........#...........#..#.....
..................................#...............................................................................#...............
.....................#.#.......................#....................................#.............................................
........................................................................................#.........#.................#.........#...
..........................#..........#....#..........................................#.......................#............#.#.....
...............................................#.#....#...............................#...................#......................#
.....#...........#........#.#.......#.............................#..................#............................................
...............#.........................................................#....................#.................#.............#...
#....................................##..........#................................................................#...............
...............#.................#...#..............#......................................................#..............#.......
...................#......#.............................................#......................................................#.#
..#.............#.......#......#....#..#..#.......................................................................................
.........#....................................................#.....................................#..............#..............
..............#..............#................................................................#.......................#...........
..........................#.................#.......................................................##...................#.#......
...............#..#...................................................................................................#.......###.
...#.....................#..#........#..........#..................................................................##.............
.................#.......................................###..............#.........................#.............................
...#.....................................................#.......#..........................#................#..#.................
...................................................#..................#.........................................................#.
.....#.............#...................#...................#.....................................#................................
.....................#.........................#......#...........................................................................
...........#...............#......#.....##...#...#.............................................#........#.#...............#...#...
..............#..............##...........#.......................#..#.^..........................................................
...................#..............................................................................................................
..................#.......#..........#.......#..................#..........#...................................#..................
..............................................................................................#..................................#
......................................................#................#......................#...................................
..............#.........#..............................#.....................#......................#.............................
#................#.........#................#.............................#......................#..#...#..............#..........
.#..#........#................#...............#..................#........#.....................#............#........#...........
.....................................................#.#.........#......................#.............................#........#..
......................#.....................#..#......#..........................#............................#......#............
......................#.........................#..#..................................#.......................#..............#....
..........................#..................#.............#......................................................#...............
..........................#....#........................................#..#...#....#.................#...........................
.......#...........#.......................#............##........#....................................................#..........
#..........................................................................#...........#..........................................
............................................................#.................#..#........................................##......
..#...............................................#....#.................................................##.....#...##.....#......
...#.....##..............................#.........................................................#............#.................
.....#....##............................#....##..........#...#....................................................................
..................................................#..........................#.........##.......#.......................#.........
.........#.....#..........#........#........................#.##..#............#.......................................#..........
.....#...............#.......#..........#.#..........#.....................#.....................................#.....#..........
....#......#............................................................................................##...#.#.#.........#......
...........#........................#.....#....................#..................#.#........#....................................
....................................................#................#.#................................................#.........
..........#..............#.......................#.................#...................................#.............#.#......##..
................##......................................................#.................#.......#.#....................#........
................#......................................................#.............##...............#.....#......#.......#......
..............................#............................#..........#...........#...............................................
.......#.............#....................................................................#..............................#.#......
...#.....................#.#...............................................................#...#..#....#..........................
....#.........##......#..............................................................................#..................#.........
....#..........................................#......#...................#........##............#................................
..#.......#......#............#........#...#.#...........................#.......#................................................
..........................#...#....................#...............#...#......#.#...#...#...............#.#.#.....................
....##.#....................................................................#...#.....##........................#.##..............
.............................................#....................................................................................`;
  }
  
  run();