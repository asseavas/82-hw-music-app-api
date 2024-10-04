import express from 'express';
import Artist from '../models/Artist';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

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

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const artist = await Artist.create({
      user: req.user?._id,
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      information: req.body.information || null,
    });

    return res.send(artist);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid artist ID' });
    }

    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const artist = await Artist.findById(id);

    if (!artist) {
      return res.status(404).send({ error: 'Artist not found' });
    }

    await Artist.findByIdAndDelete(id);

    return res.send({ message: 'Artist deleted successfully' });
  } catch (error) {
    next(error);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const artist = await Artist.findById(id);

    if (!artist) {
      return res.status(404).send({ error: 'Artist not found' });
    }

    artist.isPublished = !artist.isPublished;

    await artist.save();

    return res.send({ message: `Artist's isPublished status updated to ${artist.isPublished}` });
  } catch (error) {
    next(error);
  }
});

export default artistsRouter;
