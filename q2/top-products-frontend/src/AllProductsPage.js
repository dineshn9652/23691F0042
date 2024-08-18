import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [availability, setAvailability] = useState('');
  const [sort, setSort] = useState('price');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetchProducts();
  }, [category, company, rating, priceRange, availability, sort, order]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories/Laptop/products', {
        params: {
          category,
          company,
          rating,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          availability,
          sort,
          order,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Top Products
      </Typography>

      {/* Filters */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            select
            fullWidth
          >
            <MenuItem value="Laptop">Laptop</MenuItem>
            <MenuItem value="Phone">Phone</MenuItem>
            <MenuItem value="Tablet">Tablet</MenuItem>
            {/* Add more categories as needed */}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            select
            fullWidth
          >
            <MenuItem value="AMZ">Amazon</MenuItem>
            <MenuItem value="FLP">Flipkart</MenuItem>
            <MenuItem value="SNP">Snapdeal</MenuItem>
            {/* Add more companies as needed */}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            select
            fullWidth
          >
            <MenuItem value="4.5">4.5 & above</MenuItem>
            <MenuItem value="4">4 & above</MenuItem>
            <MenuItem value="3.5">3.5 & above</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            select
            fullWidth
          >
            <MenuItem value="yes">Available</MenuItem>
            <MenuItem value="no">Out of Stock</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Product List */}
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                alt={product.productName}
                height="140"
                image={`https://via.placeholder.com/150?text=${product.productName}`}
              />
              <CardContent>
                <Typography variant="h6">{product.productName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.company} - {product.category}
                </Typography>
                <Typography variant="body2">Price: ₹{product.price}</Typography>
                <Typography variant="body2">Rating: {product.rating}</Typography>
                <Typography variant="body2">Discount: {product.discount}%</Typography>
                <Typography variant="body2">
                  Availability: {product.availability}
                </Typography>
                <Button
                  component={Link}
                  to={`/product/${product.id}`}
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '10px' }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default AllProductsPage;
