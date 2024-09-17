import React from 'react';
import imageNotFound from '../../../assets/images//no-image.jpg';
import { API_URL, CardItem } from '../../../constants';
import { CardMedia, Grid2, styled, Typography } from '@mui/material';
import { Album } from '../../../types';

const AlbumCardMedia = styled(CardMedia)({
  height: '200px',
  width: '200px',
  borderRadius: '10px',
});

interface Props {
  album: Album;
}

const AlbumCard: React.FC<Props> = ({ album }) => {
  let albumImage = imageNotFound;

  if (album.image) {
    albumImage = `${API_URL}/${album.image}`;
  }

  return (
    <CardItem to={`/albums/${album._id}`} sx={{ width: '224px' }}>
      <Grid2 container direction="column" spacing={1}>
        <Grid2>
          <AlbumCardMedia image={albumImage} />
        </Grid2>
        <Grid2 mt={1}>
          <Typography sx={{ mb: '3px' }}>{album.title}</Typography>
          <Typography color="text.secondary" variant="body2">
            {album.releaseYear} • Album
          </Typography>
        </Grid2>
      </Grid2>
    </CardItem>
  );
};

export default AlbumCard;
