const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());

app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { top = 10, minPrice = 0, maxPrice = 10000, page = 1, sort = 'price', order = 'asc' } = req.query;

    try {
        const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products`, {
            params: {
                top,
                minPrice,
                maxPrice
            }
        });

        let products = response.data;

        products = products.map((product, index) => ({
            id: `unique-product-id-${index + 1}`,
            ...product
        }));

        products.sort((a, b) => {
            const sortKey = sort;
            if (order === 'asc') {
                return a[sortKey] - b[sortKey];
            } else {
                return b[sortKey] - a[sortKey];
            }
        });

        const pageSize = top > 10 ? 10 : top;
        const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);

        res.json({
            products: paginatedProducts,
            pagination: {
                current_page: page,
                total_pages: Math.ceil(products.length / pageSize)
            }
        });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            res.status(401).json({ message: 'Unauthorized access to the external API.' });
        } else {
            res.status(500).json({ message: 'An error occurred while fetching products.', error: error.message });
        }
    }
});

app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;

    try {
        const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products/${productid}`);
        res.json({
            id: productid,
            ...response.data
        });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            res.status(401).json({ message: 'Unauthorized access to the external API.' });
        } else {
            res.status(500).json({ message: 'An error occurred while fetching product details.', error: error.message });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
