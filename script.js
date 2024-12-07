const budgetInput = document.getElementById('budget');
const setBudgetBtn = document.getElementById('set-budget-btn');
const budgetDisplay = document.getElementById('budget-display');
const expensesDisplay = document.getElementById('expenses-display');
const balanceDisplay = document.getElementById('balance-display');
const expenseCategoryDropdown = document.getElementById('expense-category');
const customDetailsInput = document.getElementById('expense-custom-details');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseDateInput = document.getElementById('expense-date');
const expenseRemarksInput = document.getElementById('expense-remarks');
const addExpenseBtn = document.getElementById('add-expense-btn');
const expenseList = document.querySelector('#expense-list tbody');

let totalBudget = 0;
let totalExpenses = 0;

// Show/Hide custom details input based on dropdown selection
expenseCategoryDropdown.addEventListener('change', () => {
  if (expenseCategoryDropdown.value === 'Others') {
    customDetailsInput.style.display = 'inline-block';
    customDetailsInput.value = '';
  } else {
    customDetailsInput.style.display = 'none';
  }
});

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
  const category =
    expenseCategoryDropdown.value === 'Others'
      ? customDetailsInput.value.trim()
      : expenseCategoryDropdown.value;

  const amount = parseFloat(expenseAmountInput.value);
  const date = expenseDateInput.value;
  const remarks = expenseRemarksInput.value.trim();

  if (!category || isNaN(amount) || amount <= 0 || !date) {
    alert('Please fill out all fields correctly!');
    return;
  }

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${category}</td>
    <td>$${amount.toFixed(2)}</td>
    <td>${date}</td>
    <td>${remarks || 'N/A'}</td> <!-- Display remarks, or 'N/A' if empty -->
    <td><button class="delete-btn">Delete</button></td>
  `;

  expenseList.appendChild(row);

  totalExpenses += amount;
  updateDisplays();

  expenseAmountInput.value = '';
  expenseDateInput.value = '';
  expenseRemarksInput.value = ''; // Clear remarks field

  row.querySelector('.delete-btn').addEventListener('click', () => {
    row.remove();
    totalExpenses -= amount;
    updateDisplays();
  });
});
