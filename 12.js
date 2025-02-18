function run(){
  const input = getInput().trim().split('\n').map(function(x) { return x.trim().split(''); });
  const types = [];
  input.forEach(row => {
    row.forEach(i => {
      if(!types.some(t => t==i)){
types.push(i);
      }
    });
  });
  const plots = [];
  for(var y = 0; y < input.length; y++){
    for(var x= 0; x < input[0].length; x++){
      if(plots.some(p => p.points.some(i => i.x == x && i.y == y))){
        continue;
      }
      points = [{ x, y }];
      walkPoints(input, points, input[y][x], y, x);
      plots.push({ type: input[y][x], points: points, perimeter: 0 });
    }
  }
  plots.forEach(p => {
    p.points.forEach(pp => {
      p.perimeter += walkPlot(input, p.type, pp.y, pp.x)
    })
  });
  plots.forEach(p => console.log(p.type, p.points.length, p.perimeter))
  var cost = plots.reduce((p, c) => {
    return p + (c.points.length * c.perimeter);
  }, 0)
  console.log(cost);
}

function walkPlot(grid, val, y, x){
  let count = 0;
  if(y > 0 && !isValid(grid, [], val, y-1, x)){
    count++
  } else if(y == 0) {
    count++;
  }
  if(y +1 < grid.length && !isValid(grid, [], val, y +1, x)){
    count++
  } else if(y +1 == grid.length){
    count++;
  }
  if(x > 0 && !isValid(grid, [], val, y, x -1)){
    count++
  }else if(x == 0) {
    count++;
  }
  if(x+1 < grid[0].length && !isValid(grid, [], val, y, x+1)){
    count++
  } else if(x +1 == grid[0].length){
    count++;
  }
  return count;
}


function walkPoints(grid, points, val, y, x){
  
  if(y > 0 && isValid(grid, points, val, y-1, x)){
    points.push({ x, y: y-1 })
    walkPoints(grid, points, val, y -1, x)
  } 
  if(y +1 < grid.length && isValid(grid, points, val, y +1, x)){
    points.push({ x, y: y+1 })
    walkPoints(grid, points, val, y +1, x)
  }
  if(x > 0 && isValid(grid, points, val, y, x -1)){
    points.push({ x: x - 1, y })
    walkPoints(grid, points, val, y, x- 1)
  }
  if(x+1 < grid[0].length && isValid(grid, points, val, y, x+1)){
    points.push({ x: x + 1, y })
    walkPoints(grid, points, val, y, x + 1)
  }
}

function isValid(grid, points, val, y, x){
  return grid[y][x] == val && !points.some(p => p.x ==x && p.y == y)
}

