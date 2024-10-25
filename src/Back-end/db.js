const {Client} = require('pg')

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "100603",
  database: "ToolsProject"
})

client.connect();

client.query(`Select * from Public."User" Order By uid ASC`, (err, res) => {
  if(!err){
    console.log(res.rows);
  } else {
    console.log(err.message)
  }
  client.end;
})