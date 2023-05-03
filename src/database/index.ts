import { Sequelize } from "sequelize";

import {
  db_host,
  db_port,
  db_name,
  db_user,
  db_password,
} from "../config/config";

export default new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  dialect: "postgres",
});



