let secret = process.env.SECRET

const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: secret });

let event = require(process.env.EVENT)
//console.log(JSON.stringify(event,null,' '))

let col = event.project_card.column_id

//let col = '10119362'

function getEnvironment(column){
    return new Promise(async (resolve)=>{
        try {
            const response = await octokit.request(`GET /projects/columns/:col`, {
                headers: {
                    'Content-Type':'application/json',
                    'Accept': 'application/vnd.github.inertia-preview+json'
                },
                col: column,
                type: "private",
            });
            resolve(response.data)
        }catch(ex){
            console.log(ex)
        }
    })
}

async function run(){
    let environment = await getEnvironment(col)
    console.log(`Deploy release [${event.project_card.note.trim()}] to environment [${environment.name}]`)
}

run()