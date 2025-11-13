const workerDetails = {
    name: "sanjay",
    age: 67,
};
console.log(workerDetails.name);
const userDetails = {
    name: "kodeeswaran",
    age: 23,
    email: "kodeeswaran@gmail.com",
    // phoneNumber:2435433434,
};
function printValue(value) {
    console.log(value);
}
printValue("app");
printValue(212);
printValue("application");
printValue(true);
function merge(userObjOne, userObjTwo) {
    return { ...userObjOne, ...userObjTwo };
}
console.log(merge({ name: "kodeeswaran" }, { age: 25 }));
const userOne = { age: 23, phoneNumber: 9595595940 };
const userTwo = { age: "32", phoneNumber: "9893432959" };
console.log(userOne, userTwo);
//extends keyword to contrain the generic type - T must at least have certain properties.
function getLength(inputValue) {
    return inputValue.length;
}
console.log("Str length", getLength("WebApp"));
console.log("Arr length", getLength([1, 2, 4, 6, 2, 43, 53]));
// Generic Constraints
function getProperty(obj, key) {
    console.log("Age", obj[key]);
}
const userthree = {
    age: 55,
    phoneNumber: 3456789456,
};
getProperty(userthree, "age");
const userResponse = {
    status: 200,
    data: {
        id: 1,
        name: "sam",
    },
    message: "data fetched successfully",
};
const productResponse = {
    status: 201,
    data: {
        id: 333,
        price: 2000,
    },
    message: "Product detail fetched successfully",
};
console.log(userResponse);
console.log(productResponse);
const nameAge = { first: "lohan", last: 24 };
const coordinates = { first: 24, last: 32 };
const productNamePrice = { first: "laptop", last: 20000 };
console.log("nameAge : ", nameAge, "coordinates : ", coordinates, "productNamePrice", productNamePrice);
// Generic with default
function createArray(value, count) {
    return Array(count).fill(value);
}
console.log(createArray("Aspire Systems", 3));
const user = {
    id: 1,
    name: "kodeeswaran m",
    age: 19,
    isActive: true,
};
const partialUser = {
    id: 2,
    name: "ajay",
};
const strictUser = {
    id: 3,
    name: "sam m",
    age: 19,
    isActive: true,
};
const readOnlyUser = {
    id: 5,
    name: "bharath",
};
const basicUser = {
    id: 4,
    name: "vasanth",
};
const noAgeUser = {
    id: 7,
    name: "Rahul",
    isActive: true,
};
const scoreBoard = {
    virat: 100,
    dhoni: 20,
    rohit: 75,
};
const accessLevel = {
    admin: "full access",
    user: "limited access",
    guest: "Read Only",
};
let key = "name";
let key1 = "id";
// let key2:UserKeys="email";
const product = {
    id: 90,
    name: "hearphone",
    price: 1200,
};
const newProduct = {
    id: 23,
    name: "hearbuds",
    price: 2200,
};
console.log("new products :", newProduct);
const ProductKeyone = "id";
const isString = "yes";
// Numeric Enums
var Directions;
(function (Directions) {
    Directions[Directions["left"] = 0] = "left";
    Directions[Directions["right"] = 1] = "right";
    Directions[Directions["top"] = 2] = "top";
    Directions[Directions["bottom"] = 3] = "bottom";
})(Directions || (Directions = {}));
console.log(Directions.top);
console.log(Directions[0]);
var Status;
(function (Status) {
    Status[Status["success"] = 200] = "success";
    Status[Status["notFound"] = 404] = "notFound";
    Status[Status["serverError"] = 500] = "serverError";
})(Status || (Status = {}));
console.log(Status.success);
console.log(Status[404]);
// String Enums
var MapDirections;
(function (MapDirections) {
    MapDirections["North"] = "NORTH";
    MapDirections["South"] = "SOUTH";
    MapDirections["East"] = "EAST";
    MapDirections["West"] = "WEST";
})(MapDirections || (MapDirections = {}));
console.log(MapDirections.North);
console.log(MapDirections["East"]);
// console.log(MapDirections["EAST"]);
let a = 4;
console.log((a = 22));
let strAndNumberArray = [
    "aspire",
    1996,
    "systems",
    "2025,2026",
];
console.log("array of numbers and string :", strAndNumberArray);
function addTwoNumbers(numberOne, numberTwo) {
    return numberOne + numberTwo;
}
console.log("addTwoNumbers : ", addTwoNumbers(20, 45));
function printInConsole(value) {
    console.log("value", value.data);
}
const value = {
    id: 12,
    data: { name: "ajay" },
    category: "dev",
    showModal: true,
    date: new Date()
};
printInConsole(value);
const variableOne = {
    a: 1,
    b: "hi",
    c: "qe",
    d: 33,
};
console.log("variableOne", variableOne);
export {};
