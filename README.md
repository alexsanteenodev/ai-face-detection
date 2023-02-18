## Face detection
This is simple face detection using face-api.js and tensorflow.js

## Getting Started
```
npm install
```
## Usage

```
import { detectFaces } from 'ai-face-detection'

faceDetect('./face/face1.jpeg')
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
