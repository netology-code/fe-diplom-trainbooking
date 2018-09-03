import { range, compose, equals as eq, or } from 'ramda';
import Seeder from './Seeder';

const rand = ( min, max ) => Math.round(
    Math.random() * ( max - min ) + min
  ),
  boolRand = compose( Boolean, Math.round, Math.random );

class CoachesSeeder extends Seeder {
  static MAX_COACHES = 2000;
  static classTypes = {
    first: {
      priceCoef: 5,
      availableSeats: 18
    },
    second: {
      priceCoef: 3,
      availableSeats: 32
    },
    third: {
      priceCoef: 5,
      availableSeats: 48
    },
    fourth: {
      priceCoef: 1,
      availableSeats: 62
    }
  };
  generateName() {
    const getRandomLetter = () => String.fromCharCode( rand( 1040, 1060 )),
      getRandomWord = len => range( 0, len )
        .map( getRandomLetter )
        .join( '' );

    return [
      getRandomWord( rand( 2, 6 )),
      rand( 2, 100 )
    ].join( '-' );
  }
  generatePrice( classInfo ) {
    return classInfo.priceCoef * rand( 500, 1000 );
  }
  async run() {
    const { db } = this,
      Coach = db.collections.coach,
      { MAX_COACHES, classTypes } = this.constructor;

    await Coach.destroy({});
    for ( let i = 0; i < MAX_COACHES; i++ ) {
      const classIndex = rand( 0, 3 ),
        classType = Object.keys( classTypes )[ classIndex ],
        classInfo = classTypes[ classType ],
        isClassType = eq( classType ),
        isFirstClass = isClassType( 'first' ),
        isSecondClass = isClassType( 'second' ),
        isThirdClass = isClassType( 'third' ),
        isFourthClass = isClassType( 'fourth' ),
        isLinensIncluded = or( isFirstClass, isSecondClass ),
        haveSideSeats = isThirdClass,
        attributes = {
          name: this.generateName(),
          class_type: classType,
          available_seats: classInfo.availableSeats,
          is_linens_included: isLinensIncluded,
          have_wifi: boolRand(),
          have_air_conditioning: boolRand(),
          price: isFirstClass && this.generatePrice( classInfo ),
          top_price: this.generatePrice( classInfo ),
          bottom_price: this.generatePrice( classInfo ),
          side_price: haveSideSeats && this.generatePrice( classInfo ),
          linens_price: !isFourthClass && rand( 50, 300 ),
          wifi_price: rand( 50, 300 )
        };
      await Coach.create( attributes );
    }
  }
}

export default CoachesSeeder;
