import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 3, mt: 5 }}>
      <Container>
        <Typography variant="body1">
          Contact us: contact@foodorderingapp.com | +123 456 7890
        </Typography>
      </Container>
    </Box>
  );
}
