import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Chip,
  Divider,
  Grid,
  Box,
  Rating,
} from "@mui/material";
const RecipeDialog = ({ selectedRecipe, setSelectedRecipe }) => {
  return (
    <>
      <Dialog
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: { borderRadius: 3, p: 2 },
          },
        }}
      >
        {selectedRecipe && (
          <>
            <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              {selectedRecipe.name}
            </DialogTitle>
            <DialogContent dividers sx={{ typography: "body1" }}>
              <Box
                component="img"
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  mb: 3,
                  maxHeight: 300,
                  objectFit: "cover",
                }}
              />

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                <Chip
                  label={`Cuisine: ${selectedRecipe.cuisine}`}
                  color="primary"
                />
                <Chip label={`Difficulty: ${selectedRecipe.difficulty}`} />
                <Chip label={`Prep: ${selectedRecipe.prepTimeMinutes}m`} />
                <Chip label={`Cook: ${selectedRecipe.cookTimeMinutes}m`} />
                <Chip label={`Servings: ${selectedRecipe.servings}`} />
                <Chip
                  label={`${selectedRecipe.caloriesPerServing} cal/serving`}
                />
              </Box>

              {/* Rating + Reviews */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating
                  value={selectedRecipe.rating}
                  precision={0.1}
                  readOnly
                  size="medium"
                />
                <Typography
                  variant="body2"
                  sx={{ ml: 1, color: "text.secondary" }}
                >
                  ({selectedRecipe.reviewCount} reviews)
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={3}>
                <Grid  size={{xs:12, md:6}}>
                  <Typography variant="h6" gutterBottom>
                    Ingredients
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i}>
                        <Typography variant="body2">{ing}</Typography>
                      </li>
                    ))}
                  </ul>
                </Grid>

                <Grid  size={{xs:12, md:6}}>
                  <Typography variant="h6" gutterBottom>
                    Instructions
                  </Typography>
                  <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
                    {selectedRecipe.instructions.map((step, i) => (
                      <li key={i}>
                        <Typography variant="body2">{step}</Typography>
                      </li>
                    ))}
                  </ol>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default RecipeDialog;
