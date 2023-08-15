import { Meteor } from "meteor/meteor";
import { startApolloServer } from "/imports/startUp/apollo-server";

if (Meteor.isServer) {
    startApolloServer();
}
