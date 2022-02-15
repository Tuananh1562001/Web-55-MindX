import Card from "../card";
import "./index.css"

const ExpenseItem = (props) => {
  // console.log(props)
  const onAmountClick = () => {
    console.log(props.amount)
  }
  return (
    <Card className="expense-item__container">
        <ExpenseDate date={props.date} />
      <div className="expense-item__title">{props.title}</div>
      <div className="expense-item__amount" onClick={onAmountClick}>${props.amount}</div>
    </Card>
  );
};

const ExpenseDate = (props) => {
  // console.log(props)
  const date = props.date
  const month = date.toLocaleString("en-Us", {month: "short"})
  const day = date.toLocaleString("en-Us", {day: "2-digit"})
  const year = date.getFullYear()
  return (
  <div className="expense-item__date">
      <div className="month">{month}</div>
      <div className="date">{day}</div>
      <div className="year">{year}</div>
    </div>
  )
};

export default ExpenseItem;
