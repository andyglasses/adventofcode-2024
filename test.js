// Define an array of arrays
let arr = [
   'b',
    'c',
    'a'
];

var sets = (function(input, size) {
    var results = [], result, mask, i, total = Math.pow(2, input.length);
    for (mask = size; mask < total; mask++) {
        result = [];
        i = input.length - 1;

        do {
            if ((mask & (1 << i)) !== 0) {
                result.push(input[i]);
            }
        } while (i--);

        if (result.length >= size) {
            results.push(result);
        }
    }

    return results; 
});
console.log(sets(arr, 1).map(a => a.join('')));

