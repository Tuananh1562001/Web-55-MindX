import { useState } from "react";
import Expenses from "./components/expenses";
import Form from "./components/form";
import "./App.css"

function App() {
  const [expenseItems] = useState([
    { date: new Date("2022-02-11"), title: "New Phone", amount: 800 },
    {
      date: new Date("2022-03-20"),
      title: "House Improvement",
      amount: 1000,
    },
    { date: new Date("2022-05-01"), title: "Electricity Bill", amount: 50 },
  ]);

  return (
    <div>
      <Form/>
      <Expenses expenseItems={expenseItems}/>
    </div>
  );
}

export default App;
