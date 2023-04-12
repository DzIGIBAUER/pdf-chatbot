import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function() {
    
    const supabase = useSupabaseClient(

    )
    return (
        <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
        />
    )
}