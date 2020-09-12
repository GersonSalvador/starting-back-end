import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';

import User from '../infra/typeorm/entities/Users';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFileName: string;
}

export default class UpdataUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) throw new AppError('Invalid user', 401);

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await userRepository.save(user);

    return user;
  }
}
