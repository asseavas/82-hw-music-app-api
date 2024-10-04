import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import TrackHistory from './models/TrackHistory';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('trackhistories');
    await db.dropCollection('users');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [user] = await User.create(
    {
      username: 'user@music.local',
      password: '1nkn$jb',
      confirmPassword: '1nkn$jb',
      role: 'user',
      displayName: 'User',
      avatar: 'fixtures/user_avatar.jpeg',
      token: crypto.randomUUID(),
    },
    {
      username: 'admin@music.local',
      password: 'ved67#slm',
      confirmPassword: 'ved67#slm',
      role: 'admin',
      displayName: 'Admin',
      avatar: null,
      token: crypto.randomUUID(),
    },
  );

  const [lilPeep, lanaDelRey, joji, chetta, suicideBoys, playboiCarti, pouya, testArtist] = await Artist.create(
    {
      user: user,
      name: 'Lil Peep',
      image: 'fixtures/lilpeep.jpg',
      information:
        'Lil Peep was an American rapper and singer known for blending emo and hip-hop in his music. He tragically passed away from a drug overdose in 2017 at the age of 21.',
      isPublished: true,
    },
    {
      user: user,
      name: 'Lana Del Rey',
      image: 'fixtures/lanadelrey.jpg',
      information:
        'Lana Del Rey is an American singer-songwriter known for her cinematic music style, blending elements of pop, rock, and Americana.',
      isPublished: true,
    },
    {
      user: user,
      name: 'Joji',
      image: 'fixtures/joji.jpeg',
      information:
        'Joji is a Japanese-Australian singer known for his moody, introspective music, transitioning from his YouTube personality Filthy Frank.',
      isPublished: true,
    },
    {
      user: user,
      name: 'Chetta',
      image: 'fixtures/chetta.webp',
      information: null,
      isPublished: true,
    },
    {
      user: user,
      name: '$uicideBoy$',
      image: 'fixtures/suicideboys.jpg',
      information:
        '$uicideBoy$ is an American hip-hop duo from New Orleans known for their dark, gritty lyrics and DIY approach to music production.',
      isPublished: true,
    },
    {
      user: user,
      name: 'Playboi Carti',
      image: 'fixtures/playboicarti.jpeg',
      information:
        'Playboi Carti is an American rapper known for his minimalist style and catchy, repetitive hooks, which have made him a prominent figure in the trap scene.',
      isPublished: true,
    },
    {
      user: user,
      name: 'Pouya',
      image: 'fixtures/pouya.jpg',
      information:
        'Pouya is an American rapper from Miami, known for his underground style, raw lyricism, and collaborations with other artists in the underground rap scene.',
      isPublished: true,
    },
    {
      user: user,
      name: 'Test artist',
      image: null,
      information: null,
      isPublished: false,
    },
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
    testAlbum,
  ] = await Album.create(
    {
      artist: lilPeep,
      user: user,
      title: 'Hellboy',
      releaseYear: 2018,
      image: 'fixtures/hellboy.jpeg',
      isPublished: true,
    },
    {
      artist: joji,
      user: user,
      title: 'BALLADS1',
      releaseYear: 2018,
      image: 'fixtures/ballads1.png',
      isPublished: true,
    },
    {
      artist: lanaDelRey,
      user: user,
      title: 'Norman Fucking Rockwell!',
      releaseYear: 2019,
      image: 'fixtures/normanfuckingrockwell.webp',
      isPublished: true,
    },
    {
      artist: lanaDelRey,
      user: user,
      title: 'Paradise',
      releaseYear: 2012,
      image: 'fixtures/paradise.jpeg',
      isPublished: true,
    },
    {
      artist: chetta,
      user: user,
      title: 'Afterlife',
      releaseYear: 2020,
      image: 'fixtures/afterlife.jpeg',
      isPublished: true,
    },
    {
      artist: suicideBoys,
      user: user,
      title: 'I Want to Die in New Orleans',
      releaseYear: 2018,
      image: 'fixtures/iwanttodie.jpeg',
      isPublished: true,
    },
    {
      artist: suicideBoys,
      user: user,
      title: 'Long Term Effects of Suffering',
      releaseYear: 2020,
      image: 'fixtures/longtermeffects.jpeg',
      isPublished: true,
    },
    {
      artist: playboiCarti,
      user: user,
      title: 'Die Lit',
      releaseYear: 2018,
      image: 'fixtures/dielit.jpg',
      isPublished: true,
    },
    {
      artist: playboiCarti,
      user: user,
      title: 'Magnolia',
      releaseYear: 2017,
      image: 'fixtures/magnolia.jpg',
      isPublished: true,
    },
    {
      artist: pouya,
      user: user,
      title: 'Underground Underdog',
      releaseYear: 2016,
      image: 'fixtures/undergroundunderdogs.jpeg',
      isPublished: true,
    },
    {
      artist: pouya,
      user: user,
      title: 'Five Five',
      releaseYear: 2018,
      image: 'fixtures/fivefive.jpeg',
      isPublished: true,
    },
    {
      artist: pouya,
      user: user,
      title: 'The South Got Something to Say',
      releaseYear: 2019,
      image: 'fixtures/thesouthgotsomethingtosay.jpeg',
      isPublished: true,
    },
    {
      artist: testArtist,
      user: user,
      title: 'Test album',
      releaseYear: 2024,
      image: null,
      isPublished: false,
    },
  );

  const [runway, hellboy] = await Track.create(
    {
      album: hellBoy,
      user: user,
      title: 'Runway',
      duration: '2:23',
      number: 1,
      isPublished: true,
    },
    {
      album: hellBoy,
      user: user,
      title: 'Hellboy',
      duration: '2:18',
      number: 2,
      isPublished: true,
    },
    {
      album: ballads1,
      user: user,
      title: 'Ew',
      duration: '2:43',
      number: 1,
      isPublished: true,
    },
    {
      album: ballads1,
      user: user,
      title: 'SLOW DANCING IN THE DARK',
      duration: '3:17',
      number: 2,
      isPublished: true,
    },
    {
      album: ballads1,
      user: user,
      title: 'WANTED U',
      duration: '2:36',
      number: 3,
      isPublished: true,
    },
    {
      album: normanRockwell,
      user: user,
      title: 'Norman Fucking Rockwell',
      duration: '3:34',
      number: 1,
      isPublished: true,
    },
    {
      album: normanRockwell,
      user: user,
      title: 'Mariners Apartment Complex',
      duration: '3:28',
      number: 2,
      isPublished: true,
    },
    {
      album: paradise,
      user: user,
      title: 'Ride',
      duration: '4:43',
      number: 1,
      isPublished: true,
    },
    {
      album: paradise,
      user: user,
      title: 'Carmen',
      duration: '4:06',
      number: 2,
      isPublished: true,
    },
    {
      album: paradise,
      user: user,
      title: 'American',
      duration: '3:51',
      number: 3,
      isPublished: true,
    },
    {
      album: afterlife,
      user: user,
      title: 'Afterlife',
      duration: '3:01',
      number: 1,
      isPublished: true,
    },
    {
      album: afterlife,
      user: user,
      title: 'Dead Roses',
      duration: '2:50',
      number: 2,
      isPublished: true,
    },
    {
      album: iWantToDieInNewOrleans,
      user: user,
      title: 'When the Rain Stops',
      duration: '2:44',
      number: 1,
      isPublished: true,
    },
    {
      album: iWantToDieInNewOrleans,
      user: user,
      title: 'Carrollton',
      duration: '3:00',
      number: 2,
      isPublished: true,
    },
    {
      album: longTermEffectsOfSuffering,
      user: user,
      title: 'Long Term Effects of Suffering',
      duration: '3:05',
      number: 1,
      isPublished: true,
    },
    {
      album: longTermEffectsOfSuffering,
      user: user,
      title: 'U Ain’t Shit',
      duration: '2:56',
      number: 2,
      isPublished: true,
    },
    {
      album: longTermEffectsOfSuffering,
      user: user,
      title: 'Broke Boyz',
      duration: '3:15',
      number: 3,
      isPublished: true,
    },
    {
      album: dieLit,
      user: user,
      title: 'Long Time',
      duration: '2:36',
      number: 1,
      isPublished: true,
    },
    {
      album: dieLit,
      user: user,
      title: 'R.I.P.',
      duration: '2:53',
      number: 2,
      isPublished: true,
    },
    {
      album: magnolia,
      user: user,
      title: 'Magnolia',
      duration: '2:53',
      number: 1,
      isPublished: true,
    },
    {
      album: magnolia,
      user: user,
      title: 'Woke Up Like This',
      duration: '2:57',
      number: 2,
      isPublished: true,
    },
    {
      album: magnolia,
      user: user,
      title: 'Fell In Luv',
      duration: '3:10',
      number: 3,
      isPublished: true,
    },
    {
      album: undergroundUnderdog,
      user: user,
      title: 'Hunnit Hunnit',
      duration: '3:18',
      number: 1,
      isPublished: true,
    },
    {
      album: undergroundUnderdog,
      user: user,
      title: 'But Wait, There’s More',
      duration: '3:07',
      number: 2,
      isPublished: true,
    },
    {
      album: undergroundUnderdog,
      user: user,
      title: 'Suicidal Thoughts in the Back of the Cadillac',
      duration: '2:59',
      number: 3,
      isPublished: true,
    },
    {
      album: undergroundUnderdog,
      user: user,
      title: 'Get Buck',
      duration: '2:48',
      number: 4,
      isPublished: true,
    },
    {
      album: fiveFive,
      user: user,
      title: 'Daddy Issues',
      duration: '2:59',
      number: 1,
      isPublished: true,
    },
    {
      album: fiveFive,
      user: user,
      title: 'Void',
      duration: '2:46',
      number: 2,
      isPublished: true,
    },
    {
      album: fiveFive,
      user: user,
      title: 'Don’t Bang My Line',
      duration: '2:34',
      number: 3,
      isPublished: true,
    },
    {
      album: fiveFive,
      user: user,
      title: 'Handshakes',
      duration: '2:20',
      number: 4,
      isPublished: true,
    },
    {
      album: theSouthGotSomethingtoSay,
      user: user,
      title: 'Cyanide',
      duration: '2:55',
      number: 1,
      isPublished: true,
    },
    {
      album: theSouthGotSomethingtoSay,
      user: user,
      title: 'life? … lol',
      duration: '3:10',
      number: 2,
      isPublished: true,
    },
    {
      album: theSouthGotSomethingtoSay,
      user: user,
      title: 'Florida Thang',
      duration: '2:30',
      number: 3,
      isPublished: true,
    },
    {
      album: theSouthGotSomethingtoSay,
      user: user,
      title: 'I’m Alive',
      duration: '2:38',
      number: 4,
      isPublished: true,
    },
    {
      album: testAlbum,
      user: user,
      title: 'Test track 1 title',
      duration: '2:00',
      number: 1,
      isPublished: false,
    },
    {
      album: testAlbum,
      user: user,
      title: 'Test track 2 title',
      duration: '2:00',
      number: 2,
      isPublished: false,
    },
    {
      album: testAlbum,
      user: user,
      title: 'Test track 3 title',
      duration: '2:00',
      number: 3,
      isPublished: false,
    },
  );

  await TrackHistory.create(
    {
      artist: lilPeep,
      track: runway,
      user: user,
      datetime: new Date(),
    },
    {
      artist: lilPeep,
      track: hellboy,
      user: user,
      datetime: new Date(),
    },
  );

  await db.close();
};

run().catch(console.error);
