function run(){
  const input = getInput().trim().split('\n').map(x => x.trim());
  const towels = [...new Set(input[0].split(',').map(x => x.trim()))];
  towels.sort((a,b) => b.length - a.length);
  const patterns = [];
  for(let i = 2; i < input.length; i++){
    patterns.push(input[i].trim());
  }

  let total = 0;
  patterns.forEach(p =>{
    let pattern = p + '';
    
    let used = [];
    used = [];
    for(let t = 0; t < towels.length; t++){
      var towel = towels[t];
      if(pattern.indexOf(towel) >= 0){
        used.push(towel);      
      }
    }     
    const sets = [];
    used.sort((a,b) => b.length - a.length);
    while(used.length > 0)
    {
      const current = used.pop();
      const others = used.filter(u => u !== current && u.indexOf(c) >= 0);
      sets.push([current, ...others])
      used = used.filter(f => !others.some(o => o == f));
    }
     let combos = combine(used, 1);
     for(let u = 1; u < combos.length; u++){
      let combo = combos[u];
      let patternX = p + '';
      for(var x = 0; x < combo.length; x++){
        var towel = combo[x];
        patternX = patternX.replaceAll(towel, '#');
        if(pattern.replaceAll('#', '').length == 0){
          total++;    
          return;
        }
      }
     }
  });

  console.log(total)

  // try fit biggest
  // fill gaps
  // if fail exclude biggest nd repeat

}

const getCombinations = (A, i = 0) => i == A.length ? [[]] : getCombinations(A, i+1).flatMap(x => [x, [A[i]].concat(x)]);

var combine = function(a, min) {
  var fn = function(n, src, got, all) {
      if (n == 0) {
          if (got.length > 0) {
              all[all.length] = got;
          }
          return;
      }
      for (var j = 0; j < src.length; j++) {
          fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
      }
      return;
  }
  var all = [];
  for (var i = min; i < a.length; i++) {
      fn(i, a, [], all);
  }
  all.push(a);
  return all;
}

