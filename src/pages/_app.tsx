import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider, useMoralis } from 'react-moralis'
import { theme } from '../styles/theme'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import { firebaseApp } from '../util/firebaseConnection'
import { UserDataContext, userDataType } from '../util/types'
import styles from "../styles/Home.module.css"
import { ThemeProvider, useTheme } from '@mui/material'
import { EgldSendTransaction } from '@tatumio/tatum'
import { SettingsInputAntennaTwoTone } from '@mui/icons-material'
function MyApp({ Component, pageProps }: AppProps) {
  const ScreenSwitch = () => {
    const [userData, setUserData] = useState({} as userDataType | undefined)
    const [loadingUserData, setLoadingUserData] = useState(true)
    const [init,setInit]=useState(true)
    const { Moralis,isAuthenticated,user } = useMoralis()
    useEffect(() => {
      console.log("you shouldnt see this too often!!")
      console.log(user&&user.attributes)
      if (user&&user.attributes&&user.attributes.ethAddress&&isAuthenticated) {
        console.log("dreii",user.attributes.ethAddress)
        return onSnapshot(doc(getFirestore(firebaseApp), "users", user.attributes.ethAddress), (doc) => {
          console.log("drei",console.log(doc.data()))
          setUserData({ ...doc.data(), id: user!.attributes.ethAddress } as userDataType | undefined)
          setLoadingUserData(false)
        })
      } else if(user) {
        setUserData(undefined)
      }
      setInit(false)
    }, [isAuthenticated,user,Moralis])
    useEffect(()=>{
      if(Moralis)
      setInit(false)
    },[Moralis])
    /*useEffect(()=>{
      const event=Moralis.onWeb3Deactivated((result) => {
        console.log("logout!!")
        Moralis.User.logOut()
      });
    },[])*/
    console.log("authii",isAuthenticated)
    console.log("authii",user)
    console.log("authii",user?.attributes)
    console.log("authii",user&&Moralis.User.current())
    console.log("loaduser",loadingUserData)
    console.log("init",init)
    if(!init)
      return (
          <Component {...pageProps} userData={userData} loadUserData={loadingUserData}/>
      )
    else return null
  }
  return (
    <Fragment>
      <Head>
        <title>The Forum</title>
        <meta name="description" content="The Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <MoralisProvider appId="3l6L6Gnoscz18tIvMaoCnTdwpNZ5mq0WJwOz2RTz" serverUrl="https://g3iyt7qela3c.usemoralis.com:2053/server">
          <div className={styles.container}>
            <main className={styles.main}>
              <ScreenSwitch />
            </main>
          </div>
        </MoralisProvider>
      </ThemeProvider>
    </Fragment>
  )
}

export default MyApp
