const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quebra-tigela';

const artistEmails = [
  'lucas.silva@example.com',
  'marina.costa@example.com',
  'rafael.santos@example.com',
  'beatriz.oliveira@example.com',
  'gabriel.ferreira@example.com'
];

(async () => {
  await mongoose.connect(uri);
  console.log('Connected to MongoDB\n');

  const artistsCollection = mongoose.connection.db.collection('artists');

  let count = 0;
  for (const email of artistEmails) {
    const result = await artistsCollection.updateOne(
      { email },
      { $set: { verified: true } }
    );

    if (result.modifiedCount > 0 || result.matchedCount > 0) {
      console.log(`✓ Artist ${email} verified`);
      count++;
    } else {
      console.log(`✗ Artist ${email} not found`);
    }
  }

  console.log(`\nTotal artists verified: ${count}/5`);

  // Verify the results
  const verifiedArtists = await artistsCollection.find({
    email: { $in: artistEmails },
    verified: true
  }).toArray();

  console.log('\nVerified artists in database:');
  verifiedArtists.forEach(artist => {
    console.log(`- ${artist.name} (${artist.email}) - ${artist.city} - ${artist.artTypes.join(', ')}`);
  });

  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
