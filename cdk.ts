import * as cdk from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as dotenv from 'dotenv';

const environment: dotenv.DotenvPopulateInput = {};

dotenv.config({ processEnv: environment });

const app = new cdk.App();
const stack = new cdk.Stack(app, 'AlexCartServiceStack', {
  env: {
    region: environment.PRODUCT_AWS_REGION! || 'eu-west-1',
  },
});

const cartService = new NodejsFunction(stack, 'cartServiceLambda', {
  runtime: Runtime.NODEJS_18_X,
  functionName: 'cartService',
  entry: 'dist/main.js',
  environment: environment,
  bundling: {
    externalModules: [
      'mysql',
      'mysql2',
      'pg-query-stream',
      'better-sqlite3',
      'sqlite3',
      'tedious',
      'better-sqlite3',
      'oracledb',
      '@nestjs/microservices',
      '@nestjs/microservices/microservices-module',
      '@nestjs/websockets/socket-module',
    ],
  },
});

const api = new apiGateway.HttpApi(stack, 'CartApi', {
  corsPreflight: {
    allowHeaders: ['*'],
    allowOrigins: ['*'],
    allowMethods: [apiGateway.CorsHttpMethod.ANY],
  },
});

api.addRoutes({
  path: '/{api+}',
  methods: [apiGateway.HttpMethod.ANY],
  integration: new HttpLambdaIntegration(
    'CartServiceProxyIntegration',
    cartService,
  ),
});

new cdk.CfnOutput(stack, 'ApiUrl', {
  value: `${api.url}`,
});