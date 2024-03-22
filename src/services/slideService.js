import { cloneDeep } from 'lodash'
import UUID from 'uuid-v4'

import * as firebaseAdmin from '~/config/firebaseAdmin'
import slideModel from '~/models/slideModel'
import { slugify } from '~/utils/formatters'

const createNew = async (req) => {
  try {
    const uniqueId = UUID()
    const reqBody = {
      ...req.body,
      slug: slugify(req.body.title)
    }
    const imagePath = req.files?.imagePath[0]

    const folders = [slideModel.slideCollectionName].join('/')
    const type = imagePath?.mimetype.split('/')[1]
    const fileName = `${folders}/${reqBody.slug}-${uniqueId}.${type}`

    const createdSlide = await slideModel.createNew({
      ...reqBody,
      imagePath: fileName
    })

    await firebaseAdmin.uploadFile(imagePath, fileName)

    return await slideModel.findOneById(createdSlide.insertedId)
  } catch (error) {
    throw error
  }
}

const getAllSlides = async () => {
  try {
    const slides = await slideModel.getAllSlides()
    if (slides.length === 0) return []

    const newSlides = cloneDeep(slides)
    const resSlides = []

    for (const slide of newSlides) {
      const imagePath = slide?.imagePath
      delete slide?.imagePath
      resSlides.push({
        ...slide,
        thumbnail: !!imagePath ? await firebaseAdmin.getImageURLByName(imagePath) : ''
      })
    }
    return resSlides
  } catch (error) {
    throw error
  }
}

const slideService = {
  createNew,
  getAllSlides
}

export default slideService
