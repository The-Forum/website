
import { CSSProperties } from "@emotion/serialize"
import { Box, Button } from "@mui/material"
import { useMoralis } from "react-moralis"
import styles from '../styles/Home.module.css'

export const Login = () => {
    const { authenticate } = useMoralis()
    return (
        <Box component="div" sx={{
            backgroundColor: "secondary.main",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: 1,
            width: 1,
            flex: 1
        }}>
            <img src="Forum_transparentBG.gif" loading="lazy" className={styles.logo} />
            <Button onClick={() => authenticate()} variant="contained" className={styles.walletButton}>
                Connect Wallet
            </Button>
        </Box>
    )
}