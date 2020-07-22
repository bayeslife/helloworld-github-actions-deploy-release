
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: `8280867260b138da61789fa34234832971d253e2` });

let event = require(process.env.EVENT)
console.log(JSON.stringify(event,null,' '))

async function getEnvironment(column_id){
    return new Promise((resolve)=>{
        try {
            octokit.request(`GET /projects/columns/:col`, {
                headers: {
                    'Content-Type':'application/json',
                    'Accept': 'application/vnd.github.inertia-preview+json'
                },
                col: column_id,
                type: "private",
            }).then(response=>{
                resolve(response.data)
            })
        }catch(ex){
            console.log(ex)
        }
    })
}

getEnvironment(event.project_card.column_id).then(carddata=>{
    console.log(`Deploy Release ${event.note} to environment ${carddata.name}`)
})
