import {
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data); // ✅ FIXED: use res.data
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, error, loading };
}

function UserListComponent() {
  const { data, error, loading } = useFetch(
    "https://dummyjson.com/users?limit=10"
  );

  if (loading) return <Typography>Loading users...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!data) return null;

  return (
    <List>
      {data.users.map((ele) => (
        <ListItem key={ele.id}>
          <ListItemText primary={ele.firstName} secondary={ele.email} />
        </ListItem>
      ))}
    </List>
  );
}

function ProductListComponent() {
  const { data, error, loading } = useFetch(
    "https://dummyjson.com/products?limit=10"
  );

  if (loading) return <Typography>Loading products...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!data) return null;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.products.map((prod) => (
            <TableRow key={prod.id}>
              <TableCell>{prod.title}</TableCell>
              <TableCell>{prod.category}</TableCell>
              <TableCell>{prod.price}</TableCell>
              <TableCell>{prod.stock}</TableCell>
              <TableCell>{prod.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// function UseFetchComponent() {
//   return (
//     <>
//       <UserListComponent />
//       <ProductListComponent />
//     </>
//   );
// }

// export default UseFetchComponent;

import { Tabs, Tab, Box } from "@mui/material";

export default function UseFetchComponent() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Users" />
        <Tab label="Products" />
      </Tabs>

      {value === 0 && (
        <Box sx={{ p: 2 }}>
      <UserListComponent />
        </Box>
      )}
      {value === 1 && (
        <Box sx={{ p: 2 }}>
      <ProductListComponent />
        </Box>
      )}
    </Box>
  );
}



// import {
//   List,
//   ListItem,
//   ListItemText,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";

// function useFetch(url) {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
// console.log("data2222222",data);
//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(url)
//       .then((data) => {
//         setData(data);
//       })
//       .catch((error) => {
//         setError(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [url]);

//   return { data, error, loading };
// }

// function UserListComponent() {
//   const { data, error, loading } = useFetch(
//     "https://dummyjson.com/users?limit=10"
//   );
// console.log("data",data);
//   return (
//     <>
//       <List>
//         {data.users.map((ele, index) => (
//           <ListItem key={index}>
//             <ListItemText primary={ele.firstName} secondary={ele.email} />
//           </ListItem>
//         ))}
//       </List>
//     </>
//   );
// }

// function ProductListComponent() {
//   const { data, error, loading } = useFetch(
//     "https://dummyjson.com/products?limit=10"
//   );

//   return (
//     <>
//       <TableContainer component={paper}>
//         <Table sx={{minWidth:600}}>
//           <TableHead>
//             <TableRow>
//               <TableCell>Title</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Stock</TableCell>
//               <TableCell>Rating</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {
//                 data.products.map((prod, index)=>(
//                     <TableRow key={index}>
//                         <TableCell>{prod.title}</TableCell>
//                         <TableCell>{prod.category}</TableCell>
//                         <TableCell>{prod.price}</TableCell>
//                         <TableCell>{prod.stock}</TableCell>
//                         <TableCell>{prod.rating}</TableCell>
//                     </TableRow>
//                 ))
//             }
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }

// function UseFetchComponent() {
//   return (
//     <>
//       <UserListComponent />
//       <ProductListComponent/>
//     </>
//   );
// }
// export default UseFetchComponent;
