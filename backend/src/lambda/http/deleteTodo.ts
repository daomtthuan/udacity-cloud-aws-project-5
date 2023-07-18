import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { deleteTodo } from '../../businessLogic/todos';
import { createLogger } from '../../utils/logger';
import { getUserId } from '../utils';

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  createLogger('Processing event: ' + event);

  const todoId = event.pathParameters.todoId;
  const userId = getUserId(event);
  const result = await deleteTodo(userId, todoId);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };

  return {
    statusCode: 201,
    headers,
    body: JSON.stringify({
      result,
    }),
  };
}
