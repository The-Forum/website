import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { HeaderBar } from "../components/Header";
import { DaoList } from "../components/DaoList";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { firestore } from "../util/firebaseConnection";
import { dao, UserDataContext, userDataType } from "../util/types";
import { setDefaultResultOrder } from "dns/promises";

export function Homepage(props: { userData: userDataType }) {
  const [lastCategory, setLastCategory] = useState(-10 as number);
  const [categories, setCategories] = useState(
    [] as {
      categories: string[];
      label: string;
    }[]
  );
  const [daos, setDaos] = useState([] as dao[][]);
  const [lastDao, setLastDao] = useState([] as number[]);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    getDoc(doc(firestore, "lookUp", "sE0YysJAsoFtox9h3Z0M")).then((doc) => {
      const daoCategories = doc.data() as { [key: string]: string[] };
      if (!doc.data())
        throw ReferenceError("Can't find DAO categories look up table");
      const tmpCategories = [] as { categories: string[]; label: string }[];
      const sortedPrefs =
        props.userData &&
        props.userData.preferences &&
        props.userData.preferences.sort((a, b) =>
          a.value > b.value ? 1 : b.value > a.value ? -1 : 0
        );
      sortedPrefs &&
        sortedPrefs.forEach((preference) => {
          tmpCategories.push({
            label: preference.topic,
            categories: daoCategories[preference.topic],
          });
        });
      setCategories(tmpCategories);
      setLastCategory(-1);
    });
  }, [props.userData]); //empty dependecies --> executed once
  //Read DAOs from firestore on component mount
  useEffect(() => {
    if (categories.length > 0) firstDaos(categories, lastCategory);
  }, [categories, lastCategory]); //empty dependecies --> executed once
  async function firstDaos(
    categories: {
      categories: string[];
      label: string;
    }[],
    lastCategory: number
  ) {
    const tmp = new Array(categories.length).fill([{}]) as dao[][];
    console.log("start");
    await Promise.all(
      categories.map(async (category, index) => {
        if (index > lastCategory && index <= lastCategory + 3) {
          const querySnapshot = await getDocs(
            query(
              collection(firestore, "daos"),
              where("categories", "array-contains-any", category.categories),
              limit(10)
            )
          );
          console.log("index", index);
          const listDao = [] as dao[];
          querySnapshot.forEach((daoItem) => {
            listDao.push(daoItem.data() as dao);
          });
          console.log("liiist");
          console.log(listDao);
          if (listDao && listDao.length > 0) tmp[index] = listDao;
        }
      })
    );
    console.log("end");
    if (tmp != []) {
      setDaos(tmp.slice());
      setLastDao(new Array(tmp.length).fill(10));
    }
    setInitializing(false);
  }
  function moreDaos(categoryIndex: number) {
    getDocs(
      query(
        collection(firestore, "daos"),
        where(
          "categories",
          "array-contains-any",
          categories[categoryIndex].categories
        ),
        limit(10),
        startAt(lastDao[categoryIndex])
      )
    ).then((querySnapshot) => {
      const listDao = daos;
      querySnapshot.forEach((daoItem) => {
        listDao[categoryIndex].push(daoItem.data() as dao);
      });
      setDaos(listDao);
    });
  }
  console.log(daos);
  console.log("init", initializing);
  return (
    <Box
      component="div"
      sx={{
        flexDirection: "column",
        display: "flex",
        flex: 1,
        width: "100%",
        backgroundColor: "secondary.main",
      }}
    >
      <HeaderBar />
      <Box
        component="div"
        sx={{ flexDirection: "column", display: "flex", flex: 1 }}
      >
        <Sidebar width={300} chatBoxHeight={200} />
        <Box
          sx={{
            display: "flex",
            paddingBottom: "100%",
            flexDirection: "column",
          }}
        >
          {!initializing
            ? categories.map(
                (category, index) =>
                  index < lastCategory + 3 && (
                    <DaoList
                      moreDaos={() => moreDaos(index)}
                      daos={daos[index]}
                      title={category.label}
                      key={index}
                    />
                  )
              )
            : null}
        </Box>
      </Box>
    </Box>
  );
}
