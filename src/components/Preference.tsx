import { Box } from "@mui/system"
import { isAbsolute } from "path/posix"
import { useState } from "react"

export const Preference = (props: { text: string, x: number, y: number }) => {
    const [x, setX] = useState(props.x)
    const [y, setY] = useState(props.y)
    const [text, setText] = useState(props.text)
    console.log(y)
    return (
        <Box component="h2" sx={{
            position: "absolute",
            left: x,
            top: y,
            textAlign: "center"
        }}>
            {text}
        </Box>
    )
}