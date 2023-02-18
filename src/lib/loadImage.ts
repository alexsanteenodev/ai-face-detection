import { WriteStream } from 'fs'

import canvas from 'canvas'

export const loadImage = async (input: string | Buffer, out: WriteStream) => {
  const img = await canvas.loadImage(input)
  const c = canvas.createCanvas(img.width, img.height)
  const ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  const stream = c.createJPEGStream({
    quality: 0.6,
    progressive: true,
    chromaSubsampling: true,
  })
  stream.pipe(out)
  return c
}
