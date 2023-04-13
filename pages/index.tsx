import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import { Container, Text, Link, Col, Row, Spacer, Grid } from "@nextui-org/react"

import Upload from '@/components/Upload'
import Chat from '@/components/Chat'

export default function Home() {

  const user = useUser()

  return (
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
  )
}
