import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Button, TextField, Container, Typography, Paper, List, ListItem, ListItemText, Box, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  // Pre-populated items
  const initialFoodItems = [
    { id: '1', name: 'Pizza', description: 'Cheesy delight with various toppings', price: '10.00', imageUrl: '/images/pizza.jpg' },
    { id: '2', name: 'Burger', description: 'Juicy beef patty with fresh veggies', price: '8.00', imageUrl: '/images/burger.jpg' },
    { id: '3', name: 'Pasta', description: 'Creamy Alfredo pasta with garlic bread', price: '12.00', imageUrl: '/images/pasta.jpg' }
  ];

  const [foodItems, setFoodItems] = useState(initialFoodItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', description: '', price: '', imageUrl: '' });
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const imageUrlRef = useRef();

  useEffect(() => {
    const foodItemsCollection = collection(db, 'foodItems');
    const unsubscribe = onSnapshot(foodItemsCollection, snapshot => {
      const foodData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFoodItems(prevItems => [...prevItems, ...foodData]);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'foodItems'), {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        price: priceRef.current.value,
        imageUrl: imageUrlRef.current.value
      });
      setFormData({ name: '', description: '', price: '', imageUrl: '' });
    } catch (err) {
      setError('Failed to add food item: ' + err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, 'foodItems', id));
      setFoodItems(foodItems.filter(item => item.id !== id));
    } catch (err) {
      setError('Failed to delete food item: ' + err.message);
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          Food Menu
        </Typography>
        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : (
          <List>
            {foodItems.map(item => (
              <React.Fragment key={item.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <img src={item.imageUrl} alt={item.name} style={{ width: 50, height: 50, marginRight: 16 }} />
                  <ListItemText primary={item.name} secondary={`${item.description} - $${item.price}`} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="h6">Add New Food Item</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            inputRef={nameRef}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Description"
            inputRef={descriptionRef}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Price"
            inputRef={priceRef}
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Image URL"
            inputRef={imageUrlRef}
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Food Item
          </Button>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => navigate('/final-menu')}
          sx={{ mt: 3, mb: 2 }}
        >
          View Final Menu
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Paper>
    </Container>
  );
}
