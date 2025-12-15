import { setSeederFactory } from 'typeorm-extension';
import { PropertyFeature } from 'src/entities/propertyFeature.entity';
export const PropertyFeatureFactory = setSeederFactory(
  PropertyFeature,
  (faker) => {
    const feature = new PropertyFeature();
    feature.area = faker.number.int({ min: 25, max: 2500 });
    feature.bathrooms = faker.number.int({ min: 1, max: 5 });
    feature.bedrooms = faker.number.int({ min: 1, max: 5 });
    feature.parkingSpots = faker.number.int({ min: 0, max: 5 });
    feature.hasBalcony = faker.datatype.boolean();
    feature.hasGarden = faker.datatype.boolean();
    feature.hasSwimmingPool = faker.datatype.boolean();
    return feature;
  },
);
