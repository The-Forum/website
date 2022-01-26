import { ThemeProvider } from '@mui/system'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MoralisProvider, useMoralis } from 'react-moralis'
import { Homepage, Header } from '../screens/Homepage'
import { Login } from '../screens/Login'
import { SignUp } from '../screens/SignUp'
import styles from '../styles/Home.module.css'
import { theme } from '../styles/theme'
import { jsx, css } from '@emotion/react'
import { firebaseApp } from '../util/firebaseConnection'
import { collection, doc, DocumentData, DocumentSnapshot, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { userData } from '../util/types'




const Home: NextPage = () => { 
  const ScreenSwitch = () => {
    const [userData, setUserData] = useState({} as userData | undefined)
    const [loadingUserData, setLoadingUserData] = useState(true)
    const { Moralis } = useMoralis()
    useEffect(() => {
      if (Moralis.account) {
        return onSnapshot(doc(getFirestore(firebaseApp), "users", Moralis.account), (doc) => {
          console.log("hi")
          console.log(doc.data())
          setUserData(doc.data() as userData | undefined)
          setLoadingUserData(false)
        })
      }
    }, [Moralis.account])
    return (
      Moralis.account && !loadingUserData ?
        userData && userData.preferences ?
          <Homepage />
          :
          <SignUp />
        :
        <Login />
    )
  }
  return (
    <MoralisProvider appId="3l6L6Gnoscz18tIvMaoCnTdwpNZ5mq0WJwOz2RTz" serverUrl="https://g3iyt7qela3c.usemoralis.com:2053/server">
      <ThemeProvider theme={theme}>
        <Head>
          <title>The Forum</title>
          <meta name="description" content="The Forum" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
          <main className={styles.main}>
            <ScreenSwitch />
          </main>
        </div>
      </ThemeProvider>
    </MoralisProvider>
  )
}

export default Home
/*<div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>*/
