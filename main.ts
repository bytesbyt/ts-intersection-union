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

// intersection type exercises
// exercise 1

// define Product type
type TProduct2 = {
    id: number;
    name: string;
    price: number;
};

// define Discount type
type TDiscount = {
    discountPercentage: number;
};

// define a function to return the discount price
function calculateDiscountedPrice(item: TProduct2 & TDiscount): number {
    return item.price * (1- item.discountPercentage / 100);
}
  
// test code
const discountedProduct = {
    id: 101,
    name: "Laptop",
    price: 1000,
    discountPercentage: 20,
};

console.log(calculateDiscountedPrice(discountedProduct)); // 800


// exercise 2

// define ContactInfo type
type ContactInfo = {
    phone: string;
    address: string;
};

// define OrderInfo type
type OrderInfo = {
    orderId: number;
    items: string[];
};

function printOrderSummary(order: ContactInfo & OrderInfo): string {
    return `Order ${orderDetails.orderId} (Phone: ${orderDetails.phone})`;
  }
  
// test code
const orderDetails = {
    phone: "123-456-7890",
    address: "123 Main St",
    orderId: 2023,
    items: ["Laptop", "Mouse"],
};

console.log(printOrderSummary(orderDetails)); // "Order 2023 (Phone: 123-456-7890)"
  
// exercise 3

// define Profile type
type TProfile = {
    id: number;
    name: string;
    email: string;
};

// define Activity tpye
type TActivity = {
    lastLogin: Date;
    actions: string[];
};

// define a function to merge user data
function mergeUserData(
    profile: TProfile,
    activity: TActivity
): TProfile & TActivity {
    return {...profile, ...activity};  
}
  
// define a function return user summary
function getUserSummary(user: TProfile & TActivity): string {
    return `사용자 ${mergedUser.id} - ${mergedUser.name} (${mergedUser.email}) - 마지막 로그인: ${mergedUser.lastLogin}`
}
  
// test code
const profile = { id: 1, name: "Alice", email: "alice@example.com" };
const activity = {
    lastLogin: new Date("2024-01-01T10:00:00Z"),
    actions: ["login", "viewed dashboard", "logout"],
};

const mergedUser = mergeUserData(profile, activity);

// logs user summary
console.log(getUserSummary(mergedUser));
// 출력 예시: "사용자 1 - Alice (alice@example.com) - 마지막 로그인: 2024-01-01T10:00:00Z"




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

// Exercise: union type

// Exercise 1

// 매개변수, 리턴타입 정의필요 

type InputType = number [] | string[] | {message: string};

function processInput(input: InputType): number | string {
    if (Array.isArray(input)) {
        if (typeof input[0] === "number") {
            return (input as number[]).reduce((sum, num) => sum + num, 0);
        } else if (typeof input[0] === "string"){
            return input.join("");
        } else {
            throw new Error ("Error: invalid array elements")
        }
    } else if ("message" in input && typeof input.message === "string") {
        return input.message.toUpperCase();
    } else {
        throw new Error ("Error: invalid input");
    }
  }
  
  // 테스트 코드
  console.log(processInput([1, 2, 3])); // 6
  console.log(processInput(["hello", "world"])); // "helloworld"
  console.log(processInput({ message: "TypeScript" })); // "TYPESCRIPT"
  //console.log(processInput(42)); // 에러 발생
  

// Exercise 2

// 클래스 정의
class Car {
    public brand: string;
    constructor(brand: string) {
        this.brand = brand
    }
}

class Bike {
    constructor(public type: string) {}
}

function processVehicle(vehicle: Car | Bike): string {
    if (vehicle instanceof Car) {
        return vehicle.brand.toUpperCase();
    } else if (vehicle instanceof Bike) {
        return `Bike: ${vehicle.type}`;
    } else {
        throw new Error ("Invalid Vehicle type.")
    }
  }
  
  // 테스트 코드
  const myCar = new Car("Tesla");
  const myBike = new Bike("Mountain");
  
  console.log(processVehicle(myCar)); // "TESLA"
  console.log(processVehicle(myBike)); // "Bike: Mountain"
  // console.log(processVehicle("unknown")); // 에러 발생
  
// Exercise 3

type Admin = { type: "admin"; permissions: string[] };
type User = { type: "user"; email: string };
type Role = Admin | User;

function processUser(user: Role): string {
    if ("permissions" in user) {
        return user.permissions.join(",")
    } else if ("email" in user) {
        return user.email
    } else {
        throw new Error ("Invalid input")
    }
}

// 테스트 코드
console.log(processUser({ type: "admin", permissions: ["read", "write"] })); // "read,write"
console.log(processUser({ type: "user", email: "user@example.com" })); // "user@example.com"
//console.log(processUser({ type: "guest" })); // 에러 발생


// Exercise 4

type Rectangle = { width: number; height: number };
type Circle = { radius: number };

// 사용자 정의 타입 가드
function isRectangle(shape: unknown): shape is Rectangle {
  return (
    (shape as Rectangle).width !== undefined && 
    (shape as Rectangle).height !== undefined
  );
}

function calculateArea(shape: Rectangle | Circle): number {
  if (isRectangle(shape)) {
    return shape.width * shape.height;
  } else {
    return Math.PI * shape.radius ** 2;
  }
}

// 테스트 코드
console.log(calculateArea({ width: 10, height: 5 })); // 50
console.log(calculateArea({ radius: 7 })); // 153.93804002589985 (대략 π * 7²)


// Exercise 5

type Square = {type: "square"; side: number};
type Circle2 = {type: "circle"; radius: number};

type Shape = Square | Circle2;

function exhausiveCheck2(param: never): never{
    throw new Error ('Not sqaure or cicle shape type');
}

// 넓이를 계산하는 함수
function calculateArea2(shape: Shape): number {
  switch (shape.type) {
    case "square":
        return shape.side ** 2;
    case "circle":
        return Math.PI * shape.radius ** 2;
    default:
        return exhausiveCheck2(shape);
  }
}

// 테스트 코드
console.log(calculateArea2({ type: "square", side: 5 })); // 기대 출력: 25
console.log(calculateArea2({ type: "circle", radius: 7 })); // 기대 출력: 153.93804002589985
