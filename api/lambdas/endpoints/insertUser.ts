import Responses from '../common/API_Responses';
import Dynamo from '../common/Dynamo';
import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";

const tableName: string = process.env.tableName;

type User = {
  ID: string,
  email: string,
  address: string,
  firstName: string,
  lastName: string
}

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  console.log('event', event);

  if (!event.pathParameters || !event.pathParameters.ID) {
      // failed without an ID
      return Responses._400({ message: 'missing the ID from the path' });
  }

  let ID: string = event.pathParameters.ID;
  const user: User = JSON.parse(event.body);
  user.ID = ID;

  const newUser: object = await Dynamo.write(user, tableName).catch((err: Error) => {
      console.log('error in dynamo write', err);
      return null;
  });

  if (!newUser) {
      return Responses._400({ message: 'Failed to write user by ID' });
  }

  console.log("Successfully added user");

  return Responses._200({ newUser });
};