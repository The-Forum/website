import { ThemeProvider } from '@mui/system'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { MoralisProvider, useMoralis } from 'react-moralis'
import { Homepage } from '../screens/Homepage'
import { Login } from '../screens/Login'
import { SignUp } from '../screens/SignUp'
import styles from '../styles/Home.module.css'
import { theme } from '../styles/theme'
import { firebaseApp } from '../util/firebaseConnection'
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { UserDataContext, userDataType } from '../util/types'
import { useTheme } from '@mui/material'


const Home: NextPage = (props:{userData:userDataType}) => {
  const { Moralis,user} = useMoralis()
  console.log("user",user&&user.attributes.ethAddress)
  return (
    user&&user.attributes.ethAddress ?
      props.userData && props.userData.preferences ?
        <Homepage userData={props.userData} />
        :
        <SignUp />
      :
      <Login />
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
