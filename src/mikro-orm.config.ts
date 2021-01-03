import { Options } from "@mikro-orm/core";
import * as path from "path";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

const options: Options = {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: "lilreddit",
  type: "postgresql",
  debug: !__prod__,
};

export default options;
