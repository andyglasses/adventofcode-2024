function run(blinks){
  const input = getInput().trim().split(' ').map(function(x) { return parseInt(x.trim()); });
  let total = 0;
  let backlog = [{ done: 0, items: [...input] }];
  while(backlog.length > 0)
  {
    let current = backlog.pop()
    while(current.done < blinks){
      current.items = blink(current.items);
      current.done++;
      if(current.items.length > 10000){
        let temp = current.items.slice(0, 5000);
        let tempOther = current.items.slice(5000);
        backlog.push({ done: current.done, items: [...temp] });
        current = { done: current.done, items: [...tempOther] };
      }
    }
    total += current.items.length;
    console.log(backlog.map(b => b.done));
  }
  console.log(total);
}

function blink(input){
  let newRow = [];
  for(var i =0; i < input.length; i++){
    var val = input[i];
    if(val == 0){
      newRow.push(1);
      continue;
    } 

    var valAsString = val.toString();    
    if (valAsString.length % 2 == 0){
      const left = parseInt(valAsString.substring(0, valAsString.length / 2));
      newRow.push(left);
      const right = parseInt(valAsString.substring((valAsString.length / 2)));
      newRow.push(right);
      continue;
    }

    newRow.push(val * 2024);
  }
  return newRow;
}

function getInput(){
  //return `125 17`
  return `92 0 286041 8034 34394 795 8 2051489`;
}

run(75);