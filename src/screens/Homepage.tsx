import { Box, List } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { HeaderBar } from "../components/Header";
import { DaoList } from "../components/DaoList";
import {
  collection,
  doc,
  DocumentData,
  documentId,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
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
  const homepageWidth = width - 16;
  const [lastCategory, setLastCategory] = useState(-10 as number);
  const [categories, setCategories] = useState(
    [] as {
      categories?: string[];
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
      const tmpCategories = [] as { categories?: string[]; label: string }[];
      if (props.userData.joinedDAOs && props.userData.joinedDAOs.length > 0) {
        tmpCategories.push({ label: "Your DAOs" });
      }
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
      categories?: string[];
      label: string;
    }[],
    lastCategory: number
  ) {
    const tmp = daos
      ? daos
      : (new Array(categories.length).fill([{}]) as dao[][]);
    const tmpLastDao = lastDao
      ? lastDao
      : (new Array(categories.length).fill({}) as QueryDocumentSnapshot<
          DocumentData
        >[]);
    console.log("1start");
    await Promise.all(
      categories.map(async (category, index) => {
        if (index > lastCategory && index <= lastCategory + 4) {
          console.log("1index", index);
          let querySnapshot: QuerySnapshot<DocumentData>;
          if (category.categories)
            querySnapshot = await getDocs(
              query(
                collection(firestore, "daos"),
                where("categories", "array-contains-any", category.categories),
                orderBy("followersCount", "desc"),
                limit(10)
              )
            );
          else
            querySnapshot = await getDocs(
              query(
                collection(firestore, "daos"),
                where(
                  documentId(),
                  "in",
                  props.userData.joinedDAOs?.sort().slice(0, 10)
                )
              )
            );
          console.log("index", index);
          const listDao = [] as dao[];
          querySnapshot.forEach((daoItem) => {
            listDao.push(daoItem.data() as dao);
          });
          console.log("liiist", listDao);
          if (listDao && listDao.length > 0) {
            tmpLastDao[index] = querySnapshot.docs.at(-1)!;
            //console.log("mmh one last dao", lastDao[index]);
            tmp[index] = listDao;
          }
        }
      })
    );
    console.log("1end");
    if (tmp != []) {
      console.log("mmhLastDao", tmpLastDao);
      console.log("mmhLastDao", tmp);
      setDaos(tmp.slice());
      setLastDao(tmpLastDao.slice());
    }
    setInitializing(false);
  }
  async function moreDaos(categoryIndex: number) {
    console.log("mmh", lastDao[categoryIndex]);
    if (!refreshing) {
      let querySnapshot = [] as QuerySnapshot<DocumentData>;
      if (categories[categoryIndex].categories)
        querySnapshot = await getDocs(
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
        );
      else {
        const lastIndex = props.userData.joinedDAOs!.findIndex(
          (joinedDao) => joinedDao == lastDao[categoryIndex].data().id
        );
        console.log(
          "lastIndex",
          props.userData.joinedDAOs?.sort().slice(lastIndex + 1, lastIndex + 11)
        );
        if (
          props.userData.joinedDAOs?.sort().slice(lastIndex + 1, lastIndex + 11)
            .length &&
          props.userData.joinedDAOs?.sort().slice(lastIndex + 1, lastIndex + 11)
            .length > 0
        )
          querySnapshot = await getDocs(
            query(
              collection(firestore, "daos"),
              where(
                documentId(),
                "in",
                props.userData.joinedDAOs
                  ?.sort()
                  .slice(lastIndex + 1, lastIndex + 11)
              )
            )
          );
      }
      const listDao = daos;
      const tmpLastDao = lastDao;
      querySnapshot.forEach((daoItem) => {
        listDao[categoryIndex].push(daoItem.data() as dao);
      });
      console.log("more", listDao);
      if (querySnapshot.docs && querySnapshot.docs.length > 0) {
        setDaos(listDao.slice());
        tmpLastDao[categoryIndex] = querySnapshot.docs.at(-1)!;
        setLastDao(tmpLastDao);
      }
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
      <HeaderBar userId={props.userData && props.userData.id} />
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
        {/*<Sidebar width={300} chatBoxHeight={200} />*/}
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
