const express = require('express');
const cors = require('cors');
const app = express();

// Enable All CORS Requests
app.use(cors());

const mongoose = require('mongoose');
const bodyParser = require('body-parser');



// MongoDB connection
mongoose.connect('mongodb://localhost:27017/budget', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

const expenseSchema = new mongoose.Schema({
  newExpense: String,
  newExpenseAmount: Number,
},);


const budgetSchema = new mongoose.Schema({
  newBudget: String,
  newBudgetAmount: Number,
},);

const Budget = mongoose.model('Budget', budgetSchema);
const Expense = mongoose.model('Expense', expenseSchema);



app.use(bodyParser.json());

// Endpoint to receive form data and save it to MongoDB
app.post('/post', async (req, res) => {
  try {
    const { newBudget, newBudgetAmount } = req.body;
    const budget = new Budget({ newBudget, newBudgetAmount });
    await budget.save();
    res.status(201).send('Budget created successfully!');
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send('Error creating budget');
  }
});

const additionalDataSchema = new mongoose.Schema({
  // Define additional fields for the new collection here
  // For instance:
  additionalField: String,
  date: { type: Date, default: Date.now }
});

const AdditionalData = mongoose.model('AdditionalData', additionalDataSchema);

app.post('/post/AdditionalData', async (req, res) => {
  try {
    const { additionalField } = req.body;
    const newData = new AdditionalData({ additionalField });
    await newData.save();
    res.status(201).send('Data stored successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error storing data');
  }
});





const PORT = process.env.PORT || 50000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});


// Example CORS configuration (Node.js - Express)

 
