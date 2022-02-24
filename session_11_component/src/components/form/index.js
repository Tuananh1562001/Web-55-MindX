import { useState } from "react";
import Card from "../card";
import "./index.css";
/* State trong React 
    const [anotherCount, setAnotherCount] = useState(1)
    const [arr, setArr] = useState(["hello", "world"])
    const [obj, setObj] = useState({hello: "world"})
    console.log(arr)
*/
const Form = (props) => {
  // console.log(props)
  const [formVisible, setFormVisible] = useState();

  const [formValue, setFormValue] = useState({
    title: "",
    date: "",
    amount: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(formValue)
    resetForm();
  };

  const resetForm = () => {
    setFormValue({
      title: "",
      date: "",
      amount: 0,
    });
    setFormVisible(false);
  };

  const handleFormValueChange = (event) => {
    // setFormValue({
    //   ...formValue,
    //   [event.target.name]: event.target.value,
    // });

    setFormValue((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const showForm = () => {
    setFormVisible(true);
  };

  if (!formVisible) {
    return (
      <Card className="form__container">
        <button  onClick={showForm}>New expense</button>
      </Card>
    );
  }

  return (
    <Card className="form__container">
      <form onSubmit={handleFormSubmit} onReset={resetForm} className="form">
        <div className="form-input__container">
          <div className="form-input__item">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formValue.title}
              onChange={handleFormValueChange}
            />
          </div>
          <div className="form-input__item">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formValue.date}
              onChange={handleFormValueChange}
            />
          </div>
          <div className="form-input__item">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formValue.amount}
              onChange={handleFormValueChange}
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit">Add Expenses</button>
          <button type="reset">Cancel</button>
        </div>
      </form>
    </Card>
  );
};

export default Form;
