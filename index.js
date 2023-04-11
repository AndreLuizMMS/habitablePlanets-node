const { parse } = require('csv-parse');
const fs = require('fs');
const habitablePlanets = [];

function isHabitable(planet) {
  if (
    planet.koi_disposition === 'CONFIRMED' &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  ) {
    return true;
  } else {
    return false;
  }
}

fs.createReadStream('kepler_data.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true
    })
  )
  .on('data', data => {
    if (isHabitable(data)) {
      habitablePlanets.push(data);
    }
  })
  .on('err', err => console.log(err))
  .on('end', () => {
    // console.log(habitablePlanets);
    console.log(`There are ${habitablePlanets.length} habitable planets`);
  });
