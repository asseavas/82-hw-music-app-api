import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [lilPeep, lanaDelRey, joji, chetta, suicideBoys, playboiCarti, pouya] =
    await Artist.create(
      {
        name: 'Lil Peep',
        image: 'fixtures/lilpeep.jpg',
        information:
          'Lil Peep was an American rapper and singer known for blending emo and hip-hop in his music. He tragically passed away from a drug overdose in 2017 at the age of 21.',
      },
      {
        name: 'Lana Del Rey',
        image: 'fixtures/lanadelrey.jpg',
        information:
          'Lana Del Rey is an American singer-songwriter known for her cinematic music style, blending elements of pop, rock, and Americana.',
      },
      {
        name: 'Joji',
        image: 'fixtures/joji.jpeg',
        information:
          'Joji is a Japanese-Australian singer known for his moody, introspective music, transitioning from his YouTube personality Filthy Frank.',
      },
      {
        name: 'Chetta',
        image: 'fixtures/chetta.webp',
        information: null,
      },
      {
        name: '$uicideBoy$',
        image: 'fixtures/suicideboys.jpg',
        information:
          '$uicideBoy$ is an American hip-hop duo from New Orleans known for their dark, gritty lyrics and DIY approach to music production.',
      },
      {
        name: 'Playboi Carti',
        image: 'fixtures/playboicarti.jpeg',
        information:
          'Playboi Carti is an American rapper known for his minimalist style and catchy, repetitive hooks, which have made him a prominent figure in the trap scene.',
      },
      {
        name: 'Pouya',
        image: 'fixtures/pouya.jpg',
        information: 'Pouya is an American rapper from Miami, known for his underground style, raw lyricism, and collaborations with other artists in the underground rap scene.',
      }
    );

  const [
    hellBoy,
    ballads1,
    normanRockwell,
    paradise,
    afterlife,
    iWantToDieInNewOrleans,
    longTermEffectsOfSuffering,
    dieLit,
    magnolia,
    undergroundUnderdog,
    fiveFive,
    theSouthGotSomethingtoSay,
  ] = await Album.create(
    {
      artist: lilPeep,
      title: 'Hellboy',
      releaseYear: 2018,
      image: 'fixtures/hellboy.jpeg',
    },
    {
      artist: joji,
      title: 'BALLADS1',
      releaseYear: 2018,
      image: 'fixtures/ballads1.png',
    },
    {
      artist: lanaDelRey,
      title: 'Norman Fucking Rockwell!',
      releaseYear: 2019,
      image: 'fixtures/normanfuckingrockwell.webp',
    },
    {
      artist: lanaDelRey,
      title: 'Paradise',
      releaseYear: 2012,
      image: 'fixtures/paradise.jpeg',
    },
    {
      artist: chetta,
      title: 'Afterlife',
      releaseYear: 2020,
      image: 'fixtures/afterlife.jpeg',
    },
    {
      artist: suicideBoys,
      title: 'I Want to Die in New Orleans',
      releaseYear: 2018,
      image: 'fixtures/iwanttodie.jpeg',
    },
    {
      artist: suicideBoys,
      title: 'Long Term Effects of Suffering',
      releaseYear: 2020,
      image: 'fixtures/longtermeffects.jpeg',
    },
    {
      artist: playboiCarti,
      title: 'Die Lit',
      releaseYear: 2018,
      image: 'fixtures/dielit.jpg',
    },
    {
      artist: playboiCarti,
      title: 'Magnolia',
      releaseYear: 2017,
      image: 'fixtures/magnolia.jpg',
    },
    {
      artist: pouya,
      title: 'Underground Underdog',
      releaseYear: 2016,
      image: 'fixtures/undergroundunderdogs.jpeg',
    },
    {
      artist: pouya,
      title: 'Five Five',
      releaseYear: 2018,
      image: 'fixtures/fivefive.jpeg',
    },
    {
      artist: pouya,
      title: 'The South Got Something to Say',
      releaseYear: 2019,
      image: 'fixtures/thesouthgotsomethingtosay.jpeg',
    },
  );

  await Track.create(
    {
      album: hellBoy,
      title: 'Runway',
      duration: '2:23',
      number: 1,
    },
    {
      album: hellBoy,
      title: 'Hellboy',
      duration: '2:18',
      number: 2,
    },
    {
      album: ballads1,
      title: 'Ew',
      duration: '2:43',
      number: 1,
    },
    {
      album: ballads1,
      title: 'SLOW DANCING IN THE DARK',
      duration: '3:17',
      number: 2,
    },
    {
      album: ballads1,
      title: 'WANTED U',
      duration: '2:36',
      number: 3,
    },
    {
      album: normanRockwell,
      title: 'Norman Fucking Rockwell',
      duration: '3:34',
      number: 1,
    },
    {
      album: normanRockwell,
      title: 'Mariners Apartment Complex',
      duration: '3:28',
      number: 2,
    },
    {
      album: paradise,
      title: 'Ride',
      duration: '4:43',
      number: 1,
    },
    {
      album: paradise,
      title: 'Carmen',
      duration: '4:06',
      number: 2,
    },
    {
      album: paradise,
      title: 'American',
      duration: '3:51',
      number: 3,
    },
    {
      album: afterlife,
      title: 'Afterlife',
      duration: '3:01',
      number: 1,
    },
    {
      album: afterlife,
      title: 'Dead Roses',
      duration: '2:50',
      number: 2,
    },
    {
      album: iWantToDieInNewOrleans,
      title: 'When the Rain Stops',
      duration: '2:44',
      number: 1,
    },
    {
      album: iWantToDieInNewOrleans,
      title: 'Carrollton',
      duration: '3:00',
      number: 2,
    },
    {
      album: longTermEffectsOfSuffering,
      title: 'Long Term Effects of Suffering',
      duration: '3:05',
      number: 1,
    },
    {
      album: longTermEffectsOfSuffering,
      title: 'U Ain’t Shit',
      duration: '2:56',
      number: 2,
    },
    {
      album: longTermEffectsOfSuffering,
      title: 'Broke Boyz',
      duration: '3:15',
      number: 3,
    },
    {
      album: dieLit,
      title: 'Long Time',
      duration: '2:36',
      number: 1,
    },
    {
      album: dieLit,
      title: 'R.I.P.',
      duration: '2:53',
      number: 2,
    },
    {
      album: magnolia,
      title: 'Magnolia',
      duration: '2:53',
      number: 1,
    },
    {
      album: magnolia,
      title: 'Woke Up Like This',
      duration: '2:57',
      number: 2,
    },
    {
      album: magnolia,
      title: 'Fell In Luv',
      duration: '3:10',
      number: 3,
    },
    {
      album: undergroundUnderdog,
      title: 'Hunnit Hunnit',
      duration: '3:18',
      number: 1,
    },
    {
      album: undergroundUnderdog,
      title: 'But Wait, There’s More',
      duration: '3:07',
      number: 2,
    },
    {
      album: undergroundUnderdog,
      title: 'Suicidal Thoughts in the Back of the Cadillac',
      duration: '2:59',
      number: 3,
    },
    {
      album: undergroundUnderdog,
      title: 'Get Buck',
      duration: '2:48',
      number: 4,
    },
    {
      album: fiveFive,
      title: 'Daddy Issues',
      duration: '2:59',
      number: 1,
    },
    {
      album: fiveFive,
      title: 'Void',
      duration: '2:46',
      number: 2,
    },
    {
      album: fiveFive,
      title: 'Don’t Bang My Line',
      duration: '2:34',
      number: 3,
    },
    {
      album: fiveFive,
      title: 'Handshakes',
      duration: '2:20',
      number: 4,
    },
    {
      album: theSouthGotSomethingtoSay,
      title: 'Cyanide',
      duration: '2:55',
      number: 1,
    },
    {
      album: theSouthGotSomethingtoSay,
      title: 'life? … lol',
      duration: '3:10',
      number: 2,
    },
    {
      album: theSouthGotSomethingtoSay,
      title: 'Florida Thang',
      duration: '2:30',
      number: 3,
    },
    {
      album: theSouthGotSomethingtoSay,
      title: 'I’m Alive',
      duration: '2:38',
      number: 4,
    },

  );

  await db.close();
};

run().catch(console.error);
