import { Box, Link } from "@mui/material";
export const Footer = () => {
  return (
    <Box
      sx={{
        flexDirection: "row",
        display: "flex",
        justifyContent: "flex-end",
        backgroundColor: "primary.main",
        alignSelf: "flex-end",
        justifySelf: "flex-end",
        height: 50,
        width: "100%",
      }}
    >
      <Box sx={{ color: "white", alignSelf: "center", marginRight: 10 }}>
        <Link sx={{ color: "white" }} href="https://twitter.com/theDAOforum">
          Twitter
        </Link>
      </Box>
      <Box sx={{ color: "white", alignSelf: "center", marginRight: 10 }}>
        <Link sx={{ color: "white" }} href="https://discord.gg/MvwR5fXs">
          Discord
        </Link>
      </Box>
      <Box sx={{ color: "white", alignSelf: "center", marginRight: 10 }}>
        <Link
          sx={{ color: "white" }}
          href="https://andynzemokalumu.gitbook.io/the-forum/"
        >
          Docs
        </Link>
      </Box>
      <Box sx={{ color: "white", alignSelf: "center", marginRight: 5 }}>
        The Forum 2022
      </Box>
    </Box>
  );
};
