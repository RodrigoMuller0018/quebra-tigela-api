const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quebra-tigela';

(async () => {
  await mongoose.connect(uri);
  console.log('Connected to MongoDB\n');

  const artistsCollection = mongoose.connection.db.collection('artists');

  // Count total artists
  const totalArtists = await artistsCollection.countDocuments();
  console.log(`Total artists in database: ${totalArtists}`);

  // Count verified artists
  const verifiedCount = await artistsCollection.countDocuments({ verified: true });
  console.log(`Artists with verified=true: ${verifiedCount}`);

  // Count unverified artists
  const unverifiedCount = await artistsCollection.countDocuments({ verified: false });
  console.log(`Artists with verified=false: ${unverifiedCount}\n`);

  // List all artists with their verified status
  const allArtists = await artistsCollection.find({}).toArray();
  console.log('All artists in database:');
  console.log('='.repeat(80));
  allArtists.forEach(artist => {
    console.log(`Name: ${artist.name}`);
    console.log(`Email: ${artist.email}`);
    console.log(`Verified: ${artist.verified}`);
    console.log(`City: ${artist.city || 'N/A'}`);
    console.log(`Art Types: ${artist.artTypes?.join(', ') || 'N/A'}`);
    console.log(`ID: ${artist._id}`);
    console.log('-'.repeat(80));
  });

  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
