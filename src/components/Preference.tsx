import { Box } from "@mui/system"
import { isAbsolute } from "path/posix"
import { memo, useState } from "react"

export const Preference = memo(function Pref(props: { text: string, x: number, y: number, selected: boolean, setDrag: (drag: boolean, coords: { x: number, y: number }) => void }) {
    return (
        <Box component="h2" sx={{
            position: "absolute",
            width: 300,
            height: 100,
            left: props.x - 150,
            top: props.y - 50,
            textAlign: "center",
            alignSelf: "center"
        }}
            onMouseDown={(e: any) => props.setDrag(true, { x: e.pageX, y: e.pageY })}
            onMouseUp={(e: any) => props.setDrag(false, { x: e.pageX, y: e.pageY })}
        >
            {props.text}
        </Box>
    )
}, (prevAnswer: any, newAnswer: any) => {
    //console.log(prevAnswer)
    //console.log(newAnswer.selected != true && prevAnswer != undefined)
    return newAnswer.selected != true && newAnswer.selected != prevAnswer.selected
})