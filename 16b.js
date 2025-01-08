let id = 0;

function run(){
  var input = getInput().trim().split('\n').map(x => x.trim().split('').map(m => m.trim()));
  const yLength = input.length;
  const xLength = input[0].length;
  const walls = [];
  const walls2 = [];
  const start = { x: 0, y: 0}
  const end = { x: 0, y: 0}
  for(let y = 0; y < yLength; y++){
    const wallLine = [];
    for(let x = 0; x < xLength; x++){
      const item =input[y][x];
      let wall = false;
      if(item == '#'){
        walls.push({ x, y });
        wall = true;
      } else if(item == 'S'){
        start.x = x;
        start.y = y;
      } else if(item == 'E'){
        end.x = x;
        end.y = y;
      }
      wallLine.push(wall);
    }
    walls2.push(wallLine);
  }

  const nodes = []; //{ id, pos: { x, y }, connect: [] }   id: x0y0
  const skip = [];
  let nodeIds = 1;
  const deadEnds = [];
  for(let y = 1; y < yLength - 1; y++){
    for(let x = 1; x < xLength - 1; x++){
      if(walls2[y][x]){
        continue;
      }
      if(!isNode(x, y, walls, deadEnds)){
        continue;
      }

    }
  }

  const stack = [];
  stack.push({steps: 0, turns: 0, score: 0, dir: '>', pos: {...start}, route: []})
  const finished = [];
  let count = 0;
  while(stack.length > 0){
    const item = stack.pop();
    count++;
    if(count == 10000){
      draw(item, xLength, yLength, walls, start,  end);
      count = 0
    }
    var neighbors = getNeighborNonWalls(item, walls);
    if(neighbors.length == 0){
      continue;
    }
    neighbors.forEach(n => {
      if(n.pos.x == end.x && n.pos.y == end.y){
        finished.push(n);
        console.log('got to end')
        return;
      } else if(stack.some(s => s.score < n.score && ((s.pos.x == n.pos.x && s.pos.y == n.pos.y) || s.route.some(sr => sr.x == n.pos.x && sr.y == n.pos.y)))
        || finished.some(s => s.score < n.score && s.route.some(sr => sr.x == n.pos.x && sr.y == n.pos.y))){
        // ignore another route is on this
      } else {
        stack.push(n)      
      }
      
    });
  }

  var best = finished.reduce((p, c) => c.score < p.score ? c : p , { score: 999999999999999999999999999999 });

  console.log(best.score);
 // draw(best, xLength, yLength, walls, start, end, true);

}

function isNode(x, y, walls, deadEnds, end, start){
  var top = walls[y - 1][x];
  var left = walls[y][x-1];
  var right = walls[y][x+1];
  var bottom = walls[y + 1][x];
  var returnVal = [];
  var count = 0;
  if(!top){
    count++;
  }
  if(!left){
    count++;
  }
  if(!right){
    count++;
  }
  if(!bottom){
    count++;
  }
  if(count == 0){
    return [];
  }
  if(count == 1 && !(x == start.x && y == start.y) && !(x == end.x && y == end.y)){
    deadEnds.push({ x, y });
    return [];
  }
  if(count == 3 || count == 4){
    return true;
  }

  
}

function draw(item, xLength, yLength, walls, start, end, dontClear){
  if(!dontClear){
    console.clear();
  }
  for(let y = 0; y < yLength; y++){
    var line = '';
    for(let x = 0; x < xLength; x++){
      if(walls.some(w => w.x == x && w.y == y)){
        line += '#';
      } else if(item.route.some(w => w.x == x && w.y == y)){
        var r = item.route.find(w => w.x == x && w.y == y);
        line += r.dir;
      } else if(start.x == x && start.y == y){
        line +='S'
      } else if(item.pos.x == x && item.pos.y == y){
        line +='@'
      } else if(end.x == x && end.y == y){
        line +='E'
      } else {
        line += '.'
      }
    }
    console.log(line);
  }
}

