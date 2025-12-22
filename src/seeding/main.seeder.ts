import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { PropertyFeature } from 'src/entities/propertyFeature.entity';
import { User } from 'src/entities/user.entity';
import { Property } from 'src/entities/property.entity';
import { PropertyType } from 'src/entities/propertyType.entity';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // You can call other seeders here
    // For example:
    // await factoryManager.getSeeder(UserSeeder).run(dataSource, factoryManager);
    // await factoryManager.getSeeder(PropertySeeder).run(dataSource, factoryManager);
    // Step 1: Access the dataSource and factoryManager as needed
    const typeRepo = dataSource.getRepository('PropertyType');

    console.log('Seeding Property Types...');
    // Step 2: Define the property types to be seeded
    const propertyTypes = await typeRepo.save([
      { value: 'Apartment' },
      { value: 'House' },
      { value: 'Condo' },
      { value: 'Townhouse' },
      { value: 'Villa' },
    ]);

    // console.log('Seeded Property Types:', propertyTypes);
    const userFactory = factoryManager.get(User);
    const users = await userFactory.saveMany(10);
    console.log('Seeded Users:', users);

    const propertyFactory = factoryManager.get(Property);
    const propertyFeatureFactory = factoryManager.get(PropertyFeature);
    const properties = await Promise.all(
      Array(50)
        .fill('')
        .map(async () => {
          const property = await propertyFactory.make({
            user: faker.helpers.arrayElement(users),
            type: faker.helpers.arrayElement(propertyTypes) as PropertyType,
            propertyFeature: await propertyFeatureFactory.save(),
          });
          return property;
        }),
    );
    const propertyRepo = dataSource.getRepository(Property);
    await propertyRepo.save(properties);
    console.log('Seeded Properties:', properties);
  }
}
