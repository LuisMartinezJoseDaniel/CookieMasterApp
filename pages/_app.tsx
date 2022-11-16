import {useEffect, useState} from 'react';
import { GetServerSideProps } from "next";
import type { AppContext, AppProps } from "next/app";
import { ThemeProvider, CssBaseline, Theme } from "@mui/material";
import { customTheme, darkTheme, lightTheme } from "../themes";
import Cookies from 'js-cookie';

interface Props extends AppProps {
  theme: string;
}

export default function App({ Component, pageProps, theme = 'dark' }: Props) {
  // const { theme } = rest;
  const [currentTheme, setCurrentTheme] = useState(lightTheme)
  
  useEffect( () => {
    //* Puede generar el error de not match con el servidor si se usa fuera del useEffect y si no se maneja con un estado
    //* Si el front tiene el theme en dark, y el server tiene light por defecto no se puede recuperar la cookie ya que el component no esta montado provocando un error de not match
    //* Esto quiere decir que el front y el back no estan sincronizados
    const cookieTheme = Cookies.get( 'theme' ) || 'light';

    const selectedTheme: Theme =
      cookieTheme === "light" ? lightTheme : cookieTheme === "dark" ? darkTheme : customTheme;
    
    setCurrentTheme( selectedTheme );
    
  }, [] );
  

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// Similar a getSSR utili para SEO, utilzar con cuidado -> elimina getStaticPaths para las pages con esta caracteristica
// App.getInitialProps = async (appContext: AppContext) => {
//   const { theme } = appContext.ctx.req
//     ? (appContext.ctx.req as any).cookies
//     : { theme: "dark" };
//   const validTheme = ["light", "dark", "custom"];

//   return {
//     theme: validTheme.includes(theme) ? theme : "dark",
//   };
// };
