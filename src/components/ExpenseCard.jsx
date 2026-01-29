import { FaArrowUp, FaArrowDown, FaTrash, FaRupeeSign } from 'react-icons/fa';
import { useContext } from 'react';
import { ExpenseContext } from './context/ExpenseContext';

const ExpenseCard = ({ title, amount, id, expenseType, category}) => {
    const {deleteExpenseItem} = useContext(ExpenseContext);
    return (
        <div className="expense-card" id={id}>
            <div className="expense-body">
                <h3>{title}</h3>
                <p style={{ color: expenseType === 'income' ? 'green' : 'red' }}>
                    <span style={{marginRight: 6 + 'px'}}>
                        {expenseType === 'income' ? <FaArrowUp /> : <FaArrowDown />}
                    </span>
                    <FaRupeeSign />{amount}
                </p>
            </div>
            <p className='category'>{category}</p>
            <button onClick={() => deleteExpenseItem(id)} title='Delete'><FaTrash /></button>
        </div>
    )
}

export default ExpenseCard;