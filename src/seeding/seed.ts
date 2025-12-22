import { pgConfig } from 'dbConfig';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './main.seeder';

const options: DataSourceOptions & SeederOptions = {
  ...pgConfig,
  factories: ['src/seeding/**/*.factory.ts'],
  //   seeds: ['src/seeding/**/*.seeder.ts'],
  // Or you can specify the seeders directly
  seeds: [MainSeeder],
};

const datasource = new DataSource(options);
void datasource.initialize().then(async () => {
  await datasource.synchronize(true);
  await runSeeders(datasource);
  process.exit();
});
