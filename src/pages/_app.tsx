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
function MyApp({ Component, pageProps }: AppProps) {
  const ScreenSwitch = () => {
    const [userData, setUserData] = useState({} as userDataType | undefined)
    const [loadingUserData, setLoadingUserData] = useState(true)
    const { Moralis } = useMoralis()
    useEffect(() => {
      if (Moralis.account) {
        return onSnapshot(doc(getFirestore(firebaseApp), "users", Moralis.account), (doc) => {
          console.log("hi")
          console.log(doc.data())
          setUserData({ ...doc.data(), id: Moralis.account } as userDataType | undefined)
          setLoadingUserData(false)
        })
      } else {
        setLoadingUserData(false)
      }
    }, [Moralis.account])
    return (
      <UserDataContext.Provider value={userData}>
        {!loadingUserData && <Component {...pageProps} />}
      </UserDataContext.Provider >
    )
  }
  return (
    <Fragment>
      <Head>
        <title>The Forum</title>
        <meta name="description" content="The Forum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider appId="3l6L6Gnoscz18tIvMaoCnTdwpNZ5mq0WJwOz2RTz" serverUrl="https://g3iyt7qela3c.usemoralis.com:2053/server">
        <ThemeProvider theme={theme}>
          <div className={styles.container}>
            <main className={styles.main}>
              <ScreenSwitch />
            </main>
          </div>
        </ThemeProvider>
      </MoralisProvider>

    </Fragment>
  )
}

export default MyApp
