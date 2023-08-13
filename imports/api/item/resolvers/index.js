import queries from "./queries";
import mutations from "./mutations";

const resolvers = {
    Mutation: mutations,
    Query: queries,
};

export default resolvers;
