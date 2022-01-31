import { Box } from "@mui/material";
import React from "react";
import { Sidebar } from "../components/Sidebar";
import { HeaderBar } from '../components/Header';
import { DaoListHeader } from '../components/DaoList'
import { financeDao } from "../components/DaoList";

export function Homepage() {
    return (
        <Box component="div" sx={{ flexDirection: "column", display: "flex", flex: 1, width: "100%", backgroundColor: "secondary.main" }}>
            <HeaderBar />
            <Box component="div" sx={{ flexDirection: "column", display: "flex", flex: 1 }}>
                <Sidebar width={300} chatBoxHeight={200} />
                <Box sx={{ display: "flex", paddingBottom: "100%" }}>
                    <DaoListHeader daoList={financeDao} />
                </Box>
            </Box>
        </Box>
    );
}
