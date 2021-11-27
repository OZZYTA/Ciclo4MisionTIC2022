const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config();
const { DB_URI, DB_NAME, JWT_SECRET } = process.env;

//Verificación de Autenticación Por Token
const getToken = (user) => jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30 days' }); //almacenando token desde el user id y la libreria jsonwebtoken

//Creación de Metodo getUserFromToken para las mutaciones que lo requieren
const getUserFromToken = async (token, db) => {
  if (!token) { return null }
  const tokenData = jwt.verify(token, JWT_SECRET); //funcion de la libreria jsonwebtoken
  if (!tokenData?.id) {
    return null;
  }
  return await db.collection('user').findOne({ _id: ObjectId(tokenData.id) });  //busca el usuario con el _id igual al que reresa el ObjectId
}


//Resolvers
const resolvers = {
    //Query: {
      //misProyectos: () => []
  //},
  Query: {
    myTaskLists: async (_, __, { db, user }) => {  //Ver lista de tareas
      if (!user) { throw new Error('Error de Autenticación, por favor inicie Sesión'); }
      return await db.collection('TaskList')   //busqueda
                                .find({ userIds: user._id })
                                .toArray();
    },

    getTaskList: async(_, { id }, { db, user }) => {  //Ver tareas por ID
      if (!user) { throw new Error('Error de Autenticación, por favor inicie Sesión'); }
      return await db.collection('TaskList').findOne({ _id: ObjectId(id) });
    }
  },

//Mutationes
Mutation: {
    signUp: async(root,{input},{db})=>{   //Registrarse
        const hashedPassword=bcrypt.hashSync(input.password) //hasheamos la contraseña que viene desde el input
        const newUser={ //Creamos al nuevo usuario
            ...input,
            password:hashedPassword,
        }
    const result= await db.collection("user").insertOne(newUser);  //Funcion asincrona que puede recibir 3 argumentos y regresa un objeto
    return{  //el esquema pide que se regrese un usuario cuando el proceso se haga bien, al igual que un token
        user:newUser,
        token:getToken(newUser),
    }
},

signIn: async(root,{input},{db})=>{    //Iniciar Sesión
    const user = await db.collection('user').findOne({ email: input.email }); //compara el email en el input con los que estan en la collecion user
    const isPasswordCorrect = user && bcrypt.compareSync(input.password, user.password); //compara el hash del password en el input con los que estan en la collecion user
    if (!user || !isPasswordCorrect) {  //Verificamos si ambas respuestas son true
      throw new Error('Credenciales erroneas :('); //sino son true, lanzamos error
    } 
    return {//si son true retornamos la información completa que hay del usuario en la collecion
      user,
      token: getToken(user), //asignamos un getToken al campo token
    }
  },

createTaskList: async(root,{title},{db, user})=>{    //Registrar una tarea
    if(!user){console.log("No esta autenticado, por favor inicie sesión.")} //Solo usuarios correctamente logueados lo pueden hacer
    const newTaskList={  //Creamos un nuevo documento de tipo tasklis que tenga: titulo, fecha de creacion y un arreglo con userId y nombre del usuario
        title,
        createdAt: new Date().toISOString(),
        userIds:[user._id], //Crea un arreglo donde se guardaran los ID de los usuarios relacionados
        userNames: [user.nombre]//Crea un arreglo donde se guardaran los Nombres de los usuarios relacionados
    }
    console.log("Tarea Creada Correctamente") //mensaje de consola
    const result= await db.collection("TaskList").insertOne(newTaskList); //guardar el documento en la coleccion corespondiente
    return newTaskList //El metodo en los esquemas pide regresar un documento de tipo Tasklist
},

updateTaskList : async(_, {id, title}, {db, user}) =>{   //Actualizar una tarea, La funcion pide el id del objeto a eliminar y el titulo nuevo a asignar
    if(!user){console.log("No esta autenticado, por favor inicie sesión.")}  //Solo usuarios correctamente logueados lo pueden hacer
    const result= await db.collection("TaskList") //La funcion pide el id del objeto a eliminar y el titulo nuevo a asignar
                        .updateOne({_id:ObjectId(id)  //Se actualiza el documento que coincide en su id
                        },{
                            $set:{title}  //Se setea el nuevo titulo
                        }
    )//IMPORTANTE: Si nuestro proyecto necesita que mas campos sean editables, se deben establecer como argumentos y brindarselos a la funcion desde el front(apollo)
//Si un campo no es editado, es decir, queda en blanco en el front, se puede establecer un if que evalue que si el campo esta en blanco entonces no se ejecuta el update
console.log("Tarea Actualizada Correctamente")
return await db.collection("TaskList").findOne({_id:ObjectId(id)});  //regresa los nuevos valores de la tarea editada
},

deleteTaskList : async(_, {id}, {db, user}) =>{   //Eliminar una tarea, mutacion pide el id de la tarea a eliminar
    if(!user){console.log("No esta autenticado, por favor inicie sesión.")}  //Solo usuarios correctamente logueados lo pueden hacer

    await db.collection("TaskList").remove({_id:ObjectId(id)}); //Se elimina la tarea que tiene el id ingresado en el imput
    console.log("Tarea Eliminada Correctamente")
    return true; //regresa booleano
},


addUserToTaskList: async(_, {taskListId , userId}, {db,user}) =>{
  if(!user){console.log("No esta autenticado, por favor inicie sesión.")}  //Solo usuarios correctamente logueados lo pueden hacer
  const taskList= await db.collection("TaskList").findOne({_id:ObjectId(taskListId)});
  const usuario= await db.collection("user").findOne({_id:ObjectId(userId)});

  if(!taskList){
    return null; //Cambiar respuesta a su gusto
  }
 
  if(taskList.userIds.find((dbId) => dbId.toString()=== userId.toString())){
    return taskList;  //Evitamos duplicidad verificando la existencia previa del usuario
  }
  await db.collection("TaskList")
          .updateOne({  //busca la tasklist a actualizar
          _id:ObjectId(taskListId)
        }, { 
          $push: {
            userIds: ObjectId(userId),  //empuja el objectid(userId) al arreglo userIds
            userNames:usuario.nombre,  //empuja el nombre del usuario al arreglo usernames
          }
        })  
        taskList.userIds.push(ObjectId(userId))  //Confirmación
        taskList.userNames.push(usuario.nombre)  //confirmación
        return taskList;
},

//ToDos (avances)
createToDo: async(root,{content, taskListId}, {db, user})=>{
if(!user){console.log("No esta autenticado, por favor inicie sesión.")}  //Solo usuarios correctamente logueados lo pueden hacer
const newToDo ={
  content,
  taskListId: ObjectId(taskListId),
  isCompleted: false,
}
const result= await db.collection("ToDo").insertOne(newToDo);
return newToDo;
},

updateToDo: async (_, data, {db, user})=>{
  if(!user){console.log("No esta autenticado, por favor inicie sesión.")}  //Solo usuarios correctamente logueados lo pueden hacer

  const result= await db.collection("ToDo")
                        .updateOne({_id:ObjectId(data.id)
                        }, {
                          $set: data
                        })
  return await db.collection("ToDo").findOne({_id:ObjectId(data.id)});
},



},

//Parametros inmutables del user
user:{
id:(root)=>{
    return root._id;}
},

//Parametros inmutables de los tasklist
TaskList: {
    id: ({ _id, id }) => _id || id, //id del objeto sera automaticamente el valor de _id
    progress: async ({_id}, _, {db}) =>{
      const todos= await db.collection("ToDo").find({taskListId: ObjectId(_id)}).toArray()
      const completed= todos.filter(todo =>todo.isCompleted);
      if (todos.length===0){
        return 0;
      }
      return (completed.length/todos.length)*100
    },

    users: async ({ userIds }, _, { db }) => Promise.all( //Función asincronica que se compromete a traer todos los usuarios relacionados con la tasklist 
      userIds.map((userId) => (  
        db.collection('user').findOne({ _id: userId})) //Consulta usuarios por Id
      )
    ),
    todos: async ({_id}, _, {db})=>(
      await db.collection("ToDo").find({taskListId:ObjectId(_id)}).toArray()
    ),
  },


//Parametros inmutables del user
ToDo:{
  id:(root)=>{
    return root._id;},
  taskList: async ({taskListId}, _, {db}) =>(
  await db.collection("TaskList").findOne({_id:ObjectId(taskListId)})
  )
},

}

const start = async () => {   //Iniciar Serviror
    const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(DB_NAME);
  
    const server = new ApolloServer({   //Contextos del servidor(necesarios)
      typeDefs, 
      resolvers, 
      context: async ({ req }) => {
        const user = await getUserFromToken(req.headers.authorization, db);
        //console.log(user)
        return {
          db,  //base de datos como contexto
          user,  //usuario autenticado como contexto
        }
      },
    });

    // Metodo listen, servidor iniciado
    server.listen().then(({ url }) => {
    console.log(`🚀  Servidor listo y corriendo en ${url}`);
    });
  }  
start();  //Arrancamos!


  //Esquemas para GRAPHL vs MongoDB
  const typeDefs = gql`   

  type Query {
    myTaskLists: [TaskList!]!
    getTaskList(id: ID!): TaskList
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
    addUserToTaskList(taskListId: ID!, userId: ID!): TaskList

    createToDo(content:String!, taskListId:ID!):ToDo!
    updateToDo(id:ID!,content:String, isCompleted:Boolean):ToDo!
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
  