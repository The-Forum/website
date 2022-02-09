import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { HeaderBar } from "../components/Header";
import { DaoList } from "../components/DaoList";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../util/firebaseConnection";
import { UserDataContext, userDataType } from "../util/types";

export function Homepage(props: { userData: userDataType }) {
  const [categories, setCategories] = useState(
    [] as { categories: string[]; label: string }[]
  );

  useEffect(() => {
    getDoc(doc(firestore, "categories", "lookup")).then((doc) => {
      const daoCategories = doc.data() as { [key: string]: string[] };
      if (!doc.data())
        throw ReferenceError("Can't find DAO categories look up table");
      const tmpCategories = [] as { categories: string[]; label: string }[];
      props.userData &&
        props.userData.preferences &&
        props.userData.preferences.forEach((preference) => {
          tmpCategories.push({
            label: preference,
            categories: daoCategories[preference],
          });
        });
      setCategories(tmpCategories);
    });
  }, [props.userData]); //empty dependecies --> executed once
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
        <Box sx={{ display: "flex", paddingBottom: "100%" }}>
          {categories.map((category, index) => (
            <DaoList
              categories={category.categories}
              title={category.label}
              key={index}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
