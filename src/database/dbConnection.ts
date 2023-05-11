import database from "./"


export const dbConnection = () => {
    database
        .authenticate()
        .then(async (e) => {
            console.log("datatbase connection successful")
            database.sync({alter: true})
        }).catch(e=> console.error(e))
}


  