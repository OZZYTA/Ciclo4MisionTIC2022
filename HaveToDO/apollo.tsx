import {ApolloClient,InMemoryCache,ApolloProvider,useQuery,gql, createHttpLink} from "@apollo/client";
import {setContext} from "@apollo/client/link/context"
import AsyncStorage from '@react-native-async-storage/async-storage'; //MUY IMPORTANTE

const URI='http://localhost:4000/';


const httpLink = createHttpLink({
    uri:URI,
})

const authLink = setContext (async (_, {headers}) =>{
    const token= await AsyncStorage.getItem("token");
    return{
        headers:{
            ...headers,
            authorizacion: token || "",
        }
    }
});


export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });