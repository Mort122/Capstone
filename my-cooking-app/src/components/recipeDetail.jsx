import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Card, CardMedia, CardContent } from '@mui/material';

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { recipeId } = useParams();

    useEffect(() => {
        const fetchRecipe = async () => {
            setIsLoading(true); // Make sure to set loading true when starting the fetch
            try {
                const response = await fetch(`/api/meals/${recipeId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRecipe(data); // Here you update the recipe state with the fetched data
                console.log('Fetched recipe:', data); // This logs the fetched recipe data
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setIsLoading(false); // Set loading to false after the fetch is complete
            }
        };

        fetchRecipe();
    }, [recipeId]);

        // First, check if we are still loading the data
        if (isLoading) {
            return (
                <Container maxWidth="md">
                    <CircularProgress />
                </Container>
            );
        }
    
        // Next, check if the recipe data is available
        if (!recipe) {
            return (
                <Container maxWidth="md">
                    <Typography variant="h6">Recipe not found.</Typography>
                </Container>
            );
        }

    // Additional console.log can be placed here to see the state update after each render
    console.log('Current recipe state:', recipe);

    return (
        <Container maxWidth="md">
            {isLoading ? (
                <CircularProgress />
            ) : recipe ? (
                <Card>
                    <CardMedia
                        component="img"
                        height="140"
                        image={recipe.imageUrl}
                        alt={recipe.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="h1">
                            {recipe.name}
                        </Typography>
                        <Typography variant="body1">
                            {recipe.description}
                        </Typography>
                        {/* Add more details as needed */}
                    </CardContent>
                </Card>
            ) : (
                <Typography variant="h6">Recipe not found.</Typography>
            )}
        </Container>
    );
};

export default RecipeDetail;
