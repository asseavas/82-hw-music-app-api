import express from 'express';
import { TrackMutation } from '../types';
import mongoose from 'mongoose';
import Track from '../models/Track';
import Album from '../models/Album';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const albumId = req.query.album;
    const artistId = req.query.artist;
    let query = {};

    if (albumId) {
      query = { album: albumId };
    } else if (artistId) {
      const albums = await Album.find({ artist: artistId }).select('_id');
      const albumIds = albums.map((album) => album._id);
      query = { album: { $in: albumIds } };
    }

    const tracks = await Track.find(query);
    return res.send(tracks);
  } catch (error) {
    next(error);
  }
});

tracksRouter.post('/', async (req, res, next) => {
  try {
    const TrackMutation: TrackMutation = {
      album: req.body.album,
      title: req.body.title,
      duration: req.body.duration,
    };

    const track = new Track(TrackMutation);
    await track.save();

    return res.send(track);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

export default tracksRouter;
