import express from 'express';
import { AlbumMutation } from '../types';
import { imagesUpload } from '../multer';
import Album from '../models/Album';
import mongoose from 'mongoose';
import Track from '../models/Track';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const artistId = req.query.artist;
    const query = artistId ? { artist: artistId } : {};
    const albums = await Album.find(query);
    return res.send(albums);
  } catch (error) {
    next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist', 'name');

    if (album === null) {
      return res.status(404).send({ error: 'Album not found' });
    }

    const tracks = await Track.find({ album: req.params.id }).sort({ number: 1 });

    const albumInfo = {
      artist: album.artist,
      albumName: album.title,
      releaseYear: album.releaseYear,
      tracks: tracks.map((track) => ({
        number: track.number,
        title: track.title,
        duration: track.duration
      }))
    };

    return res.send(albumInfo);
  } catch (error) {
    next(error);
  }
});

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const AlbumMutation: AlbumMutation = {
      artist: req.body.artist,
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      image: req.file ? req.file.filename : null,
    };

    const album = new Album(AlbumMutation);
    await album.save();

    return res.send(album);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

export default albumsRouter;
