import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from '@mui/material';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/categories/Laptop/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          alt={product.productName}
          height="300"
          image={`https://via.placeholder.com/300?text=${product.productName}`}
        />
        <CardContent>
          <Typography variant="h5">{product.productName}</Typography>
          <Typography variant="body2" color="textSecondary">
            {product.company} - {product.category}
          </Typography>
          <Typography variant="body2">Price: ₹{product.price}</Typography>
          <Typography variant="body2">Rating: {product.rating}</Typography>
          <Typography variant="body2">Discount: {product.discount}%</Typography>
          <Typography variant="body2">
            Availability: {product.availability}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetailPage;
