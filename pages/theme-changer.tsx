import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { Layout } from '../components/layouts'
import Cookies from "js-cookie";
import { GetServerSideProps } from 'next'
import axios from 'axios';

interface Props{
   children?: React.ReactNode;
   theme: string;
   name: string;
}

const ThemeChangerPage:FC<Props> = ({theme, name}) => {
  const [currentTheme, setCurrentTheme] = useState( theme );

  console.log(theme, name)

  const onThemeChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    const selectedTheme = e.target.value;
    console.log({selectedTheme});
    setCurrentTheme( selectedTheme );
    Cookies.set( 'theme', selectedTheme );
  }

  const onClick = async () => {
    // todas las cookies viajan por defecto en request time
    const {data} = await axios.get( '/api/hello' );
    console.log( {data} );
  }; 


  useEffect(() => {
    console.log('Cookies', Cookies.get('theme'))
  }, [])
  

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel
                value={"light"}
                control={<Radio />}
                label="light"
              ></FormControlLabel>
              <FormControlLabel
                value={"dark"}
                control={<Radio />}
                label="Dark"
              ></FormControlLabel>
              <FormControlLabel
                value={"custom"}
                control={<Radio />}
                label="Custom"
              ></FormControlLabel>
            </RadioGroup>
          </FormControl>

          <Button onClick={ onClick }>Solicitud</Button>
        </CardContent>
      </Card>
    </Layout>
  );
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // const { data } = await  // your fetch function here

  const {theme ='light', name= 'Name'} = req.cookies;
  
  const validTheme = ['light', 'dark', 'custom'];

  return {
    props: {
      theme: validTheme.includes(theme)? theme : 'dark',
      name,
    }
  }
}

export default ThemeChangerPage