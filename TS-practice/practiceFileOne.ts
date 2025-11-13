type Worker = {
  name: string;
  age: number;
};

const workerDetails: Worker = {
  name: "sanjay",
  age: 67,
};
console.log(workerDetails.name);

interface Users {
  name: string;
  age: number;
}

interface Users {
  email: string;
  phoneNumber?: number;
}

const userDetails: Users = {
  name: "kodeeswaran",
  age: 23,
  email: "kodeeswaran@gmail.com",
  // phoneNumber:2435433434,
};

function printValue<T>(value: T): void {
  console.log(value);
}

printValue<string>("app");
printValue<number>(212);
printValue("application");
printValue(true);

function merge<T, U>(userObjOne: T, userObjTwo: U) {
  return { ...userObjOne, ...userObjTwo };
}

console.log(merge({ name: "kodeeswaran" }, { age: 25 }));

interface userDetail<T> {
  age: T;
  phoneNumber: T;
}

const userOne: userDetail<number> = { age: 23, phoneNumber: 9595595940 };
const userTwo: userDetail<string> = { age: "32", phoneNumber: "9893432959" };
console.log(userOne, userTwo);

//extends keyword to contrain the generic type - T must at least have certain properties.

function getLength<T extends { length: number }>(inputValue: T): number {
  return inputValue.length;
}

console.log("Str length", getLength("WebApp"));
console.log("Arr length", getLength([1, 2, 4, 6, 2, 43, 53]));

// Generic Constraints
function getProperty<T extends object, U extends keyof T>(
  obj: T,
  key: U
): void {
  console.log("Age", obj[key]);
}

const userthree: userDetail<number> = {
  age: 55,
  phoneNumber: 3456789456,
};

getProperty(userthree, "age");

interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
}

const userResponse: ApiResponse<{ id: number; name: string }> = {
  status: 200,
  data: {
    id: 1,
    name: "sam",
  },
  message: "data fetched successfully",
};

const productResponse: ApiResponse<{ id: number; price: number }> = {
  status: 201,
  data: {
    id: 333,
    price: 2000,
  },
  message: "Product detail fetched successfully",
};

console.log(userResponse);
console.log(productResponse);

// Generics with Type

type Pair<T, U> = {
  first: T;
  last: U;
};

const nameAge: Pair<string, number> = { first: "lohan", last: 24 };
const coordinates: Pair<number, number> = { first: 24, last: 32 };
const productNamePrice: Pair<string, number> = { first: "laptop", last: 20000 };

console.log(
  "nameAge : ",
  nameAge,
  "coordinates : ",
  coordinates,
  "productNamePrice",
  productNamePrice
);

// Generic with default

function createArray<T = string>(value: T, count: number) {
  return Array(count).fill(value);
}

console.log(createArray("Aspire Systems", 3));

// Utility types

type User = {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
};
const user: User = {
  id: 1,
  name: "kodeeswaran m",
  age: 19,
  isActive: true,
};
const partialUser: Partial<User> = {
  id: 2,
  name: "ajay",
};

const strictUser: Required<User> = {
  id: 3,
  name: "sam m",
  age: 19,
  isActive: true,
};

const readOnlyUser: Readonly<Partial<User>> = {
  id: 5,
  name: "bharath",
};

type basicUserInfo = Pick<User, "id" | "name">;
const basicUser: basicUserInfo = {
  id: 4,
  name: "vasanth",
};

type userWithoutAge = Omit<User, "age">;

const noAgeUser: userWithoutAge = {
  id: 7,
  name: "Rahul",
  isActive: true,
};

const scoreBoard: Record<string, number> = {
  virat: 100,
  dhoni: 20,
  rohit: 75,
};

type Roles = "admin" | "user" | "guest";
const accessLevel: Record<Roles, string> = {
  admin: "full access",
  user: "limited access",
  guest: "Read Only",
};

// keyof
type UserKeys = keyof User;

let key: UserKeys = "name";
let key1: UserKeys = "id";
// let key2:UserKeys="email";

const product = {
  id: 90,
  name: "hearphone",
  price: 1200,
};

type Product = typeof product;

const newProduct: Product = {
  id: 23,
  name: "hearbuds",
  price: 2200,
};

console.log("new products :", newProduct);

type ProductKeys = keyof typeof product;

const ProductKeyone: ProductKeys = "id";

// conditional types

type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;
type B = IsString<number>;

const isString: A = "yes";

// Numeric Enums

enum Directions {
  left,
  right,
  top,
  bottom,
}

console.log(Directions.top);
console.log(Directions[0]);

enum Status {
  success = 200,
  notFound = 404,
  serverError = 500,
}

console.log(Status.success);
console.log(Status[404]);

// String Enums

enum MapDirections {
  North = "NORTH",
  South = "SOUTH",
  East = "EAST",
  West = "WEST",
}

console.log(MapDirections.North);
console.log(MapDirections["East"]);
// console.log(MapDirections["EAST"]);
let a = 4;
console.log((a = 22));

let strAndNumberArray: (number | string)[] = [
  "aspire",
  1996,
  "systems",
  "2025,2026",
];

console.log("array of numbers and string :", strAndNumberArray);

function addTwoNumbers(numberOne: number, numberTwo: number) {
  return numberOne + numberTwo;
}
type returnType = ReturnType<typeof addTwoNumbers>;
console.log("addTwoNumbers : ", addTwoNumbers(20, 45));

type value1 = number | string;

interface Value {
  id: number;
  data: any;
  category: string;
  showModal: boolean;
  date: Date;
}

function printInConsole<T>(value: { data: Value }) {
  console.log("value", value.data);
}
const value:Value={
  id:12,
  data:{name:"ajay"},
  category:"dev",
  showModal:true,
  date:new Date()
}
printInConsole<Value>(value);

interface ComponentA1 {
  a: number;
  b: string;
  c: string;
  d: number;
  e: string;
}

type ComponentAwithoutE = Omit<ComponentA1, "e">;

const variableOne: ComponentAwithoutE = {
  a: 1,
  b: "hi",
  c: "qe",
  d: 33,
};
console.log("variableOne", variableOne);
