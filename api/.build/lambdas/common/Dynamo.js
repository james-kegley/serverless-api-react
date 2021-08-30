var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    getAll(TableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName
            };
            const data = yield documentClient.scan(params).promise();
            if (!data) {
                throw Error(`There was an error scanning items from ${TableName}`);
            }
            console.log(data);
            return data;
        });
    },
    get(ID, TableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName,
                Key: {
                    ID,
                },
            };
            const data = yield documentClient.get(params).promise();
            if (!data || !data.Item) {
                throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
            }
            console.log(data);
            return data.Item;
        });
    },
    write(data, TableName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.ID) {
                throw Error('no ID on the data');
            }
            const params = {
                TableName,
                Item: data,
            };
            const res = yield documentClient.put(params).promise();
            if (!res) {
                throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`);
            }
            return data;
        });
    },
};
export default Dynamo;
//# sourceMappingURL=Dynamo.js.map