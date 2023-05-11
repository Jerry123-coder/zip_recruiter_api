import * as dotenv from 'dotenv';
dotenv.config();
export const port = Number(process.env.API_PORT);

export const db_host = String(process.env.DB_HOST);
export const db_port = Number(process.env.DB_PORT);
export const db_name = String(process.env.DB_NAME);
export const db_user = String(process.env.DB_USER);
export const db_password = String(process.env.DB_PASSWORD);

// export const jwtConfig = {
//   jwt_secret: process.env.ACCESS_TOKEN,
//   jwt_refresh_secret: process.env.REFRESH_TOKEN,
// };

// export const jwt_secret = process.env.ACCESS_TOKEN;
// export const jwt_refresh_secret = process.env.REFRESH_TOKEN;

export const jwt_secret = "my secret";
export const jwt_refresh_secret = "my refresh secret";