import database from "./"


export const dbConnection = () => {
    database
        .authenticate()
        .then(async (e) => {
            console.log("datatbase connection successful")
            database.sync({force: true})
        }).catch(e=> console.error(e))
}


  