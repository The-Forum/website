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

export function DaoList(props: {
  title: string;
  daos: (dao | {})[];
  moreDaos: () => void;
}) {
  return (
    <Box sx={{ paddingLeft: 2, marginTop: 8 }}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        color="primary.main"
      >
        {props.title}
        <ImageList
          sx={{ display: "flex", flexDirection: "row", width: 1200 }}
          rowHeight={300}
        >
          {props.daos.map((dao, index) => {
            console.log("daaao", dao);
            if (dao != {})
              return (
                <ImageListItem key={index}>
                  <img
                    src={`${(dao as dao).image}`}
                    className={styles.image}
                    alt={(dao as dao).name}
                    loading="lazy"
                  />
                  <ImageListItemBar
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
      </Typography>
    </Box>
  );
}
