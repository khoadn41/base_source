import { join } from 'path';

export const getMongoUrl = () => {
  let mongoUrl = '';
  if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
    mongoUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;
    return mongoUrl;
  }
  mongoUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
  return mongoUrl;
};

export const JwtSecret = process.env.JWT_SECRET
export const rootPublicPath = join(__dirname, '../../', 'file');
