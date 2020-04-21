class ErrorNotFound extends Error {
  constructor(message = 'Документ не найден') {
    super(message);
    this.statusCode = 404;
  }
}

class ErrorUnauthorized extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.statusCode = 401;
  }
}

class ErrorBadRequest extends Error {
  constructor(message = 'Bad Request') {
    super(message);
    this.statusCode = 400;
  }
}

class ErrorForbidden extends Error {
  constructor(message = 'У вас недостаточно прав') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = {
  ErrorNotFound, ErrorUnauthorized, ErrorBadRequest, ErrorForbidden,
};