function getInput(){
  return `rb, rbg, rbgg, rb, ga

rbggarbga`; //rbggarbga rbg ga tb ga
return `wurw, uww, wubbwb, rbwu, bruw, grw, gbub, ugwbbrwg, ggur, uuguw, bbrug, wgrwrr, rwwrrgu, bwrg, bbg, rbrbuu, rbwwg, ubbwb, g, rrbwgb, guubbw, rgwr, rwrwgb, bgg, guwr, grrw, wubugb, bug, rrbwg, bbgru, gwrw, rgrbwg, buuwub, rguur, rwrbgb, ruwrwrb, bgr, rbrwbu, wwg, bww, rgwrw, wrrgr, wur, burb, bur, uw, wgr, gwr, ugugb, brrwwwwu, uuubgg, rbu, ubw, bwu, bgwbubu, wbr, wguu, rgwbrbu, gwbbruur, wu, uurbww, wbbg, wuuwr, ggggurr, uubr, ggb, uub, uuubr, guuw, bgrwr, rrrw, gu, guwb, wbw, rwwwuug, bwr, rruuu, uubbww, gbw, wbrbur, gwgr, bw, ggw, bwgug, bruwu, bb, gwwur, uwbgwb, wwguu, rr, rggw, wwru, rrwbwgru, wrbwr, uurgu, urg, rgwrb, wuwb, brugruu, uuugr, gwugu, rgwb, urugbgu, wwwr, bru, uwwgb, gw, gruu, gbuuwrb, urwr, rug, ruuruu, wrg, w, rbw, gwg, rrwbwbrr, wbwb, grg, rub, brbubr, uwuugb, rwrg, uuubgr, wwu, wgu, rwrb, rbwuw, gub, guw, rrg, urruwbu, bbrwgur, grggbu, bg, gurrwub, ugr, wrrgg, guguugb, rubb, urgr, ugu, bbbwb, bgwgbb, rwu, wg, uggbbgrw, uwu, rru, rwrrgugr, bbgwu, bgwu, ggbrg, gbr, guu, wgwr, bgwwgbb, gbur, uwuurwbb, wgwbr, rbb, rrugbbur, rrbwggb, gww, uubuu, wuuubub, wgug, uuu, grrr, ugwrr, urbugg, uugwg, rurrubru, brwbbwg, gg, urw, rwwrru, rwgr, uwwb, gbgww, burrgb, rrubwrg, gwu, rrbgrr, brug, wbrrr, rgubbwu, wggw, uuub, ggrrub, bubg, ubr, ugwuwwr, brbu, bbururr, rwwu, gwuw, rwbr, ggbb, wwrgrb, ub, gr, rgr, uwr, bbbgwr, gwug, rrgwbgb, bu, wgbwugg, uwg, gbbw, ubu, ubgu, uruwgg, buw, guggwr, gruwr, ugbww, ggg, ugbwug, wwr, ugwrrw, grr, rgu, wrgwbru, rrrub, grwu, ruw, wwbrw, gugg, ggbr, rrbwbbgu, bburuuwg, wrgwrwgr, bbgu, rgg, grguug, wgggr, ggrrug, bubggbb, rggwbbb, rugbww, rrbbg, wwubb, wrug, wbb, wrb, ggrr, wbwrugu, bbb, gubbbrug, rgrg, ggr, uubbwwb, bwrwgbw, ruwr, wuw, br, wbrrwu, bwugu, buwb, wbu, uuw, uwwgrg, uuuu, uugb, bgur, bgrwg, rgb, ug, rrwbb, wbrbgb, grb, gbb, gb, ruur, wbrru, grgg, ruubg, brgru, bgrwgb, urwgrg, wgg, urruu, bwbru, uwbgu, wug, bbwr, ggggw, ubrgw, wrgr, wrurrrg, bwb, rrb, wr, bwwub, gwrwuwu, gbbgw, rrug, rwugb, wwbu, urb, ur, bbw, rrw, gbu, brb, ggu, rwg, uwuu, wrugg, uurrr, rgw, wugwbw, bgw, rur, brrg, buu, rrbw, uuuwr, ugb, uu, urwbug, bub, uwrwr, wwubrw, ugwwrb, bwru, uwrg, wgw, uuwwrb, grwrb, u, wrr, uur, buurbgb, ugw, gur, wgb, buub, bbgrbrbr, ubbb, ggww, bwbw, rwr, wbbbgu, wru, rb, ugg, brr, uwubwgr, rubub, brrbwwu, urbgg, ugwg, bggw, bbrgwb, brw, rrgug, wbrwb, wwbugwbb, wrgwuuur, uurwrb, wbg, grbr, bbr, ggugb, wbrrw, ugbuu, ruurwr, gggbg, wb, bwur, grwurb, uwbr, ruu, urbugb, gbbr, guruwg, rgwg, bgu, wgrbru, grbw, ru, www, ruwurw, brggw, gug, rrr, bbgwruu, ruurubgb, uug, wgggrw, bguuwuu, rrwgu, ubg, bwug, ruru, urbwrrb, rbwuugg, grwbrr, rbg, brg, wub, ubbr, uurggr, wgrgbr, ruugw, wuubb, bugubu, gbrb, rgrb, rbub, wugr, wwb, bugr, bwg, uugbrwu, uru, rg, ubb, gbwgwrg, gwb, wuru, bwwu, uwggr, buur, rwb, uuru, wugwbbru, bgb, gbbur, rgbgw, b, ggbw, uggr, wrw, gru, grgwgurb, gwbb, bwuur, guur, wwwbg, rbr, wbbwb, uwb, gurwu

gggurgwrgguuugbwrburwbuurwwbrrurbuurubuuurr
rwwrgwguwrbgguurruwwgbbbrrbuuwrgwwwrwgrrguwrbguurgwgr
rwwrrbburgrbgguwrwgrrbgugwrruguwubbrrwwwwugggburuwgugggbg
bwguurbrrbbrrrwbwgrwgggrwwuubwbrrgwrwurbgbwwbrrbwbwg
wrwwbwgubbgwrggrrgubwuwuubrugubggrrrbwwubgrwrbgw
urggwrrbuwbrgwwgrgubbugggwgbbgggwruugugbubgugrruu
rwwgbbrbrwubrgbgrbbbbgrggurgggwwwrrrguwbwwrrugugww
rwwbbrgggrgwugwrrwruubggbgrbwruuwwwguwwwwggwg
wrgugggrwwbwgbwggwbwgbuwubgwgwrrrgwuwuwggu
ruugrubbwwurguurrurgwgbgbgugbbrgbrwbruuuuggwgbrggwgrubruu
urwrrgrubuwbrgbugggbrurgwgbugrrbwgggwrbgbw
rwwrgwgwbuwbbbubbwgwbggwggwrgubbwubwwbgrwuwrgbug
gwgwubggburrgurrbrgrwrwbwwrurrbggugbgugrrbgrbu
brwbbugbrbuwurrruwrgbgrbubwbgwbrwgbbwgbrruwbbggburguwg
bwgwwrububbrwbuugbbbbuggbgrwwuwgwbbwggrwburruwgrrwbww
bguwrgrugggwugbrbrrbwbbruuwugugrgwgrgwuugg
wbugwubguwbwbbbguwburwrwwrwwrwwbwuurugggwbrbwgwrgwurugbgg
uwgrggrruwwbrrwrbugugruwggwwwgwuwwwrbwugbbgbuubb
urgurrggrbgubrbrbbgrbbgbrruwuwbgbbwbwubbuurbgbrug
rwggurruuwrbubrubugrgrbwrrggbwwwgrbwbrgbururrubrugbgbruwbw
gwbwrrruuurrubbguuuurwuuubgrrrrgrgruguugur
rwwbgbbwuuwbrgbruwwgbbggrruwugbrwuwruggwuwggwur
rwwrwrurrwwwbwubgwgbrrurwgwugwuugwwurrubr
rwwrbrrwbwuwrurwbggbuggwbgrrgrrbrbuwbgbbbgwwbgruuwrbuggr
rggrrbgggubgwuwbrrrwgururrbbgbrbgwbrggwbrguu
rrgggrrwuguruuuwgbwwrugrgbbbrgubrgbgwgrwwrbruuurgrugwugg
rbuubgwrrwrgwwggwgbrgrrbwwbuubwrbgbggwrbggrbwwg
rburubbguugbgrugrbbruwbwgurwurbbgbrwbrurrgwbgwbwbuwrrbwuu
rrbwbbguwubruuruuruggruruubbgwrbgrbgrgruugbu
rwwwwgrrgrbggrubwwbrburwbgguwwguggrbbgbbgbbrgw
rwwrwububguwgbugwgugbrubgbbrurgrruuuwburuggbuuurbgwrruubgbru
rwwgrwuwrwbbgrruuburwgrurgrgrwruuwwubruruwugbbrg
rwwbbggbbrugbgruguwuuuuubwbrggbgwgruwbbugburwwwrbugbrgguggur
rwwwbgwrwuruwwrgbugrrbwwwubrbrbgubbugbbrrbwurwubb
rgwgwbgurwruuuugbruuwubrugwgugwwruggbwbgbuwurwggwuwbgrburr
wbugrgwgrbrrwruwugwwrburburwrwubrrwgrwwuuurru
rwwbggbbuguguwggurgurbbbwwuwguuugurbgrbgr
wuuwggrwbuurrruuuwbrbbgwrrubwrwurugwbbbggbgw
rwwbbuwbugubbwbrbgbuuuggrgugggwubuguwuggbbuwgubugwrbguwubugb
rwwgrwbgurbrrguugbubgruwguwugwwwuwurwrwuwwbu
bbwwbrrruwrgugruuwurrubbgrwwgbruwbggwrwuubbbugubgrubgbwgug
bbgurrrgwbuuuwwubwuwuwgguggwbrguuwgwrggwubrwuruuubbrwuugu
ugubbbubbgrruwgguggbbgwggrurbwwwwugrbrggwbbbruwbbgrbuwwug
bwbwgrrwbwbbgwrubrrgbrwwwwbwrbrburrbwggubbbwwubbrurubrgu
bwrwbwgrbbuguwrwrwwwgbrwwwbruwugbwgrgrubwgwgruburwbubr
rwwrgruburrwwwggruwrbuggubgrugbwrrgwuubbbrbb
ubgurbwbuubrrgbwbbbwbrurgwwrrubuggugguururu
rgwbrrbbuubggbrwwgrbwbrrbruwuuggrgbggwrbbuuwbwrwrgwrg
rwwwrrruuurwguwbwwugwgggwrurwguuwbrbrbggr
wwuuubuwwggwgwbugbbwrugwurwwwbrbuubbgurwwguubwwurgw
wguwbrgubrwuwbwugbwbburgggrwgrbwwgbwbugbuubgw
gbrgrgrbbbwbbrrbbrubgugwwbugwbbubrurwwgrgwbwbbbwrwuwubb
rwwgrrurbuuwuwgwgrrgrgwbbgwrugbgbwbbbgbrrgrbgrubwrwrrwuwwgbg
ubbrbbbwububrburruguwrbgwwuwwrgrbubuuuubwgwwwgrw
urgbgbwgbgbgwgubuubburrgwwwrwgrbgwwbubuwggrbwurrr
rwwwuwurrwbrgwgruurugbggrbuguwgubguuwbbgw
bbwbrgwwgbwuuuwuurrbururrrgrrwggwbgwwbuuwbgrwbbggrrgrwrw
rwwbgurrgubgbwrguwwrwrurwggwgbubwbrwuurugwbwrwwubruwbbw
bgrwrwbbwrrwuugbwrwwbuwwbbbwrgwuwuugrrurubugwggggrb
rwwrrbbwwgrurbgrgwgwwgwrgbuwbrgrbgrgguubgrrwggbu
rwwwbrbgurgwuwbbbgwuwwugbrwbwuugrgbgwruugbwrrgugrwurururruu
rwwggwwbuuururwruuuguwwububbbwgugbrrbrugwubrr
wruubgwgwbruwwwbwuwwubuuwwwwgbrrrwgbrwwgrrwuwg
gwuuruwbwbbubugbwrwwurbwuurrggrwguuwggwguguubrrurbwrgwbr
bwguwwuurguwwggwrbrgubguburrgrwwuwugugrwrruggr
wguruugwuubwrwurrrbrrrwgwbwrrrurwgurgbbuguubwggwbr
bgbbugguubgbrubgwuuugrggbrbruggrbbuugubgrwwgrru
rwwbuwrbgbbruugwuuurubgbbgubbwrgguuwgrwwugbbwbggrwubwugb
rgggrbbbrwwgwwuwguwbubbgggwgbgurrbubrbuugbrb
rwwrbrwuububrbubbbbuurwubgwrbrwubwuggwbrugwbggugwrugbwwwb
gruuwwgggbwwbbgbwwuwwrggbuguubwbuwgrgbgwguwrwuwwgw
urrgrbrgggbrwgwurwwrbwgbuubguugbuwwwgrruurrwgbuwbuwbbuubug
rwwgbbugbuurrwguuuggwwrwuwwrrruubwuuwgww
ugrbggurgrbguugwbbrgrbbrgwrgubrggbwgrbbwugbwgubgburg
rwwwwwgwgbggrwbbwbrrbwwruurubgbrgwbgbubugbwuuw
bugbgrwrwgwubwbgwrruwuruuggwbwrgrrgbruugbr
wbruwwrbrgrgwgurbgrugrbgwbwgrrgggwbgwwwwgrrbru
wgbbwgwuuugbubbuugbrrbuwbugbwuggburrbgbbrugwubuguubwgrw
rwwgbguubgguururuuuburbbwrwgrrrwrrbbwwwrubbuuuwwwuuww
rwrrwwwgrrurbrburwugrwuwuwgugurwrgwrwgrgrbww
ubggbbgwuuugwwrbwwbbbrbuwuwurwgwrrgwgbbwuwugr
buggugwggrugwguwguugrrrwruggwgbwwuugwrgrbgrbbbgbbrg
wwwwuwurbguuwrrwbwgurrrrgbgwrggwgwwbbbwrrrg
rwwbgurbrgggburguubbggwubwuwbrwbbgubrrguuuwbwubwurggr
burgwwbrrbrrwubbuwurrbububrwbuuubruwwugbbgg
rwwwwwwwrggrbbggbgguurbgwrwgwguurburwwbbgbgg
rwwrgguubrrwubbwubuwgururuurguggrwggbubwwrgurgwrugwr
rwwgwbwbburrwbwbrrbbbgrwggwrwubgbwuwbbuwbbu
grwuwrggwruuuuwggbwwbwgrrbwbuwrururrwgrwbburwwuu
urgruwbbgbrbgbuuubbwwuguwubugwrrrurbgugbwbuwbugrururur
rwwruggurrrrbwgbuuurgwuubrggbwgrgwwuwgugbbrwrwgrgrr
rwwbgwgwggruwwgrwrwggguwgbwbugwgwgwubgggrrggrggugruuurggww
rgurwrgbgrwgubrburuwwgrbgrbwwbwgbwwwwugrgbubwrubuwugb
rrwrwrrugbwwwbgbrrwbgrbgwuwwbrwgbuwburwggbwggwbbgww
rwwrwuwrgurwwgwbbrbbgguwbbrguwrrruwugugb
rwwrrwgugbwrrggggwrwbuwgrgbbuuubuugbuuubw
rwggbbuubuubgrgwrggwugwwruwugbwuugguuwurrgwr
rwwwbbbguuguruwgguugbwrrwrgwwuggwuuuuwubrruuwuuuwuruw
wgrubggbburgruwwguuggrbwbgwwwwwgwwuurbrbugrwrrgrbwwg
rwwrbrrrgwrbubuuwrbububuwrrruwuwrurwwrggubrwggrruwuwbr
gbgwgrbguwwbuuuwrurgwrgwubgwwurwbbwgrubggrgrwubrrgg
rwwbbwwggrbgggbrbgwrrwbggggwgwwuurbgwbbruuru
rwwrgwbrrwwwgwrbgrbbwgbwubwuuwbgubguggwrwww
ubgwubuwwbbgwuubwgwwruggubwugburggrbgbggrgrrg
rwwrbbububwgwruwwbbguurugwuugbgwrbbugwwwuwwgr
wgbuurgurwrrbbruruggwgurgwuuugggrbgbuuuuwgbwggwrbgubburb
guubbrgrrbgrbggbwrbgrwbbrwwrwwbgrbbbwwbbuwuw
rbrwrguwwgwwgubgbgwugubgwuwgrbwrbrguwbbrruggubbbubggrbrr
rwwbugwwrbruuwwubwwruwbrgwwbrbbrgrbwbuuwuubwrwwbbu
rbgwrwubwbrbrgurgwgwrbbburbwbugubgwbbruurgwbw
rwwbuwuwrbgwgwuwwggwrurbbbbrguwwbuugwuguuburugbguwrw
bbrggwwrwbgwrrrwrggbgurbrbrurggrgubbbrgbrgubuuwbrguwg
brrrgwwbgwbgrbburbbgbubrrbuuwrrrguugrggruuubuww
rwwbbgrrgrbwbuburrgbwbwwbuugbbbrubrwbwwuwrurgugrwuubbuu
rwwguwuguwwbrrbubrbgbgubbrugwubguuwrwbwbgb
rwwbuugwgbbwuuwgbggurubwrbubwgbrwurbrrrrw
bggbrubrruwwwwgrwrrubgbugrgwburbwuguwgwgbrrwrgguggbbubg
rwwbrbugwwbbgbwgrbbrwwgbrrugwrwbwwgbwbwgr
bgrwrrrugrgurrubrrrgrrbwbwrgguwbbbwbgbrbuwbw
rwwbwggubgwrrwwuubwwrwrruwbbbwuugbgrbrbwrbugru
rbubgurggrubrurbuwbuuwwbrrbbruuuwwbrgwgrrbbgrrwbbwbwggu
rbrurbugbbguwwgwgwwbgrgrbrgrgbgbwuuugubgbbgggbruw
ggbbrbbrwwrbbrwgurbrbgrbbggrgwuwgrgbbuubwwgggwrrggrr
rwwbbwgwuwgrwrwguuwrrwbwgrubrgwbgwwbggur
bguruggbrwwguuubgwgwrwbrwuggruggrrgrwbgbugg
rwwrgbwggguguggrbwggruuuubggwgbuugrwgbruwwurwuwgggbburr
wggwrwrrgugrwrbwwugwbugbgrrwbwgwuuwbgguwbwruwwbwr
ruburwrububwwwrugwuwggwrgggrrgbrbgrbrwwgbbb
rwwbgrguwbbgwgugruugwwbgrgugwgrugwbgguuwggwuurbbbbggwrrrrbr
wrgbwrwwurrbggrwururggbgrrrurbrggwbrgguggbuuwwugrurwgrbug
urburgwrurwwgrbbuubbuurbbbwwgubrgggbbgbwruuwggrubbrg
rwwwuwuwurugurgggbggwuubruuwwgbgwbwrbbbuu
rugwbgbugguurwrbwuwrbwwrrwubrwbbwwururrwbwrwwwgwugggrwuww
rwwgbuugbbwwuuwrrbbwuwggwgrwrrbgwurgguuwgwuggwrug
rwwrbwbbwruugwbwuguurrugbubgwuwbwubwbgggwbrurugwubgurwubrrr
wrrburbggrbuwbwgrbubrrwuwwbugurbbruwrugrgwgbgrwubwwuw
ugggwbuubgrbbgugrwbbgbwwgwgrubbrrrwgurbwwr
brwgwggbbgwgrrrugwubugubugrugggbubbrbruwrrbbrgwubwguuw
rbrrggwwrrrgrurrbggbbubwrbwwbwbwwbrggwwwgbuwwwurbgbuuuubgr
rwwrbgbwurbbwwwuwwrubuwbgbgbbwugwbrbwwbrrgwwwbrgurrrw
gwrburubgrbbgrrbgrrbwwgbgggrgrbwbuwuguuugugubgu
gwburrugbbrurggwbbrrbguwwgbwurrbbgrwwbrwuru
rwwrggruurrugruugrbrbuwwrwwbbubbbguuwgrwu
uruurubgbgbgbbubbubgbguuguwguugwuugbwbwrwugubrwrgwugbgwubw
rwwwbgwgrbrbggbgwrwubwuuuuwbruwuggbbgrwgbubwb
rbgurrbwwruubgbbwrwwubrrgrbbrrgbwwwrugwwbruburrurrgbrrwbrg
gggubbwbbugwbrurbrguwgubbwubuuuguwwwbwgwgurwrurrwugrbbugrr
bgwrbuwgbuuwbrbuwwbrggugrbrubwuurbrbggwbwwwwrwbugbrur
guurgrgrwwbrbgbbburbubruugbrgugubrwguguuugbugwwwgwrwbw
wrbbgrgwrbubrwbubgwurbwbuwrruubbrwbrrgrwbwrburgrwbr
rwwgbgbwgbruwbwbbgbbuggwurubwwwubgrugrugwgr
rwgrwgrrggubbubggwgwwgubgwuwugwggwgurwwwbuwuuruwuwbgu
rwwruwuwuwrgrrgrrrgwbwbggrrbubrbwwgrbbru
wgrbgbwbbrwugwuuwwrrgrbuuuwbgbwgrgwbrrwbrrwugbwrbuwrwrgggg
rwwwugwgwgwwwgrrubwrggwbwuggrwburwguuwuwwwubgbrwubgb
gguwwurwwuwwgrubgwrbbubrbugruggugwgbrbrbrwwbgw
bbwgbrbgrgwwwugwbbrubrruwrgrruwuubuwbwrugrbuwgrubrruuugu
gwwbwruuubrugwuuurbwwbgrbrbuwwururggrwgwgwggbb
grwwbgwurbrwgwuwbguugurbrbwruuwbugguwggbrrrurrrwuug
rwwrbguububrgrwuuwgwwuggrbgurwwgbwgbuugbbggugwwuuurrugwuuwru
rgrwurubgwgwbugrwbguububuwbuuubwuburrrgubgggwbw
gbgwwrgwrwgrbugbugbrgbubwrgrrbgwwgurbgugbgwgubrbrr
rwwwwubbbrruuwrgugrwburrrwgwrguuwbwgrugwurburguugwwwww
rwwbwrurubgrrrruubbugruwwwbubuwbrbgbrbuuubguwb
rwwbwuuwurwuwrbgbubwrwbgwwgbrbrrwwrbrruburugwwrwuruwuru
buwggbwgwugubuwruuurgubbbbbubrgbbrggubgrbgurubbuub
rwwbwwruuwgruburbbbubggrbubgrrwwbrrwbrguwwbwgburwrr
grrgruurrwbwrbbgburwrbugrwwrbwgrurruwgguguwwgbgurgg
gbbubugrwrbuwubbugwruuwgbbgubggbwurgwggrrg
rwwbbruubrbgubwurwrbrgurwugbrrgururwgrggubb
rwwgrrrrwrgwrwubgbrgggbbwuugbgwruwbuwgrguubgwwugbururbgrbgwu
rwwbbuwrwbgwwwrwwgwuugrgwgurbruwrgrrbuwubwg
bgwguwggruwbwbwbruwrrbugggbbruurrgbburuuwgurbrbggugrbg
gggurrbbgrbwwwbbuwwburburgrbrwurbwwuwrrbwgbr
guubbguwbggbuuwbwugwruubwbbgbrwbwbbwbrbbrurgbwwbburu
urggguuwrrbruuwrbbgbwrubbwwuuwrwburubugwwb
wrwbwuwuwggrurrrugbuwugubrbwburbbbwrbbburbgwwgurg
rwwbrrgrrrguwgwuugurugrurgwgrgggubwgrbgugwgrgbwwgggbbbbgugw
bwrwuurgwgwuubbggurwwgwwbwwwuguwuugwrbrruw
gubbwbwgwgugrgrrggwbrbbwrgurgbrwwrbugwbruuu
gurbuurruwgrrbrwrbbbwruubgwgggububurubwurbu
rwwwbrgrbrrbrwbgwugbguuwgwuubrugwwrggrgrub
rwwwwbrrrwbguurrrwbrggwrwbbggbururrururbwbbgbrug
ubrbwgrrbrgbgbuuburrwwbrbburuwurgwrrwruwuubwwbrwwbbwbwr
rwwgbuwwgwrruwuuubwruubggguugrggwbbwwwgbrrbwgrwgbbub
rwwgugwrurgbrrwbruuuuuubuuwuugwuguwgwrrgwwggu
bgwubugwbrggwgbwwwbuwrgwbrgwbbwwwuwrwugbugugbbrgu
bwuuwgrrubgrbuuwwwrrrrwuwwggwbrbwwgwguugrwrwwgub
gbwggbgbwbwruuurgwbbrruuwbbbbwuruwggubrbrrubruuurwbwbbg
rwwrgwrurrrugrrwbbrwgbbgbggrwrbubwrwrgguw
rwwguuwwgwgrgubbwubrurruuububwbrbwwggwggwwuruwbwbrwgrrur
bbrgbrbrgrbbuuwwwbbrgwwrbuwwubrwururgbubrrwwuubugbu
urbubwgurubbuurbgugwwbwwugwbwwbwbrrrguuwguwwugbbrggwwgur
uurgrugbuwwbbwwwrubuwrbgruwuuwubrruwwwbrrbugwugrrgu
wgrguugbggrgbrgbuuuuwrwrgbbuggruruwuuwgbruruuwbwuw
rwwbggwbrruwuwgwrbbgbrbrrrburrgwggrugwrbrbgrwwuuwuwubububg
rwwbggrggguwgbbuurubgrbrrbbwgubrgwguuubwbg
rrgbwgrbbrbuwubgbwbwgurggwgrwgrbbugbrbwugbggg
brwgbgbwrugbwrgbwgbwggrwrwgurbbwrwwwrwgwuuwbgwbgw
rwwbwrburbrrwwrubwbwrwgrwwurgurbbgrubbubrggwggbwwgwbgwgr
wrwrwwrbrrbbbburggrgwwuwrrbbuwubgbrurggburbuwrgbubrrgbubw
gwwbbbbrrbbuwurubugbggbwbrgwwugbrbrgrguwwgbub
rwwbrugwbubbgburbrwgrruwggwwgrbubwgrggbbgbrguuurrruwgr
rwwwrrgbwruwrwwuwbrgrbgruwbuwguugubgwggrubwrwubugg
rgrbgguubgwurugwurubbwguubbrwwurubbubuwbrbwrrur
rwwburuuubrgugrubwgbwuuruuuwgwgrrurrbrrrbubrg
rwwwburwuuugrgrrrrwugwwbwgbbwgbrrububuurwbbbgbrguugwrgguuug
rwwruuugugwwugbwwwgrwuwwggrwrbbubrwbbgrbrgwru
rwwrgrrgubbbrugbwguwuwuwwwrwguugwwbruwwwurwbrgrbrgg
rurrgrrurrubbwrrrrrwbgrrrburrubgubwwwuwgguwr
rwwrubwbrrbbrwbugruuguwrwgubbuuurggwbrwbruwwubrwwrwbuwr
rwwrbrrugbburwwggrgrrbbgubggwwburwwgbwrbbgr
rwwbbuuguruwuuwggbgbbgwbgrwwgrgbwbwbuwwrrrr
rwwrrwrurwrrurbubgbwrrgwruubugrggbubrwgwuug
rwwrwwururrbwrrbgrwwbgruwwbrburggwbguruwrwbgwgrg
grbrrbguwrrugwgrgrrrbbubruuuubbgbgugbbrbgwuurrurbbwgrub
rwwwbrruuurruubbwrrwgubbrwwrbwwburwgrbwbwwgbgubgw
ubwwwguwbrgurbruuuuuugbguugrwrrubgwwgwwbubrbww
bwrgwwubrggwrbbbgwrrruurbwwruwugurgwgrgugwwg
rrgburguugguuugbrgrbwurbgwububwwrrurugbgururgwubbrggrrb
rwwgwrrrgbguugbwwruwrggrbwrwwbrubbgwggrgwbwbbgrr
rwwgwbbrwbguguuwurwgwgbbruwrwugrgrgwuwwgbbgbbuwbub
rbrruurwwbgrbrrbrggbbrugbwbgrrgrrgwbruwwwgggurrubu
rwwgrbbwgruuwggruguwbbbrrwggwubgwgbgwrgwgrgurggbrgbuww
rwwruuwgrrurguuwgrbburuuwgwwburgbbuwwggggrbrbgrwwrgwu
urggwugwgggggrubgrwgrrggurrwwbwugurbruggrbrubgrgggwru
uuurbbuburubbgugburugrwgbgwubgugbubbggrwgbrrugbbgr
rwwrwrbwwrbwuburburrubgbbguwrrgrgwbugrrugbgburug
rwwbbuwwugggbrbuwwuggrbbruwurwwwbuwrrrbrgrwwrbgwubbwugg
rwwbggwggugbgrgbrwwuruuugbuugbubggrggwrugggggrwrwr
urwbbbubrbggwbubugwgrrubrrgbwuwuwbuggwuuwrrr
bwwwbrbrwgrwrrwwwuguurgwwuggbugwubbwrrgbbbb
rwwrgrwbrwgrguuwgbbwugurwgrrwrrrbbuuwurubuwgrggbuggwrruu
rwwgwbuwwbwrrrruwugwguwbwrrugwugrugwrwbrwwwgu
uuwwugwgbgguwbruuugrggwwwgbgwgwugwbwbwwbrgbugu
rwwgubrbwgrwwburwbugwubbuggruwbubgggbguuubwbuw
rwwwrrbgggbgbubrwrgrurubburuwguubwbrbbgwgugbuburuurwgwurbu
rrwruwuurwbbuwgwwugbrbbwugurrbrbrwbgrgwwwuurrw
bgrggrbbbwwbrwwrbwuruubbrrbbruugbuuubgugwbbww
uwrwwgrrggwbburgwwgbbgwugrrbuuurugugwrrrbwuwrgugbbgwguwg
rwwrbwubrrwwbbwuuwugwbbrwgurrbwugrwurwrbrbrrgbbb
uwburrrwwbwgwwurgrgwubrgwgbwwbrgwbrrbwrggwrgbbrwbru
wrrwbruurwwwgrgubgwgwgwuuubgrbrrggbburgbgwwuurwbbgbrgrggr
rwwbuuurwrrwguguurgbuuwwwwbguugruguwrugguwwwwug
gguwuggwbgrbrubbgrgbbwbggrrggrggwuwrggggrwwruub
rwwgbbuwbgwrrrbgwrwwubrrrwggbrubgrgbuuguwbgrrgggbugbbwbbgrgg
urbwbbrrggbgubwwwrrubwuguwbuurwbrgbgwrwrgrwubrburwgg
gbggbrbguwgbrbwurwuwrgrggrbrubggwruwbwbbgrwbwbgwububbuuu
bwuggwgbgubwwubrbbgwrwuugrruggbbwrrrgrgrbuuruwrbrgwbbrr
gwwugubrgurgguwbgbwrrrugurbubguwrrgrbrrwwwwugbgur
bruuguwrwrgburwrbwrbgburgubbgrgwuuggbrbuwgugbuuwwb
rwwwggwbwrbbgguwubrrbrgrwrubwuggubgruugg
wurgbgrrbubbbrgbbbwguuwuubgguwuwbrgwwgrurwwrbb
rgubwwbgrrrrubbrwgrwbuuuurubrwwuwgburbbruubuuuugr
rwwgwbbbwuggrbggubrgurggbgbgubggwwwbrurb
rwwgbbuwgrbwggrrbggwrgbwbuwuwuurwbbwrbwwrruwgrrbuwgrwrbuu
rwwggrwuuurgbwwbgwgrggwwbrrgwwgwwrwurwrrwwruuw
rwwbgbbwuuwwrguurwbrbuwgurruguwwrrburuurgurwu
rwwwuwgubwgbrbguuurrrgruruggwugububwwgbbuwuwgwgbrrbb
rrrbgwgwruuuubgubggwbrurugrrwugugbwwbbbrrrrurgrwbubwuwr
uubwbggwbrguwbgrgrrbwbuuwrwbrbgrrwrwburbrrwbbruruwburbr
rgurbbrrgwwuuurbwgwbgruruwbbwwgbbgrugwbrubuwrg
rruggrwrgbrgbgwbubuwbrguubuububgbrwwguwwwbbbbrggwrbrburggw
rwwwbruwbuwbrrrurwbbwgrrbggwbwrwrggwgburugbggggrrbbgrurwrwgg
rwwgrwrbbrruwuwrbbbbbgubuwwruwugwrgwwrwguwbwwwggg
rwwwwbggurgggrrbrgwbbbrrubgugrggbrgbuugrruuggbubgwrur
gubburrgwgrbgwrggruwrrwrbuwbruuubuurgwgrgggbwwrgg
rwwgbururububurruwbbwgbbwbbrrrburwubbrggrbbubgwbbrbrbw
ugbwgurrrwgbbbgruwgrwrbubuugbbuwrbwurrwruggbggrgbbguubw
wrbbruwuwgwgbrwgwgrbuuurbbggbggurrbgurbwbbrrrw
gbbgugurwbgubbbruguurrbggwgrwbbwggbwwwbbrr
ruuwuwwbubwrbbgubwrgguurgbgrbbbwggubrwugwbbrr
wbbbbbggwuurwbggguuurggguuwgwugruurbbuuguggubugrbuggwguwwb
gwwrubrwruubbwruwbgwrwwuwbbgwwubwrbugwgubwgruwru
rwwgwwwggugurbburggurrguruwubwrwwwuuwuwuuwbwbugur
rwwwwwrgwbbwrrbbwggwgwbbwgrwbwgrwrwwbuggwg
rwwrgbruuuugrwubbggwbwruwrurbrrrbrrgbbruuwwggwrwrrbugurub
ururbubgwuuuugrrbbggbugurwugwrwbgrubguuuubggggb
wbwubrbwubwgggwuwubgrrwbgruurwwrbgwguwrgwuwwugubugrgbbw
rwwwrwrrrbuuguuuuubwurbbrrrbwwgrwwggwgwgwuwrguuuwgu
ruuggwrwgggwrurbgubbrgrwuurbwwwrrwwrrbgugwgbrg
rwwbubuuuwwwbrwuwbwwrbrurgwrgubrrgwbrwrwwwwwgrugwwurwwgg
rwwwwbubgrugrurbbbrubrrgbrruwrgbugwwbuurgbwrbbggwg
rwwbbwuggwuwwubwrgrbrrbbwuuwugbugbuwrwwuwururrbruwgwwrbb
uburwgwbrrrgubugbrrggguubgwwgubrgwubrgwbbrbuuwwwr
grwbugbbwruwrbbuwrbbburwggruwbbbwubuubwgwwwwubrrruwbgwr
rbwbwwwgrbrgrruwubuwgwrbwbbubgbrrgwwbwrubbwubgbgg
gugbgbuugbwwuuuwgwbrgrgbgruuwrrwrbuggwwrwuurubrugwrburr
gbggwurrwgrwrbrbbuubuuubbbguwbggwwgrrrgwruur
gbbbgggugugwrwuwuwuwrwgubrgrrwbgruwuguwbbuw
rwwggrubburwwubgurbrwguggubwgwuwubrbgwwgrburw
gggwrurubbrrrbrgbwrggbrgbwguwwbuugbbuwwrbwug
rwwbugwbbwuwuwrwuwgwuubggrrwwuubrgubrgbw
uuwuwrubgbbrugugbubuuwggbgubgbrwbbrgbrwgubugubgbbgrbbg
wugwbggrrruguwwwwgugurgugrwguwbbbgwubgbgbbwrrwg
rwwggbwbgbwbgwuuggbwrwrgrrrgrwgubrgurrgrggruwrgubrwuuu
gbgwubgrbgwuwugrbwubrwrbgbbwbrrrurgwbgurwwwbuwb
rwwwuwbrgugurrurgububwwugwwbrrwuwwuwurrrgbwbugguubb
buguwgwuwrrwwuwbguwbwugbrrrbuwrbwugguugubuuubrw
rwwwwgrrbgugurbrbwbwgrwubwbwggbgbwrrwrwbgwuwrbgbubgbguru
wbrugbrgbbwuubgwwbbwrgbrwrwrruwurrggbrgrgbgwrwuuuuwugwrwb
rguguurwbuuguurrgrrrrbgbwbrrbwbwwgwrugggwuuwuwguggrgbwubrb
rwwwuwwgrbwurwrwubwbgbrrwwrgwuuurbgwuwggrrrrrgbuwwburw
ubugrbuwbggrwguguwwrbubrurgwbwgrbugwgugbugbru
rwwgbwuruuurgrruggruruubgbwwuwguwggurugwgruwbwgwrbwbwur
bbububrwrubbwuuugbubwbbrwbuwrwrruwgguurwuwbwbwbbrbbrwbwgg
bbugrbbgrgbugwrgubguwurrwuwubbgwrbwwuwgwguwruurguw
rwwbwbuwgubgrrbbwuwbbruwrggrrrbuugwurwrbr
wrgrurbggwbbugbggwrgrwuuwrruwbggggrwrbrrrugrwurgrrwugubgr
rgurururbgubuwrrbugurrwwbgbggguuubwgruuuwrwwugrwbuugburr
gbrbguguuggrwggbwrgrrbgubggrwggbuwuguuggrggu
rwwwgwurgrrwugwurgbgbbggbrbbwrwbwbgggwrurgrwbuggrrrgbrgggugb
rwruwbwgwguwwbwubguwubwrrugbburrbwgggbgubur
ggrggwwgrgbrgrgrurgwrgurwrbwbrwuwbwubrbrrbubwbgrubugbrubr
rwwrrrwwgrgurwuububwwugbggguruwgrruruubb
uugrwgguggrgubugrrrbgwbgrwruwgguwrwwuubgrwurbuwwgwgrgwgw
rwwrgwrgbguguwurrrbwwbuwubbuwwbugwuuwbrrw
rwwwrggrbwgbgrwbuwbbbgwggwbgruurbguwbuubwwrruuubrugbgbrguwr
wrwwgrrwbbrwbuuurugwbbrwgrgrbbbbrugrwubwugubgwrbbrwggurrr
gbubwbwuwggbwuwbuuubrgbbbrrbubwgwgbguggwbrrugubuww
brrwwuuwbwgrrrwrgbuwrgwuuurwrbrrwuugwrwgbgbrrbwuguwuwuuuu
rwwbwgbbuuruwugwbbruurwgbuuggrwggrbgwgubugwrbbrrgubgugwwbw
gurrwurwurruruguwwwrrrwbbbggggrwrbgwbuwugubuuwr
rwwwwbggguguwbbgrgrggwuwbbbgrwbrbrwbrubgwurbwrgugug
rrurbrrburgurgwbbgrgrgbgurubgwgwugggbgwbrbruwgugbwbwrwru
rwwggurubwugbrwwgwrwrurguwuurrrrrbwbbguuuwrggrugugwbrgwurrrr
rwwgwwrrurugrugwgrrbwwgwuwruruwgrubrwrgu
rgwuubuguuwburrgbugbgrgbrgwruwbbuwgurgurgurguuwgbgbrbbrw
rrrggwwbubururwruuugwgburwuwuwgbwrwbrwrbwg
rrwbggrggrbrbubrgwuubrbgbbbrbuurwbbwgbruwuwrwbugburw
rwwbwgrwbwuguuubrwgwgwrguggbggbwgbuwbuggbburw
rgbggwrbwrbwuugrurgbuwrugbwuuwrggwrwubwwrwwu
brrwbgwrrbrrbwwbbrgrgbbrbwrrggururrwgwuuwguuwgwrr
rwwwwguwugrbwwgrbwrbwbrwurgggbwgugrwwwwbbrubuwbbrgwgurbg
rwwbrwrrurrubrugwbgbwwgwwubrrguwwurruwgwg
brbbwwrwurwwggruwuwrgugguwwruurubbgrggurbgwgugwbbbbgwuggb
rbggbrwgbgwbguwrrrburbrgbrggrbgggrrbuggbbr
uwbuwuwbbrgrwuwugwwuuwgwruurubbggwbwggwwrbgbubwrgrwugwrbw
rgruwrbrbbbguguurrrwuburubwbbrubbbgrggbrwgguugb
urwbuwwrwggrgguuubugrgwwwbbrwgrrwbwgruwuubggrgwuurbbbwurb
rwwbuuuurbwrbubwbuwggrbwrbbbgrubrwgururrrwrrrwrrwggb
urbbbuwrrrbwruuuwguwurbgubgrbbrwrwuurwruruwbuburggrruwru
rwwrgrbgbwbwwuurwbugbwwrbwwgrrwbbbrgburwrbwgwburgbuwrrrrub
rwwwgrrrrgrrgrugggbburuuwgwgugwbgurrbggwbwugwrrwwgrrruub
gurguwrrrgwgwubruuruubwuwugubuwwgruugubrggbwgwuuwrbu
rwwwrrwubgbgggwwwwrgrgrwgrrrggwuwruuurrugbwbrwwrb
grrwbwbrrgburuuguwwrrrbrrwburrburwbrgbwrgw
uuggbugrggrubgrrbugwwrgwugrbgubbwrrgrwwbbbbguub
rrwggwguwbuwrwgrwuwguguwgguwbubrggwrgwbwbrggugwgrbgwrbggw
rwwrurgwbrwgwwuuurggwwururrgwrgbrubrbuuwwbgwb
bbbgbrburubrwrwbrurgbrbuwwrwgrwwrrbggbubwrrubrrrgbbrbbgwr
urgrrgbugrbwbugrrgubgrubuuuguwbrrrrubbwubwgggbburu
rbgrbgbwrruggubbugrwbubgbbwgbwbrbrububbrgguwgbwwrur
urgwuwrwwurwgwbgbrgwgrggrbwrgwugbwrrgbwgbguwrrrbrgbwrrgg
rwwggwgrgrwrgrwugrwugwbuuwbuwrrgbbgrbrbrur
wrrgwrgruwbugggbbbrrgruwrrrrbrgrgwgururrbwuugwuwu
burubrbwwwugwwbgurbuwbbwbgrgbwwrgwwbgwwgbwwuwwuw
bbururugbwgurbbbwguwuwguurwruwwwburwbgbugurruggwguugg
brgbbrugruurwwbggwbuuwwuruubuggbubwuwbrwuwwggbbwrwrgu
rwwbgruubbbggubruwurguwrurrrgrbuwwgwbwwwwguuwwrbbgwg
rwwbrrwbwbwuuwbbgbwbwbbgwwgrgurbwbrgbuguugwguubggwu
guwwbgwrurugwrbbwuuwuruubrugbwbugrbgbgbuwbwg
rwwwwwugwgbgbrrurwwubrwwwbrgbrbwwwuwgbbrbwbrruubbrwrb
wgbgbbgrbrbruugruuurrwgurwuwuubggububbggubgrwgubgggburuugb
rburuuguguwbgugwwggrbwruwwuuwwugbbwwgrbwuwgrrbbrwuuggg
gwgubbgruurrbgwrwrggurrwwwguuurrgggwrgrbwgbwg
rwwbbubrrrrrgwrubuuugrwwgrrurugwruguwugrbgr
rwwbuuwrrgggwgugggbgwuubrwgbwuwrrgggbgrwggwubgbbbwubbrgbu
rwwbrrwbgwrgbruwwuruggbbgbgrrurgrbgbwbgbugwu
grwwuubguubbguuwwrrwbwgwugwguugbruwrgrbwwub
rwwwbrgruruwrbugwbwgurrbguggubwubrbbrubrugrwbubbbgwwb
wgggwwbgruwugbruugubururruuugwgrwbrrwgrubwwwgurwwwuw
urbbrrrguwbgbbrrrrrgbburgwwbwwrgrwggwggwrg
ugwgbwgbrbbbggbggbwgrgugugbwrwwbbwrrrburuburrubgwgbwwwgwr
rgwwgrrwrrgbrbuuuwbuugwwgbubrrubugbbwrgggrbwuuruwuwgb
rwwwrrrubbgrrwrgugburgbwgubggbugrbubbuuruwurbwwwwugbgubbbwbu
buwwwuwubugrggurrbwgruugrbwrbrrwbubwgwuwwbwwwwbbgb
rurguwbbgruuugwuggrwrwbrgwbuwubrbrugwrrrrwbbwubg
ugrwgwubwrwburgurrrbwgubrrbwrrurgrugbrwgwruwwurgruwrguuwwu
rwwrbbrrgggbwbwuuuuurgrrbgbbuwbrggrwbgwuwwuuugwugu
uwubgguwugbgubrbuuuuggubgrgugubrggrggbubwgwgr
uuwwbrwurwguuugbgrwwggubbbubuwgbwubwurggubrwgbgubwrw
rwwwwrwrrgugrwgrbrwuwbwwwurbgbwrbubuubrgw
uwwuugrwbwrgrwuwrwugrrbbgbbbrugrbgbrgbwbwbbbbr
wururguwwguwruruwgrwurrwbguwwuuwrbubbrbbrgbrwrrubrrrgw
rwwgugububurrbruggwuggrbuuwbuuugwrrgbrwwwwbbrrrruwuw
rwwgbrwuwwwrrrubugrwrbgwgbgwgbwruguuwrggwww
wubrbwbuugrrbwburwwgugubbgrwruurrwwruuwbgbggwrwuwu
bubbgrgubwbrubrwrbbwuuwwgubgrugubwbubuwgrrugwwb
gbguburuwgbbbuuwgwrubbwbruuuwgggrrbgubbruu
rwwwgwgugrgbwrwrbguggwubwubrgruwwbwubbwbrgwrrrbbub
rbwbwwrggwggubwuwgggruurwuuuubwwrurrbrrrwrgwrrwbr
bubrbguugrwbuubbbuwrggwrubbrgbugugbrgbgwrubwurwbwguwrr
rugbwrruwwbuguuuwwubrggwwgrrrwuggwrggbgwubr
rurwwurrrbbgurwwgbwrubrbwrubgrrbbgubrrguuwgwbgggwuuggbbgrw
grbbgwrrgbrrubburrbbgrrbuugwurbuwugwuwgrgbwwbrg
rburgwrbrbrruguubgubggurugwgurgwuwrwguuwrugwugr
ubggwwggwrrrrbwurrrwbgrbbbrrbrwuubbrburwrg
bubgrwrrbbgwuuwubugurruwbggbubrwrgrwwgwurggrbuwwgwrruwrgw
rwwbubwuuwwgubrrgrwrguurgbwuwruruwwubgwgbwbwbuwruwwrwgruu`;
}

run();