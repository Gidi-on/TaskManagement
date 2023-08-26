import createHttpError from "http-errors";

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(createHttpError(404, error));

  // res.status(404);
  // next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // If Mongoose not found error, set to 404 and change message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// const check = (req, res, next) => {
//   let errorMessage = "An unknown error occured";
//   let statusCode = 500;
//   if (isHttpError(error)) {
//     statusCode = error.status;
//     errorMessage = error.message;
//   }
//   res.status(statusCode).json({ error: errorMessage });
// };

export { errorHandler, notFound };
