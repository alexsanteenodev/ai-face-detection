import { faceDetect } from '../../src'

describe('faceDetect', () => {
  it('should detect faces in an image', async () => {
    const imagePath = './test/unit/__tests__/man1.jpeg'
    const result = await faceDetect(imagePath)
    expect(result?.gender).toBeDefined() // Assert that at least one face was detected
  })
})
