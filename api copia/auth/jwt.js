const fs = require('fs');
const path = require('path');

const jwt = require('jsonwebtoken');
const { createResponse } = require('../controller/response.controller');



function createToken(payload, expiresIn = '1h') {
    const token= jwt.sign(payload, "skPIKPLlrbpAw0WU1DvauaJZQwtP9H");
    return token
    }
  
 
  function verifyToken(token,user) {
    try {
      const decoded = jwt.verify(token,"skPIKPLlrbpAw0WU1DvauaJZQwtP9H");

      return decoded==user;
    } catch (error) {
      return null;
    }
  }

  const verifyTokenMiddleware = (req, res, next) => {
    const { token, user } = req.body; 
  
    if (!token || !user) {
      res.status(400).send(createResponse(false, "Token e utente sono richiesti"));
    }
  
    try {
      const decoded = jwt.verify(token, "skPIKPLlrbpAw0WU1DvauaJZQwtP9H");
  
      if (decoded === user.username) {
        next(); 
      } else {
        res.status(401).send(createResponse(false, "Token non valido per l'utente specificato"));
      }
    } catch (error) {
      res.status(401).send(createResponse(false, "Token non valido"));
      
    }
  };
  

  module.exports = {
    createToken,
    verifyToken,
    verifyTokenMiddleware
  };