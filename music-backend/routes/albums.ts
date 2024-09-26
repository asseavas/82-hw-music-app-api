import express from 'express';
import { imagesUpload } from '../multer';
import Album from '../models/Album';
import mongoose from 'mongoose';
import Track from '../models/Track';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import Artist from '../models/Artist';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const artistId = req.query.artist;
    const query = artistId ? { artist: artistId } : {};
    const albums = await Album.find(query).sort({ releaseYear: -1 });
    return res.send(albums);
  } catch (error) {
    next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist');

    if (album === null) {
      return res.status(404).send({ error: 'Album not found' });
    }

    const tracks = await Track.find({ album: req.params.id }).sort('number');
    const tracksNumber = tracks.length;

    const albumInfo = {
      artist: album.artist,
      albumName: album.title,
      releaseYear: album.releaseYear,
      tracks: tracks.map(track => ({
        _id: track._id,
        number: track.number,
        title: track.title,
        duration: track.duration,
        isPublished: track.isPublished,
      })),
      tracksNumber: tracksNumber,
      image: album.image || null,
    };

    return res.send(albumInfo);
  } catch (error) {
    next(error);
  }
});

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const album = await Album.create({
      artist: req.body.artist,
      user: req.user?._id,
      title: req.body.title,
      releaseYear: parseFloat(req.body.releaseYear),
      image: req.file ? req.file.filename : null,
    });

    return res.send(album);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid album ID' });
    }

    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).send({ error: 'Album not found' });
    }

    await Artist.findByIdAndDelete(id);

    return res.send({ message: 'Album deleted successfully' });
  } catch (error) {
    next(error);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).send({ error: 'Album not found' });
    }

    album.isPublished = !album.isPublished;

    await album.save();

    return res.send({ message: `Album's isPublished status updated to ${album.isPublished}` });
  } catch (error) {
    next(error);
  }
});

export default albumsRouter;
