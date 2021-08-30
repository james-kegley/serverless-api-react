import Responses from '../common/API_Responses';
import Dynamo from '../common/Dynamo';
import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";

const tableName: string = process.env.tableName;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  console.log('event', event);

  const user: object = await Dynamo.getAll(tableName).catch((err: Error) => {
    console.log('error in Dynamo Get', err);
    return null;
  });

  if (!user) {
    return Responses._404({ message: 'Failed to get user by ID' });
  }

  return Responses._200({ user });
};