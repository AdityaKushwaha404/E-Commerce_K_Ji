const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Cart = require('./models/Cart');
const Product = require('./models/Product');
const Products = require('./data/products');

dotenv.config();


mongoose.connect(process.env.MONGO_URI)

// function to seed the data

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Cart.deleteMany();

    // Create admin user
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
        role: 'admin',
    });
    const createdAdmin = await adminUser.save();
    console.log('Admin user created:', createdAdmin);

    // Assign the defauld user id to each product
    const userID = createdAdmin._id;
    const sampleProducts = Products.map(product => {
      return { ...product, user: userID };
    }
    );

    // insert the products into the database
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log('Sample products created:', createdProducts.length);
    process.exit();
  }
  catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}   



seedData();
