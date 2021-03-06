import "./App.css";
import { gql } from "@apollo/client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  concat,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "https://48p1r2roz4.sse.codesandbox.io" });
const reportErrors = (errorCallback) =>
  new ApolloLink((operation, forward) => {
    const observable = forward(operation);
    // if you comment the next line, there is only one request made
    observable.subscribe({ error: errorCallback });
    return observable;
  });
const errorLink = reportErrors(console.error);

const client = new ApolloClient({
  link: concat(errorLink, httpLink),
  cache: new InMemoryCache(),
});

const onClick = () => {
  client
    .query({
      query: gql`
        query GetRates {
          rates(currency: "USD") {
            currency
          }
        }
      `,
    })
    .then((result) => console.log(result));
};

function App() {
  return (
    <ApolloProvider client={client}>
      <button onClick={onClick}>Click</button>
    </ApolloProvider>
  );
}

export default App;
