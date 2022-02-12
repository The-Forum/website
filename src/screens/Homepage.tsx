import { Box, List } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { firestore } from "../util/firebaseConnection";
import { dao, UserDataContext, userDataType } from "../util/types";
import { setDefaultResultOrder } from "dns/promises";
import { useWindowDimensions } from "../components/Hooks";
import _ from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
export function Homepage(props: { userData: userDataType }) {
  const { width, height } = useWindowDimensions();
  const homepageWidth = width - 300 - 16;
  const [lastCategory, setLastCategory] = useState(-10 as number);
  const [categories, setCategories] = useState(
    [] as {
      categories: string[];
      label: string;
    }[]
  );
  const [daos, setDaos] = useState([] as dao[][]);
  const [lastDao, setLastDao] = useState(
    [] as QueryDocumentSnapshot<DocumentData>[]
  );
  const [initializing, setInitializing] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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
    const tmp = daos
      ? daos
      : (new Array(categories.length).fill([{}]) as dao[][]);
    const lastDao = new Array(categories.length).fill(
      {}
    ) as QueryDocumentSnapshot<DocumentData>[];
    console.log("start");
    await Promise.all(
      categories.map(async (category, index) => {
        if (index > lastCategory && index <= lastCategory + 4) {
          const querySnapshot = await getDocs(
            query(
              collection(firestore, "daos"),
              where("categories", "array-contains-any", category.categories),
              orderBy("followersCount", "desc"),
              limit(10)
            )
          );
          console.log("index", index);
          const listDao = [] as dao[];
          querySnapshot.forEach((daoItem) => {
            listDao.push(daoItem.data() as dao);
          });
          console.log("liiist", listDao);
          if (listDao && listDao.length > 0) {
            lastDao[index] = querySnapshot.docs.at(-1)!;
            tmp[index] = listDao;
          }
        }
      })
    );
    console.log("end");
    if (tmp != []) {
      setDaos(tmp.slice());
      setLastDao(lastDao.slice());
    }
    setInitializing(false);
  }
  function moreDaos(categoryIndex: number) {
    if (!refreshing) {
      getDocs(
        query(
          collection(firestore, "daos"),
          where(
            "categories",
            "array-contains-any",
            categories[categoryIndex].categories
          ),
          limit(10),
          orderBy("followersCount", "desc"),
          startAfter(lastDao[categoryIndex])
        )
      ).then((querySnapshot) => {
        const listDao = daos;
        querySnapshot.forEach((daoItem) => {
          listDao[categoryIndex].push(daoItem.data() as dao);
        });
        console.log("more", listDao);
        if (querySnapshot.docs && querySnapshot.docs.length > 0) {
          setDaos(listDao.slice());
          lastDao[categoryIndex] = querySnapshot.docs.at(-1)!;
        }
      });
      setRefreshing(true);
    }
  }
  return (
    <Box
      component="div"
      sx={{
        display: "block",
        width: "100%",
        backgroundColor: "secondary.main",
        height: "100%",
        scrollBehavior: "smooth",
      }}
    >
      <HeaderBar />
      <Box
        component="div"
        sx={{ flexDirection: "column", display: "flex", flex: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: homepageWidth,
          }}
          component="div"
        >
          {!initializing ? (
            <InfiniteScroll
              dataLength={lastCategory + 4} //This is important field to render the next data
              next={() => setLastCategory(lastCategory + 4)}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              // below props only if you need pull down functionality
            >
              {categories
                .slice(undefined, lastCategory + 5)
                .map((category, index) => (
                  <DaoList
                    moreDaos={() => moreDaos(index)}
                    daos={daos[index]}
                    title={category.label}
                    key={index}
                    refreshDone={() => setRefreshing(false)}
                  />
                ))}
            </InfiniteScroll>
          ) : null}
        </Box>
        <Sidebar width={300} chatBoxHeight={200} />
      </Box>
    </Box>
  );
}
/*? categories.map((category, index) =>
                index <= lastCategory + 4 ? (
                  <DaoList
                    moreDaos={() => moreDaos(index)}
                    daos={daos[index]}
                    title={category.label}
                    key={index}
                    refreshDone={() => setRefreshing(false)}
                  />
                ) : null
              )*/
