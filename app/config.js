import * as dotenv from "dotenv";

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
});

export const configuration = {
  server: {
    port: process.env.PORT,
  },
  pagination: {
    limit: 25,
    offset: 0,
  },
  order: {
    options: ['asc', 'desc'],
    direction: 'desc',
    orderBy: 'createdAt'
  }
};