function getNeighborNonWalls(item, walls){
  const returnVal = [];
  if(!walls.some(w => w.x == item.pos.x && w.y == item.pos.y - 1) && !item.route.some(r => r.x == item.pos.x && r.y == item.pos.y - 1)){
    let turns = 0;
    if(item.dir == '>' || item.dir == '<'){
      turns = 1;
    } else if(item.dir == 'v'){
      turns = 2;
    }
    if(item.route.length == 0 || turns < 2){
      returnVal.push({ 
        id: id,
        turns: item.turns + turns, 
        steps: item.steps + 1, 
        score: item.score + 1 + (1000 * turns),
        dir: '^', 
        pos: { x: item.pos.x, y: item.pos.y -1 }, 
        route: [...item.route, { ...item.pos, dir: item.dir }] });
        id++;
    }
  }
  if(!walls.some(w => w.x == item.pos.x && w.y == item.pos.y + 1) && !item.route.some(r => r.x == item.pos.x && r.y == item.pos.y + 1)){
    let turns = 0;
    if(item.dir == '>' || item.dir == '<'){
      turns = 1;
    } else if(item.dir == '^'){
      turns = 2;
    }
    if(item.route.length == 0 || turns < 2){
    returnVal.push({ 
      id: id,
      turns: item.turns + turns, 
      steps: item.steps + 1,  
      score: item.score + 1 + (1000 * turns),
      dir: 'v', 
      pos: { x: item.pos.x, y: item.pos.y +1 }, 
      route: [...item.route, { ...item.pos, dir: item.dir }] });
      id++;
    }
  }
  if(!walls.some(w => w.x == item.pos.x - 1 && w.y == item.pos.y) && !item.route.some(r => r.x == item.pos.x - 1 && r.y == item.pos.y)){
    let turns = 0;
    if(item.dir == 'v' || item.dir == '^'){
      turns = 1;
    } else if(item.dir == '>'){
      turns = 2;
    }
    if(item.route.length == 0 || turns < 2){
    returnVal.push({ 
      id: id,
      turns: item.turns + turns, 
      steps: item.steps + 1,  
      score: item.score + 1 + (1000 * turns),
      dir: '<', 
      pos: { x: item.pos.x - 1, y: item.pos.y }, 
      route: [...item.route, { ...item.pos, dir: item.dir }] });
      id++;
    }
  }
  if(!walls.some(w => w.x == item.pos.x + 1 && w.y == item.pos.y) && !item.route.some(r => r.x == item.pos.x + 1 && r.y == item.pos.y)){
    let turns = 0;
    if(item.dir == 'v' || item.dir == '^'){
      turns = 1;
    } else if(item.dir == '<'){
      turns = 2;
    }
    if(item.route.length == 0 || turns < 2){
    returnVal.push({ 
      id: id,
      turns: item.turns + turns, 
      steps: item.steps + 1,  
      score: item.score + 1 + (1000 * turns),
      dir: '>', 
      pos: { x: item.pos.x + 1, y: item.pos.y }, 
      route: [...item.route, { ...item.pos, dir: item.dir }] });
      id++;
    }
  }
  return returnVal;
}

