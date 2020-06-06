// importar dependencia sql3
// verbose configura o sql dizendo que você quer receber mensagens no terminal
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operação no banco de dados
// new (em um construtor) = inicia novo objeto  
const db = new sqlite3.Database("./src/database/database.db")

// nos permite utilizar "require" em outro arquivo
module.exports = db

//método serialize irá rodar uma sequência de código
// db.serialize( () => {
//     //criar tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     //inserir dados na tabela
    // const query = `
    //     INSERT INTO places (
    //         image, 
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?, ?, ?, ?, ?, ?, ?);
    // `
    // const values = [
    //     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
    //     "Colectoria",
    //     "Guilherme Gemballa, Jardim América",
    //     "Número 260",
    //     "Rio do Sul",
    //     "Resíduos Eletrônicos"
    // ]

    // //função que será chamada depois de certo tempo (callback); enquanto não é chamada a aplicação acontece
    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Cadastrado com sucesso")
    //     // this referencia a resposta que o "run" dá (com this não se usa arrow function)
    //     console.log(this)
    // }

    // //db.run(query, values, afterInsertData)

//     //consultar os dados
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão seus registros: ")
    //     console.log(rows)
    // })

//     //deletar os dados
//     db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
//         if(err) {
//             return console.log(err)
//         }

//         console.log("Registro deletado com sucesso")
//     })
// })