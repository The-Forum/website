import { Box, Toolbar } from "@mui/material";
import React from "react";
import { Sidebar } from "../components/Sidebar";
import { HeaderBar } from '../components/Header';

export function Homepage() {
    return (
        <Box component="div" sx={{ flexDirection: "column", display: "flex", flex: 1, width: "100%" }}>
            <HeaderBar />
            <Toolbar />
            <Box component="div" sx={{ flexDirection: "row", display: "flex", position: "relative", }}>
                <Sidebar />
                <DaoListHeader />
            </Box>
        </Box>
    );
}

export function DaoTable() {
    return (
        <div>
            <DaoListHeader />
            <DaoList />
        </div>
    )
}

function DaoListHeader() {
    return (
        <div>
            <h1>This is the Dao Header!</h1>
        </div>
    )
}

function DaoList() {
    return (
        <div>
            <h1>This is the DaoList!</h1>
        </div>
    )
}
