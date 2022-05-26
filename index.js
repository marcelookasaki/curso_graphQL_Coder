const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`

  scalar Date

  type Usuario {
    id: ID!
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  # Pontos de entrada da API
  type Query {
    ola: String
    horaAtual: Date
    usuarioLogado: Usuario
  }
`

const resolvers = {
  Usuario: {
    salario(usuario) {
      return usuario.salario_real
    }
  },
  Query: {
    ola() {
      return 'Bom dia!'
    },
    horaAtual() {
      return new Date
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: 'Marcelo',
        email: 'marcelo.okasaki@email.com',
        idade: 54,
        salario_real: 100000.19,
        vip: true
      }

    }

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`)
})
