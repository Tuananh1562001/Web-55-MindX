import { useState } from "react";
import ExpenseItem from "../expenseItem";
import Card from "../card";
import Chart from "../chart";
import "./index.css"

const Expenses = (props) => {
  const expenseItems = props.expenseItems;
  const [selectedYear, setSelectedYear] = useState("2022")

  const handleOnYearChange = (event) => {
    setSelectedYear(event.target.value)
  }

  const filteredExpenseItems = expenseItems.filter((item) => {
    return item.date.getFullYear() === Number(selectedYear)
  })

  let totalAmount = 0;
  for (let i = 0; i < expenseItems.length; i++) {
    totalAmount = totalAmount + expenseItems[i].amount;
  }
  return (
    <Card className="expenses">
      <div style={{ color: "white" }}>{totalAmount}</div>
      <div className="expense-filter">
        <span>Filter by year</span>
        <select value={selectedYear} onChange={handleOnYearChange}>
          <option value={2020}>2020</option>
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
        </select>
      </div>
      <Chart/>
      {filteredExpenseItems.map((item) => {
        return (
          <ExpenseItem
            key={item.id}
            date={item.date}
            title={item.title}
            amount={item.amount}
          />
        );
      })}
    </Card>
  );
};

export default Expenses;
