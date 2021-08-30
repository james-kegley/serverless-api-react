import AWS from 'aws-sdk';

let options = {};
if (process.env.IS_OFFLINE) {
    options = {
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    };
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
  async getAll(TableName: string) {
    const params = {
      TableName
    };

    const data = await documentClient.scan(params).promise();

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

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
    }
    console.log(data);

    return data.Item;
  },

  async write(data: any, TableName: any) {
    if (!data.ID) {
      throw Error('no ID on the data');
    }

    const params = {
      TableName,
      Item: data,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`);
    }

    return data;
  },
};

export default Dynamo;