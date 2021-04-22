import {Link} from "react-router-dom";
import classes from './MainNavigation.module.css'


function MainNavigation() {
    return <header className={classes.header}>
        <div className={classes.logo}>AutoService</div>
        <nav className={classes.nav}>
            <ul className={classes.mainList}>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li className={classes.dropdown}>
                    <a href="#">Handbooks</a>
                    <ul className={classes.drop}>
                        <li><Link to='/employees'>Employees</Link></li>
                        <li><Link to='/positions'>Positions</Link></li>
                        <li><Link to='/privileges'>Privileges</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
        </nav>
    </header>
}

export default MainNavigation