import { Sequelize } from "sequelize";

import {
  db_host,
  db_port,
  db_name,
  db_user,
  db_password,
  db_production,
} from "../config/config";

export default new Sequelize(db_production, {
  // host: db_host,
  dialect: "postgres",
});
