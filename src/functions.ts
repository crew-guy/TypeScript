const add = (n1:number, n2:number):string => {
    return (n1 + n2).toString()
}

const printResult = (text:string):void =>{
    console.log(text);
}

printResult(add(12,124))


// The 'undefined' confusion

// undefined => what you get when you try to access a property on an object that does not exist

console.log(printResult(add(12,124))); // By default, a function returns undefined when it is made to return void

// However, and this happens very rarely, if you really wanna specify a function to return "undefined" value, just do 2 things
// 1. use keyword undefined
// 2. write an empty return statement
// Eg

const iReturnUndefined = (n1:number, n2:number):undefined => {
    console.log('I return undefined');
    return;
}

// FUNCTION TYPES 
// Helps us declare what do we expect as input and output types from a function while declaring it

// Declaring that the given variable can be a function of any form. Now, if we assign a number, bool....etc to firstFunc(), TS will give error 
let firstFunc : Function;

// Declaring a variable to be a function of a very fixed form i.e. pre-specified input and output types
let secondFunc : (a:number,b: number) => string;

secondFunc = add;

console.log('Using function types')
printResult(secondFunc(8,3))


// CALLBACK FUNCTIONS
//! Even though in declaration of callback used in the main function we might specify that it returns void, we can still make the callback return something and use it
//! What this void declaration specified is that the function does not expect or gain anything from a return from the callback but yet, TS won't punish you for nevertheless going forward and using it

const addAndPrint = (n1:number, n2:number, cb :(a:number)=> void) => {
    cb(n1+n2)
    const value = cb(n1+n2);
    console.log(`This is 100x of our sum => ${value}`); 
}

addAndPrint(132,234, (result)=>{
    console.log(result);
    return(result*100)
})