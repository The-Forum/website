import { ThemeProvider } from "@emotion/react";
import { Box, Button } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useWindowDimensions } from "../components/Hooks";
import { Preference } from "../components/Preference";
import { preference, preferences } from "../util/types";
import styles from "../styles/Home.module.css";
import { firebaseApp, firestore } from "../util/firebaseConnection";
import { doc, setDoc } from "firebase/firestore";
import { useMoralis } from "react-moralis";

export const SignUp = () => {
  const { width, height } = useWindowDimensions();
  const { Moralis, user } = useMoralis();
  const [draggedPref, setDraggedPref] = useState(-1);
  const [clickCoords, setClickCoords] = useState(
    {} as { x: number; y: number }
  );
  const [textCoords, setTextCoords] = useState(
    [] as { x: number; y: number }[]
  );
  useEffect(() => {
    let tmpCoords = [] as { x: number; y: number }[];
    preferences.map((preference: preference, index) => {
      tmpCoords.push({
        x:
          (Math.sin((index / preferences.length) * Math.PI * 2) * width) / 2.5 +
          width / 2,
        y:
          (Math.cos((index / preferences.length) * Math.PI * 2) * height) /
            2.5 +
          height / 2,
      });
    });
    setTextCoords(tmpCoords.slice());
  }, [width]);
  function setPreferences() {
    const prefs = textCoords.map((textCoord, index) => {
      return {
        topic: preferences[index],
        value: Math.sqrt(
          (textCoord.x - width / 2) ** 2 + (textCoord.y - height / 2) ** 2
        ),
      };
    }) as { topic: string; value: number }[];
    setDoc(doc(firestore, "users", user!.attributes.ethAddress), {
      preferences: prefs,
    });
  }
  if (width && textCoords.length > 0)
    return (
      <Box
        component="div"
        sx={{
          backgroundColor: "secondary.main",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: 1,
          width: 1,
          flex: 1,
          userSelect: "none",
        }}
        onMouseMove={(e: any) => {
          if (draggedPref > -1) {
            const tmpCoords = textCoords;
            tmpCoords[draggedPref] = {
              x: e.pageX - clickCoords.x,
              y: e.pageY - clickCoords.y,
            };
            setTextCoords(tmpCoords.slice());
          }
        }}
      >
        <h2>What do you gravitate to?</h2>
        Click on the topics and hold to drag them. Closer to the middle means
        they are more relevant.
        <Button
          onClick={setPreferences}
          variant="contained"
          className={styles.walletButton}
        >
          Confirm your preferences
        </Button>
        {preferences.map((preference: preference, index) => {
          return (
            <Preference
              key={index}
              text={preference}
              x={textCoords[index].x}
              y={textCoords[index].y}
              selected={draggedPref == index}
              setDrag={(drag: boolean, coords: { x: number; y: number }) => {
                if (drag) {
                  setDraggedPref(index);
                  setClickCoords({
                    x: coords.x - textCoords[index].x,
                    y: coords.y - textCoords[index].y,
                  });
                } else {
                  console.log("up");
                  setDraggedPref(-1);
                }
              }}
            />
          );
        })}
      </Box>
    );
  else return null;
};
