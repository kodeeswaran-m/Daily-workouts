interface Users {
  id: number;
  username: string;
  email: string;
  password: string;
}
import { useEffect, useState } from "react";

const FetchUsers = () => {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);
  return (
    <div>
      {users.map((user) => (
        <div
          key={user.id}
          style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
        >
          <p>
            <strong>ID :</strong> {user.id}
          </p>
          <p>
            <strong>User Name :</strong> {user.username}
          </p>
          <p>
            <strong>Email :</strong> {user.email}
          </p>
        </div>
      ))}
    </div>
  );
};
export default FetchUsers;
