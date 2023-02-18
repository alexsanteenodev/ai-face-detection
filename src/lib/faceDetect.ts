import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'
import canvas, { loadImage } from 'canvas'
import * as faceapi from '@vladmandic/face-api'
import { randomUUID } from 'crypto'
import logger from './helpers/logger'
import { processDetection } from './processDetection'
import axios from 'axios'

const modelPathRoot = path.resolve(process.cwd() + '/weights')
const minConfidence = 0.15
const maxResults = 5

export async function faceDetect(imagePath: string | Buffer) {
  const inFile = await processInput(imagePath)

  faceapi.env.monkeyPatch({
    Canvas: canvas.Canvas,
    Image: canvas.Image,
    ImageData: canvas.ImageData,
  })

  // @ts-expect-error
  await faceapi.tf.setBackend('tensorflow')
  // @ts-expect-error
  await faceapi.tf.enableProdMode()
  // @ts-expect-error
  await faceapi.tf.ready()
  faceapi.tf.ENV.set('DEBUG', false)

  logger.info(
    // @ts-expect-error
    `Version: TensorFlow/JS ${faceapi.tf?.version_core} FaceAPI ${
      faceapi.version
      // @ts-expect-error
    } Backend: ${faceapi.tf?.getBackend()}`
  )

  logger.info('Loading FaceAPI models')
  const modelPath = modelPathRoot
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath)
  await faceapi.nets.ageGenderNet.loadFromDisk(modelPath)
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath)
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath)
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelPath)
  const optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
    minConfidence,
    maxResults,
  })

  const exitImage = `./src/junk/${randomUUID()}.jpg`
  const outFile = fs.createWriteStream(exitImage)

  const canvasImage = await loadImage(inFile, outFile)
  const result = await processDetection(canvasImage, optionsSSDMobileNet)

  outFile.on('finish', () => {
    fsPromises.unlink(path.resolve(exitImage))
  })
  outFile.close()

  return result
}

const processInput = async (input: string | Buffer): Promise<Buffer> => {
  if (typeof input !== 'string' && !(input instanceof Buffer)) {
    throw new Error('Input type should be instance of Buffer or string')
  }
  if (input instanceof Buffer) {
    return input
  }
  // check if string is url
  if (input.startsWith('http')) {
    // read from url
    const response = await axios.get(input, { responseType: 'arraybuffer' })
    return Buffer.from(response.data, 'binary')
  }
  const inFile = await fsPromises.readFile(input)
  return inFile
}
