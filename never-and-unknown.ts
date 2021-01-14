// * TYPE : unknown
// It specifies that we do not know what type the variable is of but once we assign it a type, it sticks until we assign the next type
// Eg: We say =>
let unknownVal : unknown
let anyVal : any

unknownVal = 'Max'
anyVal = 'Max'
// Both will have type string

console.log(typeof unknownVal, typeof anyVal);

// When we try to however, assign some fixed type var to one of these we encounter an error for type-checking with unknownVal(type = unknown) but not with anyVal(type = any)

let userInput : string;
// userInput = anyVal;
// userInput = unknownVal;


// Basically, unknown does perform some sort of type checking still with the logic that this type might change later causing some type error.
// any, on the other hand, is the most flexible TS parameter and eliminate all type checking.
//? Therefore to use unknown to still assign fixed type variables' val to unknown type variables, use a type check condition

if(typeof unknownVal === "string"){
    userInput = unknownVal;
}

//* TYPE : never
// Used when some function has something in itself that basically just trashes the code. 
// Eg: functions that throw alerts
// Even if we try to collect what these functions return in a value, unlike other cases, we do not even get undefined here.

const generateAlert = (s:string, n:number) => {
    throw {message:s, errorCode:n }
}

generateAlert('I am a function which throws alerts', 300)

let alertResult = generateAlert(`You can try, but I don't return anything !`, 500)
console.log(alertResult);