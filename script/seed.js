'use strict';

const { db, models: {Movie} } = require('../server/db');
const movieSeed = require('./movieSeed');
const fs = require('fs');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced');

  const movies = await Promise.all(
    movieSeed.map((item) => {
      return Movie.create(item);
    })
  );
  console.log('all seeded');
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}
if (module === require.main) {
  runSeed();
}
module.exports = seed;