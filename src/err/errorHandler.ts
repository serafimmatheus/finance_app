// import { Response } from 'express'

class ErrorHandler extends Error {
  statusCode: number
  message: string

  constructor(statusCode: number, message: string) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

// const errorHandler = (err: Error, res: Response) => {
//   if (err instanceof ErrorHandler) {
//     return res.status(err.statusCode).json({
//       message: err.message,
//       statusCode: err.statusCode,
//     })
//   }

//   return res.status(500).json({
//     message: 'Internal Server Error',
//   })
// }

export { ErrorHandler }
