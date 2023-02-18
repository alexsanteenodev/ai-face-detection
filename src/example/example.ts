import { faceDetect } from '../lib/faceDetect'
import logger from '../lib/helpers/logger'

faceDetect(
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Elon_Musk_Royal_Society.jpg/640px-Elon_Musk_Royal_Society.jpg'
)
  .then((result) => {
    logger.warn(
      `Face detected gender: ${result?.gender} with probability ${result?.genderProbability}`
    )
    logger.warn(`Face detected age: ${result?.age}`)
    logger.info(`Face detected expressions:`)
    logger.info(result?.expressions.asSortedArray())
  })
  .catch((err) => {
    logger.error('err, ', err)
  })
