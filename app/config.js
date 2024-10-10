import * as dotenv from "dotenv";

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.staging'
});

export const configuration = {
  server: {
    port: process.env.PORT,
  },
};
