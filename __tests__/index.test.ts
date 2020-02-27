
import {
  ServerlessNestjsApplicationFactory
} from '../libs/index'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

const event = {
  requestId: 'offlineContext_requestId_ck74ytlnx000midk328eoe82y',
  requestTimeEpoch: 1582821111007,
  httpMethod: 'GET',
  path: '/server',
  stage: 'development',
  resourcePath: '/{proxy*}',
  hostname: 'okamotoakanombp.lan',
  pid: 48613,
  level: 'INFO',
  body: null,
  headers: {
    Host: 'localhost:3000',
    'User-Agent': 'curl/7.64.1',
    Accept: '*/*'
  },
  multiValueHeaders: {
    Host: [
      'localhost:3000'
    ],
    'User-Agent': [
      'curl/7.64.1'
    ],
    Accept: [
      '*/*'
    ]
  },
  multiValueQueryStringParameters: null,
  pathParameters: {
    proxy: 'server'
  },
  queryStringParameters: null,
  requestContext: {
    accountId: 'offlineContext_accountId',
    apiId: 'offlineContext_apiId',
    authorizer: {
      principalId: 'offlineContext_authorizer_principalId'
    },
    httpMethod: 'GET',
    identity: {
      accountId: 'offlineContext_accountId',
      apiKey: 'offlineContext_apiKey',
      caller: 'offlineContext_caller',
      cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
      cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
      cognitoIdentityId: 'offlineContext_cognitoIdentityId',
      cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
      sourceIp: '127.0.0.1',
      user: 'offlineContext_user',
      userAgent: 'curl/7.64.1',
      userArn: 'offlineContext_userArn'
    },
    protocol: 'HTTP/1.1',
    requestId: 'offlineContext_requestId_ck74ytlnx000midk328eoe82y',
    requestTimeEpoch: 1582821111007,
    resourceId: 'offlineContext_resourceId',
    resourcePath: '/{proxy*}',
    stage: 'development'
  },
  resource: '/{proxy*}',
  stageVariables: null,
  isOffline: true
} as any as APIGatewayProxyEvent

describe('ServerlessNestjsApplicationFactory', () => {
  it('test', async () => {
    const app = new ServerlessNestjsApplicationFactory({})
    expect(await app.create(event, {} as Context)).toHaveReturned()
  })
})
