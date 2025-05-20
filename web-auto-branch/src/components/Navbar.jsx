import { Box, Container } from "@radix-ui/themes";
import styles from "./Navbar.module.css";

function Navbar() {
    return (
        <Box className={styles.box}>
            <Box>
                <h1 className={styles.title}>
                    Auto<span className="titleSpan">Branch</span>
                </h1>
            </Box>
        </Box>
    );
}

export default Navbar;