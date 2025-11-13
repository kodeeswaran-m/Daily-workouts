//// Practice Qns sent by kamali

// 1)How to write type for below one. Note: startDate & endDate should be Date field instead of string
// {
//   status: "success",
//   data: [{ id: 1, name: "John", startDate: 12-12-12, endDate: 12-12-13 }]
// }

interface Data {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
}

interface ApiResponse<T extends Data> {
  status: number;
  userdata: T[];
}

const userData: Data = {
  id: 100,
  name: "ajay",
  startDate: new Date(),
  endDate: new Date(),
};

const ApiResponseData: ApiResponse<Data> = {
  status: 200,
  userdata: [userData],
};

console.log("data ", ApiResponseData);

// 2)How to write type for below props which is passed from Component A to Component B
// {
// id,
// data,
// category,
// setShowModal,
// showModal,
// date
// onClick
// }

interface ComponentBProps {
  id: number;
  data: any;
  category: string;
  setShowModal: () => Boolean;
  showModal: boolean;
  date: Date;
  onClick: () => void;
}

// 3)From Component A, you are calling Component B and passing component C as props for component B
// How will you write type for component B?

// interface ComponentBProps{
// component: React.ComponentType<any>
// }

// 4) Component A having 5 props(a,b,c,d,e) and Component B having 3 props(b,c,e)
// How you define the types for Component A and Component B without duplication.

interface ComponentA {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
}

type ComponentB = Omit<ComponentA, "a" | "d">;
type ComponentB1 = Pick<ComponentA, "b" | "c" | "e">;

const ComponentAData: ComponentA = {
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

// 5)Write an example for Partial, Omit, ReadOnly, Required.

interface Userr {
  username: string;
  email: string;
  password?: string;
}

type EditUser = Partial<Userr>;
type SignUpUser = Required<Userr>;
type UserDataFromApi = Omit<Userr, "password">;
type DashBoardData = Readonly<Userr>;

const editUserData:EditUser = {
    username:"ajay"
};
const signUpUserData:SignUpUser = {
    username:"ajay",
    email:"ajay@gmail.com",
    password:"Sam@123"
}
const userDataFromApi:UserDataFromApi = {
        username:"ajay",
    email:"ajay@gmail.com",
};
const dashBoardData : DashBoardData = {
    username:"ajay",
    email:"ajay@gmail.com",
    password:"Sam@123"
};
// dashBoardData.username="sam";

// 6) How will you create type for below data
// a)const data = [{
//     a: 'aa',
//     b:'bb',
//     c:'cc',
//     d: 22,
//     e: {
//         e1: 20,
//         e2: 'ee',
//     }
// }]

interface Data1 {
  a: string;
  b: string;
  c: string;
  d: number;
  e: {
    e1: number;
    e2: string;
  };
}


const dataOne:Data1={
  a: "app",
  b: "app",
  c: "app",
  d: 22,
  e: {
    e1: 22,
    e2: "app",
  }
}
console.log("Data One", dataOne);