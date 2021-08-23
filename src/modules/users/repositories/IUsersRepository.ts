import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '../dto/ICreateUserDTO';
import IFindAllProviderDTO from '@modules/users/dto/IFindAllProviderDTO'



export default interface IUsersRepository {
  findAllProviders(data: IFindAllProviderDTO): Promise<User[]>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
