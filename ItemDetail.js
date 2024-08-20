import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Container, Typography, Paper, Box } from '@mui/material';

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      const docRef = doc(db, 'foodItems', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setItem(docSnap.data());
      }
      setLoading(false);
    };
    
    fetchItem();
  }, [id]);

  if (loading) {
    return <Typography align="center">Loading...</Typography>;
  }

  if (!item) {
    return <Typography align="center">Item not found</Typography>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          {item.name}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <img src={item.imageUrl} alt={item.name} style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            {item.description}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Price: ${item.price}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Ingredients: {item.ingredients}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Calories: {item.calories}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
