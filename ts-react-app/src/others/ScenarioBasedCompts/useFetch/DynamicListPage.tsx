import { useFetch } from "./useFetch";
import type { Cart, Product, User } from "./UseFetch.types";
type EndPointType = "products" | "users" | "carts";
interface DynamicListProps {
  endpoint: EndPointType;
}
type EndPointMap = {
  users: User[];
  products: Product[];
  carts: Cart[];
};

const DynamicListPage = ({ endpoint }: DynamicListProps) => {
  const url = `https://fakestoreapi.com/${endpoint}`;
  const {
    data: listItems,
    loading,
    error,
  } = useFetch<EndPointMap[typeof endpoint]>(url);

  if (loading) return <p>Loading {endpoint}...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!listItems) return null;
  return (
    <div>
      <h2>List of products</h2>
      <ul>
        {endpoint === "products" &&
          (listItems as Product[]).map((p) => (
            <li key={p.id}>
              {p.title} - ₹{p.price} - {p.category}
            </li>
          ))}

        {endpoint === "users" &&
          (listItems as User[]).map((u) => (
            <li key={u.id}>
              {u.username} - {u.email}
            </li>
          ))}

        {endpoint === "carts" &&
          (listItems as Cart[]).map((c) => (
            <li key={c.id}>
              User ID: {c.userId}, Products: {c.products.length}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DynamicListPage;