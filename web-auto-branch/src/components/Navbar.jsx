import { Box, Container } from "@radix-ui/themes";
import styles from "./Navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    const isAuthenticatedRoute = ['/branches', '/vehicles', '/employees'].includes(location.pathname);

    if (!isAuthenticatedRoute) {
        return null;
    }

    return (
        <div className={styles.box}>
            <h1 className={styles.title}>
                Auto<span className="titleSpan">Branch</span>
            </h1>
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <NavLink
                            to="/branches"
                            className={({ isActive }) =>
                                isActive ? styles.navLinkActive : styles.navLink
                            }
                        >
                            Concessionárias
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/vehicles"
                            className={({ isActive }) =>
                                isActive ? styles.navLinkActive : styles.navLink
                            }
                        >
                            Veículos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/employees"
                            className={({ isActive }) =>
                                isActive ? styles.navLinkActive : styles.navLink
                            }
                        >
                            Funcionários
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <NavLink
                to="/logout"
                className={styles.logout}
            >
                *logout
            </NavLink>
        </div>
    );
}

export default Navbar;