## Face detection
This is simple face detection using face-api.js and tensorflow.js

## Getting Started
```
npm install
```
## Usage

```
import { detectFaces } from 'ai-face-detection'

// using remote image
const imageFromUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Elon_Musk_Royal_Society.jpg/640px-Elon_Musk_Royal_Society.jpg'

// using local image
const imageFromFile = './face/face1.jpeg'

faceDetect(imageFromUrl)
  .then((result) => {
        console.log(
        `Face detected gender: ${result?.gender} with probability ${result?.genderProbability}`
        )
        console.log(`Face detected age: ${result?.age}`)
        console.log(`Face detected expressions:`)
        console.log(result?.expressions.asSortedArray())
  })
  .catch((err) => {
    // console.log('err, ', err)
    logger.error('err, ', err)
  })

  ```

## License

The MIT License (MIT). Please see [License File](https://github.com/alexsanteenodev/ai-face-detection/LICENSE) for more information.
