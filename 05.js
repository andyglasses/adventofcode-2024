function run(){
    var input = getInput();//.trim().split('\n').map(function(x) { return x.trim(); });
    var rules = input[0].trim().split('\n').map((x) => x.split('|').map(y => parseInt(y.trim()))  )
    var updates = input[1].trim().split('\n').map((x) => x.split(',').map(y => parseInt(y.trim())))
    var total= 0;
    updates.forEach(u => {
      var ok = true;
      for(var i = 0; i < rules.length; i++){
        var ruleResult = isRuleApplied(rules[i], u);
        if(ruleResult == -1){
          ok = false;
          console.log('not ok', u, rules[i])
          break;
        }
      }
      if(ok){
        console.log('ok', u);
        total += u[(u.length - 1) / 2]
      }
    });
    console.log(total)
  }

  function isRuleApplied(rule, update){
    var index0 = update.indexOf(rule[0]);
    var index1 = update.indexOf(rule[1]);
    if(index0 == -1 || index1 == -1){
      return 0;
    }
    return index0 < index1 ? 1 : -1;
  }
  
  function getInput(){
   /* return [`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13`, `75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`];*/
return [`76|86
34|42
34|59
82|34
82|52
82|71
69|15
69|83
69|76
69|79
75|37
75|92
75|77
75|26
75|43
92|55
92|71
92|42
92|31
92|87
92|73
68|51
68|82
68|88
68|22
68|69
68|91
68|78
28|65
28|11
28|26
28|78
28|56
28|91
28|29
28|51
49|68
49|86
49|32
49|56
49|75
49|43
49|11
49|46
49|82
72|93
72|49
72|73
72|37
72|31
72|42
72|83
72|87
72|76
72|32
42|28
42|43
42|18
42|88
42|32
42|96
42|13
42|68
42|51
42|98
42|47
37|28
37|79
37|81
37|52
37|93
37|47
37|59
37|49
37|55
37|94
37|69
37|63
46|68
46|34
46|85
46|92
46|65
46|82
46|26
46|78
46|86
46|28
46|91
46|98
46|22
73|42
73|63
73|11
73|79
73|28
73|15
73|96
73|46
73|18
73|52
73|93
73|55
73|81
73|56
29|69
29|72
29|52
29|13
29|34
29|73
29|37
29|51
29|75
29|85
29|59
29|55
29|95
29|26
29|98
78|13
78|34
78|81
78|37
78|71
78|69
78|82
78|77
78|26
78|72
78|87
78|55
78|59
78|79
78|92
78|52
87|42
87|22
87|51
87|56
87|94
87|46
87|68
87|18
87|86
87|15
87|91
87|49
87|93
87|32
87|96
87|29
87|88
94|46
94|42
94|91
94|49
94|98
94|76
94|68
94|29
94|75
94|88
94|96
94|86
94|28
94|32
94|95
94|93
94|15
94|18
79|18
79|56
79|94
79|81
79|91
79|76
79|49
79|47
79|32
79|88
79|96
79|42
79|28
79|87
79|22
79|46
79|83
79|86
79|93
56|43
56|69
56|75
56|98
56|91
56|51
56|88
56|68
56|65
56|13
56|85
56|37
56|22
56|72
56|82
56|86
56|26
56|34
56|23
56|92
88|31
88|82
88|65
88|37
88|95
88|59
88|55
88|52
88|34
88|51
88|92
88|43
88|13
88|75
88|85
88|78
88|69
88|72
88|26
88|71
88|23
91|78
91|98
91|82
91|77
91|34
91|43
91|13
91|92
91|23
91|85
91|65
91|26
91|69
91|51
91|88
91|52
91|37
91|72
91|55
91|73
91|95
91|75
86|59
86|73
86|69
86|72
86|51
86|75
86|29
86|34
86|91
86|82
86|37
86|95
86|85
86|65
86|78
86|43
86|98
86|52
86|26
86|23
86|13
86|88
86|92
31|83
31|29
31|22
31|18
31|15
31|81
31|11
31|46
31|28
31|86
31|32
31|49
31|96
31|42
31|63
31|87
31|93
31|47
31|79
31|56
31|68
31|91
31|76
31|94
96|92
96|78
96|98
96|75
96|28
96|95
96|15
96|77
96|82
96|43
96|29
96|46
96|22
96|91
96|68
96|88
96|11
96|86
96|26
96|85
96|56
96|51
96|13
96|65
22|34
22|29
22|69
22|88
22|75
22|77
22|86
22|59
22|65
22|51
22|13
22|95
22|26
22|82
22|85
22|23
22|72
22|37
22|91
22|73
22|78
22|98
22|43
22|92
55|18
55|86
55|22
55|68
55|32
55|96
55|93
55|31
55|47
55|76
55|28
55|94
55|42
55|15
55|56
55|87
55|83
55|79
55|11
55|81
55|63
55|71
55|49
55|46
18|88
18|68
18|15
18|29
18|77
18|92
18|56
18|51
18|78
18|96
18|11
18|82
18|43
18|46
18|22
18|75
18|13
18|91
18|26
18|85
18|28
18|98
18|86
18|95
77|72
77|59
77|81
77|76
77|26
77|23
77|47
77|31
77|52
77|93
77|79
77|63
77|87
77|71
77|69
77|42
77|94
77|83
77|65
77|55
77|34
77|49
77|73
77|37
71|31
71|11
71|68
71|28
71|63
71|22
71|32
71|79
71|47
71|93
71|49
71|86
71|56
71|46
71|15
71|81
71|87
71|42
71|29
71|83
71|94
71|18
71|96
71|76
81|51
81|56
81|28
81|76
81|93
81|15
81|22
81|47
81|96
81|88
81|86
81|75
81|46
81|87
81|68
81|98
81|18
81|91
81|94
81|32
81|29
81|11
81|49
81|42
51|13
51|69
51|26
51|23
51|59
51|71
51|52
51|55
51|63
51|34
51|65
51|98
51|78
51|73
51|77
51|37
51|85
51|79
51|82
51|92
51|31
51|43
51|95
51|72
98|95
98|37
98|82
98|83
98|59
98|34
98|78
98|92
98|65
98|52
98|79
98|26
98|31
98|69
98|72
98|55
98|77
98|63
98|71
98|73
98|85
98|43
98|13
98|23
59|93
59|79
59|52
59|11
59|94
59|96
59|18
59|31
59|71
59|32
59|55
59|83
59|56
59|49
59|76
59|42
59|15
59|28
59|81
59|46
59|87
59|68
59|63
59|47
43|31
43|63
43|72
43|85
43|69
43|59
43|78
43|55
43|37
43|79
43|73
43|81
43|71
43|26
43|34
43|13
43|82
43|23
43|65
43|77
43|92
43|87
43|52
43|83
63|56
63|94
63|81
63|15
63|91
63|22
63|79
63|88
63|46
63|49
63|11
63|87
63|47
63|93
63|68
63|86
63|29
63|28
63|83
63|42
63|32
63|76
63|18
63|96
95|71
95|63
95|81
95|23
95|34
95|31
95|78
95|72
95|92
95|65
95|37
95|85
95|26
95|52
95|13
95|69
95|79
95|59
95|73
95|82
95|55
95|43
95|83
95|77
52|18
52|11
52|28
52|46
52|42
52|68
52|79
52|22
52|56
52|31
52|93
52|83
52|15
52|49
52|96
52|87
52|94
52|47
52|76
52|63
52|55
52|81
52|32
52|71
93|22
93|75
93|78
93|32
93|98
93|18
93|96
93|85
93|82
93|51
93|15
93|11
93|28
93|49
93|29
93|68
93|88
93|86
93|95
93|56
93|13
93|46
93|91
93|43
85|52
85|87
85|42
85|92
85|81
85|23
85|55
85|59
85|71
85|63
85|26
85|79
85|77
85|73
85|72
85|83
85|34
85|65
85|37
85|82
85|31
85|76
85|94
85|69
83|42
83|94
83|49
83|46
83|81
83|93
83|91
83|11
83|56
83|96
83|47
83|76
83|75
83|87
83|86
83|32
83|18
83|29
83|22
83|15
83|88
83|51
83|28
83|68
15|26
15|29
15|75
15|23
15|22
15|51
15|65
15|88
15|85
15|98
15|77
15|86
15|92
15|68
15|11
15|82
15|95
15|13
15|34
15|56
15|78
15|43
15|91
15|28
13|82
13|77
13|85
13|23
13|26
13|94
13|83
13|76
13|65
13|59
13|52
13|92
13|63
13|79
13|55
13|72
13|73
13|69
13|34
13|87
13|81
13|71
13|37
13|31
23|37
23|55
23|42
23|49
23|83
23|96
23|72
23|94
23|93
23|46
23|81
23|52
23|47
23|76
23|69
23|31
23|73
23|79
23|18
23|63
23|59
23|87
23|32
23|71
65|71
65|55
65|94
65|73
65|83
65|34
65|31
65|49
65|81
65|93
65|87
65|42
65|59
65|18
65|23
65|63
65|69
65|47
65|37
65|52
65|72
65|76
65|79
65|32
32|29
32|78
32|51
32|88
32|98
32|11
32|13
32|85
32|95
32|22
32|43
32|91
32|46
32|86
32|92
32|56
32|15
32|75
32|77
32|82
32|96
32|28
32|18
32|68
11|92
11|75
11|34
11|23
11|26
11|88
11|85
11|56
11|91
11|22
11|51
11|78
11|77
11|72
11|65
11|29
11|86
11|82
11|68
11|98
11|43
11|95
11|13
11|37
47|98
47|56
47|29
47|88
47|15
47|68
47|78
47|28
47|96
47|32
47|13
47|11
47|46
47|91
47|43
47|85
47|95
47|22
47|51
47|49
47|18
47|86
47|93
47|75
26|55
26|79
26|63
26|37
26|94
26|81
26|83
26|65
26|73
26|87
26|69
26|47
26|59
26|34
26|52
26|32
26|71
26|49
26|76
26|23
26|72
26|93
26|31
26|42
76|11
76|95
76|49
76|78
76|68
76|96
76|42
76|43
76|88
76|47
76|28
76|29
76|93
76|91
76|15
76|51
76|18
76|46
76|56
76|32
76|22
76|98
76|75
34|71
34|94
34|52
34|37
34|49
34|63
34|83
34|81
34|87
34|96
34|18
34|32
34|72
34|23
34|69
34|79
34|93
34|47
34|73
34|31
34|76
34|55
82|87
82|37
82|76
82|26
82|31
82|63
82|55
82|94
82|83
82|42
82|92
82|73
82|69
82|81
82|65
82|77
82|47
82|72
82|23
82|59
82|79
69|49
69|59
69|93
69|11
69|87
69|18
69|71
69|55
69|32
69|46
69|31
69|96
69|81
69|47
69|42
69|73
69|28
69|94
69|63
69|52
75|31
75|85
75|82
75|73
75|13
75|98
75|51
75|55
75|65
75|23
75|59
75|72
75|52
75|78
75|69
75|63
75|95
75|71
75|34
92|26
92|47
92|77
92|69
92|37
92|34
92|59
92|72
92|79
92|63
92|52
92|65
92|76
92|23
92|93
92|81
92|94
92|83
68|13
68|85
68|43
68|26
68|92
68|72
68|37
68|75
68|73
68|95
68|34
68|98
68|23
68|29
68|86
68|77
68|65
28|34
28|85
28|86
28|68
28|13
28|88
28|22
28|23
28|95
28|92
28|98
28|82
28|75
28|43
28|77
28|72
49|91
49|15
49|29
49|96
49|92
49|85
49|13
49|95
49|18
49|28
49|22
49|88
49|51
49|78
49|98
72|96
72|71
72|63
72|55
72|47
72|52
72|94
72|15
72|81
72|18
72|69
72|59
72|46
72|79
42|95
42|46
42|75
42|49
42|11
42|78
42|22
42|93
42|29
42|56
42|15
42|86
42|91
37|15
37|87
37|46
37|32
37|73
37|18
37|42
37|83
37|76
37|31
37|96
37|71
46|29
46|43
46|88
46|11
46|13
46|75
46|51
46|95
46|15
46|77
46|56
73|71
73|47
73|31
73|59
73|94
73|32
73|76
73|87
73|83
73|49
29|78
29|77
29|43
29|91
29|88
29|65
29|82
29|92
29|23
78|73
78|63
78|94
78|31
78|23
78|85
78|65
78|83
87|98
87|11
87|95
87|76
87|28
87|47
87|75
94|47
94|51
94|11
94|22
94|43
94|56
79|75
79|29
79|11
79|68
79|15
56|78
56|29
56|77
56|95
88|77
88|98
88|73
91|71
91|59
86|77`, `46,91,56,28,43,75,86,32,13,85,95,68,22,15,11
34,23,69,77,81,83,65,47,76,94,55,37,93,52,63,73,42,59,31
83,87,86,91,11,56,49,15,75
81,76,32,18,96,28,11,68,22,91,51
86,29,75,51,95,43,78,13,92,65,34,23,59
22,29,88,51,95,78,13,82,92,77,26,65,34,72,73
15,22,75,11,28,13,68,92,56,34,29,65,43
71,56,94,68,81,96,32,11,52,76,18,42,83,15,47,46,31,28,63,55,79,87,49
63,92,78,82,72,81,26,23,13,43,71,77,52
91,13,34,98,73,82,95,72,37,69,43,65,86,75,59,77,78,85,92,51,88
49,28,29,76,22,93,31,42,83,86,81
78,85,92,72,69,59,52,71,63,79,87
76,96,47,56,79,63,52,42,31,11,55
63,69,79,83,13
87,23,18,83,76,37,71,93,72,49,73,94,79,81,59,96,52
51,26,34,72,69,71,63
86,29,88,43,68,26,75,15,51,92,98,91,28,82,65,13,78
75,87,93,28,42,47,83,49,46,11,81,96,18,68,22,86,91,56,32,15,94
88,75,98,95,78,26,65,23,37,69,55
55,73,18,63,94,87,47,32,46,69,42,28,93,76,96,81,31,49,71,15,79
26,69,95,92,91,13,43,23,75
11,98,46,78,75,29,51,92,85,28,91,15,86,96,82,26,77
91,13,77,34,51
96,46,15,28,11,56,68,22,86,29,91,88,75,51,98,95,43,78,85,82,92
91,11,28,18,76,93,46,29,56,83,15,22,79,68,96,49,86,87,42
11,56,22,86,29,91,88,75,51,98,95,43,78,92,77,26,65,34,72
76,42,47,93,49,32,46,15,28,11,56,22,29,88,75,51,98,95,43
96,86,75,11,49,15,18,28,78,56,46,22,93,98,91,42,51,43,88,29,95
29,98,51,91,34,59,82,73,77,13,52,78,37,69,72,26,65,43,85
88,75,95,78,13,85,77,65,59,52,71
68,88,29,18,87,32,76,81,83,94,96,46,75
15,32,13,96,47,29,78
37,63,83,71,95,92,72,77,52,43,65
85,82,92,77,26,65,34,23,37,69,73,59,52,71,31,63,79,81,87,94,76
79,83,87,94,47,11,56,86,29,91,88
65,15,77,98,82,11,46,68,43
37,92,95,68,77,51,22,86,91,82,85,13,65,23,56,88,98
31,77,76,59,81,47,63,71,37,92,94
65,98,34,26,29,82,52,37,69
76,93,49,96,46,28,51
75,42,94,96,68,46,32,98,47,95,88
95,43,13,85,82,92,77,26,65,23,72,59,52,55,71,31,63,79,83
65,69,73,71,93
46,11,68,29,98,95,78,85,82,26,65
78,18,96,88,91,11,29,28,13,92,98,46,68,22,56,32,43,86,85,15,82,95,75
82,92,26,65,34,23,72,37,73,59,55,71,63,79,81,87,94
92,11,15,34,77,98,95
43,13,26,78,11,29,51,91,96,15,82,56,46,68,28,77,75,86,92
93,81,83,49,46,52,56,71,68
51,15,49,95,88,28,29,43,96,98,32,11,68,93,46,22,42,56,47,76,18,75,86
88,75,51,98,43,78,85,82,92,77,26,65,34,23,72,37,59,52,71
86,71,56,22,42,94,15
96,93,76,91,18,22,42,56,43
85,82,92,77,26,65,34,23,72,69,73,59,52,55,71,31,63,79,83,81,87,94,76
81,47,49,32,46,15,28,11,68,86,29,91,51
63,79,83,81,87,94,76,47,49,32,18,96,46,28,11,56,22,29,91
87,42,79,88,46,83,22,56,49,76,96,47,32
37,52,31,94,42,93,49,32,96,46,15
11,68,22,86,91,88,51,98,95,13,85,82,92,77,65,34,72
56,15,88,47,22,91,95,11,29,96,42,28,86,32,68,51,93,98,76,94,46,75,49
82,56,68,91,51,96,78,86,75,85,15,18,88,28,49
18,96,55,83,59,79,94,73,46,63,47,31,15,76,71,11,28,32,87
47,93,49,96,15,28,56,22,29,91,43,78,13
13,85,23,69,73,52,55,31,63,83,87
49,32,18,56,68,86,91,88,75,51,78,85,82
79,81,87,94,93,49,32,18,46,15,28,11,56,68,29,91,88
83,37,34,92,13,23,78,31,79,82,77
52,83,28,81,63,55,76,15,42,59,71,11,46,87,79,93,73,94,47,18,49
73,23,51,95,29,86,26,72,78,75,77,91,13,85,82,92,69,98,65,88,59
32,18,96,46,11,56,68,22,29,91,75,51,98,95,43,13,92
69,73,93,18,47,55,83,94,71,63,37,76,52,34,49,72,81,79,87,32,31
18,68,88,95,13,85,77
92,82,95,85,77,18,46,86,15
15,11,56,68,22,86,29,88,75,51,98,95,43,78,13,85,92,77,26,65,34
22,56,98,85,28,29,91,18,92,13,95,77,68,88,43
31,85,26,52,71,73,77,59,95,34,98,55,79
92,72,82,68,51,75,86,11,56
51,47,91,56,28,11,98
55,81,76,15,11,32,49,71,73,47,59,52,46,31,63,79,28,96,94
47,49,96,28,75,95,13
55,83,81,76,93,96,28,68,22
11,56,68,22,91,75,51,98,78,13,82,77,26,65,34,23,72
71,79,11,83,15,18,31,86,47,22,96,87,81,94,93,68,49,63,56
79,59,37,71,49,31,76,47,23,55,63,83,87,73,18,93,32,69,96
37,71,72,26,87,55,92,85,65,31,13,79,69,73,81,59,94
94,68,71,49,52,63,55,83,32,87,93,56,76,47,15,11,81,96,79,28,42,46,18
56,47,31,81,22,96,18,29,79
18,28,68,22,29,88,51
51,95,85,92,26,65,34,23,72,73,59,55,71,31,63
26,87,34,65,23,47,72,31,83,77,92
72,59,87,55,52,34,71,37,93,49,31,79,42
28,71,55,22,76,46,93,15,18,79,32,63,81,56,68
29,91,88,75,51,98,95,43,78,13,82,77,65,34,23,72,37,69,73,59,52
52,59,96,32,42,83,15,55,11,46,63,81,49,18,93,76,31,87,71
65,86,72,34,11,77,56,43,95,29,75,51,13
42,32,76,49,29,46,88,91,93,96,81
65,77,63,71,85,95,83,69,73
42,47,93,32,18,96,15,28,11,56,68,22,86,29,91,88,75,51,98,95,43
96,46,11,56,68,22,91,78,13,82,26
92,26,78,82,69,79,52,23,77,87,37,63,65,72,81,73,34,83,13
34,23,72,37,69,52,55,71,31,63,79,83,81,87,94,76,42,93,49,32,18
96,63,91,28,87,22,56,42,15,86,76
88,98,95,85,82,77,26,65,34,72,69,73,59,52,55
83,18,81,68,46,42,47,71,63,28,94,11,56,55,22,79,87,31,15,76,93,32,96
37,42,73,87,32
73,59,86,29,88,37,85
81,32,94,63,28,47,42,83,96,79,18,55,59,46,93,87,76,11,15,31,49
63,79,83,81,87,94,76,42,93,49,32,18,96,46,15,28,11,56,68,22,86,29,91
65,34,73,59,52,94,93
81,76,47,49,32,18,28
52,55,71,31,63,79,83,81,18,96,46,15,11,56,68
59,63,76,23,94,49,34,52,87,18,73,83,47,31,79
59,37,87,42,31,81,83,15,94,18,52,46,32
77,34,23,72,37,69,59,52,55,71,63,87,94,76,47
88,18,87,91,94,76,75,46,51,22,15,32,11,49,47
76,55,22,56,42,32,47
94,55,26,23,63,85,77,52,79,59,69,92,65,81,13,37,83,73,71
47,93,49,18,96,28,68,86,91,88,75,51,98,95,43,78,13
59,55,23,83,31,82,37,13,65,63,85,52,71,78,79,87,73,92,77,81,69
96,46,15,28,11,56,68,22,86,29,91,75,51,98,95,43,78,13,85,82,92,77,26
49,18,96,46,15,28,86,29,91,75,51,98,78,13,82
59,52,83,81,87,18,28
55,47,81,94,79,92,72,23,65,34,69,87,59,77,26,73,31,76,37,42,52
72,85,92,37,51,43,86,95,29
87,94,47,93,49,46,15,28,11,56,22,86,29,91,88,51,98
88,75,51,98,95,43,78,13,85,82,92,77,26,23,72,37,69,73,52,55,71
76,28,11,86,98,95,43
11,29,77,34,15,75,95,88,51,13,92,86,78,56,85,98,91,65,26,43,28
29,91,51,98,95,78,85,82,77,26,23,72,37,69,73,59,52
32,86,11,95,98,85,18,28,96,51,78,15,92
88,43,78,26,65,34,23,72,73,59,71
73,92,43,98,59,65,75,37,88,95,78,69,85
86,42,96,94,15
92,73,55,81,87,94,47
94,72,26,73,87,47,63,42,59,49,55,81,76
13,85,82,92,77,34,23,72,37,69,73,59,55,71,79,83,81,87,94
55,13,77,71,52,65,95,63,43,51,85,31,72
79,47,96,81,94,42,52,76,31,73,63,71,18,93,46,28,55
59,52,31,83,81,94,76,42,47,93,49,32,18,96,15,28,11
96,95,86,75,15,43,76,56,42
96,83,63,46,47,71,28,15,56,22,86
47,93,49,32,18,96,46,15,28,11,68,22,86,29,91,88,75,51,98,95,43,78,13
15,88,81,56,68,46,28,47,22,51,49,91,42
31,63,81,87,47,68,22
22,86,91,88,75,51,98,95,43,78,13,85,82,92,77,26,65,34,23,72,37,69,73
51,96,75,46,93,56,22,68,18,42,94,49,91,47,81,29,15,11,76,86,88
94,42,47,93,18,96,46,15,28,11,56,22,29,91,88,51,95
96,43,51,56,15,11,42,29,32,22,68,95,18,28,76,75,91,88,98,93,49,86,46
11,86,68,92,22,65,46
56,22,91,75,43,13,85,82,92,77,65,23,72
81,79,69,59,76,83,94,23,42,26,55
37,26,92,79,31,63,76,69,82,72,81,59,77,73,42,65,23,71,83,34,55,94,52
69,59,71,63,81,42,49,32,96,46,28
77,92,23,79,72,83,43,34,37,26,69,31,55,59,73,81,78,63,13
32,72,47,46,42,55,69,73,93,83,76,37,63,52,96,31,79,59,18,81,49,94,71
42,94,79,73,47,81,32
87,42,93,32,96,46,28,11,86,91,88,75,98
29,56,76,88,15,22,46,81,86,42,11,28,93,87,91,51,32,75,49
32,28,22,91,95,85,92
37,96,83,42,47,71,94,72,87,32,63,31,46
83,18,87,76,93,47,79,81,88
77,65,23,72,37,59,52,55,71,31,63,79,83,81,87,94,76,42,93
65,86,23,43,59,37,98,26,34,91,72,82,92
88,78,85,34,69,52,71
69,73,59,52,71,31,63,79,83,81,87,94,76,42,47,93,49,32,96,15,28
28,11,22,86,29,91,75,51,78,85,82,92,77,65,23
82,65,13,26,23,29,72,95,98,75,92,77,86,69,68
91,51,95,82,77,73,55
82,92,77,26,73,52,55,71,83,94,42
55,31,63,79,83,32,96,28,56,68,22
42,49,32,96,15,28,11,56,68,22,86,51,78
63,23,73,81,83,69,71,65,82,77,55,42,31,94,76,87,72,34,79,26,59
98,95,78,92,77,26,34,23,69,73,59,52,55,63,79
15,79,63,83,69,71,94,37,18
15,28,11,22,86,29,91,88,75,51,98,95,43,78,85,82,92,77,26,65,34
15,47,42,79,94,29,68,46,18
75,51,98,95,43,13,82,92,77,26,65,34,72,37,59,52,55,71,31
32,11,56,91,88,75,51,98,95,78,92
75,51,95,26,37
28,49,11,93,32,29,76,18,75,51,56,88,15,98,86,47,46,95,42,91,94,22,96
96,46,15,11,22,98,43,13,92,77,26
79,81,13,71,34,92,63,69,73,43,78,82,59,72,55
11,81,22,15,68,42,51,29,28,94,47,96,32,87,56,49,93,75,76,46,86,88,18
68,22,29,91,98,43,78,85,82,92,77,65,34,23,72,37,69
51,29,86,91,93,85,46,18,88,95,13
93,81,26,69,76,55,77
65,43,82,52,73,77,78,13,92,59,75,34,98
47,18,96,46,15,28,11,56,22,86,29,91,51,98,95,43,13
94,77,37,76,31,55,26,65,87,73,93,72,81
26,65,34,23,72,37,69,73,55,31,63,83,87,76,93
96,15,95,56,88,98,43,28,91,77,82,86,75
46,47,81,63,93,37,94,73,72,87,31
52,87,49,31,93,63,73
46,49,18,28,31,15,93,11,87
93,51,18,11,42,88,56,49,95,78,86,47,98,32,28
59,94,79,31,76,72,77,37,42,87,83,26,82,34,23,69,63
28,77,43,51,88,92,22,86,98`]
  }
  
  run();