import { method } from "lodash"
import { useEffect } from "react"

const Users = () => {
    useEffect(() => {
        fetch("https://randomuser.me/api/?results=10", {
            method: "POST",
        })
            .then((res) => {
                return res.json()
            })
            .then((resJson) => {
                console.log(resJson)
            })
    }, [])
    return <div></div>
}

export default Users