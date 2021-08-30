var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Responses from '../common/API_Responses';
import Dynamo from '../common/Dynamo';
const tableName = process.env.tableName;
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('event', event);
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the path' });
    }
    const user = yield Dynamo.getAll(tableName).catch((err) => {
        console.log('error in Dynamo Get', err);
        return null;
    });
    if (!user) {
        return Responses._404({ message: 'Failed to get user by ID' });
    }
    return Responses._200({ user });
});
//# sourceMappingURL=getUsers.js.map