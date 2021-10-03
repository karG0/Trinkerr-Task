import React from "react";
import Container from "@mui/material/Container";

export default function PageNotFound() {
  return (
    <Container component="main" maxWidth="xs">
      <p>Page not found - the path,did not match any React Router routes.</p>
    </Container>
  );
}
