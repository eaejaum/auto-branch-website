import { Box, Container } from "@radix-ui/themes";
import styles from "./Navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuthContext } from "../context/authContext";

function Navbar() {
    const location = useLocation();
    const { user } = useAuthContext();

    const isAuthenticatedRoute = ['/branches', '/vehicles', '/employees'].includes(location.pathname);

    if (!isAuthenticatedRoute) {
        return null;
    }

    return (
        <div className={styles.box}>
            <h1 className={styles.title}>
                A<span className="titleSpan">B</span>
            </h1>
            <nav>
                <ul className={styles.navList}>
                    {user && user.roleId == 1 && (
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
                    )}
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
                    {user && user.roleId != 3 && (
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
                    )}
                </ul>
            </nav>
            <LogOut className={styles.logout} />
        </div>
    );
}

export default Navbar;