import { useMemo, useState, useEffect } from "react";
import { ExpenseContext } from "./ExpenseContext";

const ExpenseProvider = ({ children }) => {
    const STORAGE_KEY = 'Expences';

    const [allExpenses, setAllExpenses] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });
    const [filterType, setFilterType] = useState('all');

    const addExpense = (newItem) => {

        setAllExpenses(prevItem => [...prevItem, newItem])
    }

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allExpenses));
    }, [allExpenses]);

    const handleChange = (event) => {

        setFilterType(event.target.value);
    };

    const deleteExpenseItem = (id) => {

        const filteredData = allExpenses.filter(item => item.id !== id);

        setAllExpenses(filteredData);
    }
    const filteredExpenses = useMemo(() => {
        if (filterType === 'income') {
            return allExpenses.filter((item) => item.expenseType === 'income');
        }
        if (filterType === 'expense') {
            return allExpenses.filter((item) => item.expenseType === 'expense');
        }

        return allExpenses
    }, [filterType, allExpenses])

    const total = useMemo(() => {

        return allExpenses.reduce((acc, curr) => {

            if (curr.expenseType === 'income') acc.income += curr.amount
            else acc.expenses += curr.amount

            return acc;

        }, { income: 0, expenses: 0 });
    }, [allExpenses]);

    const balance = total.income - total.expenses;

    return (
        <ExpenseContext.Provider
            value={{
                STORAGE_KEY,
                allExpenses,
                setAllExpenses,
                addExpense,
                deleteExpenseItem,
                filterType,
                setFilterType,
                handleChange,
                filteredExpenses,
                total,
                balance
            }}
        >
            {children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseProvider;