import useFetch from "./customHook";

function ProductList({ productData }) {
  return (
    <>
      <ul>
        {productData.map((product) => {
          return (
            <li key={product.id}>
              {product.title}-{product.price}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function UserList({ userData }) {
  return (
    <>
      <ul>
        {userData.map((user) => {
          return (
            <li key={user.id}>
              {user.firstName}-{user.age}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function Dashboard() {
  const {
    data: userData,
    error: userError,
    loading: userLoading,
  } = useFetch("https://dummyjson.com/users?limit=10");
  const {
    data: productData,
    error: productError,
    loading: productLoading,
  } = useFetch("https://dummyjson.com/products?limit=10");
  console.log(userData);
  return (
    <>
      <p>users</p>
      {userLoading && <p>Loading....</p>}
      {userError && <p>Error: {userError}</p>}
      {userData && <UserList userData={userData.users} />}

      <p>products</p>
      {productLoading && <p>Loading....</p>}
      {productError && <p>Error: {productError}</p>}
      {productData && <ProductList productData={productData.products} />}
    </>
  );
}

export default Dashboard;
