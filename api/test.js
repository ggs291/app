const fetch = require("node-fetch")


async function test() {
    console.log(".....................")

    const url = "https://api.github.com/users/ioticos"

    const response = await fetch(url)

    const json = await response.json()
    
    console.log(json.avatar_url)



    console.log(".....................")
}

test()
console.log("END")