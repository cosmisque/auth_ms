import db from '../database/db';
import { DbToken } from '../model/userModel';

class AuthRepository {
  async update(newToken: DbToken) {
    await db('auth_tokens').insert(newToken).onConflict(['user_id']).merge();
  }

  async findByUserId(id: number) {
    const { refresh_token } = await db('auth_tokens').where('user_id', id).first();

    return refresh_token;
  }
}

export default AuthRepository;
