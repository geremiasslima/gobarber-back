import { getRepository, Not, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dto/ICreateUserDTO';

import User from '../entities/User';
import IFindAllProviderDTO from '@modules/users/dto/IFindAllProviderDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const findAppointment = await this.ormRepository.findOne(id);

    return findAppointment;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { email },
    });

    return findAppointment;
  }

  public async findAllProviders({except_user_id}: IFindAllProviderDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id)
        }
      })
    } else {
        users = await this.ormRepository.find();
    }
    return users;
  }


  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
