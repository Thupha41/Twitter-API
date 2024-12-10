import { Application, Router } from 'express'
import usersRouter from './users.routes'
import mediasRouter from './media.routes'
import tweetsRouter from './tweets.routes'
import bookmarksRouter from './bookmarks.routes'
import likesRouter from './likes.routes'
import searchRouter from './search.routes'
import conversationsRouter from './conversations.routes'
import staticRouter from './static.routes'
const router = Router()

const initApiRoute = (app: Application) => {
  //users
  router.use('/users', usersRouter)
  //medias
  router.use('/medias', mediasRouter)
  //tweets
  router.use('/tweets', tweetsRouter)
  //bookmarks
  router.use('/bookmarks', bookmarksRouter)
  //likes
  router.use('/likes', likesRouter)
  //search
  router.use('/search', searchRouter)
  //conversations
  router.use('/conversations', conversationsRouter)
  //static
  router.use('/static', staticRouter)
  //api/v1 router
  return app.use('/api/v1', router)
}
export default initApiRoute
