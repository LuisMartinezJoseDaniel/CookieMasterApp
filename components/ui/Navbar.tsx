import NextLink from "next/link"
import { MenuOutlined } from "@mui/icons-material";
import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";



export const Navbar = () => {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start">
          <MenuOutlined />
        </IconButton>

        <NextLink href={"/"} passHref>
          
            <Typography variant="h6" color="white">
              CookieMater
            </Typography>
          
        </NextLink>

        <div style={{flex:1}}></div>

        <NextLink  href={"/theme-changer"} passHref >
            <Typography variant="h6" color="white">
              Cambiar Tema
            </Typography>

        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
