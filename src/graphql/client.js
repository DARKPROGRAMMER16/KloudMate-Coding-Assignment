import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://graphql-react-todo.hasura.app/v1/graphql',
    request: async (operation) => {
        operation.setContext({
            headers: {
                'x-hasura-admin-secret': 'cSogU6WgykRpTpL3HMjxiWGnstC4mli5yy3HFv1NaLBCGzeNnNRYvlR5JRoWpF6t',
            }
        });
    }
});


export default client;