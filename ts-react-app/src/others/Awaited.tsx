// import { useEffect, useState } from "react";

// interface User {
//   id: number;
//   username: string;
//   email: string;
// }

// async function fetchUsers(url: string): Promise<User[]> {
//   const response = await fetch(url);
//   return response.json();
// }

// type Users = Awaited<ReturnType<typeof fetchUsers>>;
// type UserItem = Users extends Array<infer U> ? U : never;

// const UserList = () => {
//   const [users, setUsers] = useState<Users | null>(null);

//   useEffect(() => {
//     fetchUsers("https://fakestoreapi.com/users").then(setUsers);
//   }, []);

//   return (
//     <div>
//       {users ? (
//         users.map((user: UserItem) => (
//           <ul key={user.id}>{user.username}</ul>
//         ))
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default UserList;



import { useEffect, useState } from "react";

interface User{
    id:number,
    username:string,
    email:string,
    password:string
}
async function fetchUsers(url: string):Promise<User[]> {
  const response = await fetch(url);
  return response.json();
}
type Users = Awaited<ReturnType<typeof fetchUsers>>;
type UserData = Users extends Array<infer U> ? U : never;

const UserList = () => {
  const [users, setUsers] = useState<Users | null>(null);

  useEffect(() => {
    fetchUsers("https://fakestoreapi.com/users").then(setUsers);
  }, []);
  console.log("users",users);
  return (
    <div>
      {users?(users.map((user: UserData) => {
        return <ul>{user.username}</ul>;
      })):<p>loading</p>}
    </div>
  );
};

export default UserList;
