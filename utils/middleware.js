const { isEmailError } = require('sequelize/lib/utils');
const jwt = require("jsonwebtoken")
const { SECRET } = require('../utils/config')
const { Session } = require('../models')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const tokenExtractor = async(request, response, next) => {
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        try{
            request.decodedToken = jwt.verify(authorization.substring(7), SECRET)
            const session = await Session.findOne({
              where: {
                userId: request.decodedToken.id,
                token: authorization.substring(7)
              }
            })

            if(!session) {
              return response.status(400).json({error: 'Session expired!'})
            }

        }catch{
            return response.status(401).json({error: 'token invalid '})
        }
        // return response.status(401).json({error: 'token missing'})
       
        // request.token = authorization.substring(7)// Extract the token from "Bearer "
    }else{
        return response.status(401).json({ error: 'token missing'})
    }
    next()
}
const userExtractor = (request, response, next) => {
    const token = request.token
    // check if there's a token

    if(!token){
        return response.status(401).json({
            error:"Token missing"
        })

    }
    const decodedToken = jwt.verify(token, process.env.SECRET)
    request.user = decodedToken.id
    next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    if (isEmailError(error)) {
      return response.status(400).json({ error: [error.message] });
    }
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  userExtractor,
  tokenExtractor
};
