
import { APIGatewayProxyHandler } from 'aws-lambda';
// import { ServerlessNestjsApplicationFactory } from 'serverless-lambda-nestjs';
import { ServerlessNestjsApplicationFactory } from './dist';
// YOUR Nestjs application root module
import { AppModule } from './app.module';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const app = new ServerlessNestjsApplicationFactory<AppModule>(
    AppModule,
  );
  const result = await app.run(event, context);
  return result;
};