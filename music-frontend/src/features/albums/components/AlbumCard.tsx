import React from 'react';
import imageNotFound from '../../../assets/images/image-not-found.webp';
import { API_URL } from '../../../constants';
import { CardMedia, Grid2, styled, Typography } from '@mui/material';
import { Album } from '../../../types';
import { Link } from 'react-router-dom';

const AlbumCardItem = styled(Link)({
  textDecoration: 'none',
  color: 'white',
  padding: '12px',
  display: 'inline-block',
  borderRadius: '10px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#333',
  },
});

const AlbumCardMedia = styled(CardMedia)({
  height: '200px',
  width: '200px',
  paddingTop: '56.25%',
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
    <AlbumCardItem to={`/albums/${album._id}`}>
      <Grid2 container direction="column" spacing={1}>
        <Grid2>
          <AlbumCardMedia image={albumImage} />
        </Grid2>
        <Grid2 mt={3}>
          <Typography sx={{ mb: '4px' }}>{album.title}</Typography>
          <Typography color="text.secondary">
            {album.releaseYear} · Album
          </Typography>
        </Grid2>
      </Grid2>
    </AlbumCardItem>
  );
};

export default AlbumCard;
