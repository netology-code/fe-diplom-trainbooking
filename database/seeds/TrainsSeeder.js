import Seeder from './Seeder';

const rand = ( min, max ) => Math.round(
  Math.random() * ( max - min ) + min
);

class TrainsSeeder extends Seeder {
  static MAX_COACHES = 4;
  static MAX_TRAINS = 500;

  generateName() {
    const names = [
        'Ласточка',
        'Перун',
        'Зевс',
        'Иволга',
        'Калина',
        'Брусника',
        'Транзит',
        'Тройка',
        'Ураган'
      ],
      index = rand( 0, names.length );

    return names[ index ] + ' - ' + rand( 0, 100 );
  }
  async run() {
    const { db } = this,
      Train = db.collections.train,
      Coach = db.collections.coach,
      { MAX_COACHES, MAX_TRAINS } = this.constructor;
    await Train.destroy({});
    for ( let i = 0; i < MAX_TRAINS; i++ ) {
      const attributes = {
          name: this.generateName(),
          have_coaches: true
        },
        limit = rand( 1, MAX_COACHES ),
        coaches = await Coach.find({
          where: {
            train: null
          }
        }).limit( limit ),
        train = await Train.create( attributes ).fetch();
      for ( let j = 0, len = coaches.length; j < len; j++ ) {
        const { _id } = coaches[ j ];
        await Coach.update({ _id }).set({ train: train._id });
      }
    }
  }
}

export default TrainsSeeder;
