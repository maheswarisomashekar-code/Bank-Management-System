const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite DB
const db = new sqlite3.Database('./bank.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite database.');
});

// Create tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    balance REAL DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    type TEXT,
    amount REAL,
    note TEXT,
    phoneNumber TEXT,
    date TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);
});

// --- Signup ---
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const sql = `INSERT INTO users (username, password, balance) VALUES (?, ?, 0)`;
  
  db.run(sql, [username, password], function (err) {
    if (err) return res.status(400).json({ message: 'Username already exists' });

    const userId = this.lastID;

    // Pre-fill transactions for demo
    const initialTransactions = [
      { type: 'Deposit', amount: 1000, note: 'Initial deposit' },
      { type: 'Deposit', amount: 500, note: 'Salary credited' },
      { type: 'Withdraw', amount: 200, note: 'ATM withdrawal' },
      { type: 'Bill Payment', amount: 150, note: 'Electricity bill' },
      { type: 'Recharge', amount: 100, note: 'Mobile recharge' },
    ];

    initialTransactions.forEach(tx => {
      db.run(
        `INSERT INTO transactions (userId, type, amount, note, phoneNumber, date)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, tx.type, tx.amount, tx.note, '', new Date().toISOString()]
      );
    });

    res.json({ message: 'Signup successful', userId: userId });
  });
});

// --- Login ---
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
  db.get(sql, [username, password], (err, row) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    if (!row) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    res.json({
      success: true,
      message: 'Login successful',
      user: { id: row.id, username: row.username, balance: row.balance }
    });
  });
});


// --- Get Balance ---
app.get('/balance/:userId', (req, res) => {
  const sql = `SELECT balance FROM users WHERE id = ?`;
  db.get(sql, [req.params.userId], (err, row) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (!row) return res.status(404).json({ message: 'User not found' });
    res.json({ balance: row.balance });
  });
});

// --- Transactions (Deposit, Withdraw, Transfer, Bill Payment, Recharge) ---
app.post('/transaction', (req, res) => {
  const { userId, type, amount, note, phoneNumber } = req.body;
  db.get(`SELECT balance FROM users WHERE id = ?`, [userId], (err, row) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (!row) return res.status(404).json({ message: 'User not found' });

    let newBalance = row.balance;
    if (type === 'Withdraw' || type === 'Transfer' || type === 'Bill Payment' || type === 'Recharge') {
      if (newBalance < amount) return res.status(400).json({ message: 'Insufficient balance' });
      newBalance -= amount;
    } else if (type === 'Deposit') {
      newBalance += amount;
    }

    db.run(`UPDATE users SET balance = ? WHERE id = ?`, [newBalance, userId], function (err) {
      if (err) return res.status(500).json({ message: 'Database error' });

      db.run(
        `INSERT INTO transactions (userId, type, amount, note, phoneNumber, date) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, type, amount, note || '', phoneNumber || '', new Date().toISOString()],
        function (err) {
          if (err) return res.status(500).json({ message: 'Database error' });
          res.json({ message: `${type} successful`, balance: newBalance });
        }
      );
    });
  });
});

// --- Get Transactions ---
app.get('/transactions/:userId', (req, res) => {
  const sql = `SELECT * FROM transactions WHERE userId = ? ORDER BY date DESC`;
  db.all(sql, [req.params.userId], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(rows);
  });
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
// --- Loan endpoint ---
app.post('/loan', (req, res) => {
  const { userId, amount } = req.body;
  db.get(`SELECT balance FROM users WHERE id = ?`, [userId], (err, row) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (!row) return res.status(404).json({ message: 'User not found' });

    const newBalance = row.balance + amount;

    db.run(`UPDATE users SET balance = ? WHERE id = ?`, [newBalance, userId], function (err) {
      if (err) return res.status(500).json({ message: 'Database error' });

      db.run(
        `INSERT INTO transactions (userId, type, amount, note, phoneNumber, date) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, 'Loan', amount, 'Loan credited', '', new Date().toISOString()],
        function (err) {
          if (err) return res.status(500).json({ message: 'Database error' });
          res.json({ message: 'Loan approved', balance: newBalance });
        }
      );
    });
  });
});
