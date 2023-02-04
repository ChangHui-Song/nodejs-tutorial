import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';

const typeDefs = `#graphql
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type Board {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoards: [Board]
  }

  type Mutation {
    createBoard(writer: String, title: String, contents: String): String
    createBoard2(createBoardInput: CreateBoardInput): String
    createTokenOfPhone(phone: String): String
  }
`;

const resolvers = {
  Query: {
    fetchBoards: () => {
      const result = [
        {
          number: 1,
          writer: 'user1',
          title: 'title1',
          contents: 'content1',
        },
        {
          number: 2,
          writer: 'user2',
          title: 'title2',
          contents: 'content2',
        },
        {
          number: 3,
          writer: 'user3',
          title: 'title3',
          contents: 'content3',
        },
      ];

      return result;
    },
  },

  Mutation: {
    createBoard: (parent, args) => {
      console.log(parent);
      console.log(args);
      return '등록에 성공하였습니다.';
    },
    createBoard2: (parent, args) => {
      console.log(parent);
      console.log(args);
      return '등록에 성공하였습니다.';
    },
    createTokenOfPhone: (parent, { phone }) => {
      const isValid = checkValidationPhone(phone);

      if (isValid) {
        const token = getToken();

        sendTokenToSMS(phone, token);
        return 'success!';
      }
      return 'failed!';
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`Server ready at ${url}`);
