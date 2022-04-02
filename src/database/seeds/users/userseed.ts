import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('user')
      .values([
        {
          firstName: 'Mostafa',
          lastName: 'Safarian',
          username: 'mostafa',
          password: '123',
        },
        {
          firstName: 'Siavash',
          lastName: 'Mahmoudian',
          username: 'siavash',
          password: '123',
        },
      ])
      .execute();
  }
}
