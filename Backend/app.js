const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const productRoutes=require('./routes/productRoute');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes=require('./routes/userRoute');
const cors = require('cors');
require('dotenv').config();

const app=express();
const port=process.env.PORT || 3000;

app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.once('open',()=>{
    console.log('connected to MongoDB database');
});

app.use(cors());

//userRoute
app.use('/api/users',userRoutes);

//CategoryRoute 
app.use('/api/categories',categoryRoutes);

// ProductsRoute
app.use('/api/products',productRoutes);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
