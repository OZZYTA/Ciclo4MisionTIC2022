const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config();

const { DB_URI, DB_NAME, JWT_SECRET } = process.env;
const getToken = (user) => jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30 days' });
const getUserFromToken = async (token, db) => {
   // if (!token) { return "OK" }  
    const tokenData = jwt.verify(token, JWT_SECRET);
    return await db.collection('user').findOne({ _id: ObjectId(tokenData.id) });
  }

  //
  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    //Query: {
      //misProyectos: () => []
  //},
  Query: {
    myTaskLists: async (_, __, { db }) => {
      return await db.collection('TaskList')
                                .find()
                                .toArray();
    },
  },

//Mutationes
Mutation: {
    signUp: async(root,{input},{db})=>{
        const hashedPassword=bcrypt.hashSync(input.password)
        const newUser={
            ...input,
            password:hashedPassword,
        }
    const result= await db.collection("user").insertOne(newUser);
    //Funcion asincrona que puede recibir 3 argumentos y regresa un objeto
    return{
        user:newUser,
        token:getToken(newUser),
    }
},

signIn: async(root,{input},{db})=>{
    const user = await db.collection('user').findOne({ email: input.email });
    const isPasswordCorrect = user && bcrypt.compareSync(input.password, user.password);

    if (!user || !isPasswordCorrect) {
      throw new Error('Credenciales erroneas :(');
    }

    return {
      user,
      token: getToken(user),
    }
  },

createTaskList: async(root,{title},{db, user})=>{
    if(!user){console.log("No esta autenticado, por favor inicie sesión.")}

    const newTaskList={
        title,
        createdAt: new Date().toISOString(),
        userIds:[user._id,user.nombre]
    }
    const result= await db.collection("TaskList").insertOne(newTaskList);
    return newTaskList
},

updateTaskList : async(_, {id, title}, {db, user}) =>{
    if(!user){console.log("No esta autenticado, por favor inicie sesión.")}

    const result= await db.collection("TaskList")
                        .updateOne({_id:ObjectId(id)
                        },{
                            $set:{title}
                        }
    )
return await db.collection("TaskList").findOne({_id:ObjectId(id)});
},

deleteTaskList : async(_, {id}, {db, user}) =>{
    if(!user){console.log("No esta autenticado, por favor inicie sesión.")}

    await db.collection("TaskList").remove({_id:ObjectId(id)});

    return true;
},




},


//Parametro inmutable del user, id:_id
user:{
id:(root)=>{
    return root._id;
}
},

TaskList: {
    id: ({ _id, id }) => _id || id,
    progress: ()  => 30,
    users: async ({ userIds }, _, { db }) => Promise.all(
      userIds.map(() => (
          db.collection('user').findOne({ _id: userIds[0]}))
      )
    ),
  },

}
  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
  
const start = async () => {
    const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(DB_NAME);
  
    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer({ 
      typeDefs, 
      resolvers, 
      context: async ({ req }) => {
        const user = await getUserFromToken(req.headers.authorization, db);
        //console.log(user)
        return {
          db,
          user,
        }
      },
    });

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

  type Query {
    myTaskLists: [TaskList!]!
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
    signUp(input:SignUpInput):AuthUser!
    signIn(input:SignInInput):AuthUser!

    createTaskList(title: String!):TaskList!
    updateTaskList(id:ID!, title:String!):TaskList!
    deleteTaskList(id:ID!):Boolean!
  }

  input SignUpInput{
    mail: String!
    identificacion: String!
    nombre: String!
    password: String!
    rol: String!
  }

  input SignInInput{
    mail: String!
    password: String!
  }

  type AuthUser{
      user:user!
      token: String!
  }

  type TaskList{
    id: ID!
    createdAt: String!
    title: String!
    progress: Float!
    users: [user!]!
    todos:[ToDo!]!
}

type ToDo{
    id: ID!
    content: String!
    isCompleted: Boolean!
    taskList: TaskList!
}
  `;
  