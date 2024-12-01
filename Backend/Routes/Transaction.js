const express = require('express');
const Transaction = require('../Models/Transaction');
const router = express.Router();

// Add a new transaction
// router.post('/add', async (req, res) => {
//   // console.log("Yes its happening");
  
//   const { userId, type, amount, category, description, date } = req.body;
//   console.log(date);
  
//   try {
//     const newTransaction = new Transaction({
//       userId,
//       type,
//       amount,
//       category,
//       description,
//     });
//     await newTransaction.save();
//     res.status(200).json(newTransaction);
//   } catch (error) {
//     res.status(400).json({ message: 'Error adding transaction', error });
//   }
// });

router.post('/add', async (req, res) => {
  const { userId, type, amount, category, description, date, month, year } = req.body;

  try {
    const newTransaction = new Transaction({
      userId,
      type,
      amount,
      category,
      description,
      date,   // Full date
      month,  // Derived month
      year,   // Derived year
    });

    await newTransaction.save();
    res.status(201).send({ message: 'Transaction added successfully', transaction: newTransaction });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to add transaction' });
  }
});

  
// router.get('/user/:userId', async (req, res) => {
//   // console.log("i am done");
  
//   const { userId } = req.params;
//   try {
//     const transactions = await Transaction.find({ userId }).sort({ date: -1 });
//     res.status(200).json(transactions);
//   } catch (error) {
//     res.status(400).json({ message: 'Error retrieving transactions', error });
//   }
// });

// Filter transactions by month and year
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const { month, year } = req.query;

  try {
    const filter = { userId };
    if (month) filter.month = parseInt(month);
    if (year) filter.year = parseInt(year);
    console.log(month);
    console.log(year);
    
    const transactions = await Transaction.find(filter);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
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

// router.get('/summary/:userId', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const transactions = await Transaction.find({ userId });

//     const totalIncome = transactions
//       .filter(t => t.type === 'income')
//       .reduce((acc, t) => acc + t.amount, 0);

//     const totalExpenses = transactions
//       .filter(t => t.type === 'expense')
//       .reduce((acc, t) => acc + t.amount, 0);

//     const balance = totalIncome - totalExpenses;

//     res.status(200).json({ totalIncome, totalExpenses, balance });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching summary', error });
//   }
// });

router.get('/summary/:userId', async (req, res) => {
  const { userId } = req.params;
  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json({ message: 'Month and year are required' });
  }

  try {
    // Calculate date range
    const startDate = new Date(year, month - 1, 1); // Start of the given month
    const endDate = new Date(year, month, 1); // Start of the next month

    // Fetch transactions within the date range
    const transactions = await Transaction.find({
      userId,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    // Calculate totals
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    res.status(200).json({ totalIncome, totalExpenses, balance });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ message: 'Error fetching summary', error });
  }
});


router.post('/investments/add', async (req, res) => {
  const { userId, type, amount, date, description, currentGrowthRate } = req.body;

  try {
    const newInvestment = new Investment({
      userId,
      type,
      amount,
      date,
      description,
      currentGrowthRate,
    });

    await newInvestment.save();
    res.status(201).json({ message: 'Investment added successfully', investment: newInvestment });
  } catch (error) {
    res.status(500).json({ message: 'Error adding investment', error });
  }
});


router.post('/investments/add', async (req, res) => {

  const { userId, type, amountInvested, dateOfInvestment, currentValuation,growthRate } = req.body;
  try {
    const investment = new Investment({
      userId,
      type,
      amountInvested,
      dateOfInvestment,
      currentValuation,
      growthRate
    });

    await investment.save();
    res.status(201).json({ message: 'Investment added successfully', investment });
  } catch (error) {
    console.error('Error adding investment:', error);
    res.status(500).json({ message: 'Error adding investment', error });
  }
});


router.get('/investments/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const investments = await Investment.find({ userId });
    res.status(200).json(investments);
  } catch (error) {
    console.error('Error fetching investments:', error);
    res.status(500).json({ message: 'Error fetching investments', error });
  }
});


router.get('/investments/filter', async (req, res) => {
  const { userId, type, startDate, endDate } = req.query;

  try {
    const query = { userId };

    if (type) query.type = type;
    if (startDate && endDate) {
      query.dateOfInvestment = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const investments = await Investment.find(query);
    res.status(200).json(investments);
  } catch (error) {
    console.error('Error filtering investments:', error);
    res.status(500).json({ message: 'Error filtering investments', error });
  }
});


module.exports = router;
