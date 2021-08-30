import AWS from 'aws-sdk';

type Options = {
  region?: string,
  endpoint?: string
}

let options: Options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

const documentClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
  async getAll(TableName: string) {
    const params = {
      TableName
    };

    const data: AWS.DynamoDB.DocumentClient.ScanOutput = await documentClient.scan(params).promise();

    if (!data) {
      throw Error(`There was an error scanning items from ${TableName}`);
    }
    console.log(data);

    return data;
  },

  async get(ID: string, TableName: string) {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const data: AWS.DynamoDB.DocumentClient.GetItemOutput = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
    }
    console.log(data);

    return data.Item;
  },

  async write(data: any, TableName: string) {
    if (!data.ID) {
      throw Error('no ID on the data');
    }

    const params = {
      TableName,
      Item: data,
    };

    const res: AWS.DynamoDB.DocumentClient.PutItemOutput = await documentClient.put(params).promise();

    if (!res) {
      throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`);
    }

    return data;
  },
};

export default Dynamo;