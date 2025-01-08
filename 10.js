function run(){
    const grid = getInput().trim().split('\n').map(x=> x.trim().split('').map(y => parseInt(y.trim())));
    const yLength = grid.length;
    const xLength = grid[0].length;
    let allScores = 0;
    let allRatings = 0;
    for(let y = 0; y < yLength; y++){
        for(let x = 0; x < xLength; x++){
            const val = grid[y][x];
            if(val != 0){
                continue;
            }
            const route = [{ x: x, y: y }];
            const routes = [];
            computeStep(grid, yLength, xLength, route, (r) => {
                routes.push(r);
            });
            const newRoutes = routes.reduce((a, c) => {
                if(!a.some(s => s[9].x == c[9].x && s[9].y == c[9].y)){
                    return [...a, c];
                }
                return a;
            }, []);
            console.log(newRoutes.length, routes.length);
            allScores += newRoutes.length;
            allRatings += routes.length;
        }
    }
    console.log('----');
    console.log('Score',allScores);
    console.log('Rating',allRatings);
  }

  function computeStep(grid, yLength, xLength, route, actionOnNine){
    //console.log(route.map(r => `[${r.y},${r.x}:${grid[r.y][r.x]}]`).join(' '))
    //console.log(route.map(r => grid[r.y][r.x]).join(''))
    const currentCoOrd = route[route.length - 1];
    const val = grid[currentCoOrd.y][currentCoOrd.x];
    if(val == 9){
        //console.log(`9 at: ${currentCoOrd.y},${currentCoOrd.x}`)
        actionOnNine(route);
        return;
    }
    const neighbors = getNeighborCoOrds(currentCoOrd.y, currentCoOrd.x, yLength, xLength);
    neighbors.forEach(n => {
        const valn = grid[n.y][n.x];
        if(valn == val + 1){
            const newRoute = [...route, { x: n.x, y: n.y }];
            computeStep(grid, yLength, xLength, newRoute, actionOnNine);
        }
    });

  }

  function draw(grid, yLength, xLength){
    for(let y = 0; y < yLength; y++){
        let line = '';
        for(let x = 0; x < xLength; x++){
            const val = grid[y][x];
            if(val === null){
                line += '.'
            } else {
                line  += val;
            }
        }
        console.log(line);
    }
  }

  function getNeighborCoOrds(y, x, yLength, xLength){
    const returnVal = [];
    if(y > 0){
        returnVal.push({ y: y-1, x: x })
    }
    if(x > 0){
        returnVal.push({ y: y, x: x-1 });
    }
    if(x + 1 < xLength){
        returnVal.push({ y: y, x: x+1 });
    }
    if(y + 1 < yLength){
        returnVal.push({ y: y+1, x: x })
    }
    return returnVal;
  }
  
  function getInput(){
   /* return `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;*/
    return `3212345678121056780310106543218765210109876
7301106769012349891210237858909650987212345
8943219878734217894354345997434501896398730
7654306765025606765969876786521432345485621
1233456834110715610870945431010676541014678
0321067923230894320101234894321289239823549
7450478810301129831230128765045658178101630
8964329234532034761945219652136789017652721
7875012187645695610876106543221054787243890
4976701094556786921065987233234565692104323
3289898763216547836976856100149874563495414
4122305603407436545885445765454703454386901
5001414512518921056794039870363212325677842
6980523347676545121603128981278101210543234
7879601258989236730512789974329892105601100
0968708769076107845676697865012783416782321
1651219940145045912389546521323676545699450
2340367831231236705489030430654541236598769
4565456328900987876018121046543010167894378
3678995417811432980127630198672187098765298
2980987606321501676534548767981096523030167
1011876545450650101456759854102345614123454
9872345034968763212321876543201298705323456
8960101123879454789410989812120398676311237
1051211012567345673508989401032367985200398
2340349873498212232679876501001456810123478
1232456780341000141089845432132345210194569
0541542191232567657897894012201106761087654
5670233088943498766501703025672239872398743
4589104567652567898432612134984346765489232
5498010988961043765430543210789655159896101
4321023870870152896321432323658705014765012
2349834561431161067816521874503216723454101
1056767652521078154907890963212345894323221
0148988943652189143878903454503454513411230
3297803456789321012363212367696543201500549
4586912369878934101454201008987012102676678
5675001078767765210323123412108991343989654
6784100981059874349014056503234780256978703
7693201452342103458005347854345650107869012
8543542367033012567176218961259654398054327
9232632198124988943287307870568765212167898
0101789087235677656896478969876890103456787`;
return ``;
  }
  
  run();