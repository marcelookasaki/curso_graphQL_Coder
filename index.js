const { ApolloServer, gql } = require('apollo-server')

const usuarios = [
  {
    id: 1,
    nome: 'Elisa',
    email: 'ea@email.com',
    idade: 59
  },
  {
    id: 2,
    nome: 'Mariana',
    email: 'mari@email.com',
    idade: 12
  },
  {
    id: 3,
    nome: 'Marcelo',
    email: 'ma@email.com',
    idade: 54
  },
  {
    id: 4,
    nome: 'Fernando',
    email: 'fe@email.com',
    idade: 12
  },
  {
    id: 5,
    nome: 'Giulia',
    email: 'giu@email.com',
    idade: 4
  }
]

const typeDefs = gql`

  scalar Date

  type Produto {    
    nome: String!
    preco: Float
    desconto: Float
    precoComDesconto: Float
  }

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
    produtoEmDestaque: Produto
    numerosMegaSena: [Int!]!
    usuarios: [Usuario!]!
  }
`

const resolvers = {
  Produto: {
    precoComDesconto(produto) {
      if (produto.desconto) {
        return produto.preco * (1 - produto.desconto)
      } else {
        return produto.preco
      }
    }
  },
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

    },
    produtoEmDestaque() {
      return {
        nome: 'Notebook Gamer',
        preco: 7000.99,
        desconto: 0.15
      }
    },
    numerosMegaSena() {
      const crescente = (a, b) => a - b
      return Array(6).fill(0)
        .map(n => parseInt(Math.random() * 60 + 1))
        .sort(crescente)
    },
    usuarios() {
      return usuarios
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
