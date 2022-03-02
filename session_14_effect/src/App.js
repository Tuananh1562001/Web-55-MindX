import {useState, useEffect} from "react"

function App() {
  const [count, setCount] = useState(0)

  /**
   * 1st args: function that will run after every changes of dependencies
   * 2nd args: array of dependencies
   */
  
  useEffect(() => {
    document.title = "You have click 0 times"
  }, [])

  return (
    <div>
      <button onClick={() => {
        setCount(count + 1)
        document.title = `You have click ${count + 1} times`
      }}>Increase</button>
    {count}
    <button onClick={() => {
      setCount(count - 1)
      document.title = `You have click ${count - 1} times`
    }}>Decrease</button>
    </div>
  );
}

export default App;
