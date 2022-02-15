import { useState } from "react"

const Form = () => {
    const [count, setCount] = useState(0)
    // console.log(count)

    /* State trong React 
    const [anotherCount, setAnotherCount] = useState(1)
    const [arr, setArr] = useState(["hello", "world"])
    const [obj, setObj] = useState({hello: "world"})
    console.log(arr)
    */


    const onIncreaseClick = () => {
        setCount(count + 1)
        // setAnotherCount(anotherCount * 2)
    }

    return(
        <div>
            <button onClick={onIncreaseClick}>Increase</button>
            <span id="count" style={{color: "white"}}>{count}</span><br/>
            {/* <span id="count" style={{color: "white"}}>{anotherCount}</span> */}
        </div>
    )
}

export default Form