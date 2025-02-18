function run(){
  const inputs = getInput();
  const rawMap = inputs[0].trim().split('\n').map(x => x.trim().split('').map(m => m.trim()));
  const rawMoves = inputs[1].trim().split('\n').map(x => x.trim().split('').map(m => m.trim()));
  const yLength = rawMap.length;
  const xLength = rawMap[0].length;
  const walls= [];
  const boxes = [];
  const robot = {x: 0, y: 0};
  const moves = [];
  for(let y = 0; y < yLength; y++){
    for(let x = 0; x < xLength; x++){
      const item =rawMap[y][x];
      if(item == '#'){
        walls.push({ x, y });
      } else if(item == 'O'){
        boxes.push({ x, y });
      } else if(item == '@'){
        robot.x = x;
        robot.y = y;
      }
    }
  }

  for(let y = 0; y < rawMoves.length; y++){
    for(let x = 0; x < rawMoves[y].length; x++){
      const item =rawMoves[y][x];
      if(item == '^'){
        moves.push({ x: 0, y: -1 });
      } else if(item == '<'){
        moves.push({ x: -1, y: 0 });
      } else if(item == '>'){
        moves.push({ x: 1, y: 0 });
      } else if(item == 'v'){
        moves.push({ x: 0, y: 1 });
      }
    }
  }

  //draw(walls, robot, boxes, yLength, xLength);

  moves.forEach(m => {
    moveItem(robot, m, walls, boxes)
    //draw(walls, robot, boxes, yLength, xLength);
  });
  //draw(walls, robot, boxes, yLength, xLength);

  let total = 0;
  boxes.forEach(b => {
    total += ((100 * b.y) + b.x)
  });
  console.log(total);
  
}

function draw(walls, robot, boxes, yLength, xLength){
  for(let y = 0; y < yLength; y++){
    let line = '';
    for(let x = 0; x < xLength; x++){
      if(walls.some(w => w.x == x && w.y == y)){
        line += '#';
      } else if(robot.x == x && robot.y ==y){
        line += '@'
      } else if(boxes.some(b => b.x == x && b.y == y)){
        line += 'O';
      }else {
        line += '.'
      }
    }
    console.log(line);
  }
}

function moveItem(item, move, walls, boxes){
  const newPos = { x: item.x + move.x, y: item.y + move.y };
  if(walls.some(w => w.x == newPos.x && w.y == newPos.y)){
    return false;
  }
  const boxToMove = boxes.find(w => w.x == newPos.x && w.y == newPos.y)
  if(boxToMove){
    if(!moveItem(boxToMove, move, walls, boxes)){
      return false;
    }
  }
  item.x = item.x + move.x;
  item.y =  item.y + move.y;
  return true;
}

