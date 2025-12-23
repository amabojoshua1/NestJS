import { User } from '../entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

/**
 * Factory for generating User entities
 * Utilizes faker to create realistic sample data for users.
 * Each user includes a first name, last name, email, and avatar URL.
 * The password is hashed before insertion into the database. This isn't shown here for simplicity.
 */
export const UserFactory = setSeederFactory(User, (faker) => {
  const user = new User();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email();
  user.avatarUrl = faker.image.avatar();
  return user;
});
