import worker from "https://esm.sh/v114/pdfjs-dist@3.5.141/deno/build/pdf.worker.js"

// @ts-ignore fix
navigator.platform = ""
// @ts-ignore fix
window.require = (p: string) => {
    console.log("REQUIRE: ", p)
    if (p === "./pdf.worker.js") {
        console.log(worker)
        // @ts-ignore fix
        console.log(worker.WorkerMessageHandler)
        return worker
    } 
}