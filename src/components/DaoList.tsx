import {
  Box,
  ImageList,
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

export function DaoList(props: { title: string; categories: string[] }) {
  const [daos, setDaos] = useState([] as dao[]);

  //Read DAOs from firestore on component mount
  useEffect(() => {
    getDocs(
      query(
        collection(firestore, "daos"),
        where("categories", "array-contains-any", props.categories)
      )
    ).then((querySnapshot) => {
      const listDao: dao[] = [];
      querySnapshot.forEach((daoItem) => {
        listDao.push(daoItem.data() as dao);
      });
      setDaos(listDao);
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
          {daos.map((dao) => (
            <ImageListItem key={dao.image}>
              <img
                src={`${dao.image}?fit=crop&auto=format`}
                alt={dao.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={dao.name}
                subtitle={
                  {
                    /*<Link
                    href={dao.discord_link}
                    underline="hover"
                    color="primary.main"
                  >
                    Discord
                  </Link>*/
                  }
                }
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Typography>
    </Box>
  );
}
