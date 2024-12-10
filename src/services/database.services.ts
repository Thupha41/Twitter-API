import { MongoClient } from 'mongodb'
import { envConfig } from '../constants/config'

const uri = `mongodb+srv://${envConfig.dbUsername}:${envConfig.dbPassword}@twitter-cluster.hzc1q.mongodb.net/?retryWrites=true&w=majority&appName=Twitter-Cluster`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DatabaseService {
  private client: MongoClient
  constructor() {
    this.client = new MongoClient(uri)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.client.db('admin').command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close()
    }
  }
}
const databaseService = new DatabaseService()
export default databaseService
