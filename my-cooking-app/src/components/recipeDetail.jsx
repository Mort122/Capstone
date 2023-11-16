import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Card, CardMedia, CardContent } from '@mui/material';

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { idMeal } = useParams(); 

    useEffect(() => {
        console.log("Fetching details for recipe with ID:", idMeal);
        const fetchRecipe = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/meals/${idMeal}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRecipe(data.meals[0]); // Assuming the API returns an array of meals and we want the first
                console.log('Fetched recipe:', data.meals[0]);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecipe();
    }, [idMeal]);

    if (isLoading) {
        return (
            <Container maxWidth="md">
                <CircularProgress />
            </Container>
        );
    }

    if (!recipe) {
        return (
            <Container maxWidth="md">
                <Typography variant="h6">Recipe not found.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Card>
                <CardMedia
                    component="img"
                    height="140"
                    image={recipe.strMealThumb}
                    alt={recipe.strMeal}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="h1">
                        {recipe.strMeal}
                    </Typography>
                    {/* Add more details as needed */}
                </CardContent>
            </Card>
        </Container>
    );
};

export default RecipeDetail;
