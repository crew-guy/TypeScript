// TYPE : number, string, boolean
const result= "The result is";
const n1= 124
const n2 = 123
const showResult = true

const displayResult = (number1:number, number2:number, canShowResult:boolean,someResult:string)=>{
    const sum = number1 + number2;
    let resultString:string;
    if(canShowResult){
        resultString = `${someResult} ${sum}`
    }else{
        resultString = `Sorry, you are not allowed to see this result`
    }

    return(resultString)
}

const answer:string = displayResult(n1, n2, showResult, result)

console.log(answer)

// TYPE : object
// Ways of declaring objects => BEST to WORST

// M1 - Let TS deduce structure of objects on its own and intellisense works in our favour
const person = {
    name:'Bob',
    job:'Builder',
    age:132
}

console.log(person.name)

// M2 - We tell TS the structure of the object by specifying key-type pairs
// Intellisense works in our favour


//Using Type Aliases implicitly
const person2 : {
    name:string;
    job:string;
    age:number;
} = {
    name:'Bruce',
    job:'Batman',
    age:43
}

// Using Type Aliases explicitly
type Supe = {
    name:string;
    job:string;
    age:number
}

const person_2: Supe = {
    name:'Clark',
    job:'Superman',
    age:32
}

console.log(person.age)

// M3 - We just tell TS that given is just a simple object and nothing specific about key-type pairs of the key-value pairs
// Intellisense does not work

const person3:object={
    name:'Tony',
    job:'Mechanic',
    age:324
}


// TYPE : array, nested objects and arrays
// TS, like most cases, will just automatically detect the type array when we give an object a value that is an array 

const person4 = {
    name:'Alex',
    job:'Spy',
    hobbies:['Kayaking, Kiteboarding, Cycling, Karate'],
    villains:[
        {
            book:1,
            villain:'Herod Sayle'
        },
        {
            book:2,
            villain:'Hector Grief'
        },
    ],
    associate1:{
            name:'Mr. Smithers',
            work:'Gadget master',
            gadgets_given:[
                {
                    book:1,
                    gadget:"Nintendo with cartridges"
                },
                {
                    book:2,
                    gadget:'Snowboard'
                },
                {
                    book:3,
                    gadget:'Exploding pens'
                }
            ]
    },
}

for(const hobby of person4.hobbies){
    console.log(hobby.toUpperCase())
}

console.log(person4.villains)
console.log(person4.associate1)

// TYPE : tuple
// Helps us specifically design the size and value types in an array
//* Feature of TS only
//! The push() function is something TS will still allow you to do on a tuple without error penalty 

const person5 : {
    name:string;
    job:string;
    hobbies:string[];
    gun1 : [number,string],
    gun2 : [number, string]
} = {
    name:'Yasha Gregorovich',
    job:'Spy',
    hobbies:['Driving, Shooting, Sniping,Aiming'],
    gun1: [6, 'Revolver'],
    gun2:[1, 'Sniper']
}

console.log(person5.gun1, person5.gun2)

// TYPE : enum
// Basically, assigns numbers to fixed labels
//* Feature of TS only

enum Book {POINT_BLANC = 2, SKELETON_KEY, SCORPIA_RISING =9, NIGHTSHADE='Not released yet'}

const adventures = [
    {
        number:2,
        bookName : Book.POINT_BLANC,
    },
    {
        number:3,
        bookName : Book.SKELETON_KEY,
    },
    {
        number:9,
        bookName : Book.NIGHTSHADE,
    },
]

for(const adventure of adventures){
    console.log(adventure.bookName)
}

// TYPE : any
// Limits or eliminates checks that TS does at compiling
// Try to avoid as basically, it strips the type-checking powers of TS and provides the same function as Vanilla JS

// In the next eg, we can provide anything and later change the type to anything  
let eg1:any='Hello';
eg1 = 23;
eg1 = [12,1234,12,4,21,312,3312,312]


// In the next eg, we can provide an array of anything
const eg2:any[]  = [5, 'Linkin Park', true, {
    favoriteSong : 'Numb',
    numbers : [1,2,45,6,,76,4,[21,3,24,23]]
}]