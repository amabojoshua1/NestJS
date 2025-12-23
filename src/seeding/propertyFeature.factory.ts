import { setSeederFactory } from 'typeorm-extension';
import { PropertyFeature } from 'src/entities/propertyFeature.entity';

/**
 * Factory for generating PropertyFeature entities
 * Utilizes faker to create realistic sample data for property features.
 * Each feature includes area, number of bathrooms, bedrooms, parking spots, and boolean flags for balcony, garden, and swimming pool.
 */
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
