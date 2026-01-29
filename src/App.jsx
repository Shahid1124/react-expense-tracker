import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseCard from './components/ExpenseCard';
import { useContext } from 'react';
import { ExpenseContext } from './components/context/ExpenseContext';

function App() {
  const {
    allExpenses,
    deleteExpenseItem,
    handleChange,
    filteredExpenses,
    total,
    balance
  } = useContext(ExpenseContext);

  return (
    <>
      <div className='expense-tracker'>
        <div className='title'>
          <h2>Track your expenses &#128512;</h2>
        </div>
        <div className='expense-form-container'>
          <ExpenseForm />
        </div>
        <div className='expense-item-container'>
          {
            allExpenses.length > 0 && (
              <div className='filter_item'>
                <h3 className=''>Filter Your Expenses</h3>
                <select id="filter-expense-item" onChange={handleChange}>
                  <option value="all">All</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
            )
          }
          <div className='expense-item'>
            {

              filteredExpenses
              .slice()
              .reverse()
              .map(item => <ExpenseCard key={item.id} {...item} />)

            }
          </div>
          <div className='total' style={{ paddingTop: 40 + 'px' }}>
            {
              allExpenses.length ? <>
                <p>
                  <strong>Income: </strong> {total.income || 0}
                </p>
                <p><strong>Expense: </strong> {total.expenses || 0}</p>
                <p><strong>Balance: </strong> {balance || 0}</p>
              </> : <p style={{ paddingLeft: 10 + 'px' }}><strong>No Transaction yet</strong></p>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
