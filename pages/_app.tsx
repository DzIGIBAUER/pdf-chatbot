import '../styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
export default MyApp