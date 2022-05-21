import type { NextPage } from 'next'

import { useState } from 'react'
import Head from 'next/head'

import styles from '@/styles/Home.module.css'
import Intro from '@/components/intro'
import UserInput from '@/components/user-input'
import Footer from '@/components/Footer'

import type { Commits } from './api/fetch-github-events'
import Graphs from '@/components/graphs'

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [commits, setCommits] = useState<Commits>([])
  const [error, setError] = useState<string | undefined>()

  const handleSubmit = async (username: string) => {
    setError(undefined)
    setIsLoading(true)
    try {
      const commitsByRepo = await fetch(
        `/api/fetch-github-events?username=${username}`
      )
        
      if (!commitsByRepo.ok) {
        const error = await commitsByRepo.json()
        throw new Error(error.error)
      }

      const commitsByRepoJson = await commitsByRepo.json()
      setCommits(commitsByRepoJson.commits)
    }
    catch (e: any) {
      if (e instanceof Error)
        setError(`Error from GitHub API: ${e.message}`)
      else
        setError('An unknown error occurred. Check your browser console for more details.')
        console.error(e)
    }
    setIsLoading(false)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>When are you most productive?</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <main>
        <Intro />
        <UserInput onSubmit={handleSubmit} error={error} setError={setError}/>
        {isLoading && <p className={styles.loading}>Loading... (this may take a few seconds)</p>}
        {!isLoading && commits.length > 0 && <Graphs commits={commits} />}
      </main>

      <Footer />
    </div>
  )
}

export default Home
