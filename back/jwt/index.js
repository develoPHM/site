const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';
// 토큰 생성 함수
const createToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, secretKey, {expiresIn})
}

// 토큰 검증 함수
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('토큰 검증 실패')
  }
}

module.exports = {
  createToken,
  verifyToken
}