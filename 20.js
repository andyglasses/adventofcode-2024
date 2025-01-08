function run(){
  var input = getInput().trim().split('\n').map(x => x.trim().split(''));
  const grid = [];
  const start = { x: 0, y: 0};
  const end = { x: 0, y: 0};
  for(let y = 0; y < input.length; y++){
      let line = [];
      for(let x = 0; x < input[0].length; x++){
        if(input[y][x] == '#'){
          line.push(true);
        } else if(input[y][x] == 'S'){
          start.x = x;
          start.y = y;
          line.push(false);
        } else if(input[y][x] == 'E'){
          end.x = x;
          end.y = y;
          line.push(false);
        }else {
          line.push(false);
        }
        
      }
      grid.push(line);
  }

  let nodes = [];
  let nodeId = 1;
  for(let y = 0; y < input.length; y++){
    for(let x = 0; x < input[0].length; x++){
      if(grid[y][x]){
          continue;
      }
      // horizontal
      if(x < input[0].length - 1){
          if(!grid[y][x + 1]){
              nodes.push({ x: x, y: y, x2: x +1, y2: y, id: nodeId, interim: [], length: 1, ignore: false, con: [], con2: [], used: false });
              nodeId++;
          }
      }
      // vertical
      if(y < input.length - 1){
          if(!grid[y + 1][x]){
              nodes.push({ x: x, y: y, x2: x, y2: y + 1, id: nodeId, interim: [], length: 1, ignore: false, con: [], con2: [], used: false });
              nodeId++;
          }
      }
    }
  }


  let changes = true;
  while(changes){
    console.log(nodes.length);
    changes = false;
    nodes.forEach(n => {
      if(n.ignore){
          return;
      }
      // must have other nodes on each end or on start or end
      const isStart = (n.x == start.x && n.y == start.y) || (n.x2 == start.x && n.y2 == start.y);
      const isEnd = (n.x2 == end.x && n.y2 == end.y) || (n.x == end.x && n.y == end.y);

      var connectOnFirst = nodes.filter(o => o.id !== n.id && !o.ignore && (
          (o.x == n.x && o.y == n.y)
          ||(o.x2 == n.x && o.y2 == n.y)));
      if(connectOnFirst.length == 0 && !isStart){
          // dead end on first
          changes = true;
          n.ignore = true;
          return;
      }
      n.con = connectOnFirst.map(f => f.id);

      var connectOnSecond = nodes.filter(o => o.id !== n.id && !o.ignore && (
          (o.x == n.x2 && o.y == n.y2)
          ||(o.x2 == n.x2 && o.y2 == n.y2)));
      if(connectOnSecond.length == 0 && !isEnd){
          // dead end on second
          changes = true;
          n.ignore = true;
          return;
      }
      n.con2 = connectOnSecond.map(f => f.id);

      if(connectOnFirst.length == 1 && !(start.x == n.x && start.y == n.y)){
          // absorb
          const other = connectOnFirst[0];
          const otherJoinOnFirst = other.x == n.x && other.y == n.y;
          const interim = { x: n.x, y: n.y };
          let con = []
          if(otherJoinOnFirst){
              n.x = other.x2;
              n.y = other.y2;
              con = other.con2;
          } else {
              n.x = other.x;
              n.y = other.y;
              con = other.con;
          }
          n.interim.push(other.interim, interim)
          n.con2 = con;
          n.length += other.length;
          changes = true;
      }

      if(!isEnd && connectOnSecond.length == 1){
          // absorb
          const other = connectOnSecond[0];
          const otherJoinOnFirst = other.x == n.x2 && other.y == n.y2;
          const interim = { x: n.x2, y: n.y2 };
          if(otherJoinOnFirst){
              n.x2 = other.x2;
              n.y2 = other.y2;
          } else {
              n.x2 = other.x;
              n.y2 = other.y;
          }
          n.interim.push(...other.interim, interim)
          n.length += other.length;
          changes = true;
      }

    });
    nodes.forEach(n => {
      if(n.ignore){
          return;
      }
      // find loops
      if(n.x == n.x2 && n.y == n.y2){
          n.ignore = true;
          changes = true;      
          return; 
      }

      // find duplicates and take shortest
      const duplicates = nodes.some(d => d.id != n.id && !d.ignore && d.length <= n.length 
          && ((d.x == n.x && d.y == n.y && d.x2 == n.x2 && d.y2 == n.y2) || (d.x2 == n.x && d.y2 == n.y && d.x == n.x2 && d.y == n.y2)));
      if(duplicates){
          n.ignore = true;
          changes = true;      
          return;          
      };

      
      // find duplicate over pairs
      var sameAsStart = nodes.filter(s=> !s.ignore && s.id != n.id && ((s.x == n.x && s.y == n.y) || (s.x2 == n.x && s.y2 == n.y)));
      var sameAsEnd = nodes.filter(s=> !s.ignore && s.id != n.id && ((s.x == n.x2 && s.y == n.y2) || (s.x2 == n.x2 && s.y2 == n.y2)));
      var internalChanges = false;
      sameAsStart.forEach(s => {
          if(internalChanges){
              return;
          }
          var enders = sameAsEnd.filter(e => e.id != s.id && e.con.some(c => c == s.id) || e.con2.some(c => c == s.id));
          enders.forEach(e => {
              if(internalChanges){
                  return;
              }
              if(e.length + s.length <= n.length){
                  n.ignore = true;
                  changes = true;
                  internalChanges = true;
                  return;
              }
          });
      })
      if(internalChanges){
          return;
      }
    })
    
    nodes = nodes.filter(n => !n.ignore);      
  }

  let graph = {};
  for(let y = 0; y <= input.length; y++){
    for(let x = 0; x <= input[0].length; x++){
        const ns = nodes.filter(n => (n.x == x && n.y == y) || (n.x2 == x && n.y2 == y));
        if(ns.length > 0){
          let point = {};
          ns.forEach(m => {
              if(m.x == x && m.y == y){
                  point[`x${m.x2}y${m.y2}`] = m.length
              } else {
                  point[`x${m.x}y${m.y}`] = m.length
              }
          });
          graph[`x${x}y${y}`] = point;
        }
      }
    }

    var results= compute(graph, `x${start.x}y${start.y}`);
    console.log('steps', results[`x${end.x}y${end.y}`])
}

function compute(graph, start){
  let distances = {};
  let visited = new Set();

  let nodes = Object.keys(graph);

  for (let node of nodes) {
      distances[node] = Infinity;
  }

  distances[start] = 0;

  while(nodes.length){
      nodes.sort((a, b) => distances[a] - distances[b]);
      let closestNode = nodes.shift();

      // If the shortest distance to the closest node is still Infinity, then remaining nodes are unreachable and we can break
      if (distances[closestNode] === Infinity) break;

      // Mark the chosen node as visited
      visited.add(closestNode);

      // For each neighboring node of the current node
      for (let neighbor in graph[closestNode]) {
          // If the neighbor hasn't been visited yet
          if (!visited.has(neighbor)) {
              // Calculate tentative distance to the neighboring node
              let newDistance = distances[closestNode] + graph[closestNode][neighbor];
              
              // If the newly calculated distance is shorter than the previously known distance to this neighbor
              if (newDistance < distances[neighbor]) {
                  // Update the shortest distance to this neighbor
                  distances[neighbor] = newDistance;
              }
          }
      }
  }
  return distances;
}



function getInput(){
  return `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;
}

run();