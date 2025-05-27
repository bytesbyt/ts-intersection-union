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