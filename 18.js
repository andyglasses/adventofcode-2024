function run(){
    const input = getInput().trim().split('\n').map(i => i.trim().split(',').map(o => parseInt(o.trim())));
    const max = 70;
    const maxDrops = 1024;
    const grid = [];
    for(let y = 0; y <= max; y++){
        let line = [];
        for(let x = 0; x <= max; x++){
            line.push(false);
        }
        grid.push(line);
    }

    for(var bi = 0; bi < input.length && bi < maxDrops; bi++){
        const block = input[bi];
        grid[block[1]][block[0]] = true;

    }

    draw(grid, max);

    let nodes = [];
    let nodeId = 1;
    for(let y = 0; y <= max; y++){
        for(let x = 0; x <= max; x++){
            if(grid[y][x]){
                continue;
            }
            // horizontal
            if(x < max){
                if(!grid[y][x + 1]){
                    nodes.push({ x: x, y: y, x2: x +1, y2: y, id: nodeId, interim: [], length: 1, ignore: false, con: [], con2: [], used: false });
                    nodeId++;
                }
            }
            // vertical
            if(y < max){
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
            const isStart = n.x == 0 && n.y == 0;
            const isEnd = n.x2 == max && n.y2 == max;

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

            if(!isStart && connectOnFirst.length == 1){
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

    nodes = nodes.filter(n => !n.ignore);

    let graph = {};
    for(let y = 0; y <= max; y++){
        for(let x = 0; x <= max; x++){
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

    var results= compute(graph, 'x0y0');
    console.log('steps', results[`x${max}y${max}`])

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



function draw(grid, max){
    for(let y = 0; y <= max; y++){
        let line = '';
        for(let x = 0; x <= max; x++){
            if(x ==0 && y == 0){
                line += 'O';
            } else if(grid[y][x]){
                line += '#';
            } else {
                line += '.';
            }
        }
        console.log(line);
    }
}
  
  function getInput(){
   /* return `0,3
1,1
1,3
1,4
2,1
3,3
4,1
4,3`;
    return `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;*/
return `7,27
37,52
26,57
1,12
11,28
23,21
40,47
41,59
63,44
1,23
15,7
33,61
1,4
9,36
21,5
36,3
13,11
13,5
15,15
3,27
46,43
0,23
62,69
12,1
20,57
63,40
15,20
62,35
29,42
45,45
30,63
17,22
3,31
69,65
0,1
43,64
8,21
11,17
32,63
49,44
27,66
57,41
20,27
25,11
13,57
9,17
17,6
49,62
63,37
15,30
64,67
12,7
5,17
33,40
43,51
69,27
3,25
15,3
49,51
44,59
50,39
6,23
27,40
49,31
59,59
17,27
33,14
25,21
55,43
39,67
57,64
15,0
39,43
20,19
13,19
29,44
2,23
17,57
1,27
5,9
45,44
1,9
55,69
65,25
35,41
5,16
47,66
13,18
45,62
69,48
6,27
21,58
9,1
1,29
49,58
51,49
53,54
21,29
13,16
67,30
25,12
59,27
21,9
45,47
46,39
57,53
47,36
11,20
45,39
5,2
50,69
21,1
32,9
65,24
65,65
58,23
17,10
41,67
65,48
62,49
65,23
19,17
13,17
34,61
51,69
49,39
65,56
50,65
39,8
17,16
8,19
53,44
14,27
61,55
41,45
60,67
5,11
21,0
4,3
53,48
11,16
13,10
3,9
13,29
4,15
67,35
65,49
67,37
65,42
69,61
44,53
19,25
66,67
67,50
52,53
58,69
59,56
1,11
23,49
51,42
51,64
10,17
15,24
65,45
29,63
57,35
69,43
11,26
55,27
56,61
53,49
30,41
51,53
27,57
67,47
43,65
54,67
15,31
9,22
7,4
45,67
59,25
31,67
33,43
69,32
63,25
63,55
23,55
7,35
3,12
51,39
35,60
58,67
5,21
70,43
39,41
21,23
65,62
48,61
13,33
3,5
5,25
64,51
25,65
10,11
19,21
13,13
27,62
48,45
63,63
19,55
45,53
10,3
62,43
11,3
67,63
40,67
20,25
11,5
59,69
19,26
67,28
67,51
27,42
61,58
46,49
33,7
66,69
53,62
27,63
36,43
37,43
67,46
16,15
20,53
63,61
55,53
54,65
23,16
21,16
52,67
15,29
63,51
4,7
34,43
3,4
34,69
3,23
47,50
7,12
6,3
69,53
3,26
13,26
58,33
15,12
57,61
17,18
20,11
2,7
5,8
69,40
23,65
37,68
25,45
25,69
15,57
59,54
22,11
61,61
63,43
17,7
45,52
24,53
68,63
18,23
36,35
41,41
11,8
57,37
45,58
19,5
52,43
21,15
15,11
63,68
41,39
57,57
16,27
1,1
13,27
55,59
48,53
35,42
7,17
67,29
56,67
55,45
69,69
60,53
54,47
52,51
23,3
23,67
45,63
22,25
3,20
15,19
41,43
65,63
59,70
58,59
0,27
61,57
43,45
64,61
25,53
61,62
11,1
50,41
63,57
5,13
8,37
55,61
49,63
16,5
33,62
29,68
3,15
37,45
17,15
21,57
16,53
44,61
9,19
43,68
57,36
41,69
54,41
18,13
62,55
22,67
6,19
27,61
42,41
63,34
61,60
21,67
63,27
43,49
1,3
27,3
11,14
13,7
63,67
14,21
57,49
61,24
45,65
54,63
64,65
47,68
61,67
50,37
7,20
18,29
12,33
57,33
62,51
53,57
14,3
61,47
41,66
27,69
27,68
5,29
43,37
38,51
5,3
47,48
45,37
57,56
67,65
33,59
45,46
39,45
67,42
59,26
69,35
49,68
49,67
41,64
9,29
13,23
11,33
45,41
63,41
60,57
16,9
54,51
1,20
64,57
65,67
18,17
11,35
15,5
37,66
7,5
51,47
23,60
3,10
49,53
44,39
67,39
50,51
53,40
55,65
69,45
15,25
21,63
17,11
22,55
68,45
64,37
23,22
7,23
7,7
55,51
15,17
31,68
1,14
53,41
63,65
40,43
62,37
42,45
55,67
14,17
32,59
69,36
17,19
51,67
53,70
19,9
61,23
67,44
68,29
3,19
61,59
47,65
23,27
16,29
25,68
23,69
19,14
25,49
55,63
27,41
29,13
22,13
62,25
49,61
15,2
44,49
53,61
54,27
47,60
29,70
41,44
26,53
18,61
14,33
50,47
43,48
25,15
59,64
65,34
43,61
59,55
7,30
37,47
67,69
52,49
67,43
28,25
7,25
37,39
1,8
15,60
59,65
12,31
20,15
4,13
63,54
21,6
15,1
70,27
58,53
45,51
23,53
69,31
68,49
1,5
11,2
27,55
13,24
59,49
65,59
13,9
61,33
43,67
61,37
59,66
25,67
44,65
3,17
18,11
70,69
13,4
37,55
15,13
5,15
66,23
65,41
43,63
49,54
23,14
22,53
9,11
49,38
7,13
17,26
3,3
27,65
39,47
5,18
69,37
9,15
31,60
65,60
22,3
25,57
54,57
47,39
66,65
1,7
37,46
41,51
47,69
51,31
14,11
17,9
7,8
47,47
25,51
3,11
56,33
67,49
69,67
17,25
21,55
21,17
19,54
45,34
9,3
11,31
11,7
49,43
58,61
47,46
45,42
21,24
61,51
55,42
45,56
69,42
20,21
17,3
59,63
59,45
5,30
9,24
67,25
47,53
13,14
21,19
69,39
24,59
25,61
25,54
68,67
63,64
33,41
27,67
37,65
12,23
24,67
49,49
46,63
6,11
35,69
10,5
43,41
17,29
52,39
39,59
66,63
23,15
1,13
39,69
56,63
65,39
9,30
1,10
65,58
59,50
9,33
50,59
3,18
45,35
7,3
25,20
48,65
65,26
63,47
15,8
55,44
35,54
51,51
10,13
49,59
47,59
17,13
31,69
34,67
19,1
41,49
29,59
11,9
31,57
59,60
57,65
61,56
67,40
53,65
69,38
52,63
49,42
51,63
46,55
65,61
19,13
33,69
53,53
53,45
5,6
43,69
10,31
55,52
65,28
41,38
31,44
40,61
5,22
52,69
49,56
8,13
25,59
7,26
17,53
7,1
47,67
14,31
9,23
41,58
38,67
21,22
63,59
27,58
53,67
11,23
23,20
31,65
47,64
46,59
4,23
51,65
51,45
67,38
21,3
65,50
50,53
62,47
10,25
56,39
63,46
7,11
5,1
53,63
25,56
55,46
61,65
56,41
59,57
69,47
16,13
56,55
37,61
13,1
43,43
23,9
17,24
19,28
7,21
31,63
18,1
23,62
53,59
46,69
11,27
21,25
63,49
19,11
23,18
52,55
15,21
13,6
57,63
35,55
57,69
31,55
20,3
15,33
69,59
62,65
31,43
67,57
13,25
63,53
62,59
24,63
65,29
18,55
22,19
65,55
39,40
25,4
5,10
7,15
67,36
9,28
70,63
33,52
21,53
41,53
2,5
17,5
42,69
65,53
38,63
47,55
44,69
63,48
65,51
9,13
63,30
65,69
59,41
61,49
69,41
65,35
2,1
47,51
13,21
63,35
57,58
48,39
43,55
45,49
42,51
36,69
8,15
31,61
48,57
16,19
31,51
21,12
19,29
25,10
27,59
10,33
2,17
5,19
45,40
53,60
19,19
12,19
45,54
39,56
55,49
68,25
19,23
11,34
45,59
7,31
5,7
68,33
36,55
51,41
49,47
24,51
65,54
8,25
3,1
55,57
19,57
61,69
29,41
23,61
45,43
7,9
67,52
53,66
43,54
15,56
52,45
67,41
41,63
66,47
17,21
57,67
51,60
64,39
14,7
43,36
42,65
6,15
31,66
25,70
53,51
59,67
63,23
47,63
49,65
51,61
13,15
52,57
53,47
15,58
23,19
51,59
19,56
32,41
21,10
27,21
47,41
51,46
49,57
46,37
61,25
8,3
39,61
69,29
43,38
43,47
25,64
21,61
0,19
41,56
47,42
9,35
4,21
25,66
39,38
19,18
69,30
27,60
61,27
52,37
49,45
59,51
67,45
26,61
45,61
59,47
27,15
57,52
30,65
50,49
41,62
39,42
37,41
53,43
59,38
23,23
61,53
10,19
15,27
23,58
25,55
8,1
17,55
11,13
44,45
13,28
47,43
23,57
29,61
23,59
45,69
59,28
5,5
18,5
17,2
11,19
63,52
8,33
55,58
69,33
62,67
53,55
11,11
68,57
23,17
10,39
58,49
29,67
13,35
23,25
17,1
11,25
50,35
51,57
13,3
25,63
49,50
7,33
23,56
33,24
44,67
16,57
35,43
15,9
21,21
43,42
47,57
3,36
11,4
62,27
12,11
38,43
49,41
7,0
19,8
28,59
47,52
29,69
1,16
3,7
35,67
8,27
51,55
66,27
53,69
51,43
49,55
11,21
7,6
40,45
68,65
42,61
54,59
50,33
59,23
57,39
19,15
38,39
1,15
37,69
13,22
11,29
61,43
28,63
30,61
68,69
8,17
43,56
55,55
56,53
3,21
29,65
39,70
67,27
13,12
54,55
65,33
31,41
9,10
55,47
32,69
69,63
11,15
24,9
9,31
59,62
5,24
57,51
1,17
57,55
47,45
39,63
47,61
20,59
60,49
28,65
19,51
1,19
67,34
13,31
63,33
67,67
3,14
55,68
21,13
32,53
21,31
27,54
51,33
8,9
1,44
38,27
43,31
42,13
23,40
17,46
20,47
25,13
30,33
23,2
41,50
45,57
31,24
69,23
33,5
43,39
39,57
50,3
59,18
37,23
55,13
45,55
65,19
25,17
61,17
19,7
6,53
14,69
2,39
70,11
68,5
53,16
30,37
34,23
51,27
47,7
54,13
11,47
7,47
15,59
39,64
45,14
58,25
49,69
69,57
58,29
4,53
37,36
21,43
5,41
57,24
37,2
49,19
57,59
13,37
18,39
33,49
23,48
47,37
10,45
43,18
53,3
22,41
17,39
39,3
9,40
4,47
31,17
61,8
24,39
24,49
1,67
22,65
39,13
33,15
29,34
19,31
11,49
27,44
19,41
38,15
65,31
13,56
47,14
33,18
15,63
1,21
33,19
41,4
47,21
15,53
60,33
33,63
59,16
21,39
35,39
39,39
39,25
29,2
57,18
25,31
47,25
65,43
17,41
29,4
61,3
9,5
21,35
47,29
59,13
6,69
24,29
33,46
65,1
28,17
1,42
29,55
45,10
67,1
63,10
66,53
39,34
37,9
40,11
67,61
11,61
31,37
9,6
5,27
5,67
20,41
14,63
42,1
19,33
33,1
9,21
41,32
15,23
35,35
55,28
35,19
45,17
23,29
15,69
68,21
25,5
5,36
12,69
15,46
61,6
3,49
60,11
11,38
31,8
51,23
22,35
63,13
27,48
4,39
27,17
51,3
68,17
23,4
15,61
27,27
36,29
5,47
16,33
3,55
1,56
56,11
37,19
13,55
33,67
30,39
45,3
15,4
33,55
27,38
41,13
29,33
64,3
1,37
1,52
4,43
10,49
1,31
59,5
3,60
25,2
14,67
19,48
38,19
21,44
39,22
33,58
37,3
49,28
67,7
33,35
35,57
20,65
29,46
15,67
29,57
41,55
11,69
57,20
65,11
31,21
7,67
22,47
53,1
42,27
55,39
45,33
47,19
52,29
28,29
60,39
26,29
51,24
19,45
18,59
7,58
43,3
32,29
5,65
45,36
66,13
20,61
69,6
65,10
61,12
63,3
1,51
1,32
57,9
43,12
69,55
7,53
11,37
25,26
41,14
35,45
59,31
21,7
3,69
53,11
25,41
59,53
7,19
9,39
39,51
37,27
70,15
16,65
19,49
64,5
27,32
29,37
28,55
69,25
68,1
65,6
13,61
42,17
29,17
45,7
3,57
27,35
31,38
2,69
11,55
52,9
69,60
69,13
19,61
11,67
33,10
37,21
9,43
67,3
31,59
3,30
48,15
27,16
25,25
41,3
1,28
66,3
69,9
49,3
65,3
27,39
23,39
30,15
1,30
45,9
13,51
67,59
51,17
33,22
19,53
47,16
63,69
32,5
29,51
35,12
36,21
37,35
41,21
17,23
41,57
32,15
46,1
1,50
33,31
68,11
60,29
13,69
11,39
41,20
31,5
11,65
5,49
63,39
54,31
5,59
39,23
41,34
18,69
33,45
65,57
7,46
1,35
55,31
13,45
54,3
47,18
31,20
51,11
11,43
37,51
2,63
27,9
4,51
69,52
37,57
39,31
17,34
29,15
7,51
5,69
24,35
31,49
15,51
59,33
53,17
47,17
50,19
30,47
47,30
39,30
35,11
34,9
53,35
65,17
39,55
7,38
55,35
5,58
45,13
47,49
33,29
48,21
3,67
64,17
57,29
57,48
34,27
45,32
35,26
43,4
53,13
7,69
1,33
12,53
23,42
59,30
61,42
1,25
35,52
35,51
11,51
47,26
49,15
35,64
49,35
59,8
38,59
27,8
15,42
35,27
67,2
10,67
2,53
13,59
21,50
63,31
17,66
9,46
69,1
29,23
3,56
57,17
65,32
38,21
27,28
27,11
51,10
11,36
23,1
29,22
65,8
54,25
51,2
26,3
35,50
45,5
43,26
27,29
17,69
25,37
50,15
35,66
65,27
31,13
42,31
32,51
57,45
31,27
27,25
29,29
17,37
30,51
63,9
53,19
3,39
4,33
38,33
17,62
53,29
5,61
28,9
55,41
64,41
9,56
40,59
57,21
7,65
34,7
27,51
33,17
3,28
43,17
34,3
19,35
44,31
47,32
43,11
25,43
6,33
19,68
31,23
19,47
36,11
21,41
31,11
44,29
39,15
59,9
56,45
37,33
39,33
17,65
5,70
41,19
19,46
39,65
69,22
18,63
11,59
40,29
4,31
39,19
29,9
47,23
47,1
43,57
29,3
25,3
43,53
34,19
17,61
31,45
43,1
47,6
49,17
61,29
69,26
21,51
31,25
16,41
11,64
19,27
33,56
23,50
62,15
17,47
29,49
47,10
30,3
56,5
49,11
57,1
19,36
5,39
41,11
65,36
42,59
15,54
43,5
2,43
16,59
62,39
69,17
12,51
39,7
25,16
19,67
22,45
57,16
61,21
9,60
45,29
62,11
25,33
41,17
47,27
49,29
31,9
51,35
27,20
67,11
70,51
45,1
61,11
41,7
5,31
21,68
9,42
47,31
47,11
17,44
41,65
35,37
37,59
11,41
8,59
53,9
39,5
57,25
37,16
59,35
16,69
34,49
21,27
64,31
49,18
49,33
36,65
9,37
33,57
60,35
65,37
64,21
28,5
3,37
49,9
33,9
23,43
30,31
65,7
11,45
7,39
29,11
13,47
19,37
13,67
43,50
67,15
31,47
9,49
20,31
25,7
1,55
17,50
63,29
57,38
35,47
37,1
26,25
46,3
32,35
37,37
35,63
37,32
59,37
55,36
53,27
33,37
31,31
15,44
27,47
3,40
45,27
68,9
20,51
56,27
53,7
41,47
61,9
57,13
6,49
5,57
66,19
41,29
61,35
6,55
56,1
3,53
69,51
23,5
39,48
7,34
31,33
15,50
53,8
5,35
63,15
60,1
32,17
44,9
21,4
52,17
42,9
17,63
5,44
33,23
44,15
41,22
15,65
53,22
51,6
7,40
67,31
7,61
55,20
7,63
53,39
24,43
21,33
27,53
55,2
41,40
41,27
49,32
23,8
52,7
61,13
16,67
15,47
7,52
52,33
59,22
9,57
39,37
39,17
15,35
30,1
9,47
35,61
1,41
9,59
63,2
54,7
31,56
26,23
43,25
65,44
45,12
9,63
54,5
60,3
3,34
3,45
3,29
56,31
60,15
47,35
1,46
40,25
51,1
5,51
29,48
12,63
61,41
57,23
15,40
5,45
40,17
9,65
17,17
41,2
39,53
35,31
44,1
69,21
33,27
29,1
9,27
6,37
45,19
11,70
59,61
59,14
23,7
45,31
31,28
17,38
37,26
57,7
69,7
21,47
24,45
29,47
12,61
19,69
7,64
69,54
40,35
41,9
18,37
3,65
34,55
3,58
45,6
14,53
53,25
23,6
1,36
39,11
25,46
57,27
31,7
1,53
22,29
18,51
57,8
25,6
57,10
61,64
32,37
69,56
45,11
47,13
58,3
55,1
24,23
39,9
49,1
66,21
35,21
15,22
57,44
65,18
33,20
10,65
43,9
61,15
69,49
20,63
13,63
49,25
54,11
59,10
47,34
6,67
1,57
27,37
40,15
52,13
35,30
38,3
42,23
54,23
56,49
47,3
36,45
67,13
37,24
39,2
7,62
27,43
7,37
17,33
13,40
49,10
7,32
22,61
55,37
48,23
12,67
43,30
5,37
1,65
37,5
13,41
13,44
9,69
1,68
27,23
37,58
5,33
59,17
35,15
51,25
49,5
40,5
69,5
26,49
27,1
54,19
20,7
7,49
35,25
1,66
3,43
1,43
31,19
59,1
55,19
35,7
23,11
14,65
48,1
19,63
21,37
0,63
27,12
35,1
36,19
35,48
53,33
29,24
27,46
33,12
59,21
41,1
43,23
14,49
25,9
9,54
22,37
35,23
27,22
47,12
53,0
5,63
31,30
6,41
66,5
25,27
50,9
36,49
44,27
15,43
19,59
37,11
15,37
51,29
39,35
11,53
2,51
66,15
62,7
2,45
7,57
17,43
17,35
32,33
35,65
27,14
5,66
59,11
39,21
49,30
55,21
3,13
42,7
25,14
39,49
48,7
11,57
43,16
22,33
51,30
65,5
5,43
12,57
37,25
26,5
51,16
13,43
64,15
59,29
46,25
41,33
9,61
51,37
29,27
61,22
55,10
19,2
19,66
42,11
55,3
63,8
59,15
19,43
19,39
2,25
3,51
10,57
37,31
26,35
70,3
17,51
51,13
37,49
29,21
51,15
29,45
13,49
41,25
10,51
67,23
53,5
26,33
32,27
29,53
31,29
37,12
49,23
41,37
35,16
27,0
21,30
61,7
67,14
35,29
58,1
33,53
63,21
30,21
14,47
39,27
1,63
39,1
31,15
33,33
67,21
27,7
64,27
2,67
57,11
67,17
53,36
43,7
58,47
5,53
41,31
9,41
33,6
60,21
27,30
41,61
13,36
56,23
4,49
17,59
29,26
31,54
5,28
43,27
27,31
14,37
13,39
43,13
51,22
26,9
61,39
33,47
60,45
12,49
35,17
57,12
53,15
22,69
35,62
16,35
39,12
34,5
68,23
13,38
44,5
29,43
4,55
21,65
30,27
29,7
11,58
17,48
34,39
25,1
52,27
41,24
8,51
1,59
46,23
57,15
12,41
30,57
45,23
35,0
23,31
30,11
47,4
7,41
55,18
61,63
45,15
59,19
18,43
37,8
70,19
39,18
2,61
44,23
29,36
36,37
23,45
15,49
48,13
35,3
59,39
49,21
23,13
69,3
33,39
29,5
47,8
67,16
17,49
49,7
32,1
53,21
51,7
35,53
63,17
55,23
55,26
0,39
61,31
57,19
25,47
43,59
55,4
50,21
21,11
9,9
29,35
49,13
17,67
37,67
37,22
3,59
58,43
28,19
49,37
59,43
15,48
44,25
7,45
45,16
68,3
69,15
51,21
19,34
13,65
60,41
63,11
61,4
40,9
32,3
9,51
28,33
65,12
55,11
41,15
27,5
53,20
8,55
34,37
41,35
36,5
27,33
68,19
40,27
3,61
24,31
5,62
62,17
2,33
25,38
37,10
30,13
29,6
21,40
25,23
43,35
67,58
27,45
5,46
34,29
55,14
23,63
30,7
45,21
23,33
9,67
24,19
39,52
7,60
63,7
25,35
35,5
50,29
60,19
34,35
1,58
51,62
15,39
23,41
33,32
36,39
36,25
62,31
23,37
37,7
63,1
39,50
52,19
43,19
65,13
50,5
49,24
2,37
55,29
29,31
41,23
55,30
32,65
51,5
68,13
31,53
15,41
33,25
31,3
40,19
47,5
37,60
37,29
30,17
34,45
42,53
53,31
38,29
55,25
58,5
22,27
5,60
4,61
51,26
22,31
7,44
30,49
9,62
57,6
17,32
35,59
46,19
7,29
58,37
32,45
55,17
27,13
52,3
69,19
37,63
59,3
37,56
9,45
45,20
47,28
55,5
39,0
62,3
35,58
3,35
11,60
1,69
7,42
35,32
33,51
16,63
43,15
21,59
31,22
33,3
35,49
29,10
29,39
47,33
41,5
37,62
5,64
61,19
57,43
23,35
8,49
1,49
57,3
64,13
10,43
26,41
24,27
15,55
65,15
29,52
36,17
5,23
13,62
29,58
50,1
68,59
25,36
29,14
17,31
15,45
51,9
4,41
18,41
47,15
56,15
31,35
35,13
48,35
63,45
37,15
23,47
3,41
39,29
62,19
55,7
1,54
32,49
28,11
67,5
41,36
19,3
29,18
47,9
46,21
31,39
9,55
1,45
38,5
5,55
12,45
69,11
55,15
65,21
7,43
3,33
35,33
35,14
51,19
18,31
67,54
28,51
67,19
59,32
67,53
33,13
49,27
11,52
11,54
63,22
33,65
8,67
43,33
4,67
63,20
40,7
67,10
65,9
37,13
53,34
35,34
39,54
7,48
36,7
57,5
3,47
9,25
27,50
3,64
65,47
55,33
53,23
40,53
16,37
12,43
19,65
57,31
11,63
37,53
27,19
59,7
12,47
8,65
49,26
27,49
17,52
36,41
3,63
66,39
13,53
37,17
43,21
63,5
25,39
25,29
20,35
59,46
9,53
20,37
28,39
45,2
61,36
21,69
7,55
67,55
1,39
29,19
20,43
61,1
31,1
29,25
1,61
9,68
67,33
61,5
9,7
33,21
58,41
63,19
66,61
67,8
43,29
33,11
1,48
43,34
43,20
17,45
55,9
58,13
53,37
24,33
14,59
7,59
45,25
1,47
55,34
23,51
21,45
54,33
35,9
43,6
65,0
62,29
38,47
51,12
25,19
21,49
61,45
54,15
57,47
67,9
29,30
5,52
64,48
41,68
24,14
67,12
57,50
57,26
34,32
6,52
42,21
2,15
5,12
0,50
22,36
70,55
22,50
45,64
10,50
38,49
54,39
70,30
2,13
48,22
6,47
12,35
4,64
28,1
20,56
0,59
36,12
6,10
66,30
58,6
8,44
26,38
52,20
56,50
19,0
42,58
70,37
8,57
44,26
52,8
64,54
22,58
24,1
64,29
28,18
10,64
56,64
70,0
50,26
46,67
12,17
0,38
22,0
62,42
22,2
18,0
21,62
28,8
10,62
4,6
8,6
46,12
10,44
48,70
16,7
2,28
64,47
41,16
0,32
51,32
54,18
63,26
2,41
43,8
54,36
4,29
42,55
38,23
46,5
35,28
22,10
4,28
32,44
8,68
60,48
0,8
12,16
18,57
29,56
5,14
21,26
50,38
31,70
58,19
7,68
4,4
8,12
32,67
56,13
24,54
18,7
40,46
32,6
18,35
24,21
47,20
70,49
34,62
38,52
48,2
68,4
65,64
69,62
55,48
22,9
58,14
54,10
16,4
14,26
60,4
4,48
56,68
70,32
15,32
64,20
0,29
6,48
58,30
69,2
40,70
3,62
65,52
12,13
7,50
17,0
34,65
4,26
54,58
17,8
37,34
70,44
56,59
4,34
6,17
28,7
54,70
66,0
24,26
47,40
51,58
33,42
52,38
56,18
57,22
66,22
33,36
19,30
22,1
55,16
58,22
30,22
37,44
22,66
32,68
66,38
58,15
68,16
8,14
58,4
58,45
44,63
64,63
8,20
63,4
43,10
26,46
36,46
66,43
52,44
52,31
2,66
56,47
64,9
2,38
39,28
60,14
64,8
38,53
68,47
21,56
55,32
8,8
38,44
30,66
26,62
70,39
46,20
4,42
52,6
8,24
43,70
20,46
2,8
61,68
0,61
21,54
52,25
58,64
38,32
0,15
53,6
18,10
11,48
4,16
50,32
20,45
60,54
24,46
10,63
2,62
53,64
32,48
66,60
28,0
22,62
24,5
4,9
10,41
0,42
16,55
42,68
36,34
34,47
27,26
48,12
6,46
19,10
26,21
40,0
42,5
68,18
62,60
0,46
10,70
24,57
24,60
0,44
58,2
4,56
44,20
8,45
66,41
2,12
13,52
33,64
23,64
24,50
25,30
2,50
10,16
63,36
0,4
14,13
11,18
20,55
55,70
51,14
68,37
66,42
32,36
60,6
70,38
20,0
58,51
50,12
34,30
50,4
62,48
62,62
24,69
56,56
65,46
13,64
51,8
32,47
44,4
61,32
11,12
60,36
50,7
60,68
14,55
58,68
69,64
52,50
9,66
40,55
36,28
23,26
12,59
14,54
9,0
50,56
2,48
0,58
58,65
62,21
8,61
18,36
63,28
46,42
23,70
12,64
54,29
29,64
26,36
24,34
16,49
4,25
3,22
32,13
14,38
12,55
26,0
29,28
4,5
9,20
46,33
61,52
22,54
28,4
28,56
45,18
60,9
16,31
6,51
30,44
7,22
64,22
10,68
6,22
54,16
68,27
14,56
35,46
16,39
42,64
26,42
24,18
14,68
16,1
14,32
67,18
23,30
53,56
18,47
22,59
34,15
68,2
25,42
40,31
14,60
14,24
66,16
14,62
39,16
70,57
64,42
14,48
34,4
56,24
0,62
57,28
63,56
68,61
44,28
16,61
62,64
26,51
52,10
66,4
60,32
23,0
47,22
60,7
10,21
38,1
6,8
42,63
4,60
16,42
0,22
64,18
18,42
10,27
2,52
18,19
22,68
18,6
7,14
47,0
58,50
34,63
13,54
0,12
10,47
33,70
12,38
1,64
70,45
50,11
40,1
38,16
3,16
45,22
38,50
60,52
69,16
66,40
38,22
65,22
26,19
14,46
9,8
36,66
27,6
58,35
34,33
32,55
66,17
2,35
18,21
68,36
39,46
44,10
10,30
64,44
20,12
58,32
56,22
48,37
13,8
52,36
14,12
13,42
46,68
66,2
42,25
16,44
62,41
18,12
70,28
0,14
0,35
49,36
58,0
40,26
8,11
28,34
24,24
14,9
60,43
31,36
48,41
65,38
36,54
26,37
25,24
14,23
24,62
62,54
36,61
2,26
13,20
49,48
8,35
54,6
55,66
60,50
67,60
24,64
43,46
58,42
33,66
38,31
26,16
46,22
5,42
10,60
26,63
50,30
45,4
29,20
28,13
2,46
48,5
56,28
8,29
53,4
60,23
49,64
32,10
66,31
28,2
36,24
38,28
51,34
38,64
61,2
15,28
34,38
54,4
52,48
6,1
4,32
34,25
48,54
42,48
1,70
6,42
40,69
48,34
48,50
35,38
16,64
17,58
66,18
2,56
70,52
60,34
33,54
46,48
29,0
38,12
22,40
30,53
61,16
48,31
38,18
50,17
46,10
64,12
42,46
2,40
10,24
40,10
44,33
24,44
26,52
44,41
22,56
28,30
14,70
24,65
58,63
52,47
56,36
58,26
24,22
12,46
54,9
15,34
48,63
38,65
42,19
10,52
11,30
53,42
33,8
46,36
48,19
56,2
40,60
0,49
36,27
36,60
5,26
15,70
12,42
35,8
44,51
66,66
2,30
26,17
14,34
17,68
19,70
31,12
40,41
0,51
22,4
4,46
50,46
28,47
28,32
48,66
54,21
44,66
50,58
48,47
4,59
4,12
29,38
18,67
30,38
26,14
30,32
56,3
66,9
39,58
30,4
68,62
8,43
31,4
63,24
43,14
34,12
20,32
52,56
39,44
21,52
67,6
5,68
25,28
4,38
46,6
26,30
61,70
49,70
45,28
36,50
24,20
70,61
42,37
0,57
9,26
56,6
63,12
46,47
37,18
51,50
66,62
40,34
10,38
63,60
48,44
6,18
10,26
7,24
12,2
32,61
30,50
68,24
26,39
47,70
35,36
15,62
45,30
8,16
32,22
38,55
58,40
68,31
62,38
66,6
50,23
42,50
68,34
8,56
2,34
2,20
12,28
62,66
44,64
56,29
62,52
6,13
26,65
24,32
48,67
15,66
49,2
56,43
62,53
24,13
38,20
10,53
68,38
12,9
24,47
22,48
4,14
18,48
58,16
56,69
12,29
42,8
30,26
8,0
18,30
30,0
6,64
62,68
17,64
32,39
31,52
42,66
16,26
7,16
22,8
31,16
51,44
68,41
58,24
12,30
42,52
21,14
57,4
12,26
38,7
44,18
59,52
29,12
24,37
61,48
2,21
50,62
30,59
62,56
13,2
46,30
26,58
47,38
29,50
42,57
20,64
0,65
66,14
19,20
22,26
19,52
31,64
34,52
34,26
22,17
36,47
44,57
32,11
50,31
26,56
32,18
70,47
10,58
62,50
13,60
34,64
17,42
26,48
42,49
4,10
70,31
30,35
30,55
29,16
41,10
60,64
40,32
40,4
14,29
38,6
36,52
37,30
2,19
10,22
53,24
34,57
4,45
16,16
38,56
28,62
41,52
34,8
50,8
32,57
56,34
70,34
8,18
51,38
11,40
50,57
8,47
12,6
34,41
29,32
25,50
43,32
31,10
10,37
50,40
44,6
55,6
41,26
64,33
26,18
20,8
24,10
30,10
60,65
57,30
62,30
62,6
26,11
1,38
24,42
21,20
26,26
38,34
33,4
4,44
28,57
65,68
66,52
44,46
49,40
66,48
34,1
9,58
20,54
14,25
28,66
70,14
54,44
8,10
6,61
4,2
2,55
66,28
59,24
60,42
24,12
19,12
15,36
20,66
18,18
14,22
58,55
39,32
19,60
22,28
64,26
5,48
62,33
14,10
28,20
16,14
57,70
30,46
38,17
57,40
6,56
55,56
46,70
45,50
49,60
58,52
62,18
39,66
14,51
24,40
20,69
24,48
66,36
70,66
36,9
26,28
46,62
16,25
16,40
12,56
26,2
58,27
30,19
14,64
54,28
40,28
64,69
32,46
56,57
2,59
59,68
17,70
57,2
48,62
42,16
50,27
57,68
64,28
50,67
61,54
8,63
6,20
22,24
52,62
26,1
44,37
61,40
48,33
44,7
43,0
37,48
17,12
33,44
46,32
37,42
20,5
12,5
54,40
36,63
46,29
64,53
64,46
57,34
46,54
46,58
55,38
0,21
66,25
68,42
44,43
0,33
54,43
25,8
6,2
56,51
40,16
3,8
18,26
12,3
42,28
29,54
70,64
56,9
8,2
70,9
46,52
69,4
50,2
18,14
9,48
52,26
58,28
60,12
16,11
29,60
42,12
18,45
42,24
50,48
46,31
3,66
11,68
13,68
65,2
27,10
48,24
48,25
43,66
4,11
18,60
8,66
30,8
55,40
18,33
50,43
44,35
34,50
59,12
35,10
18,38
60,26
67,70
12,4
66,70
28,50
25,0
28,31
60,18
36,31
46,45
67,68
23,24
39,4
33,28
34,11
10,8
29,40`;
  }
  
  run();



  