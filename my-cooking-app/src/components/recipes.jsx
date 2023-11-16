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
        setMeals(data.data); 
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  const handleCardClick = (idMeal) => {
    navigate(`/recipes/${idMeal}`);
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 10 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        FlavorVerse Recipes
      </Typography>
      <Grid container spacing={4}>
        {meals.map((meal) => (
          //this line changine "idMeal" to "id" sends a request for the Id that my server has given the recipe, instead of "undefined" I need to send a request for the 50k+ id number that the API has given the recipes
          <Grid item key={meal.idMeal} xs={12} sm={6} md={4}>
            {/* //and this line    */}
            <Card onClick={() => handleCardClick(meal.idMeal)} sx={{ cursor: 'pointer' }}>
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