function getInput(){
  return `SSSSSOOOOOBFFJJFTFBBBBBBBBPPPPPPPPBBBBBBBBBBBSSDDDDDDCCCCCCCCCCCUUUUUAAAAAAAAAAAAAAAUUUUUUUUUUUUUUUUUUUUUUDDDDDDMMMMMZZFFZZFFFFFFFFFFFFFFFII
SSSOOOOOFFFFFFJFFFFBBBBBBBPPPPPPPPPBBBBBBBBBSSSSSSSSDDCCCCCCCCCUUUUUUUUAAAAAAAAAAAAAUUUUUUUUUUUUUUUUUUUUUUUDDDDDMMMMZZZZFZZFFFFFFFFFFFFFFFII
OOSOOOOOFFFFFFJFFFFBBBBBBPPPPPPPPPPBBBBBBBBBBSSSSSSSDCCCCCCCCUUUUUUUUUUUUAAAAAAAAAAUUUUUUUUUUUUUUUUUUUUUUDDDDDDDDDDZZZZZZZFFFFFFFFFFFFFFFFII
OOOOOOOOFFFFFFFFFFFHBBBBBBPPPPPPPPPBBBBBBBBBBSSSSSSSDCCCCCCCUUUUUUUUUUGGUAAAAAAAAAUUUUUUUUUUUUUUUUUUUUUDVDDDDDDDDDDZZZZZZZZFFFFFFFFFFFFFFFII
OOOOOOOOOFFFFFFFFFFFFBBBBPPPPPPPPPPPBBBBBSSSSSSSSSSSDXXCYCCCUUUUUUUUUUUUUAAXXAAAAUUUUUUUUUUUCUUUUUUUUUUDDDDDDDDDRDHZZZZZZZZFFFFFFFFFFFFFFFII
OOOOOOOOOOFFFFFFFFFFFFFFBPPPPPPPPPPPBPPPBBSSSSSSSSXXXXXCXXCCUUULUUUUUUUUUUAXXXAAAUUUUUUCCCCCCCCCSUUUUUUDDDDDDDDFRRFZZZZZZZZZZZFFFFFFFFFFFFII
OOOOOOOOOOFFFUFFFFFFFFFFIPPPPPPPPPPPBBPPBBSSSSSSSMMMXXXXXXWUUUUUUUUUUUUUUCXXXXXXXWWWUUCCCCCCCCCCSUUUUUDDDDDDDDXFFFFZZZZZZZZZZZFFFFFFFFFFFFII
COOCOOOOOOKFFUFUUUFFFFFIIPPPPPPPPPPPPPPPPPSSSSSSSSMXXXXXXXUUUUUUUUUUUUUUUUUUXXXXXXXWWWCCCCCCCCCCSSSUUUUUDDDDDDFFFKFFZZZZZZZZFFFFFFFFFFFFIIII
COCCCOOOOOKFUUUUUUFFFFFIIIIPPPPPPPPPPPPPPIITSSSSSIXXXXXXXXUUUUUUUUUUUUUUUXXXXXXXXXWWWWWCCCCCCCCSSSSSSSSUUDDDDDFFFFFFZZZZZZZZFFFFFFFFFQQQIIII
CCCCCCCOKOKKUUUUUUFFFFFIIIIPPPPPPPPPPPPPPIIIIISIIIIXXXXXXXUUUUUUUUUUUUUUUXXXXXXXXXWWWCCCCCCCCCGSSSSSSSSSUDDDDFFFFFFFZZZZZZZZMZFFFXFSQQFQQQII
CCCCCCCCKKKKKKUUUUFUUKKIIIIPPPPPPPPPPPPPPIIIIIIIIIIIIIXXXXXURUUUUUUNUNUUXXXXXXXXXXWWWWCCCCCCCCSSSSSSSSSKKDDDDFFFFFFZZZZZZZZZZZXFFXFFFQQQQQII
CCCCCCKKKKKKKKUUUUUUKQKKIIIIIPPPPPPPPPPPPIIIIIIIIIIIIIXXXXXURUKKUUNNNNUXXXXXXXXTXXWCCCCCCCCCCCISSSSSSSSKKKKDDSFFFZZZZZZZZZZZZZXXXXFQQQQQQQQI
CCCCCCCCKKKKKKUUUUUUKKKKKLLIIPPPIPPPPPPPPPIIIIIIIIIIIIXXXXXXRSSSUUNNNNUNXXXXXXZXXWWCCCCCCCCCSSSSSSSSSSSSSKKKDSSZZZZZZZZZZZZZZZXXXXFFGQQQQQQQ
CCCCCCCCCCUKKKUUUUUUUUKKLLLIPPPIIIPPPPPPPIIIIIINIIIIIIIIXXXXSSSSNNNNNNUNXXXXXXZXXXCCCCCCCCCCCSSSSSSSSSSSSKKKSSSZZZZZZZZZZZZFFFFFXXFFFQQQQQQQ
CCCCCCCCCUUUUKUUUUUUULKKLLLLLIIIIIPPPPPPPIIIIKKNIIIINIIIISXXSSSSGGGNNNNNNNXQZZZZZXXXXCCCXCSCCCSSSSSSSSSSSKKKSSSSZZZSZZZZZZZFDFFFFFFFWQQQQQQQ
CCCCCCCCCUUUUUUUUUUUULLLLLLLLLLIIIPPPPPPPKIIKKBNNNNNNNNSSSUXSSJGGGGGNNNNNQQQZZZXZXXXXCCCXXSSSSSSSSSSSSSSSKKSSSSSZSSSZSZZZFFFDFFFFFFFQQQQQQQQ
CCCCCCCCCUUUUUUUOULLLLLLLFLMLLIIIIPPPPPKKKIEEKKNNNNNNNNSSUUSSSJJGGGNNLNNNQQQQZZXXXXXXXXXXXXXXSSSSTSSSSSKKKKKKSSSSSSSSSSZZJFFDFFFFFFFFQQQQQQQ
CCCCCCCCCUJJJJJJUULLLLLLLLLLIIIIIIPPPKKKKKEEKKKNNNNNNNNNSSSSSSSGGGGNNLNNNQQQQQXXXXXXXXXXXXXXXTSSSTSSSSSKKKKKSSSSSSSSSSSZZFFFFFFFFFFFFQQQQQQQ
CCCCCCKKKUUJJJJJJJLLLLLLLLLLLIIIIIIPKKKKKKKKKKKNNNNNNNNNSSSSSSSGGGGGGLLLNQQQQQQQXXXXXXXXXXXXXTSTTTTTSSSKKKKSSSSSSSSSSSSSSSFFFFFFFFFFQQQQQQQQ
CCCCFFFFFFJJJJJJJLLLLLLLLLLLLLIIIIPPKKKKKKKKKKNNNNNNNNNXXXSSMMMGGGLLLLLLNQNQQQQQXXXXXXXXXXXXXTTTTTTTTTSHKKSSSUSSSSSSSSSSSZFFFFFFFFFFQQQQQQQQ
CCCCFFFFFFFJJJJJJLLLLLLLLLLLLLIIIHHPPKKKKKKKKKKKNNNNNNNNXXXSMMLLLLLLLLLNNNNNQQQQQXXXXXXXXXTXTTTTTTTTTTTHKSSSSSSSSSSSSSSSSSFFFFFFFFFQQQQQQQQQ
CCCCFFFFGFFJJJGJJJJJLLLLLKKLLLIIIHHKKKKKKKKKKKKKNNNNNNNXXXXSMMMLLLLLLLLNNNNNQQQQQQXXXXXXXXTTTCCTTTTTTTHHHHHDSSLSSLSSSSSSSSFFFFFFFFFQQEEQQQQQ
CCFGFFFFFFFFGGGJGJJLLLLLUEELILIIIKKKKKKKKKKKIKKUNNNNNNXXXXXXXLLLLLLLLLLLQQQQQQQQQQQXXXXXXXXCTCTTTTTTTTTHHHHHIILLLLSSSSSSHHHFHFFFFFFEEEEEQEQQ
CCFFFFFFFFFFGGGGGJJLLLLLUEESIIIIIIDDKKKKKKKKUUUUNNNNNNXXXXXXZZLLLLLLLLLLLQQQQQQQQQQQXXXXXXJCCCCTTTTTTTTHHIIHIIIWLLSSSQQSHHHHHHFFFFFFEEEEEEQQ
XFFFFFFFFFFFGGGGGGJHLLLLUEEIIIIIIIDDDDKYKKKKKUUUUNUUNNCXXXXXXZZLLLLLLLLBLMBQQQQQQQQQXXCCCXCCCCCTTTTTTTHHHIIIIIWWQQQQQQQSSHHHHHFFFPPFEEEEEEQQ
FFFFFFFFFFFGGGRGGPHHLHHLLEEEIIIIIDDDDDUYYKKKKUUUUUUUWWXXXRXXXKKKKKKLLLBBBBBQQQQQQQCCXXCCCCCCJCCTTTTTTTTHFIIIIIIWWQQQQQQJHHHHHHHJJPEEEEEEEIEQ
FFFFFFFFFCFFFGRRPPHHHHHELEEEEEEIDDDDDUUUYYYKUUUUUUUWWWWWXXXKKKKKKKLLLBBBBBBQQQQQQQQCCCCCCCCCCCCFTTTTFTTFFFIFIWWWWQQQEQQJJHHHHHJJJJJJXEEEEEEQ
FFFFFFFFFFRFRRRRPPHHHHEEEEEEEEEEEDDDDUUUUUKKUUUUUUWWWWWWXKKKKKKKKKLLLBBBBBBQQQQQQQCCCCCCCCCCCCGFFFFFFFTFFFIFIWWWWEEQEQQJJJHJJJJJJJJJJJREQQEQ
FFFFFFFFFFFFFFPPPPPHPEEQEEEEEEEEEEDEUUUUUUUUUUUUUUUWWWWWWKKKKKKKKKKLLBKBBBBBBQQQQCCCCCCCCCCCCCCAFFFFFFFFFIIFIIIWWEEEEQJJJHHJJJJJJJJJJJJJJQEQ
FFFFFFFFFFFFPPPPPPPPPEEEEEEEEEEEEEEEUUUUUUUUUUUUUUUWOXXXXKKKKKKKKKLLLBBBBBBBBBBQQCCCCCCCCCCCCCCCFFCCCFCFFFFFFFFWWEEEEEJJJJJJJJJJJJJJJJJJJQQQ
FKFFFFFFFFFFFPPPPPPPPPEEEEEEEEEEEEEEUUUUUGUUUUUUUWUWOVVXXKKKKKKKKKLBLBBBBBBBBBQQQCCCCCCCCCCCCCCCFCCCCCCFFFFFFFFWEEEWWEJJJJJJJJJJJJJJJQJQJQQQ
KKFFFFFFFFFFFPPPPPPPPPPEEEEEEEEEEHELLLUUUGUUUUUWWWWWOOOXXXWWKKKKKILBBBBBBBBBBOQQQQCCCCCCCCCCCCCCCCCCCGCFFFFKKKAWWWWWWWWJJJJJJJJJJJJJJJJQJQQQ
KKKKKFFFFFKFPPPPPPPPPPEEEEEEEEEEEELLLLLGGGGUUUUWWPWOOCOOOXWWKKKKKIBBBBBBBBBBBOOQQCCCCCCCCCCUUUCCCCCGGGGFFFKKKAAAAAWWWWWWJJJJJJJJJJJJQQQQQQQQ
KKKKKFFFFFKKKPPPPGGGGPIEEEEEEEEEELLLLLLLGRRRUCUPPPPOOOOOOOWWWKKKIIIBBBBBBBBBBBOQOCCCCCCCCCUUUUUCCGGGGGGFCEAAAYAAAAWWAAWWJJJJJJJJJJJJJQRQQQRQ
KKKKKKFFKFKKPPPGGGGTTEEEEEEEEEEEELLLLRRLLRRRRUUNPPPVOIORROWXXXMKKXXBBBBBBBBBBBOOOOOOCCCCCUPUUUUUUGGGGGCCCAAAAAAAAAAAAAWWNJJJJJJJJJJJJQRRQRRQ
KKKKKKFKKKKKKPPGGGGGGGSSSSEEEEEQUUUURRRRRRRRGGGPPPVVPPKRRWWXXXMKXXXBBBBBBBBBBBOOOOOOCCCUUUPUUUUUUUGGGGGCCAAAAAAAAAAAAAANNNNJJJJJJJJJQQRRRDRR
KKKKKKKKKKKKKGGGGGGGGGGSSSEPEEEQUUUUUURUUUUUGGPPPPVPPNRRRRRXXXXXXXXXBBBBBBBBBBBBBOOOOOUUVUUUUUUUYYGGGGRCCAAAAAAAAAAAAAANNNNNNJJJJJQQQRRRRRRR
KKKKKKTKKTKKTTSSGGSGSGGSSSPPFEZUUUUUUUUUUUUUPGPPPPPPPPBRRRRXXXXXXXXXXBXBBBBBBBBBBBOOOOUUUUUUUUUUUUAAGGRCAAAAAAAAAAAAAAAGNNNNNJJJJJQQRRRRRRRR
KKKKTTTTTTTTTTSSGGSSSSSSSSPPFPZUUUUUUUUUUUUPPPPPPPPPMPRRREEXXXXXXXXXXXXBBBBBOBBBOOOOOUUUUUUUUUUUUAAGGGGAAAAAAAAAAAAAAAAANNNNNNJJJJJJRRRRRRRR
KKKKKTWTTTTTTTTSSSSSSSPSPPPPPPUUUUUUUUUUUUUUPPPPPPPPPKRRREXXXXXXXXXXXXXVBBBOOOOOOOOOOUUUUUUUKUUUUAAGVVVVAAAAAAAAAAAAAUUUNNNNNNJJJJJRRRRRRRRR
KKKKKTTTTTTTTTTSSSSSSSPPPPPPPPJUUUUUUUUUUUUPPPPPPPPPPPPPPEEXXXXXXXXXXXXXXFBEEOOOOOOOAUUUAAUUUUUDAAAWYVYAAAAAAAAAAAAAAUUUNNNNNNNRRRRRRRRRRRRR
KKKKTTTTTTTTTTTSSSSSSSPPPPPPPPPURUUUUUUUUUPPPPPPPPPPPRPPPEEEEEXXXUXXXXXXXFFEEOOOOOOOAUUUAAUAUUUAAAAWYYYYYAIAJAAAAAUUUUNNNNNNNNNTRRRRRRRRRRRR
KKKKTTTTTTTTTTSSSSSSPPPPPPPPPPSSUUUUUUUUUUUPSPPPPPPPPPPJPREEEEXXXUUXXXXXCEEEOOOOAOAAAAAAAAAAAUAAAAAYYYYYYQAAAAAAAAUUUUUNNAANNIITTRTRRRRRRRRR
KKKKKTTTTTTSSSSSSSSPPPPPPPPPPPPPPUUUUUUUUUGPPPPPPPPPPPJJJRRRRRXXXOUUUXXXCEEEOOOOAAAAAAAAAAAAAAAAAAAYYYYYYYYYAAAAAAUUUUUUUATTTTTTTTTRRRRRRRRR
KKKKKTTTTTTSSBSSSSSSSPPPPPPPPPPPUUUUGGUUUGGGGGPPPPPJJJJJRRRRRRRRUUUUUSXCCEEEOOOGAAAAAAAAAAAAAAAAAYYYYYYYYYBYYBBAAUUUUUUUUUTTXTTTTTTTTRRRRRRR
KKBKBBTTTTBBBBSSSSSSSSPPPPPPPPPPPUUGGGCGUGGGGGPPPPJJJJJJJRRRRRUUUUUUUUXUEEEEEEEGGAAAAAAAAAAAAAAAAYYYYYYYYYYYBBBBUUUUUUUUUTTTTTTTTTTBBBBRRRRR
KBBBBBBTTBBBBBSSSSSSSSPPPPPPPPPPPPUJGGCGGGGGGGGPXPPJJJJJRRRRRRUUUUUUUUXUVEEEEEEGGGGAAASAAAAAAAAAAYYYYYYYYYYBBBBBUUUUUUUUUTTTTTTTTTTBBBBRRRRR
KKKBBBBBTBBBBBSSSSSSSSPXPPPPPPPPPSSGGGGGGGGGGGPPPPZZZZJJZZNRRRUUUUUUUUUUUEEEEGGGGGIIIIAAEUUUUAAAAYYYYYYYYYYBBBBUUUUUUUUUBBBTTTTTTTTTBBBRRRRR
KKBBBBBBBBBBBBBSSSSSPPPPPPPPPYPSPSSSGSGGGGGGGGPPPZZZZZJZZNNNRRRUUUUUUUUUEEEEEEGGIIIISAAAUUUUWAACYYYYYYYYYYYBBBBBUUUUUUUUBBTTTTTTTTTBBBBRRRRR
KKKBBBBBBBBBRBBBBSSSSSPPPPPPPPSSPPSSSSGGGGGGGGPPZZZZZZZZNNNUUUUUUUUUUUUUUEEEEEEEEEIIIIAAUUUIWAAYYYYYYYYYPBBBBBBBBUUUUUUUBBTTTTTTOOTBBBBRRRRR
OOKKBBBBBBBBBBBBSSSSSSPPPPPPPPSSPPSSSSGGSGGGGGGZZZZZZZPZNNNUUUEEUUUUUUUEEEEEEEEEEIIIIAAIIIIIIIIIIIYYYYYYPBBBBBBBBBBUUUBBBBBBYYYYOONNNBRRRRRR
OOOOOOBBBBBBBBBBBBSSSSPPPKPMPPSSSSSSSSSSSGGGGGGZZZZVVZZNNNNNNEEEUUULUUUULLEEEEEEEIIIIIIIIIIIIIIIIIYYYYPPPBBBBBBBBBBBBBBBBBBBYOYYOONNNNPRRPRP
OOOOOOBBBBBBBBBBBFVSSSPMMMMMMMSSSSSSSSSSSGGGGGGCCZZVZYZNNWWNWEEEUULLULLLLLEEEEEEEIIIIIIIIIIIIIIIIIYYYYQPPBPBBBBBBBBBBBBBBBBBBOYOOOONVVPPPPRP
OOOOOOOBBBBBVVBVTVVSSVMMMMMMMSSSSSSSSSSSGGGGGXCCCCZZZZKKKKKKKKKKELLLLLLLLLEEEEEEEIIIIIIIIIIIIIIPIIIUUPPPPPPBBBKBBBBJJJBBBBBOOOOOOOONVVPPPPPP
OOOOOOOBBBBBVVVVVVQVSVMMMMMMMSSSSSSSSSSSSVGGGXXCMMZZZZKKKKKKKKKKELLLLLLLLEEEEEEEEIIIIIIIIIIIIIIPPPPPPPPPPBBBKBKKKKBJJJBBBBOOOOOOOOONVVPPPPPP
OOOOOOOOOBXVVVVVVVVVVVVMMMMMYSSSSSSSSSSASVVAGXCCMVZMZMKKKKKKKKKKELLLLLLLLLEEEEEIIIIIIIIIIIIIIIIPPPPPPPPPCBBKKKKKKKBJJJBBBBOOOOOOOOOOXXXXPPPP
OOOOOOOOOXXXVVVVVVVVVMMMMMCMSSSSSSSSSSSVVVXGGXMMMVMMMMKKKKKKKKKKQLLLLLLLEEEEIEIIIIIIIIIIIIIIIIIIIPPPPPPPCPBCKKKKKKJJJJJJJJOOOOOOOOOOXXXXXPPP
OOOOOOOOOZXXVVVVVVVVVMTMCMCCSSSSSSSSSSSVVVXXXXMMMMMMMAKKKKKKKKKKLLLLLLLLLLIIIIIIIIIIIIIIIIIIIIIIPPPPPPPPPPBBKKKKKKJJJJJJJJJJJJOOOOOOXXXXXXMM
OOOOOOOOOXXXVVVVVVVVVVVVCCCCCSSSSSSSSSVVVXXXVVMMMMMMMMKKKKKKKKKKLLLLLLLLLKIIIIIIIIIIIIIIIIIIIIIHPPPPPPPPPPBBBKKKKKJJJJJJJJJJJJOOXOOOXXXXXXXM
OOOOOOGOOXXXXXVVVVVVVVVVCCCCCCSSSSSSSSVVVVXXVMMMMMMMMMKKKKKKKKKKLLLLLLLLLKIIKIIIIIIIIIIIIIIIHHHHHPPPPPPPPPQQQQKKKKJJJJJJJJJJJJXXXXXXXXXXXXXM
OOOOOOOOOXXXXXVVVVVVVVVVCCNNCCSSSSSSSSSVVVXXVVMMMMVMMVVVVWWWWWWWLLLLLLLLLKIIKKKIIIIIIIIIIIIIHHHPPPPPPPPPPWOQQQQQQQJJJJJJJJJJJJOSAAXXXXXXXXXM
OOOOOOOOOOXCECCCVVVVVVVCCCNNNCSSSSSSSVVVVVVXVVVMVVVMMVVVVVWWWWWWLLLLLLLLLKKIKKKIIIIIIIIIIIIHHHHPPPPPPPPPXOOQQQQQQQJJJJJJJJJJJJSSWWXXXXXXXXXM
OOOOOOOOOOCCCCCVVVVVCCCCCNNVNSSSSSSVVVVVVVVVVVVMVVVVVVVVVVVLWWWWWLLLLLLLLLKKKCCCCCICIIIIIIHHHPPPPVVVPCCPPOOQQQQQQQJJJJJJJJJJJJSSWWWWXXXXXXXX
OOOOOOOOCCCCCCCCCVVVVCCCCNNNNNNSSSSVVVVVVVVVVNNZZZVVIVVVVVVLLLWWLLLLLLLLOODKKKCCCCCCIIIIBIHHHTTPPOOOCCPPPOOOOOQOXQJJJJJJJJJJJJJSWWWWWXXXXXXX
OOOOOOOOOCYCCCCCCVVVCCCCNNNNNNNSSSSSVVVVVVVVVVNZZZZZIVVVVVVLLLLLLLLLLLLLLDDDDCCCCCCIIIIIIIHHHTTPPFOCCCOOOOOOOOOOXQWWWJJJJJJJJJJSSWWWWXXXXXXR
OOOOOOOOYYYCCCCCCVVCCCCNNNNNNNNNNNVVVVVVVVVVVVNNVVZIIVVVVVVLLLLLLLLLLLLZZDDDZCCCCCCCIIIIIIHHHHHPPFOCCCOOOOOOOOXXXXXXWJJJJJJJJJJSWWWWWWXXXXXX
OOOOOOOYYYYYCCCCCCCCCCCNNNNNNNNNCOVVVVVVVVVVZZNSGVVVVVVVVVVLLLLLLLLLLLLLZDDZZCCCCCCIIIIIIHHHHHHFFFOOOOOOOOOOOOOXXXXXWJJJJJJOSDSWWWWWWWXXXXXX
OOOOOYYYYYYYCCCCCCCCCCCNNNSNNNNNCCVVVVVVVZZVVZFSGGGGVVVVVVVMLLLLLLLLLLLLZZZZZCCCCCCCTIIITTTHHHHFFFOOOOOOOOOOOOOOOXXXXXWXXXOOSDWWWWWWWWWXXXXX
OOOYOYYYYYYYCCCCCSCCCCCCCNNNNNNNCCCVVVVZZZZZZZSSSGGMLVVVVVHMMMMMMLLLLLZZZZZZZZCCCCTTTTITTTTBFFFFFFOOOOOOOOOOOOOXXXXXXXXXXXOOOWWWWWWWWWWXXXXM
OOOYYYYYYYYYYGGCCSSSSCCCNNNNNCCCCCCVVZZZZZZZZZZZZMMMLVVVVMMMRLLBLLFFFFFFFFFFZZCXCCCTTTITTTTBBFFFCFOOOOOOOOOOOOXXXXXXXXXXXXXOOXWWWWWWWWWWWMXM
OOOYYYYYYYYGGGGCCCCSSSCCCNNNNNCCCCKVVNNZZZZZZZZZZZKMMVVVVMMMRLLLLLFFFFFFFFFFZZCCCCZATTTTTTTBFFFCCCOOOOOOOOXXOXXXXXXXXXXXXXWXXXSSSWWWWMMMWMMM
OODBYYYYYYYGGGGGSSSSSSSCCCCCCCCCCCCNNNNNZZZZZZZZZMMMMMMMVMMMMMLOLZFFFFFFFFFFZZZZZZZAATTTTTTBBFCCCOOOOOOOOOOXXXXXXXXXXXXXXXXXXXSSSSWWMMMMMMMM
OBDBBBBBEYSGGGGGSSSSSSSSSCCCCCCCCCNNNNZZZZZZZZZZMMMMMMMMVMMMMMMMMZFFFFFFFFFFZZZZZAAAATTTTBBBFFCCBOOOOOOOOOOOOODDDXXXXXXXXXXXXXSSSSWHHMMMMMMM
BBBBBBBBBGGGGGGSSSSSSSSSCCCCCCCCCCCCZZZZZZZZZZZZMMMMMMMMMMMMMMMMMZZZZZZZZZZZZZZZZAAAAAATTBBBFFBBBIOIZZOZZOOOOOODDXXXXXXXXXXXXXSSHSSHMMHHHMMM
BBBBBBBBGGLGGGGGSSSSSSZZCCCCCCCCCCCCCCZZZZZZZZZZZMMMMMMMMMMMMMMMMZZZZZZZZZZZZZZZAYAAAAATBBBBBBBBBIIIZOOZZZZOODDDDDXXXXDXXXXXXXSSHSHHMMHHMMMM
BBBBBBBBGGGGGGAASSSSSSSSCCCCCCCCCCCCCCZZZZZZZZZZZMMMMMMMMMMMMMMMZZZZZZZZZZZZZZZAAAAAAAATTBBBBBBBBZIZZZZZZZZOODDDDDDDDDDDQQQXXSSSHHHHHHHHMMMM
BBBBBBBBBGGGFFSSSSSSSSCCCCCCCCCCCCCWCCCZZZZZZZZZZZZCMMMMMMMMMMMMZZZZZZZZZZZZZTZAAAAAAAAAAQQBBBBBZZZZZZZZZZZOOODDDDDDDDDQQQQXXSHHHHHHHHHHHYYM
BBBBBBBBBBBBBSSSSSSSSSCCCCCCCCCCCCCWCCCZZZZZZZZZZZZMMMMMMMMMMMMMZZZZZZZZZZZTTTZAAAAAAAAAAQQBBBBBZZZZZZZZZZZZDODDDDDDDDDQQQQQXXHHHHHHHHHHHLYY
BBBBBBBBBBBBBBSSSSSSSSCCCCCCCCCCCCWWCCZZZZZZZZZZZZZYMMMMMMMMMMYZZZZZZZZZZZTTTTTWBAAAAAAAQQQBBBBBWZZZZZZZZZZZDDDDDDDDDDDQQQQQQHHHHHHHHHHHHYYY
BBBBBBBBBBBBSSSSSSSSSSSCCCNNCCCWWWWWYYYZZZZZZZZZZYYYYYMMMKMKMMMKKZZZZZZZZZTTTTXBBBAAAAAAQQQBBBBBBZZZZZZZZZSZDDDDDDDDDDDQQQQQQQHHHHHHHHHHHYYY
EEBBBBBBBBBBSSSSSSSSSSSCCNNCCCZWWZWYYYYYYYZZZZZZZYYYYAMMMKKKMMKKKZZZZZZZZZKKKBBBBBVBAIAQQQQBBBOOZZZZZZZZZZZYDDDDDDDDDDDQQQQQQQHHHHHYHHHHYYYY
EEBBBBBBBBBBSSSSSSSSSSSSCNNCGCZZZZZZYYYYYYZZZZZZZYYYYAAMMKKKKKKKKKZZZZZZZZKZKBBBBBBBBBQQQQQQQBBBBZZXZZZZZZDDDDDDDDDDQDDDQQQQQQBHHHHYYHHHYYYY
EEBBBBBBBBBBSBBSSSSSSSSSSSNNZZZZZZZZYYYYYYYYZZXXYYYYAAAAMKKKKKKKNNNZZZZZZZZZBBBBBBBBJJJQQQQQQQXZZZZXZZZZZZFFFFDDDDDDQDDDDQQQBBBBYYYYHHYYYYYY
EEEBEEBBBBBBBBSSSSSSSSSJJJJJZZZZZZZYYYYYYYYYAXXXYYYYAAAEEKKKKKNKNNNNNZZNZZTBBBBBBBBBJJBQQQQQQQXXXXXXXXXZZFFFFDDDDDQDQDDDDQQQQQBBBYYYYYYYYYYY
EEEEEEBBBBBBBBBSSSSSJCSJJJJPZZZZZZZYYYYYYYXXXXXXXYYYXXDEEEEKKNNNNNNNNNNNNBBBBBBBBBBBBJBSOQQQVQXXXXXJJXXJZFFQQQQQDQQQQQDQQQQQQBBBYYYYYYYYYYYY
EEEEEEZEBBOOBBBSSSJBJCCJJJJJZZZZZZZYYYYYYXXXXXXXXXYXXXXEEEEKKNNNNNNNNNNNNNNBBBBBBBBBBBBOOOQQVXXXXJJJJJJJJFQQQQQQQQQQQQQQQQQQBBBBYYBYYYYYYYYY
EEEEEEZEOBOOBOBSSOJJJJJJJJJJJZZZZZZZCCCAAAAXXAAXXXXXXEEEEEEKKNNNNNNNNNNNNNNBBBBBCBBBBOOOOOQXXXXXYJJJJJJJJJQQQQQQQQYYQQQQQQQQBBBBBBBBBBYYYYYY
EEEEEEEEOOOOOOBOOOJJJJJJJJJJJTZZZZCCCCCCCAAAAAKXXOXOEEEEEEEKKNNNNNNNNNNNNNNNBBBCCCCOOOOOOWYYYYYYYJDDJJJJJJWQQQQQQQYYQQQQQQBBBBBBBBBBBBYYYYYY
EEEEEEEEOOOOOOOOOJJJJJJJJJJJJJJJFGCCCCCCCCCAKKKQXOOOEEEEEEEKKNNNNNNNNNNNNNNNNBCCCCCOOOOOOOYYYYYDDDDDJJJJJJWWQQQQYYYYYYQQQQBBBBBBBBBBRBYYYYYY
EEEEIEOOOOOOOOOOOJJJJJJJJJJJJJZZGGGGCCCCCCCKKKKKKOOEEEEEEEEEECCNNNNNNNNNNNNNNCCCCCOOOOOOOYYYYYYDDDVDDDJJJJWWQQQJYYYYYMMMMMMMMMMJJJJJRBYYYYYK
EEEIIROOOOOOOOOOJJJJJJJJJJJJJJJZGGGGZZCCUUKKKKKKKKOOHPPEEEEEECCNNNNNNNNNNNNNCCCCCCOOOOOOYYYYYYYYDVVVDAJAWWWWQQQDYYYYYMMMMMMMMMMDJJJJJOYKYKKK
ERRRRRRROOOOOOOOOJJJJJJJJJJJJJJZZGZZZCCCUUUKKKKKKKOOHHHPEECCCCCCNNNNNNNNNNNNCCCCYCOYYOOOYYYYYYDDDDVVDAAAAWWQQWDDYYYYYMMMMMMMMMMJJJJJJJYKKKKK
ERRRRRRRRROOOOOOOOJJJJJJJJJJJJJZZZZZZZZZZUUUUKKKIIIIFHPPPECCCKKCNNNNNNNNNNCCCCYYYYYYYOYYYYUUYYYDDDDDAAAAAWWWQWDDDYYYMMMMMMMMMMMJJJJJNYYKKKKK
RRRRRRRRRROOOOOOOOOJJJJJJJJJJJJZZZZZZZZZUUUUUUKGGGIIHHHHPKKCKKKKNCCNNNNCCNNNCCCCYYYYYYYYYYUUUTADDAAAAAAWWWWWWWWWDDDOMMMMMMMMMMMJJJJJJLLLKKKK
RRRRRRRORROOOOOOSOOJJJJJJJJJJVZZZZZZZZZZUUUUUUKGGIIIHHHHPKKKKKKKKKCCCCCCCCNCCCCCCCCCHYHHYUUUUAAADAAAAAAAAAWWWWWDDDDOMMMMMMMMMMMJJJJJJLKKKKKK
ZZRRRRROOOOOSOOOSOOOJJJPJJJJVVVZZZZZZZUUUUUUUUUIIIIIIHHHPKKKKKKKKKKCCCCCCCCCCCCCCCCHHHHHHHUUNAAAAAAAAAAAXAWAWWWDDDDOMMMMMMMMMMMJJJJJJJJKKKKK
SZRXXROOSSOSSSSSSSOOOPJPJJJJVVVZZZXXXUUUUUUUUUUIIIIIIHHKKKKKKKKKKKKCCCCCCCCCCJCCCHHHHHHHHHUUNAAAAAAAAAAAAAAAAAWDDDDOMMMMMMMMMMMJJJJJJJKKKKKK
ZZZXXZOSSSSSSSSSSSSSSPPPPJJJVZZZZZZXXVVVVUUUUUUUIIIIIHBBKKKKKKKKKKKCCCYYYCCJJJCCHHHHHHHHHHCCAAAAAAAAAAAAAADAAIWDDDDOMMMMMMMMMMMJJJJJJJKKKKKK
ZZZZZZOSSSSSSSSSSSPPPPPPPPJVVVVVVZXXXCXXVUUUUUUUIIIIIHHBBKKKKKKKKKKCCYYAYCCJJJCCHHHHHHHHHHCHRRAAAAAAAAAAAAAAAAADDDDOMMMMMMMMMMMJYJJJJJKKKKKK
ZZZZZZZSSSSSSSSSSSPPPPPPPPPPPVVVVZXXXXXXVUUUUIIIIIIIIIZZKKKKKKKKKKKKCYYYYYCJJJCCCHHHHHHHHHHHHRRAAAAAAAAAAAAAAAIIIDCCLOOMMMMMJJYYYKKYKKKKKKKK
ZZZZZZZZSSSSSSSSSSPPPPPPPPPVVVVVVVVXXXXXUUUUUIIIIIIIIIZZKKKKKKKKKKKKYYYYDDJJJJJJJIIIHHHHHHHHHRRAAAAAAAAAAAAMMLLLLLLLLOOMMMMMYYYYKKKKKKKKKKKK
ZZZZZZZZASSSSSSSJSPPPPPPPPPPVVVVVVXXXXXXXXUUUUIIIIIIIIIZZKKKKKKKEEDYYYYYYDJJJJJJJJIIJHHHHHHHHRRRRRARARRARRAAMLLLLLLLLOOOOOJYYYYYKKKKKKPKKKKK
ZZZZZZZZZZSSSSSSPPPPPPPPPPVVVVVVVVVXXXXXXXXUUUUIIIIHIIZZZZZZKKKKEEDYYYYYDDDJJJJJJJIIJJHHHHHHHRRRRRRRRRRRRRRAALLLLLLLLOOOOOJYYYYFFFKKPKPPPKWK
ZZZZZZZZZZZUSDSSSPPPPPPPPVVVVVVVVXXXXXXXXXXUUUUUUIIIIIZZVVZKKEFEEEYYYYYYDJJJJJJJJJJJJHHHHHHHHFFFRMMMMMMRRRRRLLLLLLLLLOOOOOJYFFFFFEKPPPPPPKWK
ZZZZZZZZZZZZDDDSSPPPPPOPPPPVVVVVVXXXXXXXXXXXUUKUUIIIIQVZVVVTKEEEEEEYYYYYDJJJJJJJJJLJHHHHHTHHHFFUMMMMMMMMMMRRRRLLLLLLLLOOOOOOOFFFFFFGPEEPPWWK
ZZZZZZZZZZZZZDDDSPPPPPOOEPVVVVVVVVXXXXXXXXXXUKKKKKIIIQVVVVVTTEEEEEEETTYYYJJJJJJJJJJHHHHHHHHHHFFUMMMMMMMMMMRRLLLTLLDLARAOOOOOOHHFFFXPPEEPPPPK
ZZZZZZZZZZZZDDDDDPPPPOOOOOOOOVVVVVXXXXXXXXXUUKKKKKKIQQVVKVTTTEEEEEEETTTTJJJJJJJJJJZZHHHHHHHHFFFMMMMMMMMMMMMRJTTTTTAAAAAOOOOOOOHFFFFFPPPPAPPA
ZZZZZZZZZZZZDDDDDPPPPOOOOOOOOVVVVXXXXXXXXXUUKKKKKKKIIKKAVVVVTTEEEEEETTTTTTJJJJJJJJZZZHHHHHFFFXXXXXXXXXMMMMMJJTTTTTTAAAAAAOOOOOHFFFFFPPPAAAAA
ZZZZZZZZZZZIZDDDDDDPPOOOOOOOOVVVVBXXXXXXXPKKKKKKKKKKKKAAVTTTTTTTEEEETTTUUUUUUJJJJJJZZHHHHHFFFXXXXXXXXXXXXXXXJJJTTTTAAAAAAOOHOOHFFFMPPPSPPPAA
BZZZZZZZZZZZZZDDDDDPDOOOOOOOOOOVVBLXXXXTXXKKKKKKKKKKKKKKTTTTTTTTTEEETTUUUUUUFJJJJJJJHHYHHHHFXXXXXXXXXXXXXXXXJJTTTTTAAAAAAOAHHHHHPFFPPPPPPPAA
BZZZZZZZZZZZZZDDDDDDDDOOOOOOOBBBBBLXXXXKKKKKKKKKKKKKKKKKTZZTTTTTTEEETUUUUUUUJJJJJJCCCCFFHHFFXXXXXXXXXXXXXXXXJTTTJTTAAAAAAAAAAAAPPPPPPPPPPPAA
BZBBBZWWZZNZDZDDDDDDDDDDOOOOOLLBBBLLXXXXRRRRKKKKKKKKKKKKTZZTTTTTTTTTTUUUUUUUUJJJJJCCCCFFFFFFXXXXXXXXXXXXXXXXTTTTJTTAAAAAAAAAADPPPPPPPPPPPPPA
BBBBBBBBBWWNDDDDDDDDDDDDODDOOLLLLLLXXXXRRRRNNNNNKKKKKAAZZZZTTTTTTTTUUUUUUUUCCCJJJVVVFFFFFIIIXXXXXXXXXXXXXXXXJTTTJJTAAAAAAAAAAPPPPPPPPPPPAAAA
BBBBBBBBWWNNDDDDDDDDDDDDDDDDDDLLLLLLXRRRRRRNNNNNKKKKKKZZZZZZTTTTTTTUUUUUUUKKVCCJJVVVCFFFFFIIXXXXXXXXXXXXXXXXTTJJJJTAAAAAAAAAAAPPPPPPPPPPPPAA
BBBBBBBWWWNNDNDDNDDDDDDDDLLLLLLLLLLLLRRRRRRNNNNNKKKKKZZZZZZZTTTTKKTKAUUUUKKKKCCCJVVVCCFFCFIIXXXXXXXXXXXXXXXXTTJJJJTTTAAAAAAAAAZPPPPPPPPPPPAA
BBBBBBBRWWNNNNNNNNDDDDDDLLLLLLLLLLLLLLRRRRRNNNNNKKKZZZZZZZZZZNNNNKKKUBUUUKKKKCVVVVVVCCCFCCCIXXXXXXXXXXXXXXXXTTTJJKTTTAAAAAAAAAZZPPPPPPPPPPPA
BBBBBBBBBNNNNNNNNDDDDLLLLLLLLLLLLLLLLLRRRRRNNNNNKZZZZZZZZZZZZNNNKKKKUUUUUKKKKCVVVVVVCCCCCCCIXXXXXXXXXXZZZZKKKKKJJKKTTTTAAAAEAAZZZZPZPPPPPPPA
BBBBBBBVNNNNNNNNNDDDDDDLWWLLLLLLLLLLRRRRRRRNNNNNZZZZZZZZZZZZZNNNNKKKUUKUKKKKKCVVVVVVCCCCCCIIIIIIZZZZZZZZZZKKKKKKKKKTTTTTAAAEAZZZZZZZZZPPIITA
BBBBBBBBBLNNNNNNNDDDDKKWWWLLLLLLLLLLLRRRNNNNNNNNNNZZZZZZZZNZNNKNNLKKUKKKKKKKKCVVVVVVCCCCCCCVILIIZZZZZZZZZZKKKKKKKKKKKTTTAAAEEGGZZDDDDZPPITTA
BBBBBBBBBLLLNNNNNNDKKKKKWWWWWLLLLLLLRRRRNNNNNNNNNNNNZZZZZNNNNKKKKKKKKKKKKKKKKKVVVVVVKCCCCCCCLLLIZZZZZZZZZZKKKKKKKKYYTTTTTAEEGGGZDDDDTZZZTTTT
BBBBBBBBLLLLNNNNNNKKKKKKWWWWLLLLLLLLRRRRNNNNNNNNNNNNZZZZZZNNNNKKKKKKKKKKKKKKKKVVVVVVVVVVCCCCCCLLIITZZZZZZZKKKKKKKKYYYYTTTGGGGGGDDDDDTTTTTTTT
BBBBBBOWLWLLLNNNKNKKKKKKWWWWLLLLLLLLLRRRNNNNNNNNNNNNZZZZZZNNNNKKKKKKKKKKKKKKKKVVVVVVVVVVKKCQQFLLLTTZZZZZZZKKKKKKYYYYYTTTGGGGGWWWDDDDDDTHTTTT
BBBBBLWWWWWNNNNNKNKKKKKWWWWLLLLLLLWLLRRRNNNNNNNNNNNNZZZZZZZNNNNKKKDWWWKKKKKKKRVVVVVVVVVVKKVQQFFFFCCZZZZZZZKKKKKYYYYYTTTTGGGGGGWDDDDDDDTTDLTT
BBBBBBWWWWWNCNNNKKKKKKKKWWWWLWLWLLWLLRRRNNNNNNNNNNNNZZZZZZZNNNNNKKDWWWKKKKKRRRRRRQVVVVVVKKKQQFQFFFCZZZZKKKKKKKKKKYYYYTTTGGGGGGGDVDDDDDDDDDDD
BBBBBBBBWWWCCKKKKKKKKKKKWWWWWWWWLWWWRRRRNNNNNNNNNNNNZZZZZZZNNNNNOWWWWWKKKRRRRRRRRRKKKKKKKKKQQQQQCCCCCCKKKKKKRKKKRYYYYTGTGGGYWDDDDDDDDDDDDDDD
BBBBBBBBHWWHKKKKKKKKKKKKKWWWWWWWWWWWRRRRRNNNNNNNNNNNEEEEZZNNONNNOOOWWWKKKKRRRRRRRRKKKKKFKKKQQQQQKCCWWCKKKKKRRRRRRJXXXTGGGGGYYDDDDDDDDDDDDDDD
FBBBBBHHHHHHKKKKKKKKKKKKKWWWWWWWWWWWWRRRRNNNNNNNNNNNEEEEZZNNOOOOOOOWOWKKKRRRRRRRKKKKKKKFFFFQQQQQQWWWCCCKKKRRRRRRRXXXXXGGGGYYODYYDYYDDDDDDDDD
BBBBBBBBHHHHHKKKKKKKKKKKKWKWWWWWWWWWWWRRRNNNNNNNNNNNOOEEEZNNNOOOOOOOOWWUKKCCRRRRKKKKKKKKQQQQQQQQWWWWCCCCCKRRRRRRXXJJJYYGGYYYYYYYYYYYYDDDDDDD
BBCBOBECCCHHKKKKKKKKKKKKKKKWWWWWWWWWWWRRRRRRRRRROOOOOOEEEZZNSOOOOOOOOUUUCCCCRRRIIIKKKKKKQQQQQQQQQQCWWCCCCRRRRRRRXXIYYYYGGYYYYYYYYYYYYYYYYYDD
CCCCCCCCCCCKKKKKKOKKKKKKKKKWWWWWWWWWWWRRRRRRRRROOOOOEEEEEZZSSOOOOOOUUUUCCCCCCCIIIKZKKKKKKKQQQQQQQQCCCCCCWWWWRRRXXXIYYYYYGYYYYYYYYYYYYYYYYYDD
CCCCCCCCCCKKKKKKGGGGKKKKKKKWWWWWWWWWWWRRRRRRRRROOOOOEEESSSZSSOMMOOOOCCCCCCCCCIIIIKKKKKKKKIQQQQQPPQQQCCCCCWWRRRXXXIIIYYYYYYYYYYYYYYYYYYYYDDDD
CCCCCCCCCCCKKKKKGGGGKKKKKKWWWWWWWWEWWRRRRRRRRRRROOOOOOSSSSSSSMMOOOOOOCXCCCCCCIISSSLLLKKKIIQIIIICCCCCCCCCCWWRRRXXXIIYYYYYYYYYYYYYYYYYYYYYDDDD
CCCCCCCCCCCCCKKGGGGGGGKKKKWKWWWEWWEEEGGRRRRRRRUOOOOOOOSSSTSSSMMOOOOOOOOOCCCCCIISSSSLLKKIIIIIIIIICCCCCCCCCCCXXXXXXXIIYYYYYYYYYYYYYYYYYYYDDDDD
CCCCCCCCCCCCCCTGGGGGGGGGKKKKEEWEEEEEEGPRPPPRRUUOOOOOOOSSSTSSSMOOOOOOOOOOOCCCCIIISSSSSIIIIIIIICCCCCCCCCCCCCCXJXXXIIIIIYYYYYYYYYYYYCCYYYYDDDDD
CCCCCCCCCCCCGTTGGGGGGGGGKKEEEEEEEEEEEPPPPPPRUUOOOOOOOOOOSOSSSOOOOOOOOOOOOOIICCISSSSSIIIIIIIIICICCCCCCCCCCCCJJJXXIIIIIIIYYYYYYYYYCCCYYYDDDDDD
CCCCCCCCCCCGGGGGGGGGGGGGKKEEEEEEEEEEEEEPPPPRUUOZOOOOOOOOSOSSSOOOOOOOOOOOOOOIIIISSSUSIIIIIIIIIIICCCCCCCCCCCJJJJJJIIIIIIIYYYYYYYYYCCYYYYYDDDDD
CCCCCCCCCCCCGGGGGGGGGGGGKKKEEEEEBEEEEPPPPPPPPOOOOOOOOOOOOOOUOOOOOOOOOOOOOOOOIIIIVVIIIIIIIIIIIIIIICICCCCCCCCJJYYJYIIIIIIYYYYYYYYYYYYYYYDDDDDD
CCCCCCCCCCCCGGGGGGGGGGGGGKKKEEEEEEEEEPPPPPPPPOOOOOOOOOOOOOOUOOOOOOOOOOOOOOOOOOIIIIIIIIIIIIIIIIIIIIICCCCCCCCYYYYYYIIIIIIIYYYYYYYYYYYYYDDDDDDD
CCCCCCCCCCCCGGGGGGGGGGGGGKKKKKKKEEEECPPPPPPPOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOIIIIIIIIIIIIIIIIIIIIICIICCCCCYYYYYYYYYYYYYYYYYYYYYYYYYYYDDDDDD
CCCCCCCCCCCGGGGGGGGGGGGGGKKKKKKKEEECCCCPPPPIOOOOOOOOOOOOOOPOOOOOOOOOOOOOOOOOGGGGIITIIIIIIIIIIIIIIIIIIICCCYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYDDY`;
}

run();