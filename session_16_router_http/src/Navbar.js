import { NavLink } from "react-router-dom"

const navLinkClassName = (navLinkStatus) => {
    // console.log(navLinkStatus)
    return navLinkStatus.isActive ? "nav-link-active" : ""
}

const NavBar = () => {
    return <div>
        <h2>Welcome to our website</h2>
        <ul>
            <li>
                <NavLink className={navLinkClassName} to="/">Home</NavLink>
            </li>
            <li>
                <NavLink className={navLinkClassName} to="/products">Product</NavLink>
            </li>
            <li>
                <NavLink className={navLinkClassName} to="/about-us">About us</NavLink>
            </li>
            <li>
                <NavLink className={navLinkClassName} to="/users">Users</NavLink>
            </li>
        </ul>
        <hr/>
    </div>
}

export default NavBar