function getInput(){
  /*return [`########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########`,`<^^>>>vv<v>>v<<`];*/


 /* return [`##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########`, 
    `<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`];*/

return [`##################################################
#.O.O.O.#..O.....O..O#O.........OO...OO..O......O#
#..OO#...OO....O#O..O....O...#...O...#...O.O.O##.#
#.....#..O...OO.O.O.O.O#O..O..O.O...O.O.O......O.#
#..............O.#O.....#.#O.#....OO....O...#..OO#
#O.O....#.OO.O.OOO..O..O.OO.#..O....O...#..O..O..#
#.O...O..OO..#O......OO.O.O.....O.O#O.........O..#
#.O#..O.O..#.O.O.O..#.O.O.O#..O..O.O.OO...O.O....#
#......O.....O.O.OO.O..O..#O.........OO.........##
#......O.......#.......O......O..#OO...........#.#
#...O#O..O....OOOOOOOO....O...OO.#..OO...O......O#
#.O.#.O.#O....O.OO#..O..............OO..#....OOO.#
#..OO.##..#..O........O#.O..#.#.............O#...#
#.OOO#.OO.......OO.#O.O.O..O..#.O.O.O....##.OO...#
#..#O.OOOOOOOO..O......O...O...O#.#..OO..OO#....O#
#.O..O....#..O......#.#.O...O.O#.O.O#.O.....O##..#
#......OO.OOOO..#O#.#..O....O...O..O....O..#O..O.#
#..O.O..#......O....OOO.O#.OO.#..O........#....O.#
#...O................#.OO....#.O..O.#.O.#OO..##.O#
#.O.O.O.#.O.O.......O..........O...##OO.O.O......#
#.#.O...OO.O#OO.O...#...OO.OO...#......#.O#O.O...#
#.........O.OOO......O...#.#...OO#.O....OO.O.....#
#.....OOOO.....O.O..O.O.OO......OO.OOO#....O..OOO#
#...O..........O.O.O....O.O.......#...O..OO....O.#
#.O...#......O....O.#...@..OO.#O.O.#.O.O...#O.O###
#.#...OO...O#OOO.....OO..O...#O......O...O.OO..O.#
#O#O.OOOO.O.....O......O.....O...O.O.......OO..O##
#O.OOO..OO.OO..O..O...##......OO.OO..#O....#....O#
#.O...O.OO....O...O.O.OOO.O...O#..O.O.O..O..OOOOO#
#..#.OO.#O#....O.#O.#..#...##.......OO.#.#..O.OO.#
#.OO....O#......O.O..O....O..#O.O..OO..O#.O...OOO#
#...O...#OO.........O#O..#..O..O.#O...O.O#..OO#.O#
#OO....#...O#....O#.O#..O...O.....#.....O#O.OO.#.#
#..OO...#O.O.O.........O...O...O...O#.....OO.OO..#
#O...O..O.#....OOO...O..O...OO....O...O.....OO...#
#......O....OOOO..#........O..#O.OOO#....O.OOO..O#
#O.O...O..#..#..OO#...##O..OO##O.OO.OO.O..O..O..O#
#..O.O.O..O....O#....#..O.O.#O...OOO#OO.O.......O#
#.......OO.#.#.#.......O.##....O...O.OO.O#.O#....#
#.....O...O.#..#..O...#O.#..O............O.O#..#.#
#.#.O........O#.....O.O..O..O........#...O.O.O.OO#
##.O..OO..O..O..O..OO.#..OO...O.#O..#....#..O.#.##
#O..O..#.O..O.OOO..O..O..OO.O......O.......O..O..#
#...O###.OOOO................O...O..OO..#...O.#OO#
#..O...O..O....O.O.O...O.O.OO..OOOO.#...O#.OO...O#
#O.O.O......O.#..O.O#.O.OO..O#......O.#..........#
#O..O......#OO.......OOO.....O.OO....OOO.#.O..O..#
#OO.#..O.....O..........OO.OO..O.O..#.....#OO..O.#
#......O..O..O...OOO..OO....#....O.....O.###O....#
##################################################`,`^><><>^>vv<>^v^v<^<><<<>v<vv>><^<>>^>>>^><<v<><<>>v>>><v>v^vvvv<^v>><^<<><v>^^^^v^^>^v>vv<<v>v^v<<^<v^<^<>^^<^<<^<<<v<<>v^^v>^>v^v^^^^^<v>><<^vv>vvv><>^<v<v>>v><vv^vv^<v^<^^^<^<^<^v^>^<v<>^v<^>>>v>^^<<v<><v<><^>><v<><^>vv>vv^<<^><<<^><v<<v^<^>v>><v<>v^v><<>>v<>^^<vv^<^><vv><^<<v<v>^>v<^<>^<^<^vv<>^>^^vvv<><vvv>v<>^v<^v>v^>v><<vv<v<<^^^>>v>><v>v>>>v>vv<^<^<^vvv><><v^><v<^vv<<v<^>>>v<>^>vv<<vvv>v<^<v>>^v^v^><v><^^^><^<v>v<^v>^v<>vv>>>v^<v^^<^^v<^><><<<v>>><^<vvv^<<v>>^v^<^<>><^<<><>v><v^>^><><>vv^^><^>vv^vv<<<vv^><><^v^<v><v^^v>>^<<<<<<>^^<vv<>v>v^^<^<v^>^vv^>>^>>><>^>^v<>>>vv>vv^^v><>>^v<>v^>^v>^^^<<<>v<<>>>v><^>v<v<<<^^>><v<>^<<>>vvv>>>>^<<>^^>v<v>>^<><^<vv<<<^^<<v^vv>^^v^^v>^<v<^^^v^<^<^v>>^><><>^^^>v<>^^>v<^v^><<^^^<<>v<^><v^v<<<^v<^<>v^^v><v<v^vv^<v>v<vvvv<>vvv>^^vv>^v^<v^^<^^>^<v><>^<v^vv><<<>vvvvv^^<^>v^^><v><v<^vv<v^^^>>v^<v>>><vv^<v<<>v^v><^^v<^<v<<<>^><v<v<v<<v<>><^>vvv<^>^><v>^<^>^>>>v<<^^v><^><^^^>>^>^<v>v><>>^v^^v>^>>>>^^>><<^<<<^>>^<v^v<v^>^vv<>^^>^vv^<>><^><v><<vv^v<<^<<v<
<<<>><^<<^v<<v>vvv>><v><^v<v^^<vvvv>^^v^v^vv>v^v><>^<vv>^vv<><>>>v>>^^v>v^><<v^<v^^vv<^v>^vv><<v<v^^<>^<v<><^<<^^^<^<>><<<v<vv<>v^^<<^^^^^^v>v<vvv<<>>><^<<^vv>^>vvv<v<>>v>^>^^v^<>v^v^>^>v^><^<^<^>v<<>v<<<v>^<^^v<<^^^>^>^^^<<>>v<^<^v>^<^<<^>^^<vv>^^^>^<^^^v>^<<^v><^>>>>>^^<^v<v>>>><<^<>>>>^<^<v<>^^^v<<<vv>>^<v^<v^<<^v><<<<^<v<>vvv>>^v><>v^^>^><>v<>vv><^v>>v^^^^v>^<><><>>^>v^vv<^v^^<^>v^<>>^>^<v>^^>>^>>>>v>^><<vvv^>^vv^v^v<><<<>><>>^<^^^>^vv<<^^>^>vvv<>>>>v<^^v>vvv>><^<>^^vv<^vvv>>>>v^>v<^>v><<>^^v<^>v^v^<vv^<v^^>v<>^>^v><>>>^>^><v><v<<^>>>^v<>v<>>>><<v><v<<<v<v>^^^v>^<v^v<<<<^<vvv^v^v<v>v>v^^^^^>><<<^v<>v<><v<<v<<v<v^>v>^^v<^v^^<>v^v<v^>>^v^>^v^<<>^>v^^v>v>^vv>v<v><<^v^v>vv<v<<^<v^v<<v>><>^v><^v<<><>><>^^>>>v<<v<<^<><<<^<<<v>>v><><<vv>>^v>><>>vvv>^<^><<vv<<v<vv^v<<^v^v<vv<^><^<v^>vv<>v^^<>v>^<<<^<>v<v<v<v>^^vv<v^^v>^>^><v<>>><^<<>^>v<vv^vv<>^vv><v<>>^^<>vv>v><v^^>v><v^v>^>><^^>>>^>>^>^^^v<^>v^<>^>>>^<^v>^<v><>^<vv>vv<^vvv<>>^^><>^^<>><v^^<^>>v>>^vv<>v<<<<v>^<<<><^^^<<<>^<^^v^^^<>v<^v<^<
vvv<vvvv^>><^<v^^>^>v^v<^<>>v>>v<<^^v<<>>vvv^v^^<^v^<<v>^>^^<v<v^^>>>^v^><^v<>^<<^^>v<vv<v>><^><v<><^v^v<v>vv<<>v>^<<<v^<vv<><<^>><<v<v^><vvv^v^v><>><<><<v>><<vv^<vvv>^v^<>^vv>^<>^<v<<<<>vv<>>^^<<>>>v^^>v^<>^<v^^<^>><<>^vv>^>v>>^><>v^>^<vv<<vv>><v^v<<^^^>^^^>^<<><v>^<<><>^^<^<<^>^^v>^>^<><>><^vv<>vv^^v>^<^>vv>><>^>v<^v^^>^v^v<<<<^>v<>vv^<<vvv>v>>^^<><><<>>vvv<<^v^<^>>v^<>^^><^^^v>^<v<<<vvv><<<><^>><v>^>^<^>^><v^^<>>v^^vvvv^^^>>v^>v>>^<<vv^v^><<<^^v^^<<<^<>v<v^v<<^<><<v<<<v><^vvv^v<^<>^^v^>>>v><<^^vvv<<v<<v<v>^><>^v^^v<v^v<>>>>^vv<v^<^>>^^^^^<>v>^<<v^v<>v<>v>><><v^>v<<v<<>v^>^>>>^vv<>v<^><>vv>vv<><>>>>^<vv<>><>v<<^v^^>>>><>>v^^><<<v^<v<^>vv<>>^^^^<vv<<^<^<v^<<<^vv^^>>><>^v<<>^v<vv<^v<v<v^><>^>><^v>>v^v^>>^>>v>>^<>>>v^vv^<^<<<<^>><vvv^^^><<><v<^<<v>^^<vv<><v^>^v<>>^vv<v>^>^<v^>^v<^^v<v>>v^<<<>^vv^>^<v^^v^<v^>>><v<^<>^^^<^<vvv^<^>>><>>>v<>v>^v<v><>^^v<<>>v^><^<<>^^^^v><^v>^>>^v>>^<>vv^^v^^^>>^>>v>>v<<v^<^><>v^<^v<v<>^>v<>^>v<v^<><<v>><^v<<<^<v^><^><>^v<<<^<^>><^v<vv><v><v>v<<v^><>^^>v>>v<
><>>v^vvv^<^v<>^>>^<^>^v>>>vvv>><^<<^<>^^^<^^^>^^v>v<^<><^^v<>^v>><>v^>v^vv<vv<><^><<>v^>^^><>v<v>^^<>^>^^>vv<>>><vv<<v^^<<<<>^>^<<>v>^>^vvv<^<^^^vvv^>>>><<vv>^^<^>v^<v>><^v^<^v><v^^>><>v<vv^<><>v^^vv^<>>><>vv<^v>vvvv<^<v<^>>v^>>^<<v<v>^<vvv<^v>>vv^v<<v^^><<v<>^<<^>^<^vv<>^^v<<^^^<v>^^>^>^^>><<>^vv>>v^>><^v>vv<^v^>^<>v<v<>^><<<^v^>>v><>v<^^><v>v^><^>>v<v^vvv<<v^>^><<<>vv<><>vv^<^^>>^^<^<><<>>^>v^><>^vv<<v<>v^v^<>v<^v<^^<^<^v><<^v<^^v<v^^>^v>^^v^>v^>v><v><><v^<v>^^^vvv<<<v<vv<<>><^<^v<^vv^^>>^^v^>v^v^<><^<^>><>>^<<vvvv^<^^^<<^vv<^^<>v<v<^<<^><^<>vv>v><v>><><>v^^v<v<<^v<>>v><><vv>^^^<v<^<<v^^^>v<v>^><<v>>v^v>v<^vvv<<><>v>v<v><<^<^v^<<<>v<>v^<v>^^^><^>^<><v^>^^v>>^<v<><>^^^><v>v>^<>><>v><v<<<^vv>>^^v^v>>>v^<^<>>><^>v>vv<v>^vv><v<v<v<v>v^v<><^><<v>><vv<<<^>>>^vv<>><^^vv><v<>v^v<<>>^<^<>v^v^vv^>vv^^^vvvv<>^>>^^>v<^>^<^<^>vvvv^>>^v^^<^<>vv<v^<>^^vvv<vvv^>^v<>^>>v><><<>>v^^v<>^<<<>>v<<<><v^>v>v^<>>><v^>><^<v^^v<>v><<><>><<>vv<>>^v<<>>><>>v^^v^v^<>>>^vvv^<^^v>>^v^<^><<^>^v^><vv<<>>v<^^>^^>><<^
<v<<><<v^^^v^^vv<>>vvv<>^v>v<><><<<v^^>^^v^^^^<<<>><>^<^><v>>v>><<<^>^<<>^^><v^>>^><v>v>v^<<v^>v>>^<>>v><v><<^^v<v^>^<v<>>>^>>v><>>v><>v>^vv^^^<v<v<v<>v^^^^>^>vv^><v^^>^<>><<^<<v^^v<^v<^v^<>^>><v^<v^<>^^^<>vv>v<<v<v>^>^>^^>^^^><<>v>>^>v>v>^^<<^<><<>^>^^v^^^^v>vvvvvv<^<<>>v<<<v>^<<><vv<<^><vv<v^v<><^<^><v<^<^<v^<^^<^^>>^><v^><v^<^>v^v<>vvvvv<>v>vv<v>^^>><>>^v^v>^vv><v>v><<><^<>vv>v^<v>^v>vv>^^vv<<^<<^^>v<^vv><<<>v>^^v<><^<^^^^^<<<>^^<^v^^v>>>vvvvv<<<>vv<<^v<^vv<vv>v>^^v<^^>>^vv^v^v^>>v><^vv<>>^v^v<v>^>^v><>^>v<<v<>^v<vv<<<v<<<^>v>v<>v^>^v<>^<>><vv<>^<v<v^^v^^>v><<>^^v<^^<>vvv^v<<^>vv<<<^>^>>vv^><<>>v><v^<vv><<<><><^>><><><v<^v^v^^>>v^v<vv>v^vv><>v^^^<>>^<>^^^<<v^vv^>vv<^v<<v^v<v<<>^v<<><<^^v^^>v^vv<^>vv><v>>>vv^v^^<<^><>v<<<^v^^<><>v><^v<v>>v>^v<>>v>>v>^<^^v<<v><>>v<^v<^>v<^v><v<<^vv><^^<^^<<vv^>^<v<<<^>^>v>><>><v<v<>>vvv<<<vvv^v^>^v>><>><>vvvv<<v^v>v>vvv>^^^><^>>>v<vv^^v^v^<^>^^^<v<v^v><vv<^<vv>>^^v>>v><^v><vvvv>^>>><><<>>><<><<v>>^vv<v>^<v><v<vvv^v>>v><v<<^v^<>v>^v^>vv^^v<v^^^<^^<<vvv
>^<<^v<<><<^>^<<^^^<>vv>vv>vvvv><<<<><vvv<^vvv^<<<^><<<^>v^<^v>^><^v^><>^v<>^v>^v^v^^>>^<<v<>><<v<^><v>^<<>v>><vv>^>v^<v<<^>^<>v>><^v<v^<v^>^>><v^v^>vvv<>>^^>v^<<<v>^v<^vv^v<<<^vv<<^^vv<^<<<vv>>>v^><v^>v><>><><^^^v<^<v^vv><^v^v<v<<^v<>v<>^v^<<<^<<><<>^<^<>vv>v<<^<^v>vv^v<^<>>vv>><>vv><^^>v>>>^^<^vv<^><^^<^>>v<<>vv<v^v<>vvv><><v>^^<>^><^>^>><^<^v>>v<<v<<>^v<<<>v<>^^^<vv<<<^v<>>v^v>^<<>vv<<v<>>^v>^><^>^v^>>^><^>><^^^^vv^<^^><<^^<<<vv>v^^<v^^^<<^<v><^^vv^^<>>v<><<>v^v>v^vv<vv^v^^><>v^>^<>^<v^^><^<<<v>^^^<vv<^>^><<<^<>>^vv^<^<^^>^vv^^v<v^<^<<^>>>v><^v^<<v>^v<>v<vvv<v<v<<><v^^<>^^>v>^>^<><v^v^^v^v>vv>^^v><^<>>^^<^>^><^v<v<vvv^<v<^^<<>^^>v><<v^<<vv<v<^^<>v^<>>><^>vv><^<><^^>vv^>^>>>^v>>v<>><><>>^>>v^^v^^^<<>>v<>^<><v^^^v<^<<v^^^^<^^<^<>>^>><vv>^^v^^>><>>v^>v^>>vv^<>>^><<^>^^v^>>v<><v>v<v^<^>><^^v<^<v^>>>v><<vv^<><^<>^^vv^^^<<^vv^<^vvv<>^<>>v>^^v^>>v^^v<>>^v<<v^>><^^^vvvv^>^<<^<v>^v<<>><<^v<<<^><v<><>>^<v^^>v><^^v>v><>^^<v>v^v<v>>^>^^<>v>><<<v<<>>><>^>^<^v>>vv<<><^^^^>v^><<^^>^<>>>>><<<><vvvv
^v<<^>v>>^vvv<><^>v^>v^<v<v>^<vv<^v<^v^^v><^<^>>^><v>>><><vv^v<vv><<v<v^<<<v^v>^>^v><^>><^<>v>v<>^><<^<^<^v^v>^v>vv<^<<vv^<<><<>><>>><^<<^>^<v><v^>^>^<v>vv^>>^<v<<<<^<^v^^^><<v>v<v><^^><<vv<^<v>^^<>v^>v>vv^><^^vv^><vv><^>^><<^^^<^>^v>^vv>><>^v<^<>v<^^<^>>vv^^^<<>^^v^><>>vvvv>^vv>v<>^<^<v>^>^vvvv^<<<>v>><^><^v^>^vvv<<v<v>^^>>vv<^<^><<^<^>vv>^<^>>^v^>^<><>v<^<>^v>>^<<vv>^>v>v^vvvvv<<>v<v>^^>v>v^vv<><^<>v<^vvv<>>>^^^vvv>>v<v>>>>^v^v<^^^>v^^>^<>>^v<^<<>v>^<>v<vvvvv>^v^v^<><>v^>v<vv^><vv<>v><><<<><v^<<^^v>v<<^^v<<>>v^^^v<>^<^>v<^v<v^^v<^v^<<v<vv<>^>>^>><>^^^^>^>><<><>^^<>vvv>v<>^<vvv>^<^^<^>vv^<^<>^^vv>^>v<<v^vv>^>>>v^v<>>>>vvv^^<^^>><^v<<<^<>>>^^<>>v<^<v^^<<vv<<v^><<v<v>v^^>vvv<<>>^v^^^<v^v^^v>^<<^vv^^v<>v<^^<>v^>^<^^<v>v>^>^<v>>vvv<>v<^v^>>><<^<<^^<^>>>v<^^v^>><>><>v<><^>^><<^>v<<^^<v^>vv<^vvvv>^<vv^>^>^>><^<<>^<v<<>v<vv^<<>^v^<<^^<v<^v><>vvv^^^vvv^<v<<^v^^^^>>vv>v<v<<^^<><^^vvv^<^<v<vv><v>>^v^v<^>^<^^^v>^vv<^<>v>v^<v>>^<>><>><<>>v^>v>v><<<<v>vvvv^>^^vv<<vvv>>>v<<v><<v><^v^v^^>^<<^^^<<>v<
<vv<v^>><>^v<^<<v<>^^v>v><<v^^^^<<<<^<^>><v^^^vvv^v<><v<>^^v^><>v>^^>><v<vv<vv^v>>v^><>^>^<<^v^v>v<<^>^v<<^v>vv<^>>><v>^<>v^>>><^v<v<vvv>v<vv^<v^>^<<vv>><<^^v<<v<^^><<v><>vv>>^<^<>v>v>>>v^^<^<^v>^>vvv^^>^>^><^><v^>v^>^v^^<>vvvv^>>vvvv<^<>><^v<<>^<v^vv^><<><><^><>>^vv^v<^^>v<^>vv<>>v^^^^v<v^>v<<<<^^<>>>v>^v<v^v^v<^v^v<v^><<>vvvvv><<<v^<v^v^v>>v>v>v>v^v><^v<^>^^<>v<<<>^>><<^v<>^<>v<>>>^^v<><<^<>>>v<^v>>>>v^v^><^v>>^^vvv<^v<v>v>^^<>v^v>^<<>^>v<v>^<^>^v>v^v<v^^>>vv<^>><v>vvv^^^<>>^^>^<>><><^v>^<v<v^v<vvv<><<v<><vvvvv>>^^<><^v<<v><^^><vv>>>^<^^<v^<>>v>v^>^v>v>vv^^>v<v^v^^^<^v<^>v>vv<^<>v^^^^>>vv<<<>v^>^vv<v<^><<^v^^<v>v>^<>v<<>v^<v^^>>><<^^^^>^><<<<<v^v^v^vvv<<^><<v<v^><^<vv><^>^^v>>><v<<<<^^<>^vv<>^<>^^>vv<v^^^>vvv>^<>>><vv>>^^>v><>v>^>>^>^<<^^v<^<v<^<^^^v<^<v<^v^<>><^<><v^>^>>v<>>^^vv>>v>><<v^<vv>^^>v^<><<v<v<vv^>>><v<>^v>><<v><>v>^>v<^^<v^<v<^^<>^vv^v>v<>><^^v^^<>^^v^<v<<^^^>>>vv<<v^><v>v^<>>vvv<><>^^><<<v<^vv^>v<>^v<vv^><<<^^>>vv^>^v^>^<v^<^v<>>>^<>v><v>v^<^v<>^v<><^v^><v><v<v<<v^v^^>v<
>>^v><<^<<vv^<>v^v^<>>vv<>^><<<v>>>v^>^^<<v>v<v^v<^^>vv^<v^vvv<v^<^>>^<vv^<>><^vv<<vv^^><v<<^^>v>v>v>^<^v>^>^<^^^^>vv<<v<v^v<v<>^><>^<>^<v^v<v<v<<v>><><>vv<^v<>^^>^>v^<^v^^<^^^<<^<>^<><^vvvv>^<>^v^><<><><^^<>v<>^v<>>>v<v^^>^vvv^^^<><^^^<^^>vvvvv^^vv<>><<>v^^><^<<>>^><><^^<>^>v<<<>^<v><>^><v<>^>^v^^<<^<v^<><v<^^v<<>><v<^><vv^>^<>^<v>><>v^>v^^v<vv>v<<<>^<vv<^v^^v><^^<^<vvv^v^^^>>^<^>><<<>>v^>^<<<>vv><v^^v^<>vv<>^v^v><>><^^v>>>v^><^^^><>v<<v>><v<>>v<^<>>>vv><v><v<<<v<<^<^<^v>v^v>><v<^^^<>>^vv<^>^<>>v^><^<>>>v<^^v>^v^>><^><^<<><^^^>^>vv^>>^>>v<^^^<vv><<<>>^<>>>^^^^><v^vvv>v<^v<^>^vv>>>v^>vv><>v><><>^><v>>>vv^^>^<^^^v<^v>>vvv<v>^^^^><>vv<^>v>v<><>^^vv^v^^<>^^<^<>vv<>v>^<v<^><<>><<vv^>>vv^<v<^^>^<^^<>^^>>^^<><v><vvvv>>><^>v^><>^>v<<v^<^<<^^<^^^>^v<^><^>vv^>^><<^^><v^>>^<^v<<^^v>^>v^>vv^^<v>vv>>><><<><^v^<<<v^^^>^>>v^<vv^^>>>^>^v>>><>^v^^>>v<>vvvv^<^v^<^^^vv<<vvvvv>>^^^v<<^v^><<>^>>>^<v^>v>>vv><v^^v<vv>vv>^^<v^v<^v>^<>>vv^^^<^<<vv<vv>>>^v<>>vvv^^>^v^vv<<^<>^><^^^>><<v<><>^vv<<<<^<>v<^>>^v<^^v
<<>v<vv>^^>>v^^^^v^^>^v<v><^vv^vvv<v^^>^v>^^vv^^^^<^<<>vv<<^>>^^>>^>v>v^><^<<<vv^v^<<>><^>>vv<v>^^<^^v>v<v<v^<vvvv><^>>^^>>^v<^^vv>>>v^^<^<^^<vv^^>v^v><^v^vv^<<v^<^>>v<^>>v^^>>>>vv<^v^v<>v>v^^^^^^^>^^<^<>>^<v^>^^>v>>^^^<<^^^<>^<v^v^<<^v^vvv^>^vvv^^^v^<^>v^<<<^<^v<<<v^^<>^<<vv^<^v><v^<vv^vv<vv^><v^>^<<<^v>v^>v^<vv<<^^<<>>^^>>^<v<^v><^v>>^v^v^>>vv<<vv>v><<<^>><v><^>>v>v<^>vv^^>>vv^v^<vvv^<<v<vv^^v>v<>v><v^^^^v^v^v>v<><<>^vv^^^vvv>^v^v>v<>>^<>^vv>v^>>v^v>v>vv^>^>>>^v<<v><v><>^^<v>^^<v<<><^>^v<^>v>><<>^<^vvvv>v^<>^^v^vv^v^v>>vv^v<v^>>vvvvv^><v^>><v<v^^v>>>^<>>>vv<<<v>^><<<vv^^<<<>vv>vv<v<<>vvv<v^<>v><^<<<><^<^><v<^><^<^<>^><><>^v^<v^>>>v<vv^vv<<^^<>>vv>><<^<<<^v^<<>^<^<>>v^>v<>^^<>>v>>^<^^vv><v^<<<>v<<^v^<>v<>>^>>><vv<>vv^v<<v^><<^>>^>^><v<^>^vv<v<v>^<^><^v^>>^v>vv^v^<v^v^>^^<v^>>><^^^^v^>vvv^vv>v^v^^<^>>>^>v^<<<<^><^v^>v^v>^^<vv<v^^^^>vv>^^v<^<<>^<>v><><<>^v><vvvv<^v>^<^^>v<>^><v<>v<^>><<v^>>v^vv^v>vv^^<<>>v><>^>vv<>>>><>vv^v<>><vvvv<^^v<<v>v<><v^<v>^>^>vv^v>^vvvv>^<^v<<<<^v<^v^v<<^<<v>v>
^>v<^vv^^^>^>>><^>>>v>^>v>>>v<>>v<>^^<>^^^<^>^^<^v<^>>^><^>^^<^>v>>^^>v<<^^<<vv<^vvv<^v^>v<vv^>>><<>><<v^>>^v^^^^>>><>><<>>><^v>^^^^<>^<^<>^><<vv^v><^<^<<>>v<^^<<<<^<^<^<^^<v^<>v<>>>^v<^>><>^vv>^vv^^^<v>^<^vv>>vv<v<^>^<^^^^>^^<<^>v^^>^vv^>^>^v^>>v>vvvv>vvvv>>^><v<^<v>^^><^v^<^^<<^>^<<<<<^<>v^><<>v^<<v<<v>>>v>^<<^<v<<v<vvv^>><vvvvvv^v^vvv<v^><^^vv><>^<>^><>>v^<<^>v>^<vv>>>>v>vv^v<<>^v>^<>^>v^v>^>>>v<<vv<<<^^><>>><^v>^<v^v>v^vvv<v<^v^v<><>v>^v>vv^>><^>v>>>v<^>^<v<vv<<><v>vvvv<^>^<^^<v<><<v>vv<<v>v^^^<<^v<v>^>><^>^<<<<v>v>>><>>^>><<>^><^<<><v^^v^vv^v>v<v<>v>vv^><<>>v>><^<^^v^><<v^>^<><<><>v<<<v^<>>^v>><><<>^>><>v^>v^>vvv<>>^<>vv<^>vv>><>v><<><<<v^^>>v^v^^v<<<<v^vv>^^<>v>>^^^<><<^vv<>vv><^vv<^<v>^v<^>v^^v<vv<^^<^vvv^<^^v<<<><>v<<<^<<>vv><><^<>>^<>>vv<^^<vv>>><>vvv<>>^v><^^v>><<<^><>>>v^vv^^v^^<<<<^>^<^<<>><^>><>v>^^vvv^<^^<^^>^<>^^<>^><^v<^v<<v>v<>v^^v>^v^>^>^><vv^><<^^^<^^<<v<^><^vv>v^<^^>>vvv^><>>v>><^^<^v^v>>><<v<><<v<>^^>^<<v<>v^v^<>^><><><v<^<^vv^v><v>><^^v^<^<>v>><<>^<><^><^>^v<v^^<>
^^^>vv^v>^<v>v<>>>^v<v^<<v>>^^<<>v<><<^vvvv<v><^<>><>^<><><>v^^<<v<<<>^>>><>>vv^^>^>>^<<^v><>v<<v<><^>^^>>><<^>v^^^><v<^^>>><^^<^<^><^><<v^>^><^<^^v>^<<vv^^>^<<v^v^^^^^<<<<^v>>v^<<<>^v^v<v^>>><>v><<<^<vv^^^<^<^^>><>v<^vv<>^v<<v>^v^><vvvv<<>v><vv><<>^<>>^^>^<>>v>vv<<v^^<<^vv<v<<v>><^^>^vv>v>^<<><v>^v>^^><v^>>^>>><<v<^^<^v^vv>^<^^<^^>v<^^><<vvv<><^>>^vv^<>^v^<<v>v<v^vv^<^>v^v<^v^>^<<vv<>vv>v<<^<v<v<^>v><^>^v><<><>^>><<<^^>v><v<v^^>><v^v>>v<>v^v<^^>v^>>>v<<<v>vv>v^^^<v>vvv<v<>v<>>v>>v><<>v>vvv><<<^^<v><>v<^vv<>><^>>>v>><^>>^v><^>vv>>^vv<vvv<v>v<^><<^^>vv^^<>^v^><vv<>>>^<v^>>><vvv>>>>vv>>>v>^<^^<<>^<^v><>v<^^^<^^^v<<<<v>>><<<^v<^^^<^vvv<v>>>>^^^v<^<vv^^vv^><^>><<<^v^><<<v^vv<>^^^<^v^<>><><^^>^<<^v><<<vv<v<v^<^><>v^<<vv>>^<v>^^v^><vv>v<^><^v><><^><<v^>><><>v><^<^v<v<vv>vvv^^>^<<^<<^>^>^<<^<^^^v>>^v<>^><<<<v^v><<^>^vvv<v^^^<<^<v<^^vv<v^v<v^v^v^v<>>>>^v<v>v^><^^v>v^^<<^^<<><^v<><<^>>>>v<^^v<v>><<^v>><^v^<>v<<><>^><>^<<<^>v^^<vv<^^><v>^^v^v<v<<>^<>>><<v^v^v<<>>^<v<<v<^<>><v<v<v^v<vv>^>><>^v^^^
^<^^>>>>v<v>>vv>><<^v>^^v^v^^v^^vv>v<^^v<vv<>>^><<><^vv<^<vv>v<>^><<^v<><<>vv^^<vv>^>v<^>^v>vv^^^<^v^v^<<><v^v<vv>^^>>^^>^^v<^^v<<^<^^v^>>^<v>^><<v>^><>>v<^>v<^>>^vvv>v><<^><^v<v<<<<v<^^>>>v<v>>v>^<>v<^vv^^>>vvv^<v<>>>v<v^<<<>^>v^^><^>^><>>>^v>^^^v>^v<v>>^>>^<<><>>vvv<<^v>v>^<^<>vv^>>>>><^<v<<v>^>^><v^><^^>>>^^><^<<>^>>^>^><^<>^^v>^>^vv><v>><v>v^>vv^^^>^v^^<v>^<vv^<<>v^<>><>^^<^v>>^<v^><>v^v^v>vv><v^v>>^v<v<^<>>>^v^vv^>v<v^>><^<^<v<^<^<^v<^v<<>^v^<v><<<<>v^v>>v><^<vv>^^<<^v<>^v<>^<v<v^<<>><<^<^^vv><><^>v^>><<<>>^<<<v<<v>v^^v^v^^<v>v^^>^vv^>>v<<>vv>^v<vv>^<<vv^vvvvv<v>>^>><<^^<^^<^v>v^v^v^<^v<^v<v>v^<^v>>>^<^>^^^><<<><^^>>>v<>^>>v>>>v>^>v^<>><^<vv^<v><^>^v<v>><v<<^<<v^<^<<>^>vvv<^><v^^>^>><<<<>>v>>>><^^>vv^>>v^v^^v>>^><>v^^v><vv<<^v^><^<>^vvvv<^<>v^^^^<^<>><<<>^><v<^<^><v<<<<v^>^>v^>v^vv>vvv^<v^v><>vv<^<><>v>vv>^v^^vvvv^vv<^>><>^v>>>^<<^^<v>v^v><<><^^>v<^><^<>^>vv^^^^><^v>v><>v^>^vvv>>>>>^<^><v^vvv>>v^^>>>v>>vv^^>>v>^<^v^^>^>vv<<^v<<<vv>v>>v^><v<v<vv^>>vv^^v^v<^^vv>^v^>^^v<v<v>>^<vv<^<<
<<>>^>^>>v>vvv>^vv><^<vvv>>^^v>>^v<v^>>><<v<<v>^^>v>^>><<v><<<^^<><>^^>>^>v<>^<^>v>vv<^>^v<>>v<^>v<>^<^<^^vv^v<^<v<^>>v>>v><v>>><>v<<<^^<v<^>v<^vv>v<^v<vv^><^vv<><^<><<^v>>>^v>v^>^>>>vvvv>^>^^v^vvv>v<>^<^<^^>v<>^v^^v^<^v^^<v<>vv>vvv^^<v<><<<^^>v<>>^<^^^><^<<<^<^<v^>^>^<^^vvv<>v><vvvv>><>^>^^v^^>>v<vv>v>v>v>^vv>^<v<^><v^^<>^>^>v^v<^^v<>^>v>vvv>^<v>>^^>v<><v<^><^v>>>vv>v<^>>v>>^v<><^>vvv^<<^>v<>vv<>^^<v<>^<><>^<<^^>>vv><<v<>>>>>>vvvvvv^^>v<^^^^>>>>^<<vv^<^>v^^<^^vv^<^>v^><^^<<<>>^^><^v>>>><<^v^v<v<v<><<><^^v<v<^><<v^>^v><<>^><v^^^^>^>^<v<<>v<v>vv><<<<<><v^<^vvv><<<<^vv<<<^^vvvv>>>^<v<v^v>^>>>v>><<^v<<<vv><^<v>>vv>^<^<^>^^<^<<><^>^v>>^vv^>^v>vv>vv<<^^>^^<>v<><<>v>v^^><v^<>>v<>v^^^^<^><>>v^^>^<^^^vv^^><<vv>>^^v<><v<>v<v^<>vv>^^^>^^vv^v^v<^^<>^>>>v^^>^^<^><>vv>v>^v<<<^>^<>>>v<v^<v^>v^>vv<vvvv^<<<<v<>^^v<<>><^>vv><^vv>>v<>^^>>^v^^><^^>^^<<v^>^<>>^><v^<>v^<^v^^><^<v>v^v<^>><<v>v<^v^>vv<^>>v^v<^<^vv<^<<^v>v^v>v<^v^v>^^>>>^<><^>v>v^^<<>^<>>v^<><<^^<vv<<<v<v<<>v<><<>v^<v<<<^^>^<^v<v<><<>^vvv>^<<
^<vv^^>v><<v^<^vv<v^>v><>>>>>v>>vv<^<<v<v<>vv^<><<v<^v>^^><v^<><^>v<<^v><<vv^><^<>^^<>v<vv<<<^v>>^>vv>vv<^<>>vv<^<v>^>vv^^<^><><<^v<^><<^<>>vv<<<><>v>>v><><><>^^vvvv>^><vv<v>>^<<>v<<<^<<v<vvv^<>>^>v<<^v^><^><<v<>vv<><v><<^<v>vv>>^>v<<<^<vv>>>><v^<>v<^^v<v^^>v^<>>><>v><<<^<<v<<<^>v>><^vvv^<v<v><^>^v>^<v>><><v<<^><>^v^>v<v<^<>^<vv>^>v>^v>v>^>^v<^^><^v^>>>^<<^<v<v>><><vv^^<>v>^vv>>>>v><^>>^><^^<^^vvv<^v<<><<<<v^>^>^<<v>^<^>><v<v^<^^>^<v^<^<v^><v^^^vv><>^><>v<>>><vvv<<v>v^v>>v^<v>>^v><<<<^v>^vv^v>vvv<^><>>^>v<^v>^>^>vv<<>v^v^^>^>^v<<^v<>vv><^^v^<>^^^^>v<v^<<v>vv>><^v<<<<^v^>^v^v<vv<><^<<<>v^><^>v^^v><<>>v<^<<>>>v>^>^v>v^v<vv<^>^>vvv>>>vvvvv<>><<^^<>vvv<<v>v<<>v^^vv<<^^>v>^^v<>>>v><^><>v^^<><>><^>^>>>v^<><vv^^><><>vv^<v>>>v^v<>>v><<>><^^>v<^^<^v><><><<v<v<^^vvv<<^<><>>><v^>>^><<^<^><><^^>>v<<>^^^<><<<>v<^^v<vvv><<<v^>^^>vv<^^>>^>^^<^<<v>>v<<^v>^>><v^>>^<v>>>v><>>>v^>^v><>>v>><v<^^<^v>^v>v>^>^<<<^<^v<v<<><v^>^vvv>^<v>v^^<v>^v^>><vv^^^v>vv>v>vv>^>v^v^>>>><<^v^^>^v<v<v>^^v^vv>v^<^^><<^v^<>v><v
>^^v><<>><v^>>^>v<vv>v>^>v<<<<>>^>^<v^vv^<v>^<^<^v<<^v<>>v>^>>>^<>><<^^^^>^^<<^^><^<>v>>^<>><^v>><<^^v^^>v^^v^^>v>vv<v><^vv<>vvv<<v><v^v<<v^<>v^>>>v^^^^^v><^vvv<v^^<<v>^>><v^>v^<^v^<vv^>^<<^^^^<^v>v>v<^^>vv>^><>v^<v>v<>v<<v^v^v^^<^v^>v>>>v>>^>^^v<v><^vv>^^<<^>^v>^vv^<>^<v<<v><>v<<^><^v>>^>^v^<>>>^vv^>>^>>^><>>vv^<^><>^><^><<>>^^<<v><v^vv^><^<v^v^v>v><<<<v>>>>^>>v>><<>v<v^>v^><>>^v>v<>vv>>^>^v>>^v^<<^<v^<^><>vv^^v<v><>><><^>v>^^^^vv<>v^<<>>^><>^^v^v^<<>v>>v>><<>>^<^<^<>^^>^v<<<><^v<^<<<<v^<<<<^<v<>vv^<^^<^^v<v^^<^^v<^v<vvv<<^>vv<>><<<^>>^vv^<<>^v<>><<^>^^>><<><><^v<><><>vv>>>>v>^>^<>^<><v<v>>v^>v><v<v>^v><^>>v<<<<>^>v>v^>>^>^^^>v><<>v><v>>^<v>><<v>v^><<v>^>>^v<<<^v>v^^>^^^<v<<><v>^^<<>v^><^<<><v>^^>^><<^<>^<v^>>>^>v^<^^^>v>>><v<^>v>><v<><>>vv<vv>^^^v<>>^v^v><<<^^v<><>^<v><^^v>>>>^^v>v^>>>v>v^<v>vv^>v<^^<v<v^vv^<^vv<v<>>v>>v^>^vv^<v^>>>>>^^>^^v<^>>^^^>vvv<^>><<<vv>^<><<>v>^<^^^v^v>v<<^>v<>>><<<<v^>v>>vv>>^^^v>^v<><^>^<v<><>^^^<><>^>v><vv^v<v>v^^v<><^v^^v<<v<>>>v<v^<^^v^^><vv>^>>vv>>^<^v>
<<^<<><^<^v<<>>v>>v^vv^vvv>^>^v>>>>>>^>>^>vv><v^<><^>><<<^<vv>>>^>>>v^>><>^>v^^^<^<>^>^^vv>v<^<^>><<<v<v><>vvv^v^>v>^>^vv<>>^<>v^v<^>vv^v^^<^^vv>vv^<>^<^<<>^v<v^v><^<>^v^>v>^^><vv^<^>>>><>v^<^^<<<vv^v>>^^^><v^^>>^<v<<<<^><v^><^^><<>v>^v^><vvv^<<v^><^>vv^^^v<>><<<<^<>>>vv^><v>v^vv>v><><><><<<>^v<>v<v<>>^v<><vv>^v>v^^v<^<<><>>v^>>vv^<<<v^<v>>^v<>>>>><><<>^<^^<vvv>^^<<v>>^<^><^vv<><<><v^>>^<v^vv^<<<^>v^v^><^^<>^^^<>v<><<>>vv><<^<<vv>^>^<vv<^<>vv<<<v^v>^>>v>^>v^<vv>vvvvv>^^>vv^<^^<vv<>vv^^^^v^<>v>>>^v^^<>>v<>vv^v>>v<^>vv^v>>v^v<<>v>^v<>>><v>>v>vv^^^^^<<>^<>>><>>v^v<>v<>^^>>v<<^><v>><v^v^<v<<^>><>>v><^^<<><^<>^vv>><^>vv^^vv>v>>^^v>^v<>><^v^>>^<<<>^v^v<><^v^vv^^<>^>vv^^vv<<^v^>>^vv^^v^><<^<><<^^^^^><vv^^>v>v^^<<>><^>v>><><^^v><<<^<^vvvvv>><v<>v^>^<><>v><><>>^^<^^vv<^^vv^^v^v<>><v^^<vvv<>>v^<^<><^><<>>vv>^>>>^><v<v^><<>^^><vv><<>^^vvvvv><v^<><v>v>>vv^>>vv>^v><^v>>v^v^vv<<^^^^<v^<v^>v^<v><><<vv^v><<<v>vvvv>v^v><vv>><>>>>^>><>v>>v^><^^^>v^<<<^>v<<^^<>v<>v><vv><vv^vvv<<>v^v><<<v><<<<v^>v<v^v<^<v
^<<v<<v>^>vv^^^><<v>^<>^<<^<^><^v<<v<><<^^^v<^<^>^><<vvv>^^vvvv^^v<^><^^v>v<>><vv^v>>>>>^^^<<^v<^>^<><^vv>^v^>v^>><<v<^^^>v<>^>^><<<vv>^>v^>v^<v<<<><^v>>v><v^>v^vv^<>^>v>^>vv^^^>>>^>><vv<^v<vvv>>v<<^>>>><vv>><<>><v<>>>^v>>^>^<<v<<>^v>^^>^<<>v>>v<^>v>><><^>^<v<^>^^^v>^^^<^<vv<^v<v^^<v^<<^<v^v<^^vv<v<^>vvv<^>>v<^v<^>v^<^><^v><^vv>^>>^v>v><>^<^vv^<<^<vvv^v><<v<><<<><v<^vv^^<^^v>^^^<^v>^^<v^^><>><>v<v>v<v<v^>^>vvv^v>>><<<v^^>>vv><>>>v><v<^^<<><^^<>>>v<v>^<>>v^v>^v^^v<<vv>>^<<v^v>^^^^^>v^><v<v>^><><v>v^>>v^<^vv<<<>v<>^^>>>>>><<<v^^<<<v>^^<<v<^<^<>v^><^vv<<>><v^><vv^v^><^<>>^^>v^><<^>^<><vv>vvv^<^>v>vv<v<>v<^v>^>v^^>^<<>>>>><<><<>v<^v<^<v<^>v<^^<^>^>><^^^<^v>>^^^vv<^^<v<<^v^v^vv^<<<^^<><^>>>^<<<^v^><^v>v>><<>^^^>><v>>^><^<v^^v<>^^><^<^<v<v^>>>^v^<vv^^>^<^^<^v<>^v<>vv<^^<v><^^v>^v<^<<<>><v>><<><v<^v<<^><>^><><<>^v^<v>^^^vv^v>v^^^^<^vv<v^<<>v^vv<^^<<v<vv^<>v^^><^vvv>^<<><^v^><^v^v^vvvv<^^<>^v<<<vv><<^^<^<<^^<v>^>v><v^<^vv^vv>v><<>^<^<vv<<<v<<<><><^v^^v<>v>vv>><v>><^><v<<>^vv>v<<v^><^><<v><^^>v
<v>v><v>^>>v^^>^><vv><<<^v>^><v^^><v>vv>^v^<>^vvv>v<^<<>>v><<^^<<v>^<>><v^^v<^^vv>>>>vv><<<v>^<^^v>>^v>>v<v><v<><><vv<<^>><^>>^v><vv><v^<<><v^<><>^<v^>^^>v^<>><><^>^^>>^vv>^^^v>v<v><<^v<^>>v<v>>^<<vv^^v<>vv^<^^<^v<^<^><><v><v>>><<>^<><vv<<v^<v>^vv<<>^<>v^>^>^v^^><^>><^^<>^>>><v><^<v^vv^^<^v^^<<<<<vvv<<<>vv<v^v><v<vv<>^>v><^vvv<v<>v><><>><^>vvv^^v^<>v<<<<^>^<v<>v<><v><^^v^>vv^<v>^<v<>v>^<<<<^^vvvv^<^v>^^v^v>>><^^>^vv^<>><v^^^v>^^v>^v<vvv<v<<>^>>><v^>><<v<v^<>v^>^>^^v>^>v><^>v><<^v><v>^>v^<v>vv>^<<^^^^<^v<^v<v>^<v<><v<^><<^><<v^<^^^^<^vv<<<^v^>>><<v>>>^>>>><vv<<<><v^><^v<v<^<<>^>vv>^><<><><>>v<^<><>>>^vv>vv^<v<vv^<v>^<<<>vv^>v<v<vv^^^<^^v><^>>vvv>>^<v<^<v><v>><<<<<^<>^v>><<^<<^v>^>^^^^vvv<vvvv>vv^<v^^>>>vv^<>^v^>vv>vvv^^^v^v<v>^<^>vv^v><>vv>>^^^^v^>^<<<^>^<>v<^<>v^>v^<^v^><^^^>v^<v>^<><<><v^<vv^v<<<^<^^^vv^<>^>v<^^>>vvv>^^v<^><><^^^><<v<<^>><>^v<v^<^^><v^v<<<v<>vv>>^>>v<^^>>v>^<v><v^<v>^^v^^vv<^<>^<^<^^^v^>^>>v<<vv<v>v<><<v><<v<<<v<^^<<v>v<<^^<>>^^^<<^<>>v<v^<v>^^^^>><^^v>><>>>v<<v><v<<^
>><><<^^^v^^<><^>><>^<^^<<^v^v<<^>>><v^><<v><<<^>^<<v^v^^vvv^^><<>v^><>^^^<><<><^>v><^<>^vv^><vv<v^^<v<^vv<><v><vv<^<^><v<v^>^^>^v<>v^<<^^vvv<>>vv^<<v<^^>><><^^>vvvv>^>>>>>^>>>v^><v>^>>v<^^^<<v>^><>>^>><>^<<>vv<v>^<>^<<^<>^^<>vvvv^vv<<<>v><>^<^>>^<vv^vvv>v^v^<>>v^^>>v<v<><^^vv>vv<<vv^v>>>v^^vv><<>^v<><vv^<v>vv>^>v<vvv<vv^><><vv>^<^>^vv^<v>^v>v^^v<vv<><^<v^^v^><>^<<>v>^^<v>v><vv<>v^>>>><^v<<v<<vv>v^<v^v><v>v><vvv<v<^^>><>><<>^>>>^^v>^>v><^^vv>v>>><v>vvvv<v^v^vv<v<^>^^^<v<^>v<>><<>>vv^>^<v^^>v<<^<v<vv^^<^^vv^>v^v<^<vv^>>>><<<^>v><v^^><^<<^v>^v>^><>^^><>^<><>><>^vv>><vvvv<^^>>^^>^^vvv^<v>v^<>v<v<v^^<^^vv<^^><<v^^<^<^v>>v<v<>v<^<^v<vv<<^<<^^v>>v^^^>vvv^^^v<^^<<<^^<^^<>>>v^>^<^^v><>>>v^v><>v^<>vv^<<^>^v<>>vv>vv^vv>^^<>v^v>vv^<>><^^><>><>v<<^^>><>v^^^^<>^>v^^<v>v<^v^<>^>v>^>>>>>>^^><v<>v>>^vv>vv>><^>v><>>>>>v<<v^v>^^<>^v^^^^^v^<v>v<>v>>v>vv^><v<<<>>^vv^<<^>v<^^<^^<v>^v<v<v>>>vvvv>>>>>^<^^<<^v><^^><vv^<v<<>v^^v>^<^>^vvv<>>vv^v>^>>^^^>v>v<>>v^vv<<>^^<^vvv>^>^>^><v>v^<>^^>v<v^<<><>><><v^<v^^vvv`]
}

run();