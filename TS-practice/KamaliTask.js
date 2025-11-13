//// Practice Qns sent by kamali
const userData = {
    id: 100,
    name: "ajay",
    startDate: new Date(),
    endDate: new Date(),
};
const ApiResponseData = {
    status: 200,
    userdata: [userData],
};
console.log("data ", ApiResponseData);
const ComponentAData = {
    a: 55,
    b: 55,
    c: 55,
    d: 55,
    e: 55,
};
const ComponentBData = {
    b: 44,
    c: 44,
    e: 44,
};
const editUserData = {
    username: "ajay"
};
const signUpUserData = {
    username: "ajay",
    email: "ajay@gmail.com",
    password: "Sam@123"
};
const userDataFromApi = {
    username: "ajay",
    email: "ajay@gmail.com",
};
const dashBoardData = {
    username: "ajay",
    email: "ajay@gmail.com",
    password: "Sam@123"
};
const dataOne = {
    a: "app",
    b: "app",
    c: "app",
    d: 22,
    e: {
        e1: 22,
        e2: "app",
    }
};
console.log("Data One", dataOne);
export {};
