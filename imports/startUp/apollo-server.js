import { ApolloServer } from "apollo-server-express";
import { WebApp } from "meteor/webapp";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import resolverItem from "/imports/api/item/resolvers";
import typeDefsItem from "/imports/api/item/schemas";
import resolverOrder from "/imports/api/order/resolvers";
import typeDefsOrder from "/imports/api/order/schemas";

const resolvers = [resolverItem, resolverOrder];
const typeDefs = [typeDefsItem, typeDefsOrder];

const server = new ApolloServer({
    playground: true,
    resolvers,
    typeDefs,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

export async function startApolloServer() {
    await server.start();

    server.applyMiddleware({
        path: "/graphql",
        app: WebApp.connectHandlers,
        cors: true,
    });
}
