import express from 'express';
import Artist from '../models/Artist';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';
import { ArtistMutation } from '../types';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (error) {
    return next(error);
  }
});

artistsRouter.get('/:id', async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (artist === null) {
      return res.status(404).send({ error: 'Artist not found' });
    }

    return res.send(artist);
  } catch (error) {
    return next(error);
  }
});

artistsRouter.post(
  '/',
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const ArtistMutation: ArtistMutation = {
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        information: req.body.information || null,
      };

      const artist = new Artist(ArtistMutation);
      await artist.save();

      return res.send(artist);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(error);
      }

      return next(error);
    }
  },
);

export default artistsRouter;
