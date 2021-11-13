const { ApolloServer, gql } = require('apollo-server');
const dotenv=require("dotenv")
const { MongoClient } = require('mongodb');
dotenv.config();
const {DB_URI,DB_NAME}=process.env;
const bcrypt=require("bcryptjs")


  //
  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      misProyectos: () => []
  },
//Mutationes
Mutation: {
    singUp: async(root,{input},{db})=>{
        const hashedPassword=bcrypt.hashSync(input.password)
        const newUser={
            ...input,
            password:hashedPassword,
        }
    const result= await db.collection("user").insertOne(newUser);
    //Funcion asincrona que puede recibir 3 argumentos y regresa un objeto
    const user=result.ops[0]
    return{
        user,
        token:"token",
    }
}
},
user:{
id:(root)=>{
    return root.Id;
}
}
}
  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
  
  const start= async() =>{
    const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db=client.db(DB_NAME)

    const context={
        db,
    }

    const server = new ApolloServer({ typeDefs, resolvers, context });

    // The `listen` method launches a web server.
    server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    });
  }  
start();


  // A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
  const typeDefs = gql`

  type Query{
      misProyectos:[proyectos!]!
  }
  
  type user{
      id: ID!
      mail: String!
      identificacion: String!
      nombre: String!
      password: String!
      rol: String!
  } 
  
  type proyectos{
      id: ID!
      nombre: String!
      objGenerales: String!
      objEspecicos: String!
      prespuesto: String!
      fechain: String!
      fechafi: String!
      user:[user!]!
  }
  
  type Mutation{
    singUp(input:SingUpInput):AuthUser!
  }

  input SingUpInput{
    mail: String!
    identificacion: String!
    nombre: String!
    password: String!
    rol: String!
  }

  type AuthUser{
      user:user!
      token: String!
  }
  `;
  