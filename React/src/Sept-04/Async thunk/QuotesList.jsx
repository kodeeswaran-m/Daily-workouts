import React, { useEffect } from "react";
import {
  Box,
  Skeleton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuotes } from "./QuoteSlice";

const QuotesList = () => {
  const dispatch = useDispatch();
  const { quotes, loading, error } = useSelector((state) => state.quotes);

  useEffect(() => {
    dispatch(fetchQuotes());
  }, [dispatch]);

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 2 }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 500,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h6"
          sx={{ p: 2, bgcolor: "primary.main", color: "white" }}
        >
          Quotes
        </Typography>
        <List disablePadding>
          {loading
            ? Array.from(new Array(5)).map((_, index) => (
                <ListItem key={index} divider>
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={24}
                    sx={{ mb: 1 }}
                  />
                </ListItem>
              ))
            : quotes.map((quote, idx) => (
                <React.Fragment key={quote.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight={500}>
                          “{quote.quote}”
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          — {quote.author}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {idx < quotes.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
        </List>
      </Paper>
    </Box>
  );
};

export default QuotesList;

// import React, { useEffect, useState } from "react";
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
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchQuotes } from "./QuoteSlice";

// const QuotesList = () => {
//   const dispatch = useDispatch();
//   const { quotes, loading, error } = useSelector((state) => state.quotes);

//   //   const [selectedRecipe, setSelectedRecipe] = useState(null);

//   useEffect(() => {
//     dispatch(fetchQuotes());
//   }, [dispatch]);

//   if (error) {
//     return <p style={{ color: "red" }}>Error: {error}</p>;
//   }

//   return (
//     <>
//       <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
//         <List>
//           {loading ? (
//             <Skeleton />
//           ) : (
//             quotes.map((quote) => (
//               <ListItem key={quote.id}>
//                 <ListItemText primary={quote.quote} secondary={quote.author} />
//               </ListItem>
//             ))
//           )}
//         </List>
//       </Box>
//     </>
//   );
// };

// export default QuotesList;
