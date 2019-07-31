import { GraphQLServer } from 'graphql-yoga';
import { idArg, queryType, stringArg } from 'nexus';
import { makePrismaSchema, prismaObjectType } from 'nexus-prisma';
import * as path from 'path';
import datamodelInfo from './generated/nexus-prisma';
import { prisma } from './generated/prisma-client';

const Project = prismaObjectType({
  name: 'Project',
  definition(t) {
    t.prismaFields(['*']);
  },
});

const Account = prismaObjectType({
  name: 'Account',
  definition(t) {
    t.prismaFields(['*']);
  },
});

const Submessage = prismaObjectType({
  name: 'Submessage',
  definition(t) {
    t.prismaFields(['*']);
  },
});

const Message = prismaObjectType({
  name: 'Message',
  definition(t) {
    t.prismaFields(['*']);
  },
});

const ProjectRight = prismaObjectType({
  name: 'ProjectRight',
  definition(t) {
    t.prismaFields(['*']);
  },
});

const Person = prismaObjectType({
  name: 'Person',
  definition(t) {
    t.prismaFields(['*']);
  },
});

const Query = queryType({
  definition(t) {
    t.field('userMessages', {
      type: 'Message',
      nullable: true,
      args: { clientId: idArg() },
      resolve: (parent, { clientId }, ctx) => {
        return ctx.prisma.messages({ where: { clientId } });
      },
    });
  },
});

const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {},
});

const schema = makePrismaSchema({
  // Provide all the GraphQL types we've implemented
  types: [
    Query,
    Mutation,
    Project,
    Account,
    Submessage,
    Message,
    ProjectRight,
    Person,
  ],

  // Configure the interface to Prisma
  prisma: {
    datamodelInfo,
    client: prisma,
  },

  // Specify where Nexus should put the generated files
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },

  // Configure nullability of input arguments: All arguments are non-nullable by default
  nonNullDefaults: {
    input: false,
    output: false,
  },

  // Configure automatic type resolution for the TS representations of the associated types
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, './types.ts'),
        alias: 'types',
      },
    ],
    contextType: 'types.Context',
  },
});

const server = new GraphQLServer({
  schema,
  context: { prisma },
});

server.start(() => console.log(`🚀 Server ready at http://localhost:4000`));
