import { StatusCodes } from 'http-status-codes'

import slideService from '~/services/slideService'

const createNew = async (req, res, next) => {
  try {
    const slide = await slideService.createNew(req)
    res.status(StatusCodes.CREATED).json({ slide })
  } catch (error) {
    next(error)
  }
}

const getAllSlides = async (req, res, next) => {
  try {
    const slides = await slideService.getAllSlides(req)
    res.status(StatusCodes.OK).json({ slides })
  } catch (error) {
    next(error)
  }
}

const slideController = {
  createNew,
  getAllSlides
}

export default slideController
