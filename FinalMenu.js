import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Container, Typography, Paper, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function FinalMenu() {
  const navigate = useNavigate();

  // Pre-populated items
  const initialFoodItems = [
    { id: '1', name: 'Pizza', description: 'Cheesy delight with various toppings', price: '10.00', imageUrl: '/images/pizza.jpg' },
    { id: '2', name: 'Burger', description: 'Juicy beef patty with fresh veggies', price: '8.00', imageUrl: '/images/burger.jpg' },
    { id: '3', name: 'Pasta', description: 'Creamy Alfredo pasta with garlic bread', price: '12.00', imageUrl: '/images/pasta.jpg' }
  ];

  const [foodItems, setFoodItems] = useState(initialFoodItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foodItemsCollection = collection(db, 'foodItems');
    const unsubscribe = onSnapshot(foodItemsCollection, snapshot => {
      const foodData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFoodItems(prevItems => [...prevItems, ...foodData]);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          Final Food Menu
        </Typography>
        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : (
          <List>
            {foodItems.map(item => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <img src={item.imageUrl} alt={item.name} style={{ width: 50, height: 50, marginRight: 16 }} />
                  <ListItemText primary={item.name} secondary={`${item.description} - $${item.price}`} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate('/home')}
          sx={{ mt: 3, mb: 2 }}
        >
          Edit Menu
        </Button>
      </Paper>
    </Container>
  );
}


