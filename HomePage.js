import React from 'react';
import { Container, Typography, Button, Paper, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const foodEvents = [
    {
      id: 1,
      title: 'Italian Food Festival',
      date: 'August 25, 2024',
      description: 'Join us for a celebration of Italian cuisine with a special menu featuring pasta, pizza, and more.',
      imageUrl: '/images/italian-food-festival.jpg',
    },
    {
      id: 2,
      title: 'Wine Tasting Event',
      date: 'September 10, 2024',
      description: 'Sample a selection of fine wines paired with gourmet appetizers.',
      imageUrl: '/images/wine-tasting.jpg',
    },
  ];

  const promotions = [
    {
      id: 1,
      title: 'Happy Hour',
      description: 'Enjoy 50% off on all drinks from 5 PM to 7 PM, Monday to Friday.',
      imageUrl: '/images/happy-hour.jpg',
    },
    {
      id: 2,
      title: 'Weekend Brunch Special',
      description: 'Get a free mimosa with any brunch entrée on Saturdays and Sundays.',
      imageUrl: '/images/weekend-brunch.jpg',
    },
  ];

  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8, textAlign: 'center' }}>
        <Typography component="h1" variant="h4" gutterBottom>
          Welcome to Our Restaurant
        </Typography>
        <Typography variant="body1" paragraph>
          We are committed to serving you the best food in town. Our menu is crafted with the finest ingredients to deliver an unforgettable dining experience.
        </Typography>
        <Typography variant="body1" paragraph>
          Feel free to browse our menu and discover the delightful dishes we have to offer.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/final-menu')}>
            View Menu
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/home')}>
            Edit Menu
          </Button>
        </Box>
      </Paper>

      {/* Upcoming Food Events Section */}
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography component="h2" variant="h5" gutterBottom>
          Upcoming Food Events
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {foodEvents.map(event => (
            <Grid item key={event.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={event.imageUrl}
                  alt={event.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Promotions Section */}
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography component="h2" variant="h5" gutterBottom>
          Current Promotions
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {promotions.map(promo => (
            <Grid item key={promo.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={promo.imageUrl}
                  alt={promo.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {promo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {promo.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

