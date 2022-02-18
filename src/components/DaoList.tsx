import {
  Box,
  ImageList,
  imageListClasses,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import Link from "next/link"; //"@mui/material/Link";
import { dao } from "../util/types";
import { firestore } from "../util/firebaseConnection";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  where,
} from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import Image from "next/Image";
import styles from "../styles/Home.module.css";
import { useWindowDimensions } from "./Hooks";
import { useRouter } from "next/router";

export function DaoList(props: {
  title: string;
  daos: (dao | {})[];
  moreDaos: () => void;
  refreshDone: () => void;
}) {
  const router = useRouter();

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
          sx={{ display: "flex", flexDirection: "row", flex: 1 }}
          onScroll={(e) => {
            if (
              props.daos &&
              (e.target as any).scrollLeft / (e.target as any).scrollLeftMax ==
                1
            )
              props.moreDaos();
            else props.refreshDone();
          }}
        >
          {props.daos && props.daos.length > 0
            ? props.daos.map((dao, index) => {
                return (
                  <ImageListItem
                    key={index}
                    sx={{
                      width: 200,
                      display: "flex",
                      justifyContent: "flex-start",
                      height: 200,
                    }}
                    onClick={() =>
                      dao != {} &&
                      (dao as dao).image &&
                      router.push("daos/[daoid]", "daos/" + (dao as dao).id)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {dao != {} && (dao as dao).image ? (
                      <img
                        src={`${(dao as dao).image}`}
                        className={styles.image}
                        width="200"
                        height="200"
                        alt={(dao as dao).name}
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src={"/Forum_transparentBG.gif"}
                        className={styles.image}
                        width="200"
                        height="200"
                        alt={(dao as dao).name}
                        loading="lazy"
                      />
                    )}
                    <ImageListItemBar
                      sx={{ width: 200, height: 50 }}
                      title={(dao as dao).name}
                      subtitle={
                        (dao as dao).followersCount
                          ? "Followers: " + (dao as dao).followersCount
                          : "Loading"
                      }
                      position="below"
                    />
                  </ImageListItem>
                );
              })
            : ["", "", "", "", "", "", "", "", "", ""].map((loader, index) => (
                <ImageListItem
                  key={index}
                  sx={{
                    width: 200,
                    display: "block",
                    justifyContent: "flex-start",
                    height: 200,
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={"/Forum_transparentBG.gif"}
                    className={styles.image}
                    width="200"
                    height="200"
                    loading="lazy"
                  />
                  <ImageListItemBar
                    sx={{ width: 200, height: 50 }}
                    title={"Loading"}
                    subtitle={"Loading"}
                    position="below"
                  />
                </ImageListItem>
              ))}
        </ImageList>
      </Typography>
    </Box>
  );
}
