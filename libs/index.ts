import { NestApplicationOptions, INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Server } from 'http'
import { ExpressAdapter } from '@nestjs/platform-express'
import * as serverless from 'aws-serverless-express'
import express from 'express'
import 'reflect-metadata'
import { APIGatewayProxyEvent, Context, APIGatewayEvent } from 'aws-lambda'

let cachedServer: Server

export type NestAplicationCallback = (
  app: INestApplication,
) => INestApplication | Promise<INestApplication>;
const defaultCallback: NestAplicationCallback = app => app

/**
 * Wrapper class for Nestjs in AWS Lambda
 */
export class ServerlessNestjsApplicationFactory<T = any> {
  private readonly AppModule: T;
  private options: NestApplicationOptions;
  private callback: NestAplicationCallback;
  constructor (
    AppModule: T,
    options: NestApplicationOptions = {},
    callback: NestAplicationCallback = defaultCallback
  ) {
    this.AppModule = AppModule
    this.options = options
    this.callback = callback
  }

  /**
   * Update your nest application options
   * @param options
   */
  public updateOptions (options: NestApplicationOptions) {
    this.options = options
    return this
  }

  /**
   * Update callback to execute nest application
   * @param callback
   * @example
   * ```
   * const application = new ServerlessNestjsApplicationFactory(AppModule)
   * application.updateCallback(app => {
   *   app.enableCors()
   * })
   * return applicaiton.run(event, context)
   * ```
   */
  public updateCallback (callback: NestAplicationCallback) {
    this.callback = callback
    return this
  }

  /**
   * Just create nest js application wrapped by Express Adapter
   */
  public async createApplication () {
    const expressApp = express()
    const adapter = new ExpressAdapter(expressApp)
    const application = await NestFactory.create(
      this.AppModule,
      adapter,
      this.options
    )
    const app = await this.callback(application)
    app.init()
    return serverless.createServer(expressApp)
  }

  /**
   * Start Nestjs application in AWS Lambda
   * @param event
   * @param context
   */
  public async run (
    event: APIGatewayProxyEvent | APIGatewayEvent,
    context: Context
  ) {
    if (!cachedServer) {
      cachedServer = await this.createApplication()
    }
    const result = await serverless.proxy(
      cachedServer,
      event,
      context,
      'PROMISE'
    ).promise
    return result
  }
}
