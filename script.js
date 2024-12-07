// Select elements
const budgetInput = document.getElementById('budget');
const setBudgetBtn = document.getElementById('set-budget-btn');
const budgetDisplay = document.getElementById('budget-display');
const expensesDisplay = document.getElementById('expenses-display');
const balanceDisplay = document.getElementById('balance-display');
const expenseDetailsInput = document.getElementById('expense-details');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseDateInput = document.getElementById('expense-date');
const addExpenseBtn = document.getElementById('add-expense-btn');
const expenseList = document.querySelector('#expense-list tbody');

let totalBudget = 0;
let totalExpenses = 0;

// Update displayed values
function updateDisplays() {
  budgetDisplay.textContent = `$${totalBudget.toFixed(2)}`;
  expensesDisplay.textContent = `$${totalExpenses.toFixed(2)}`;
  balanceDisplay.textContent = `$${(totalBudget - totalExpenses).toFixed(2)}`;
}

// Set budget
setBudgetBtn.addEventListener('click', () => {
  const budgetValue = parseFloat(budgetInput.value);
  if (isNaN(budgetValue) || budgetValue <= 0) {
    alert('Please enter a valid budget!');
    return;
  }
  totalBudget = budgetValue;
  updateDisplays();
  budgetInput.value = '';
});

// Add expense
addExpenseBtn.addEventListener('click', () => {
  const details = expenseDetailsInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);
  const date = expenseDateInput.value;

  if (!details || isNaN(amount) || amount <= 0 || !date) {
    alert('Please fill out all fields correctly!');
    return;
  }

  // Add expense row to the table
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${details}</td>
    <td>$${amount.toFixed(2)}</td>
    <td>${date}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  expenseList.appendChild(row);

  // Update totals
  totalExpenses += amount;
  updateDisplays();

  // Clear inputs
  expenseDetailsInput.value = '';
  expenseAmountInput.value = '';
  expenseDateInput.value = '';

  // Delete functionality
  row.querySelector('.delete-btn').addEventListener('click', () => {
    row.remove();
    totalExpenses -= amount;
    updateDisplays();
  });
});
