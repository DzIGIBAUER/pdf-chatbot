// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "http/server.ts"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { SupabaseVectorStore  } from "langchain/vectorstores/supabase"
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "langchain/prompts"
import { LLMChain } from "langchain/chains"
import { Document } from "langchain/document"

import { createClient } from "../_shared/supabaseClient.ts"
import { corsHeaders } from "../_shared/cors.ts";


const embeddings = new OpenAIEmbeddings({modelName: "gpt-3.5-turbo"})

const llm = new ChatOpenAI({modelName: "gpt-3.5-turbo"})

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `You are a chatbot having a conversation with a human.

    Given the following extracted parts of a long document and chat history, answer the users question.
    
    {docs}`
  ),
  HumanMessagePromptTemplate.fromTemplate("{message}")
])

const chain = new LLMChain({
  prompt: chatPrompt,
  llm,
  verbose: true
})

serve(async (req) => {

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { message } = await req.json()

  const client = createClient(req)

  const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
    queryName: "match_documents"  
  })

  const data = await vectorStore.similaritySearchWithScore(message)

  console.log(data)

  /*const result = await chain.call({
    message,
    docs: data,
  })*/

  vectorStore.addDocuments([
    new Document({ pageContent: message, metadata: { source: "human" } })
    //new Document({ pageContent: message, metadata: { source: "AI" } })
  ])

  return new Response(
    JSON.stringify(data),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  )
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
