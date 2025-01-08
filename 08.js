function run(){
    const input = getInput().trim().split('\n').map(function(x) { return x.trim().split(''); });
    const yLength = input.length;
    const xLength = input[0].length;
    const items =[];
    const antiNodes = [];
    for(let y = 0; y < yLength; y++){
        for(let x = 0; x < xLength; x++){
            const val = input[y][x];
            if(val == '.'){
                continue;
            }
            var existing = items.find(i => i.symbol == val);
            if(existing){
                existing.points.push({ x, y })
            } else {
                items.push({ symbol: val, points: [{ x, y }] })
            }
        }
    }

    items.forEach(item => {
        var pairs = [];
        for(let i = 0; i < item.points.length; i++){
            for(let j = 0; j < item.points.length; j++){
                if(i == j){
                    continue;
                }
                pairs.push([item.points[i], item.points[j]])
            }
        }
        pairs.forEach(pair => {
            const xChange = pair[1].x - pair[0].x
            const yChange = pair[1].y - pair[0].y;
            let stop1 = false;
            let stop2 = false;
            for(i = 0; i < xLength; i++){
                const point1 = { x: pair[1].x + (xChange * i), y: pair[1].y + (yChange * i), symbols: [item.symbol] }
                if(!stop1 && inside(point1, yLength, xLength)){
                    let foundNode = antiNodes.find(n => n.x == point1.x && point1.y == n.y);
                    if(foundNode){
                        foundNode.symbols.push(item.symbol);
                    } else {
                        antiNodes.push(point1)
                    }
                } else {
                    stop1 = true;
                }
                const point2 = { x: pair[0].x - (xChange * i), y: pair[0].y - (yChange * i), symbols: [item.symbol] }
                if(!stop2 && inside(point2, yLength, xLength)){
                    let foundNode = antiNodes.find(n => n.x == point2.x && point2.y == n.y);
                    if(foundNode){
                        foundNode.symbols.push(item.symbol);
                    } else {
                        antiNodes.push(point2)
                    }
                }
                else {
                    stop2 = true
                }

                if(stop1 && stop2){
                    break;
                }
            }

            const point1 = { x: pair[1].x + xChange, y: pair[1].y + yChange, symbols: [item.symbol] }
            if(inside(point1, yLength, xLength)){
                let foundNode = antiNodes.find(n => n.x == point1.x && point1.y == n.y);
                if(foundNode){
                    foundNode.symbols.push(item.symbol);
                } else {
                    antiNodes.push(point1)
                }
            }
            const point2 = { x: pair[0].x - xChange, y: pair[0].y - yChange, symbols: [item.symbol] }
            if(inside(point2, yLength, xLength)){
                let foundNode = antiNodes.find(n => n.x == point2.x && point2.y == n.y);
                if(foundNode){
                    foundNode.symbols.push(item.symbol);
                } else {
                    antiNodes.push(point2)
                }
            }
            
        });
    });



    draw(items, antiNodes, yLength, xLength)

  }

  function inside(point, yLength, xLength){
    if(point.x < 0 || point.y < 0 || point.y >= yLength || point.x >= xLength){
        return false;
    }
    return true;
  }

  function draw(items, antiNodes, yLength, xLength){
    for(let y = 0; y < yLength; y++){
        let line = '';
        for(let x = 0; x < xLength; x++){
            const an = items.find(i => i.points.some(p => p.x == x && p.y == y));
            if(an){
                line += an.symbol;
                continue;
            }
            const node = antiNodes.some(n => n.x == x && n.y== y);
            if(node){
                line += '#'
            }
            line += '.'
        }
        console.log(line);
    }
    console.log();
    console.log(antiNodes.length);
  }
  
  function getInput(){
 /*   return `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;*/
return `..................................3.........H.....
..............F............................CK.....
..................F...e...m..........C.Ki.........
......1..................m........................
.........F.1......................................
.......1.....W...........3..Z............i........
...........W...m....1.............................
......W...........m..............N..C.............
E............2................Z.K.......p.........
.....Y.........4....i.........N...................
..............W.Y....................3..9....i....
.................................h........9.......
.........................................Z.......H
2...............................3.......H9........
..2..........4T...................................
...2..............Y...4........Z..................
.........E.........................N...5..........
.......................................e..........
..............................C...................
..E..................P.....................p.H....
......4............................IN......h.p....
..........................T....M.........K..p.....
..........................G.......................
..................................................
...................................M..............
.5.............G..............M...................
.............Y..........................M.........
.................E8...0.........................h.
.............................P............g.......
......5...........................................
.............n.................................c..
...............................g....f.......c.....
.y..............8...t....T........................
..7..F.............T........R..........f........u.
.kz.......7..R....................................
.........8..................U.........P...........
......U.............wG....v.....P.............c...
...0.....R..........g.............................
.....7.....8.........g.............f..............
....z...........G................7................
........5........6.v.....U..f.......u........e....
.........V....v........6......t...................
......6..0..y.....R........V...........r..........
...........v.......we..U.............c..r.........
................................r.......Iu........
k............y6..........t.................r...I..
........k............t...........w................
.............z....n.................I.............
..0.................n.............................
...............n..........V...........y........u..`;
  }
  
  run();