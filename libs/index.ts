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

  public updateOptions (options: NestApplicationOptions) {
    this.options = options
    return this
  }

  public updateCallback (callback: NestAplicationCallback) {
    this.callback = callback
    return this
  }

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

  public async create (
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
