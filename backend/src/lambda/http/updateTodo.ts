import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { updateTodo } from '../../businessLogic/todos';
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest';
import { createLogger } from '../../utils/logger';
import { getUserId } from '../utils';

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  createLogger('Processing event: ' + event);

  const todoId = event.pathParameters.todoId;
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);
  const userId = getUserId(event);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };

  await updateTodo(todoId, userId, updatedTodo);

  return {
    statusCode: 204,
    headers,
    body: '',
  };
}
