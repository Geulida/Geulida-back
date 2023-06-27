const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
      const { message, name, status } = err;
      const errorResponse = {
        error: {
          message,
          name,
          status,
        },
      };
      res.status(status).json(errorResponse);
    } else {
      res.status(500).json({ error: { message: err.message || 'Unexpected Error' } });
    }
  };
  
  class AppError extends Error {
    constructor(name, message, status) {
      super(message);
      this.name = name;
      this.status = status;
    }
  }
  
  const CommonError = {
    AUTHENTICATION_ERROR: 'Authentication Error',
    TOKEN_EXPIRED_ERROR: 'Token Expired Error',
    INVALID_INPUT: 'Invalid Input',
    RESOURCE_NOT_FOUND: 'Resource Not Found',
    DUPLICATE_ENTRY: 'Duplicate Entry',
    UNAUTHORIZED_ACCESS: 'Unauthorized Access',
    SERVER_ERROR: 'Server Error',
    DB_ERROR: 'DB Error',
    UNEXPECTED_ERROR: 'Unexpected Error',
  };
  
  export { errorHandler, AppError, CommonError };
  