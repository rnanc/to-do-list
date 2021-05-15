const { verify } = require("jsonwebtoken")
const authConfig = require("../config/auth")

module.exports = {
  ensureAuthenticate( request, response, next) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json('Token is missing')
    }

    const [, token] = authHeader.split(' ')

    try {
      const decoded = verify(token, authConfig.jwt.secret)
  
      const { sub } = decoded
  
      request.user = {
        id: sub,
      };
  
      return next();
    } catch (err) {
      return response.status(401).json('Invalid JWT token')
    }
  }
}