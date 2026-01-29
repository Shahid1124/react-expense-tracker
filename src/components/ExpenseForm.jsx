import { useState, useContext } from 'react';
import './expenseForm.css'

import { ExpenseContext } from './context/ExpenseContext';


const ExpenseForm = () => {

    const { addExpense } = useContext(ExpenseContext);

    const [userInput, setUserInput] = useState({
        expenseType: '',
        category: '',
        title: '',
        amount: ''
    });

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUserInput((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const addItem = () => {
        if (
            !userInput.expenseType ||
            !userInput.category ||
            !userInput.title.trim() ||
            Number(userInput.amount) <= 0
        ) {
            alert('Please fill the required fields!.');
            return
        };

        addExpense({
            id: Math.floor(Math.random() * 10000),
            ...userInput,
            amount: Number(userInput.amount)
        });
        setUserInput({
            expenseType: '',
            category: '',
            title: '',
            amount: ''
        });
    }
    return (
        <div className="form">
            <div className="formContainer">
                <div className='select-input'>
                    <select
                        name="expenseType"
                        value={userInput.expenseType}
                        onChange={inputHandler}
                    >
                        <option value="" disabled>Select type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <select
                        name="category"
                        value={userInput.category}
                        onChange={inputHandler}
                    >
                        <option value="" disabled>Category</option>
                        <option value="food">Food</option>
                        <option value="rend">Rent</option>
                        <option value='salary'>Salary</option>
                    </select>
                </div>


                <input
                    type="text"
                    name="title"
                    placeholder="Transaction name"
                    value={userInput.title}
                    onChange={inputHandler}
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    value={userInput.amount}
                    onChange={inputHandler}
                />

                <button onClick={addItem}>Add Item</button>
            </div>
        </div>
    )
}
export default ExpenseForm;