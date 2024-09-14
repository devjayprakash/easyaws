import startJsonHandler from './json-storage-handlers'
import startS3Handlers from './s3-handlers'

// starting all the handlers
startS3Handlers()
startJsonHandler()
