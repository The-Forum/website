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

export function DaoList(props: { title: string; categories: string[] }) {
  const [daos, setDaos] = useState([] as (dao | {})[]);

  //Read DAOs from firestore on component mount
  useEffect(() => {
    getDocs(
      query(
        collection(firestore, "daos"),
        where("categories", "array-contains-any", props.categories)
      )
    ).then((querySnapshot) => {
      const listDao = [] as dao[];
      querySnapshot.forEach((daoItem) => {
        listDao.push(daoItem.data() as dao);
      });
      console.log("liiist");
      console.log(listDao);
      if (listDao && listDao.length > 0) setDaos(listDao);
    });
  }, [props.categories]); //empty dependecies --> executed once
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
          {daos.map((dao, index) => {
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
