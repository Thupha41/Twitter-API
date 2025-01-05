import { Db, MongoClient, Collection } from 'mongodb'
import { envConfig } from '../constants/config'
import User from '../models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Follower from '~/models/schemas/Follower.schema'
const uri = `mongodb+srv://${envConfig.dbUsername}:${envConfig.dbPassword}@twitter-cluster.hzc1q.mongodb.net/?retryWrites=true&w=majority&appName=Twitter-Cluster`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(envConfig.dbName)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }

  get users(): Collection<User> {
    return this.db.collection(envConfig.dbUsersCollection)
  }
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(envConfig.dbRefreshTokensCollection)
  }
  get followers(): Collection<Follower> {
    return this.db.collection(envConfig.dbFollowersCollection)
  }
}
const databaseService = new DatabaseService()
export default databaseService
