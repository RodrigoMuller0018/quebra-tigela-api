const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quebra-tigela';

const artistEmails = [
  'lucas.silva@example.com',
  'marina.costa@example.com',
  'rafael.santos@example.com',
  'beatriz.oliveira@example.com',
  'gabriel.ferreira@example.com'
];

const servicesByArtist = {
  'lucas.silva@example.com': [
    { title: 'Pintura em Tela Personalizada', description: 'Crio pinturas abstratas e realistas sob encomenda, explorando cores vibrantes e texturas únicas.' },
    { title: 'Escultura em Argila', description: 'Esculturas artesanais em argila, perfeitas para decoração de ambientes internos e externos.' }
  ],
  'marina.costa@example.com': [
    { title: 'Ensaio Fotográfico Profissional', description: 'Sessões de fotos para retratos, eventos e paisagens urbanas com edição profissional inclusa.' },
    { title: 'Fotografia de Produto', description: 'Fotos de alta qualidade para e-commerce e catálogos de produtos.' }
  ],
  'rafael.santos@example.com': [
    { title: 'Composição Musical Original', description: 'Criação de músicas originais para eventos, vídeos ou projetos pessoais com influências de MPB e jazz.' },
    { title: 'Aula de Violão e Teclado', description: 'Aulas particulares de instrumentos musicais para iniciantes e intermediários.' }
  ],
  'beatriz.oliveira@example.com': [
    { title: 'Aula de Dança Contemporânea', description: 'Aulas individuais ou em grupo de dança contemporânea, combinando técnicas clássicas e experimentais.' },
    { title: 'Coreografia para Eventos', description: 'Desenvolvimento de coreografias personalizadas para casamentos, festas e apresentações.' }
  ],
  'gabriel.ferreira@example.com': [
    { title: 'Escultura com Material Reciclado', description: 'Criação de esculturas artísticas usando materiais reciclados, promovendo arte sustentável.' },
    { title: 'Workshop de Arte e Reciclagem', description: 'Oficinas educativas sobre como transformar resíduos em obras de arte.' }
  ]
};

(async () => {
  await mongoose.connect(uri);
  console.log('Connected to MongoDB\n');

  const artistsCollection = mongoose.connection.db.collection('artists');
  const servicesCollection = mongoose.connection.db.collection('services');

  let totalServices = 0;

  for (const email of artistEmails) {
    const artist = await artistsCollection.findOne({ email });

    if (!artist) {
      console.log(`✗ Artist ${email} not found`);
      continue;
    }

    const services = servicesByArtist[email];

    for (const service of services) {
      await servicesCollection.insertOne({
        artistId: artist._id,
        title: service.title,
        description: service.description,
        media: [],
        active: true
      });
      totalServices++;
      console.log(`✓ Created service "${service.title}" for ${artist.name}`);
    }
  }

  console.log(`\n${totalServices} services created successfully!`);

  // Verify services were created
  const allServices = await servicesCollection.find({}).toArray();
  console.log(`\nTotal services in database: ${allServices.length}`);

  // Count services per artist
  for (const email of artistEmails) {
    const artist = await artistsCollection.findOne({ email });
    if (artist) {
      const count = await servicesCollection.countDocuments({ artistId: artist._id, active: true });
      console.log(`${artist.name}: ${count} active services`);
    }
  }

  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
