import { UserDocument } from "src/modules/user/schema/user.schema";

export class AuthRequest extends Request{
    user : UserDocument
}