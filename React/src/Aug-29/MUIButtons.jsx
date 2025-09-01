import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AppsIcon from "@mui/icons-material/Apps";
import { useEffect, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import HomeIcon from "@mui/icons-material/Home";
import AdjustIcon from "@mui/icons-material/Adjust";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
function MUIButtons() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  });
  return (
    <>
      <Button variant="contained" color="success" disabled>
        Click me:)
      </Button>
      <Button variant="contained" color="error">
        Click me:)
      </Button>
      <Button variant="contained" color="secondary">
        Click me:)
      </Button>
      <IconButton onClick={() => setLoading(true)} loading={loading}>
        <AppsIcon />
      </IconButton>

      <ButtonGroup variant="text">
        <Button>
          <HomeIcon />
        </Button>
        <Button>
          <AdjustIcon />
        </Button>
        <Button loading loadingPosition="start">
          <AirlineStopsIcon />
        </Button>
      </ButtonGroup>
    </>
  );
}
export default MUIButtons;