function getInput(){
/*  return `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;*/

/*return `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;*/
return `#############################################################################################################################################
#.............#.................#...............#.................#.......#...........#.......#.................#.....#...#.............#..E#
#.###########.#.#########.#.#####.#.#######.#####.#############.###.#####.#.#########.#.#.###.#.#####.###########.###.#.#.#.#####.#######.#.#
#.........#.#...#...#...#.#.....#.#...............#...........#.#.......#...........#...#...#.#.#...#.#.........#.#.#.#.#.................#.#
#########.#.#######.#.#.###.###.#.#.#.#.#.###.#########.#.#####.#.#########.#######.#######.#.#.###.#.#.#######.#.#.#.###.#.#.#.#.#.#######.#
#.....#.#.#.........#.#.........#.#...#.#.#.#.#.........#.#...#.#.#.#.........#...#.#...#...#.#.....#.....#.....#...................#.#...#.#
###.#.#.#.#.#######.#.#####.#####.#####.#.#.#.###.#########.#.#.#.#.#.#####.#.#.#.#.#.#.#.###.#####.#######.#.#####.###.#.#.#.#.###.#.#.#.#.#
#...#...#...#.........................#.#...#.....#...#.....#.#.#.#.#.#.....#.#.#.#...#.#.#.#.#...#.#...#...#.#.......#.#.....#.......#.#...#
#.###.#####.#.###.#####.#####.#########.#########.#.#.#.#####.#.#.#.#.#.#.#.#.#.#.#######.#.#.#.#.#.###.#.#####.#######.#######.#######.#####
#.#...#.........#...#.........................#...#.#...#.......#.#.#.#.#.....#.#.....#...#.#.#.#...#...#.....#...#.....#.....#.....#...#...#
#.#####.#######.###.#.###.#####.#####.#.#.###.#.###.###.#####.###.#.#.#####.###.#####.#.###.#.#.#####.#######.###.#.#####.###.#####.#.###.#.#
#.#.......#.....#...#.....#...#...#.................#...#...#.#...#.#.....#.#...#.....#.#...#.#.....#.....#.....#.#.......#.#.#...#.........#
#.#.#######.#####.#########.#.###.###.#.#.#.#.#.#.#######.#.#.#.###.#####.#.###.#.#####.###.#.#####.###.#.#.###.#.#.#######.#.###.#.#.#.###.#
#.....#.....#...#.........#.#...#...#.....#.#...#.....#...#.#.#.......#...#.....#...#.....#.#...#.#.....#.#...#.#.#.........#...#...#...#...#
#.#.#.#.#.###.#.#########.#.#.#.###.#####.#.#########.#.###.#########.#.###.#######.#####.#.###.#.#######.###.###.#.#.#####.###.#########.#.#
#.#...#.#.#...#.....#.....#.#.#...#.....#.....#...#...#...#.........#...#.........#.......#...#.#...#.....#.#.....#.......#...#...#...#...#.#
#.###.#.###.#####.###.#####.#.#########.#.###.#.###.###.#####.#.#.###.#.###.###.###########.#.#.###.#.#####.###.#.#.#####.#.#####.#.#.#.###.#
#.#...#.........#.#...#.....#.....#.....#...#.#...#.#...#.....#...#...#.......#.......#.....#.#.#...#.#.......#...#.#...#.#.....#...#.#...#.#
#.#.#############.#.#######.#####.#.#####.#.#.#.#.#.#.###.###.#####.#########.###.###.#.###.###.#.#.#.#####.#######.#.#.#######.#####.#.#.#.#
#...#.....................#.....#.#.......#.#.#.#.#...#...#.#.#...#.#.......#...#.#.#.....#...#...#.#.....#.....#...#.#.........#...#.#.#.#.#
#.#.#.#########.#####.###.#######.###.#####.#.#.#.#####.###.#.#.#.#.#.#.#######.#.#.#####.###.#.#########.###.#.#.###.#######.#.#.###.###.###
#.#.#.#.......#.........#.................#...#.#...#.#.#.#.....#...#.#...#.....#...#.......#...#...#...#...#.#...#...#.......#.#...#...#...#
#.#.#.#######.#########.#####.###############.#.#.#.#.#.#.#.###.#####.###.#.###.###.###.#.#######.#.#.#.###.#.#####.###.#.#####.###.#.#.#.#.#
#.....................#.#.....#...#.........#.#.#.#.#.#.....#...#...#.#...#.#.....#...#.#.....#...#...#.....#.#...#.#.#.#.....#...#...#.#.#.#
###.#.#.###.#.#.#####.#.#.###.#.#.#.#######.#.###.#.#.#.#.###.###.#.###.#.#.#.#######.#.###.#.#.###############.#.#.#.#.#####.###.#.#.#.###.#
#...#.#.#.......#.....#.....#...#...#.....#.#.....#...#.#.#.#.#...#...#.#.#.#.........#.#...#.#...#.............#...#.......#.......#.#...#.#
#.#.#.#.#.#.#####.###.#####.#########.#.###.#####.#####.#.#.#.#.#.###.#.###.#####.###.###.###.###.#.###.#.#.#########.###############.###.#.#
#...#...#.#.....#.#.....#.............#.#...#.....#.....#.#.#.#.#...#.#...#.....#...#.....#.#.#.#...#...#.#.......#.#...#.......#...#.#.#.#.#
###.#.###.#####.#.#####.#.#####.#.#######.###.#####.#####.#.#.#####.#.#.#.#####.#.#.#######.#.#.#####.###.#######.#.###.#.#####.#.#.#.#.#.#.#
#.#.....#.#...#.#.....#.#.#.....#.#.......#...#...#.#...#...#.......#.#.#.....#...#.....#.....#...#.#...#.#.....#.#.#...#...#.#.#.#.....#.#.#
#.#.#.#.#.#.#.#.#####.#.#.#.#####.#.###########.#.#.###.###.#########.#####.#.#########.#.#####.#.#.###.#.###.###.#.#.###.#.#.#.#######.#.#.#
#.......#.#.#.#.....#.#.#.#.....#.#.....#.......#...#...#...#.......#.#...#.#.....#.....#.#.....#...#...#.#...#...#...#.....#.........#.#.#.#
#.#.#.###.#.#.#.###.#.###.#####.#.#####.#.#########.#.#.#.###.#######.#.#.#.#.#####.#####.#.#######.#.###.#.#.#.###.###.#############.#.#.#.#
#...#.....#.#.....#.#...#...#.#.#.#...#...#...........#.#...#.......#...#...#.#.....#...#...#.......#...#...#.#...#...#.#.............#.#.#.#
###.#.#.#.#.#####.#.###.###.#.#.###.#.#####.#######.#######.#.#.###.###.#######.###.#.#.#####.#########.#######.#.###.#.#.###.###.#######.#.#
#.............#.#.#...#.......#.....#.....#.....#...#.....#.#.#...#.....#.....#.#.....#.#...............#.....#.#.#...#.....#...#...#.....#.#
#.#.#.#.#####.#.#.###.#################.#######.#.###.###.#.#.###.#######.###.#.#.#####.#########.#####.#.###.###.#.###########.###.#.#####.#
#.#...#.#...#...#...#.#...............#.....#...#...#...#.....#...#.......#...#.......#.#.........#.........#...#.#...#.......#...#.#...#...#
#.#.#.#.#.#.###.#.###.#.#######.#####.#.#.###.#####.#.#.#######.###.###.#.#.###########.#.#########.#####.#.###.#.#####.#####.#.#.#.###.#.###
#.#.#.....#...#.#...#...#...........#.#.#.........#.....#.....#.#...#...#.#.#.....#.....#...#...#...#...#.#.#.#...#...#.#.....#.#.#.#...#...#
#.#.#.#####.#.#.###.#########.#####.#.###########.#######.###.#.###.#.###.#.#.###.#.#######.#.#.#.###.#.###.#.###.#.#.#.#.#######.#.#.#####.#
#.#.#.#...#.#...#...........#.....#.#.......#...#.......#...#.#.....#.#...#...#...#.......#...#.#...#.#.#...#.....#.#...#.......#.#...#.....#
#.#.#.#.#.#######.#########.#######.#######.#.#.#.#.#######.#.#.###.#.#.#.#####.###.#####.#####.#.###.#.#.#.#.#####.###########.#.###.#.#.#.#
#.#.#.#.#.......#.......#...#.............#.#.#.#...#.....#.#.......#.#.#.....#...#.....#.....#.#.#...#.#...#.#...#...........#...#.....#.#.#
#.#.###.#######.#.#####.#.###.###.#######.#.#.#.#.###.#.#.#.#########.#.#####.###.#########.#.#.###.###.#.#.#.#.#.###########.###########.###
#.#...#.#.#.....#.......#.#...#.#.#.....#.#.#.#...#...#.#.#.....#...#.#.....#...#...#.......#.#.....#...#.#.#...#.......#.....#.........#...#
#.###.#.#.#.#####.#.#####.###.#.#.#.#.#.#.#.#.#####.###.#######.###.#.#####.#.#.#.#.#.#########.#######.###.#######.###.#.#####.#######.###.#
#.................#.#.....#...#.#...#.#.#.#.#.#...#.#.#.....#...#...#.....#.#.#.................#.....#.....#.........#.#.#...#.#...#.......#
#.#.#.#.#.###.#####.#.#####.###.#####.#.#.#.###.#.#.#.###.###.###.#######.#.###.#####.###########.###.#######.#######.###.#.#.#.#.#.#.###.###
#.#...#.#...#...#...#.#...#...#.........#.#...#.#.#...#...#...#...#...#...#...#.#...#.........#...#.#...#...#.....#.#.#...#.#...#.#.#...#...#
#.#####.###.###.#.###.#.#.#.#.#.#########.###.#.#.###.#.#.#.###.#.#.#.#.###.#.#.#.#.#####.#####.###.###.#.#.#####.#.#.#.###.###.#.#.#.###.#.#
#.#.....#.....#.#.....#.#.#.#.#.....#.......#...#.#...#.#.....#.#.#.#...#.#.#...#.#.#...#.#...#...#.....#.#.......#.#.#.#...#...#.#.#.#...#.#
#.#####.#####.#.#.###.#.#.###.#####.###.#.#####.#.#.###.#.###.#.#.#.#####.#.#####.#.###.#.#.#.###.#.#####.#.#######.#.#.###.###.#.#.###.#.#.#
#.....#...#...#.#...#...#...#.#...#.....#.#...#.#.....#...........#.......#.......#.......#.#.......#.....#.......#...#...#...#.#.#.......#.#
#####.###.#.###.###.#####.#.#.###.#######.#.#.#################.#######.#.###########.#.###.#######.#.#####.###.###.#####.###.#.#.#######.#.#
#...#.....#...#.#...#.....#...#...#.....#...#.#.....#.........#.#.......#.........#...#.#...#.....#.#.....#...#.#...#...#...#.#.#.#.#.......#
#.###########.###.###.###.#####.###.#.###.#.#.#.###.#.#####.#.#.#.###.###.###.###.#.#.###.###.###.#.#.###.###.#.#.###.#.###.#.###.#.#.###.#.#
#.......#.....#...#.....#.....#.....#...#.#.#...#...#...#...#.....#.........#.#.....#...#...#...#.#.#.#...#.#.#.......#.....................#
#.#.#####.#####.###.#####.#####.#######.#.#.#####.#####.#.#.#########.#####.#.#####.###.###.###.#.#.#.#.###.#.#########.#######.#.#.#.#.#.###
#.#.#.....#...#...#...#...#.....#.....#...#.#...#.#.....#.#.........#.#...#.#.#...#...#...#.#...#.#.#.#.#.....#.......#.#.....#.....#.#.#...#
#.#.#.#####.#.#.#.###.#.###.#######.#.#####.###.#.###.#######.#####.###.#.###.#.#.###.###.#.#.#####.#.#.###.###.#####.###.#.#.#.#####.#.#.#.#
#.#...#.....#...#.#...#...#.#.......#.....#.#...#.....#.....#...#.......#.....#.#...#...#...#.....#.#.#...#...#.#...#.......#.#.#.....#.#...#
#.#######.#####.#.###.###.#.#.#.#########.#.#.#########.###.###.###############.###.###.#####.###.#.#.###.#####.#.#.#########.#.#.#####.#.###
#.......#.#...#.#...#...#...#.#.#.....#...#.#...#.......#...#...#.....#.........#.#...#.#.......#.#.#...#...........#...#.....#.#.....#...#.#
#######.#.#.#.#####.###.#######.###.###.###.###.#.#####.###.#.###.###.#.#########.###.#.#########.#.#.#############.###.#.#####.#####.#.###.#
#.#.....#.#.#.......#.#...#.....#...#...#.#.#...#.....#...#...#...#...#.#...#.......#.#.#.......#.#.#.#.....#...#.......#.#...........#.....#
#.#.#######.#####.###.###.#.#####.#.#.###.#.#.###.#.#.###.###.#.###.###.#.###.###.#.#.#.#.#####.#.#.###.###.#.#.#########.#.#####.###.#####.#
#...#.......#.....#.........#.....#.......#.#.......#...#...#.#.#.#.#...#.......#.#.#.#...#.......#.....#.#...#.#...#...#.#...#.#...#.#...#.#
#.###.###.#####.#.#.#######.#.#.###.#.###.#.#########.#.#.#.###.#.#.#.###########.#.#.###############.###.#####.#.#.#.#.#.###.#.###.###.#.###
#.#.....#.......#.#.#.........#.#...#...#.#...........#.#.#.......#...............#.#.#...#...#.......#...........#...#.#.#...#...#.....#...#
#.#.###.#.#######.#.#####.#####.#.#####.#.#######.#####.#.#######.#################.#.#.#.#.#.#.#.###.#.###.#.#########.#.#.#.###.#########.#
#.....#.#.....#.#.#.....#.#.....#.#.....#.......#.#.....#...#...#.#...#...#.#.......#.#.#...#...#.#...#.#...#.........#...#.#...#.....#.....#
###.#.#.#.#.#.#.#.#.#.#.#.#.#####.#.#.#########.#.#.#########.#.###.#.###.#.#.#######.#.#########.#.#####.###########.#####.###.#####.#.###.#
#...#.#...#.#.#...#...#...#...#.#.#.#.........#...#...........#...#.#.....#.#.#.....#.#...#.......#.......#.......#...#...#...#.#.....#.#...#
###.#.###.#.#.###.###########.#.#.#.#########.###.###############.#.#####.#.#.#.###.#.###.###.#.#.#########.#####.#.###.#.#.#.#.#.#####.#####
#...#.#...#.#...#.#...........#.#.#.........#.#...#...#...........#.#.....#...#...#.#.......#...#.#.........#.......#...#...#.....#...#.....#
#.#.#.#.###.###.#.#.###########.#.#.#######.#.#.###.#.#.#######.#.#.###.#.#.#.###.#.#######.#.#.#.#######.#.#.#######.#######.#####.#.#.###.#
#...#.#.#...#...#.#...#.....#...#...#.....#.#.#.....#.#.....#.#.#...#...#.#.#...#.#.....#.#...#.#.......#.#.#.....#...#...#.........#.......#
#.#.#.#.#.###.###.###.#.###.###.###.#.###.###.#######.#.#.#.#.#.#####.#####.#.#.#.#.###.#.###.#####.###.#.#.#####.#.#####.#.#######.#.###.###
#.#...#.#...#.#...#...#...#...#...#...#.#...#.#.........#.#.#.......#.......#.#.#.#...#.#.....#...#...#.#.#.......#.......#.....#...#...#...#
#.#.###.#####.#.###.###.#####.#.#######.###.#.#.#.#.###.#.#.#######.###.#######.#.###.#.#######.#.#.#.#.#.#.#############.#####.#.#####.###.#
#.......#.....#...#.....#.....#...#...#.....#...#.#.#...#.#...#...#...#.#.....#.#...#...........#...#.#.#...#...........#...#.#.#.......#...#
#########.#######.#######.#####.#.#.#.#.#########.#.#.###.###.#.#####.#.###.#.#.###.###############.#.#.#####.###.#.#######.#.#.#.#####.#.###
#.........#.....#.........#...#.#.#.#.............#.#.....#...#.....#.#.....#...#.#.....#...#.........#.#...#.#.#.#.#.........#.#.....#.....#
#######.#######.#######.###.#.###.#.###############.#######.###.#.###.#########.#.#####.#.#.#.#######.#.#.#.#.#.#.###.#.#####.#.#####.#.###.#
#.......#.....#.............#.....#.#.....#.......#.....#...#.#.#.....#...........#...#.#.#...#.....#.#...#.#.#.#.....#.....#.#.....#...#...#
#.#######.###.#######.#####.#.#####.#.###.#.#####.#####.#.###.#.###########.###.###.#.#.#.#####.###.###.#.#.#.#.#########.#.#.#####.###.#.#.#
#.#.....#...#.......#...#...#.#.....#...#...#.........#.#.#...........#...#.....#...#.#.#.#...#.#.#...#.#...#.......#.....#.#.....#.#.#...#.#
#.#.###.###.#######.#.###.###.#.#.#####.#####.#.#####.#.#.#.#.#.#.###.#.#.#######.###.#.#.#.#.#.#.###.###.#######.###.#####.###.###.#.#.###.#
#.#...#.....#...#.#.#.#...#...#.#.....#.#.#...#.#...#.#.#.#.#.#.#.#.....#.......#.#.#.#.#...#...#...#.#...#.....#.#...#...#.#...#...#.....#.#
#.#.#.#######.#.#.#.###.#.#####.#.#####.#.#.#####.#.###.#.###.#.#.#############.#.#.#.#.###########.#.#.###.#.###.#.#.#.#.###.###.###.#.#.#.#
#.#.#.#...#...#...#.....#.#...#...#.....#.#.......#...#.#.#...#.#.#...#...#.....#.#.#.#.#...#.......#.#.....#.#...#.....#.......#.#...#...#.#
#.###.#.#.###.#####.#.#####.#.###.#.#####.###########.#.#.#.#.#.#.#.#.#.#.#####.#.#.#.#.###.#.###.#.#.#######.#.#################.#####.###.#
#...#.#.#.....#.....#.#.....#...#.#.....#...........#...#.#.#.#.#.#.#...#.....#.#.#.....#...#...#...#.#...#...#.........#...#.....#...#...#.#
###.#.#.#######.###.#.#.#####.###.#####.#####.###.#.#####.#.###.#.#.#########.#.#.#######.#####.#.###.#.#.#.#.#########.###.#.#####.#.#.#.#.#
#...............#.#...#.#.........#.........#.#...#...#...#.#...#.#...#...#...#.#.....#.......#.#.......#...#.....#...#.....#...#...#...#...#
#.###.#.#####.#.#.#.###.#.#.#########.#####.#.#.#####.#.#.#.#.###.###.#.###.###.#.###.###.#.###.#################.#.#.#####.#.#.#.#####.#.#.#
#.#...#.#...#...#...#.#...#.....#.........#.#.#...#...#.#.#.#.......#...#...#.#.#...#...#.#...#.#...........#...#.#.#.....#...#.#.....#.#.#.#
#.###.###.#.#.###.#.#.#########.#.#####.###.#.###.#####.#.#.#.###.#####.#.###.#.#######.#.###.#.#.#########.###.#.#####.#####.#.#.###.#.#.#.#
#.......#.#.#.#...#.....#...#.#.#.....#.#...#.#.#.......#.......#.#.....#.#.#...#.......#...#.#.#...#.....#...#.........#...#.#.#.#...#...#.#
#.#.#.#.#.#.#.###.#####.#.#.#.#.#####.###.###.#.#########.#.#.###.#.#####.#.#.###.#########.#.#.###.#.#.###.#.#########.#.#.#.#.###.#######.#
#.#.#.#.#.#.#.....#.......#...#.......#...#...#...#.......#.#.....#.#.....#.#.#...#.#.......#...#...#.#.#...#.......#...#.#...#...#.........#
#.#.#.#.#.#.#####.#.#####.#.#####.#####.###.###.#.#.#.#.###.#######.#.#####.#.###.#.#.###########.###.###.#.#######.#####.#######.#########.#
#.....#.........#.#.#...#...#...#.#.....#.#...#.#.#.#...#...#...#...#.#.......#...#.#.#.....#.........#...#.......#.........#...............#
#.#.###########.#.#.#.#.#####.#.#.#.#####.###.###.#.#####.#####.#.###.#.#####.#.###.#.#.###.#.#######.#.#########.#########.#.#.###.#####.###
#.#.......#.....#...........#.....#.#.....#.#.....#...#.#.....#.#...#.#.#...#...#.........#...#.#...#.#...#...#...#.........#.#...#.#...#...#
#.#######.#.###.#####.#####.#.#####.###.#.#.#####.###.#.#####.#.###.#.###.#.#############.#####.#.#.#####.#.#.#.###.#####.#.#.###.#.#.#.###.#
#.......#.#.#...#.........#...#.....#...#...#.....#...#...#...#.#...#.....#.....................#.#.#...#.#.#...#...#.........#...#...#...#.#
#####.###.#.#####.#############.#####.#######.#####.###.#.#.###.#.#########################.#####.#.#.#.#.#.#######.#.###########.#.#####.#.#
#...#.#...#...#...#...#.........#...........#...#...#.....................#...#.........#...#.....#...#...#.#.#.....#.......#...............#
#.###.#.#####.#.###.#.#.#########.#########.#.###.###########.###.#########.#.#.###.###.#####.###########.#.#.#.#.#######.###.#.#.#.#.#.###.#
#.....#.#...#...#.....#.#.....#...#.......#.#.#...#.......#...#...#.........#...#.............#.....#.....#.#...#.......#.#...............#.#
#.#.###.#.#.#.#######.#.#####.#.#####.###.#.#.#.###.#####.#.###.###.#############.###.#########.###.#.###.#.###########.###.###.#.###.###.#.#
#.#...#.#.#.#.......#.#.#.....#.....#.#...#...#...#.....#.#...#.#.#...#...#.........#...#.....#...#.......#.#...#.......#...#...............#
###.#.#.#.#.#######.#.#.#.#########.#.#.###.#####.#.#####.#####.#.###.#.###.#########.#.#.###.###.#####.#.#.#.#.#.#######.###.###.#####.#.#.#
#...#...#.#.#.....#...#.#.......#...#.#.#.......#.#.#.....#.......#...#.#...#...#...#.#.#...#.#...#.#...#.#.....#.#.......#.................#
#.#.#####.#.#.###.###.#.#.###.###.#.###.#.#####.#.#.#.###.#.#######.###.#.###.#.#.#.###.#.###.#.###.#.#########.#.#.#######.###.#.#####.#.#.#
#.......#.#.#...#...#.#.#...#...#.#.....#.#.....#...#.#...#.#...#...#...#.#...#.#.#.......#...#.....#.#.......#.#.....#.....#...#.....#...#.#
#.#.###.#.#.###.#.###.#.#####.#.#.#.#####.#.#####.###.#.###.###.#.###.###.###.###.###.#.#.#.#######.#.#.#.###.#.#.#####.#####.###.###.#####.#
#.#...........#.#.#...#.....#.#.#.#.#.....#...#.#...#.#.....#...#.#...........#...#...#...#.....#...#...#.....#.#...#...#...#.#...#...#.....#
#.#.#.#####.#.#.#.#.###.###.#.#.#.#.#.#.#.###.#.#.###.#.#####.#.#.#######.#####.###.#####.###.#.#.#######.#####.###.#.###.###.#.#.#.#######.#
#.#.#.#.....#...#.#.#.....#.#.#.#.#.#.#...#.#.#...#...#.....#.#.#.......#.#.....#...........#...#.#.#...#.....#...#.#.#.#.....#.#.#.#.......#
#.###.#.###.#####.#.#.#.#.#.#.#.#.#.#.#####.#.#.###.#######.#.#.#######.###.#####.###.#######.###.#.#.#.#####.#.#.###.#.#.#####.#.#.#.#####.#
#.#...#.#...#...#...#...#.#.#.#.....#.#.....#.#...#.#.....#...#...#...#...#.#...#...#...#...#...#.#.#.#.#.....#.#.#...#.#.#.....#.#.#.#...#.#
#.#.###.#.###.#.#.###.#.###.#.#######.#.###.#.###.#.#.###.#.###.###.#.#.#.#.###.###.#.###.#.#.#.#.#.#.#.#.###.#.#.#.###.#.###.###.#.#.#.#.#.#
#.#...#.#...#.#.#...#.#...#.#.....#...#...#...#...#.#...#.#.....#...#.#...........#.#.#...#...#.#...#.#...#.#.#.#.......#.....#...#.#.#.#.#.#
#.###.#.###.#.#.#####.###.#.#.###.#.#####.#########.###.#.#.#####.###.#######.#.###.#.#.#####.#.#.###.#####.#.#.#######.#######.#.#.#.#.#.#.#
#...#.#...#.#.#.......#.#.#...#.#.#...#.#.#.......#.....#...#.#...#...#.....#...#...#.#.#...#.#...#...#...#.....#.......#.......#.#...#.#.#.#
###.#.###.###.#########.#.#.#.#.#.#.#.#.#.#.#.###.#######.#.#.#.###.###.###.#.#.#.#####.#.###.#####.#####.#.#####.###.#.###.#####.#####.#.#.#
#.#.#...#...#.#.....#...#.......#.#.#.#...#.#.#.....#...#...#.#.#.................................#.....#...#.....#.#.#...#.....#.......#.#.#
#.#.#.#.###.#.#.###.#.#.###.#.#.#.#.#.###.#.#.#####.#.#.###.#.#.#.#######.#.#.#.###########.#####.#.###.#.###.#####.#.###.#.###.#.###.###.#.#
#...................#.#.......#...#.#...#.#.#.....#...#.#.....#.#.......#.#.#...#.#.........................#.#...........................#.#
#.###.#.###########.#.#####.#.###.#.###.#.#.#####.#####.###.#.#.###.###.#.#.#.#.#.#.###.#.#.#.#.###.#.#####.#.#.###.#.#.#.#.#.#####.#.#####.#
#...#.#...........#...#.....#.....#.#...#...#...#...................#...#.#...#.#...#...#...#.#...#.#.....#.#.#...#.#.#.....#.......#.......#
###.#####.#.#####.#####.###.#.###.###.###.#.#.#.#.#######.#.#########.###.###.#.###.#.###.#######.#######.#.#.#####.#.#####.#####.###.###.#.#
#.......................#...#...#.....#.#.....#.#.......#...#.......#.#.....#.#.....#.#...#.......#.....#.#...#...#.#.........#...#...#.#...#
#.#.#.#.#.#.#.#.#########.#.###.#######.#.###########.#.###.#.#####.#.#.#.###.#.###.#.#.###.#######.###.#.###.#.#.#.#######.#.#####.#.#.#####
#.#.#.#.#.#.#.#...#...#...#...#...#.....#.#.........#.#...#.#.#...#.#.#.#.....#...........................#...#.#.....#.........#...#...#...#
#.#.#.#.###.#.#####.#.#.#.#.#.###.#.###.#.#.###.###.#####.#.#.#.#.#.#.#.#####.#.###.#######.#.#.###########.#.#.#####.###.#.###.#.###.#.#.#.#
#S....#.....#.......#.......#.....#...#.....#.............#...#.#.....#.....................#.#.................#.........#...#.......#...#.#
#############################################################################################################################################`;
}

run();