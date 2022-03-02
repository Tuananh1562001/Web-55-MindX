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
  return (
    <Card className="expenses">
      <div className="expense-filter">
        <span>Filter by year</span>
        <select value={selectedYear} onChange={handleOnYearChange}>
          <option value={2020}>2020</option>
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
        </select>
      </div>
      <Chart data={filteredExpenseItems}/>
      {filteredExpenseItems.length > 0 ? (filteredExpenseItems.map((item) => {
        return (
          <ExpenseItem
            key={item.id}
            date={item.date}
            title={item.title}
            amount={item.amount}
          />
        );
      })
      ) : (<div className="expense-nodata">(No data)</div>)}
    </Card>
  );
};

export default Expenses;
