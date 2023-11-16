import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

const Recipes = () => {
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('/api/meals');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMeals(data.data); // Assuming the backend sends the meals in a 'data' property
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  const handleCardClick = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
      </Typography>
      <Grid container spacing={4}>
        {meals.map((meal) => (
          <Grid item key={meal.id} xs={12} sm={6} md={4}>
            <Card onClick={() => handleCardClick(meal.id)} sx={{ cursor: 'pointer' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={meal.imageUrl}
                  alt={meal.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {meal.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Recipes;
