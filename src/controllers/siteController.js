import { StatusCodes } from 'http-status-codes'

//import siteService from '~/services/siteService'

const index = (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Server VT Shop'
    })
  } catch (error) {
    next(error)
  }
}

const search = async () => {

}

const siteService = {
  index,
  search
}

export default siteService
