const express = require('express');
const Transaction = require('../Models/Transaction');
const router = express.Router();

// Add a new transaction
router.post('/add', async (req, res) => {
  // console.log("Yes its happening");
  
  const { userId, type, amount, category, description } = req.body;
  try {
    const newTransaction = new Transaction({
      userId,
      type,
      amount,
      category,
      description,
    });
    await newTransaction.save();
    res.status(200).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error adding transaction', error });
  }
});
  
router.get('/user/:userId', async (req, res) => {
  // console.log("i am done");
  
  const { userId } = req.params;
  try {
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving transactions', error });
  }
});

// Delete a transaction
router.delete('/:transactionId', async (req, res) => {
  const { transactionId } = req.params;
  try {
    await Transaction.findByIdAndDelete(transactionId);
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting transaction', error });
  }
});

router.get('/summary/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await Transaction.find({ userId });

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    res.status(200).json({ totalIncome, totalExpenses, balance });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching summary', error });
  }
});

module.exports = router;
