import { ChangeEvent, useState } from "react"
import { useSupabaseClient } from '@supabase/auth-helpers-react'


export default function Home() {

  const [files, setFiles] = useState<FileList | null>(null)
  const [msg, setMsg] = useState("")

  const supabase = useSupabaseClient()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setFiles(e.target.files)
  
  const msgChange = (e: ChangeEvent<HTMLInputElement>) => setMsg(e.target.value)

  const chat = async () => {
    const { data, error } = await supabase.functions.invoke("chat", {
      body: {
        message: msg
      }
    })

    console.log(data)
  }

  const test = async () => {
    if (!files) return

    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append("pdfFiles", files[i])
    }

    const result = await fetch("api/", {
      method: "POST",
      body: formData,
    }).catch(e => console.error(e))

    console.log(result)


    /*const res = await supabase.functions.invoke("upload-pdf", {
      body: formData
    })

    console.log(res)*/
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      
      <input onChange={handleChange} type="file" multiple className="rounded text-black" />
      <button onClick={test} className="bg-blue-600" >Test</button>
      <input onChange={msgChange} type="text"></input>
      <button onClick={chat} className="bg-blue-600" >ajmo</button>
    </main>
  )
}
