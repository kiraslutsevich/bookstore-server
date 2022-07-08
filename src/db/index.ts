import { User } from "./entity/User";
import { AppDataSource } from "./dataSource";

export const userRepository = AppDataSource.getRepository(User);
