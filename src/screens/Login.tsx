import { Button } from "@mui/material"
import { useMoralis } from "react-moralis"

export const Login = () => {
    const { authenticate } = useMoralis()
    return (
        <div>
            <h1>
                Please connect your wallet!
            </h1>
            <Button onClick={() => authenticate()}>
                Connect Wallettt
            </Button>
        </div>
    )
}