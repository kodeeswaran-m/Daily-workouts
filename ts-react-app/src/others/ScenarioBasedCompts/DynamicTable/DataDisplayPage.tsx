import { useFetch } from "../useFetch/useFetch";
import DynamicTable from "./DynamicTable";

interface DataDisplayProps {
  endpoint: string;
}

const DataDisplayPage = ({ endpoint }: DataDisplayProps) => {
  const url: string = `https://fakestoreapi.com/${endpoint}`;
  const {
    data,
    loading,
    error
  } = useFetch<any[]>(url);

if(error) return <p>{error}</p>
if(loading) return <p>loading...</p>
  return (
    <div>
      {data && <DynamicTable data={data} title="User Table" />}
    </div>
  );
};

export default DataDisplayPage;





// import { useFetch } from "../useFetch/useFetch";
// import DynamicTable from "./DynamicTable";

// const DataDisplayPage = () => {
//   const {
//     data: users,
//     loading: loadingUsers,
//     error: errorUsers,
//   } = useFetch<any[]>("https://fakestoreapi.com/users");

//   const {
//     data: products,
//     loading: loadingProducts,
//     error: errorProducts,
//   } = useFetch<any[]>("https://fakestoreapi.com/products");

//   if (loadingUsers || loadingProducts) return <p>Loading...</p>;
//   if (errorUsers || errorProducts) return <p>Error loading data</p>;

//   return (
//     <div >
//       {users && <DynamicTable data={users} title="Users Data" />}
//       {products && <DynamicTable data={products} title="Products Data" />}
//     </div>
//   );
// };
// export default DataDisplayPage;
