import { useState } from "react";
import Expenses from "./components/expenses";
import Form from "./components/form";
import "./App.css";

function App() {
  const [expenseItems,setExpenseItems] = useState([
    { 
      id: Math.random() * 1000,
      date: new Date("2020-02-11"), 
      title: "New Phone",
      amount: 800 },
    {
      id: Math.random() * 1000,
      date: new Date("2021-03-20"),
      title: "House Improvement",
      amount: 1000,
    },
    { 
      id: Math.random() * 1000,
      date: new Date("2022-05-01"),
      title: "Electricity Bill",
      amount: 50 },
  ]);
  // console.log(expenseItems)

  const handleAddExpenses = (formValue) => {
    setExpenseItems((prev) => {
      return [
        ...prev,
        {
          id: Math.random() * 1000,
          date: new Date(formValue.date),
          title: formValue.title,
          amount: Number(formValue.amount)
        },
        
      ]
    })
  }

  return (
    <div>
      <Form onSubmit={handleAddExpenses} />
      <Expenses expenseItems={expenseItems} />
    </div>
  );
}

export default App;
