import data from '../data/railway-stations';
import Seeder from './Seeder';

class RailwayStationsSeeder extends Seeder {
  async run() {
    const { db } = this,
      City = db.collections.city,
      RailwayStation = db.collections.railwaystation;
    await RailwayStation.destroy({});
    for ( let item of data ) {
      const city = await City.findOne({
        name: item.city.toLowerCase()
      });
      await RailwayStation.create({
        name: item.name,
        city: city._id
      });
    }
  }
}

export default RailwayStationsSeeder;
