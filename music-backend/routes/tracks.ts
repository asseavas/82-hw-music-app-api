import express from 'express';
import mongoose from 'mongoose';
import Track from '../models/Track';
import Album from '../models/Album';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

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

tracksRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const tracksInAlbum = await Track.countDocuments({ album: req.body.album });

    const track = await Track.create({
      album: req.body.album,
      user: req.user?._id,
      title: req.body.title,
      duration: req.body.duration,
      number: tracksInAlbum + 1,
    });

    return res.send(track);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

tracksRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  async (req: RequestWithUser, res, next) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid track ID' });
      }

      if (!req.user) {
        return res.status(401).send({ error: 'User not found' });
      }

      const track = await Track.findById(id);

      if (!track) {
        return res.status(404).send({ error: 'Track not found' });
      }

      await Track.findByIdAndDelete(id);

      return res.send({ message: 'Track deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
);

tracksRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  async (req: RequestWithUser, res, next) => {
    try {
      const { id } = req.params;

      if (!req.user) {
        return res.status(401).send({ error: 'User not found' });
      }

      const track = await Track.findById(id);

      if (!track) {
        return res.status(404).send({ error: 'Track not found' });
      }

      track.isPublished = !track.isPublished;

      await track.save();

      return res.send({
        message: `Album's isPublished status updated to ${track.isPublished}`,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default tracksRouter;
