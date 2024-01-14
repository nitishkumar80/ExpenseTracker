const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expenseTrackerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Create a schema for the budget
const budgetSchema = new mongoose.Schema({
  name: String,
  amount: Number,
});

const Budget = mongoose.model('Budget', budgetSchema);

const app = express();
app.use(express.json());

// Route to handle creating a new budget
app.post('/api/createBudget', async (req, res) => {
  try {
    const { newBudget, newBudgetAmount } = req.body;

    // Create a new budget document
    const budget = new Budget({
      name: newBudget,
      amount: newBudgetAmount,
    });

    // Save the budget to the database
    await budget.save();

    res.status(201).json({ message: 'Budget created successfully' });
  } catch (err) {
    console.error('Error creating budget:', err);
    res.status(500).json({ error: 'Could not create budget' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
