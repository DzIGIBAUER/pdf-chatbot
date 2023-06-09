import { useUser } from '@supabase/auth-helpers-react'

import { Container, Text, Link, Spacer, Grid } from "@nextui-org/react"

import Upload from '@/components/Upload'
import Chat from '@/components/Chat'
import Head from 'next/head'

export default function Home() {

  const user = useUser()

  return (
    <>
	    <Head>
        <title>PDF Chatbot</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Text size={25}>PDF Chatbot</Text>
          <Text size={16}>Need someone to talk with about your documents?</Text>
        </Container>
        <Spacer y={7} />
        <Container>
          {user ? (
            <Grid.Container>
              <Grid xs={12} sm={6}>
                <Upload />
              </Grid>
              
              <Grid xs={12} sm={6}>
                <Chat />
              </Grid>
            </Grid.Container>
          ) : (
            <Link href="/auth">Please login first</Link>
          )}
        <Spacer y={5} />
        </Container>
      </main>
   </>
  )
}
