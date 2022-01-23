import { Box } from "@mui/material"
import { useWindowDimensions } from "../components/Hooks"
import { Preference } from "../components/Preference"
import { preference, preferences } from "../util/types"

export const SignUp = () => {
    const { width, height } = useWindowDimensions()
    console.log("bufenkm")
    console.log(Math.sin(10 / preferences.length * Math.PI * 2) * 100)
    if (width)
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
                <h1>What do you gravitate to?</h1>
                {preferences.map((preference: preference, index) => {
                    return <Preference text={preference}
                        x={Math.sin(index / preferences.length * Math.PI * 2) * width / 3 + width / 2}
                        y={Math.cos(index / preferences.length * Math.PI * 2) * height / 3 + height / 2} />
                })}
            </Box>
        )
    else
        return null
}