class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.stutusCode = statusCode;
    this.explanation = message;
  }
}

module.exports = AppError;
