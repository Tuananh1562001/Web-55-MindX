import "./index.css";

const Card = (props) => {
  // console.log(props)
  return <div className={"card " + props.className}>{props.children}</div>;
};

export default Card;
