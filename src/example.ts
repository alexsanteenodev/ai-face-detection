import { faceDetect } from './lib/faceDetect'
import logger from './lib/helpers/logger'

faceDetect('./face/face1.jpeg')
  .then((result) => {
    logger.warn(
      `Face detected gender: ${result?.gender} with probability ${result?.genderProbability}`
    )
    logger.warn(`Face detected age: ${result?.age}`)
    logger.info(`Face detected expressions:`)
    logger.info(result?.expressions.asSortedArray())
  })
  .catch((err) => {
    // console.log('err, ', err)
    logger.error('err, ', err)
  })
