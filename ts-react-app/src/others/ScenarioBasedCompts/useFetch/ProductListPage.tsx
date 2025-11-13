import { useFetch } from "./useFetch";
import type { Product } from "./UseFetch.types";

const ProductList = () => {
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>("https://fakestoreapi.com/products");

  if (loading) return <p>loading....</p>;
  if (error) return <p>{error}</p>;
  if (products === null) return null;
  return (
    <div>
      <h2>List of products</h2>
      <ul>
        {products?.map((product:Product) => (
          <li key={product.id}>{product.title} - {product.price} - {product.category}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
