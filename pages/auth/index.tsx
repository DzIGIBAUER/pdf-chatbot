import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/router'

export default function() {    
    const supabase = useSupabaseClient()

    const user = useUser()

    const router = useRouter()

    if (user) {
        router.push("/")
    }

    
    return (
        <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
        />
    )
}
