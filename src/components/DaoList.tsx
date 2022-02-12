import {
  Box,
  ImageList,
  imageListClasses,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import { dao } from "../util/types";
import { firestore } from "../util/firebaseConnection";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Image from "next/Image";
import styles from "../styles/Home.module.css";
import { useWindowDimensions } from "./Hooks";

export function DaoList(props: {
  title: string;
  daos: (dao | {})[];
  moreDaos: () => void;
  refreshDone: () => void;
}) {
  console.log("more daos not shown");
  return (
    <Box sx={{ paddingLeft: 2, marginTop: 8 }}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        color="primary.main"
      >
        {props.title}
        {props.daos ? (
          <ImageList
            sx={{ display: "flex", flexDirection: "row", flex: 1 }}
            onScroll={(e) => {
              console.log("sroller", e.target);
              if (
                (e.target as any).scrollLeft /
                  (e.target as any).scrollLeftMax ==
                1
              )
                props.moreDaos();
              else props.refreshDone();
            }}
          >
            {props.daos.map((dao, index) => {
              console.log("daaao", dao);
              if (dao != {} && (dao as dao).image)
                return (
                  <ImageListItem
                    key={index}
                    sx={{ width: 200, display: "flex", flex: 1, height: 200 }}
                  >
                    <img
                      src={`${(dao as dao).image}`}
                      className={styles.image}
                      width="300"
                      height="300"
                      alt={(dao as dao).name}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      sx={{ width: 200, height: 50 }}
                      title={(dao as dao).name}
                      subtitle={
                        "hii"
                        /*{<Link
                    href={dao.discord_link}
                    underline="hover"
                    color="primary.main"
                  >
                    Discord
                  </Link>}*/
                      }
                      position="below"
                    />
                  </ImageListItem>
                );
            })}
          </ImageList>
        ) : null}
      </Typography>
    </Box>
  );
}
