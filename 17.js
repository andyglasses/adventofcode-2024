function run(){
  let input = getInput().trim().split('\n').map(x => x.trim());
  let instructions = input[4].split(':').map(x => x.trim())[1].split(',').map(x => parseInt(x.trim()));
  const registers = {
    a: parseInt(input[0].split(':').map(x => x.trim())[1]),
    b: parseInt(input[1].split(':').map(x => x.trim())[1]),
    c: parseInt(input[2].split(':').map(x => x.trim())[1]),
    pointer: 0,
    skipIncrease: false,
    output: []
  };

  while(registers.pointer >= 0 && registers.pointer < (instructions.length - 1)){
    var instruction = instructions[registers.pointer];
    var op = instructions[registers.pointer + 1];
    switch(instruction){
      case 0: adv(op, registers); break;
      case 1: bxl(op, registers); break;
      case 2: bst(op, registers); break;
      case 3: jnz(op, registers); break;
      case 4: bxc(op, registers); break;
      case 5: out(op, registers); break;
      case 6: bdv(op, registers); break;
      case 7: cdv(op, registers); break;
      default:
        console.log('Error', 'unknown instruction', instruction);
        break;
    }
    if(registers.skipIncrease){
      registers.skipIncrease = false;
    } else {
      registers.pointer += 2;
    }
  }

  console.log('Output',registers.output.join(','));
  console.log('A', registers.a)
  console.log('B', registers.b)
  console.log('C', registers.c)

}

function getComboOperand(o, registers){
  switch(o){
    case 0: return 0;
    case 1: return 1;
    case 2: return 2;
    case 3: return 3;
    case 4: return registers.a;
    case 5: return registers.b;
    case 6: return registers.c;
    default:
      console.log('Error', "Tried to get invalid combo", o);
      return 0;
  }
}

function adv(o, registers){
  let res = registers.a / (Math.pow(2, getComboOperand(o, registers)));
  if(res < 0){
    registers.a = - (Math.floor(-res))
  } else {
    registers.a = Math.floor(res);
  }
}

function bxl(o, registers){
  let result = registers.b ^ o;
  registers.b = result;
}

function bst(o,registers){
  let result = getComboOperand(o, registers) % 8;
  registers.b = result;
}

function jnz(o, registers){
  if(registers.a == 0){
    return;
  }
  registers.pointer = o;
  registers.skipIncrease = true;
}

function bxc(o, registers){
  let result = registers.b ^ registers.c;
  registers.b = result;
}

function out(o, registers){
  let result = getComboOperand(o, registers) % 8;
  registers.output.push(result);
}

function bdv(o, registers){
  let res = registers.a / (Math.pow(2, getComboOperand(o, registers)));
  if(res < 0){
    registers.b = - (Math.floor(-res))
  } else {
    registers.b = Math.floor(res);
  }
}

function cdv(o, registers){
  let res = registers.a / (Math.pow(2, getComboOperand(o, registers)));
  if(res < 0){
    registers.c = - (Math.floor(-res))
  } else {
    registers.c = Math.floor(res);
  }
}


function getInput(){
  return `Register A: 63687530
Register B: 0
Register C: 0

Program: 2,4,1,3,7,5,0,3,1,5,4,1,5,5,3,0`;
}

run();