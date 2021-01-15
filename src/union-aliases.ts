// UNION TYPES => Let a variable belong to more than 1 type

// LITERAL TYPES => Assign a specific (primary type => number, string, boolean) value or a set of values (union) that a variable can take into
// Like enum, except here, you can allow more than one custom type to be assigned to a variable  


function combine(input1:string|number, input2:string|number, resultConversion : 'as-text'|'as-num'){
    if(typeof input1 === 'number' && typeof input2 === 'number' || resultConversion == 'as-num'){
        console.log('Changing type before adding')
        return +input1 + +input2;
    }else{
        console.log('Changing type after adding')
        return input1.toString() + input2.toString();
    }
}

const result1 = combine(340, 13232, 'as-num')
const result2 = combine('340', '13232', 'as-num')
const result3 = combine('340', '13232', 'as-text')


console.log(result1);
console.log(result2);
console.log(result3);

console.log('0-------------------------------0');

// TYPE ALIASES

// Basically, instead of simply just writing long unions and other conditions on the a particular type, we define it somewhere separate, as a var and keep using the type by using this variable
// Refactoring the above code with type aliases
//! Can change the type of a LET variable midway
// eg: type User = {name :string, age:number} | string
// let u1:User = {name :'Michael', age:24}
// u1 = "Max"
//! The above mentioned conversion is allowed

type Combinable = string|number;
type ConversionDescriptor = 'as-text' | 'as-num'


function combineAgain(input1:Combinable, input2:Combinable, resultConversion : ConversionDescriptor){
    if(typeof input1 === 'number' && typeof input2 === 'number' || resultConversion == 'as-num'){
        console.log('Changing type before adding')
        return +input1 + +input2;
    }else{
        console.log('Changing type after adding')
        return input1.toString() + input2.toString();
    }
}


const result4 = combineAgain(340, 13232, 'as-num')
const result5 = combineAgain('340', '13232', 'as-num')
const result6 = combineAgain('340', '13232', 'as-text')


console.log(result4);
console.log(result5);
console.log(result6);