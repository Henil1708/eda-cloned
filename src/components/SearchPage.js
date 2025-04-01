import { Box, Typography } from "@mui/material";
import Places from "./Places";

export default function SearchPage({ setHome, reset }) {
  const handlePlaceSelected = (position) => {
    reset();
    setHome(position);
  };

  return (
    <Box sx={{ padding: 3, color: "#E2CAA2", fontFamily: "Inter" }}>
      <img
        src="assets/logo.png"
        style={{
          width: "fit-content",
          height: "40px",
          objectFit: "contain",
          marginBottom: "40px",
        }}
      />
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mb: 1, fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" } }}
      >
        SOLAR-KONFIGURATOR
      </Typography>
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          mb: 1,
          fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
          lineHeight: { xs: 1.2, sm: 1.3 },
        }}
      >
        Wo findet Ihre
        <br />
        Energiewende statt?
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
        }}
      >
        Geben Sie die Adresse der gewünschten Solaranlage ein.
      </Typography>
      <Places setHome={handlePlaceSelected} />
    </Box>
  );
}
