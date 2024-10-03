import jsonwebtoken from 'jsonwebtoken'
import {createLogInfo} from '../../log-info/LogUtils.mjs'

const certificate = process.env.AUTH0_CERTIFICATE;
const log = createLogInfo('auth')

export async function handler(event) {
    try {
        const jwtToken = await verifyToken(event.authorizationToken)
        log.info('Authenticated!', {
            userId: jwtToken.sub
        })
        return {
            principalId: jwtToken.sub,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: '*'
                    }
                ]
            }
        }
    } catch (e) {
        log.error('Not authorized!', {error: e.message})
        return {
            principalId: 'user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Deny',
                        Resource: '*'
                    }
                ]
            }
        }
    }
}

async function verifyToken(authHeader) {
    const token = getToken(authHeader)
    const jwt = jsonwebtoken.decode(token, {complete: true})

    try {
        jsonwebtoken.verify(token, certificate, {algorithms: ['RS256']});
    } catch (err) {
        console.log('Verifying token was failed!')
    }
    return jwt;
}

function getToken(authHeader) {
    if (!authHeader) throw new Error('No header for authen!')
    if (!authHeader.toLowerCase().startsWith('bearer '))
        throw new Error('Invalid header for authen!')

    const split = authHeader.split(' ')
    const token = split[1]

    return token
}
