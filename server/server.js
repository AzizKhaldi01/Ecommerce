const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const AuthRoutes = require('./routes/Admin/AuthRoutes');
const ProductRoutes = require('./routes/Admin/ProductRoutes');
const OrderRoutes = require('./routes/Admin/OrderRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}' with body:`, req.body);
    next(); // Pass control to the next middleware or route handler
});

app.use('/api', AuthRoutes);
app.use('/api', ProductRoutes);
app.use('/api', OrderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
