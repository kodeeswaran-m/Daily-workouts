import React, { useEffect, useState } from "react";
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Rating,

} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "./RecipesSlice";
import RecipeDialog from "./RecipeDialog";

const RecipesList = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Cuisine</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box sx={{ width: "100%" }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              recipes.map((recipe, index) => (
                <TableRow
                  key={recipe.id}
                  hover
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{recipe.name}</TableCell>
                  <TableCell>{recipe.cuisine}</TableCell>
                  <TableCell>{recipe.difficulty}</TableCell>
                  <TableCell>
                    <Rating
                      value={recipe.rating || 0}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

<RecipeDialog selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe} />
    </>
  );
};

export default RecipesList;

// import React, { useEffect } from "react";
// import {
//   Box,
//   Skeleton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Rating,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRecipes } from "./RecipesSlice";

// const RecipesList = () => {
//   const dispatch = useDispatch();
//   const { recipes, loading, error } = useSelector((state) => state.recipes);

//   useEffect(() => {
//     dispatch(fetchRecipes());
//   }, [dispatch]);

//   if (error) {
//     return <p style={{ color: "red" }}>Error: {error}</p>;
//   }

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>S.No</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Cuisine</TableCell>
//             <TableCell>Difficulty</TableCell>
//             <TableCell>Rating</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {loading ? (
//             <TableRow>
//               <TableCell colSpan={5}>
//                 <Box sx={{ width: "100%" }}>
//                   <Skeleton />
//                   <Skeleton animation="wave" />
//                   <Skeleton animation={false} />
//                 </Box>
//               </TableCell>
//             </TableRow>
//           ) : (
//             recipes.map((recipe, index) => (
//               <TableRow key={recipe.id}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{recipe.name}</TableCell>
//                 <TableCell>{recipe.cuisine}</TableCell>
//                 <TableCell>{recipe.difficulty}</TableCell>
//                 <TableCell>
//                   <Rating
//                     name={`rating-${recipe.id}`}
//                     value={recipe.rating || 0}
//                     precision={0.5}
//                     readOnly
//                   />
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default RecipesList;
