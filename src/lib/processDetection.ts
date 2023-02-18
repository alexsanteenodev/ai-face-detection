import '@tensorflow/tfjs-node'
import * as faceapi from '@vladmandic/face-api'

export const processDetection = async (
  tensor: faceapi.TNetInput,
  optionsSSDMobileNet: faceapi.FaceDetectionOptions
) => {
  return await faceapi
    .detectSingleFace(tensor, optionsSSDMobileNet)
    .withFaceLandmarks()
    .withFaceExpressions()
    .withAgeAndGender()
}
