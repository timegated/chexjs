import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Welcome from './components/Welcome'
import { useModels } from '@/hooks/useModels'


export default function Home() {
  const { data } = useModels();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainContent}>
        <h1>There are currently {data.length} models available</h1>
        <Welcome />
      </main>
    </>
  )
}
