import { Property } from 'src/entities/property.entity';
import { setSeederFactory } from 'typeorm-extension';

/**
 * Factory for generating Property entities
 * Utilizes faker to create realistic sample data for properties.
 * Each property includes a name, description, price, and address.
 */
export const PropertyFactory = setSeederFactory(Property, (faker) => {
  const property = new Property();
  property.name = faker.company.name();
  property.description = faker.lorem.paragraph();
  property.price = parseFloat(faker.finance.amount(50000, 500000, 2));
  property.address = faker.location.streetAddress();
  return property;
});
