let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const form = document.getElementById('expense-form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const date = document.getElementById('date');
const expenseList = document.getElementById('expenses');
const balance = document.getElementById('balance');

function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach((exp, index) => {
    const li = document.createElement('li');
    li.className = 'expense-item ' + (exp.amount >= 0 ? 'positive' : 'negative');
    li.innerHTML = `
      ${exp.date} - ${exp.description}: ${exp.amount} RWF
      <span>
        <button class="edit" onclick="editExpense(${index})">Edit</button>
        <button class="delete" onclick="deleteExpense(${index})">Delete</button>
      </span>
    `;
    expenseList.appendChild(li);
    total += parseFloat(exp.amount);
  });

  balance.textContent = total.toFixed(2);
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const newExpense = {
    description: description.value,
    amount: parseFloat(amount.value),
    date: date.value
  };

  if (!newExpense.description || isNaN(newExpense.amount) || !newExpense.date) {
    alert('Please fill all fields correctly.');
    return;
  }

  expenses.push(newExpense);
  renderExpenses();
  form.reset();
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

function editExpense(index) {
  const exp = expenses[index];
  description.value = exp.description;
  amount.value = exp.amount;
  date.value = exp.date;
  expenses.splice(index, 1);
  renderExpenses();
}

renderExpenses();
