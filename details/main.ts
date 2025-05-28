// intersection type

type TPopularity = {
    rate: number;
};

interface IReview {
    review: number;
}

type Filter = TPopularity & IReview;

let filter: Filter = {
    rate: 2.4,
    review: 3,
};

// IMPORTANT to seperate IProduct and ISalesProduct is essential
// especially when working with .map() in React environment
// react components can expect exactly what they need

interface IProduct {
    img: string;
    name: string;
    description: string;
}

interface ISalesProduct extends IProduct {
    discountPercent: number;
}

type TapiResponse = {
    products: IProduct[];
    salesProducts: ISalesProduct[];
};

const apiResponse: TapiResponse = {
    products: [
        {img: "pants.png", name: "flared tousers", description: "2025 New Arrival"},
        {img: "shirts.png", name: "oversized shirts", description: "2025 New Arrival"}
    ],
    salesProducts: [
        {img: "jacket.png", name: "denim jacket", description: "2024", discountPercent: 20},
        {img: "cap.png", name: "baseball cap", description: "2024", discountPercent: 20}
    ],
};



// union type examples

type Track = {
    title: string;
    releaseDate: string;
};

type Artist = {
    name: string;
    releaseDate: string;
};

type SearchResult = Track | Artist;

interface SearchRespone {
    searchResult: Track | Artist;
}

let results : SearchResult[] = [
    {title: "hello", releaseDate: "2024"},
    {name: "hello", releaseDate: "2025"}
];

// when using union type in a function type needs Type Narrowing using following methods:

//function getName(result: Track|Artist){
//    return result.name;
//}

// 1. typeof: ONLY FOR Primitive types (number, string, boolean, undefined)

type SearchType = number | string;

function searchByKeyword(keyword: SearchType): string{
    // if type of keyword is number, change to string
    if (typeof(keyword) === "number"){
        return keyword.toString();
    }
    return keyword;
}

console.log(searchByKeyword(2), typeof searchByKeyword(2));

// 2. instanceof

type Period = {
    start: string;
    end: string;
};

type SearchType2 = Period | Date;

function getDate(day:SearchType2): Date {
    if (day instanceof Date) return day;
    return new Date(day.start);
}

getDate({start: "2024-01-01", end: "2024-01-05"});

// 3. in

type TTrack = {
    title: string;
    releaseDate: string;
};

type TArtist = {
    name: string;
    releaseDate: string;
};

function getName(result: TTrack| TArtist) {
    if ("title" in result) return result.title;
    return result.name;
}

// 4. is

function isTrack(result: TTrack | TArtist): result is TTrack{
    return (result as Track).title !== undefined;
}

function isArtist(result: TTrack | TArtist): result is TArtist{
    return (result as Artist).name !== undefined;
}

function printInfo(result: TTrack | TArtist){
    if (isTrack(result)){
        console.log(result.title);
    } else if (isArtist(result)){
        console.log(result.name);
    }
}

// type literal: to make sure only one type is being accepted

type TTrack1 = {
    type: "track";
    title: string;
    releaseDate: string;
};

type TArtist1 = {
    type: "artist";
    name: string;
    releaseDate: string;
};

const result: TTrack1| TArtist1 = {
    type: "track",
    title: "hello",
    releaseDate: "2024",
};

// exhaustiveness checking: pattern used to ensure that all possible values in a union are handled

interface Radio {
    type: "radio"
    name: "string";
}

type SearchResult2 = TTrack1 | TArtist1 | Radio;

function getTypeName (result: SearchResult2) {
    if (result.type === "track") return "track";
    else if (result.type === "artist") return "artist";
    else if (result.type === "radio") return "radio";
    else {
        exhausiveCheck(result);
        return "result"
    };
}

function exhausiveCheck(param: never): never{
    throw new Error ('Error');
}
