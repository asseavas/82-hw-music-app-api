import React from 'react';
import { Avatar, Grid2, styled, Typography } from '@mui/material';
import { Artist } from '../../../types';
import { API_URL } from '../../../constants';
import imageNotFound from '../../../assets/images/image-not-found.webp';
import { Link } from 'react-router-dom';

const ArtistCardItem = styled(Link)({
  textDecoration: 'none',
  color: 'white',
  height: '270px',
  padding: '12px',
  display: 'inline-block',
  borderRadius: '10px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#333',
  },
});

interface Props {
  artist: Artist;
}

const ArtistCard: React.FC<Props> = ({ artist }) => {
  let avatarImage = imageNotFound;

  if (artist.image) {
    avatarImage = `${API_URL}/${artist.image}`;
  }
  return (
    <ArtistCardItem to={`/artists/${artist._id}`}>
      <Grid2 container direction="column" spacing={1}>
        <Grid2>
          <Avatar
            alt={artist.name}
            src={avatarImage}
            sx={{ width: 180, height: 180 }}
          ></Avatar>
        </Grid2>
        <Grid2>
          <Typography sx={{ mb: '4px' }}>{artist.name}</Typography>
          <Typography color="text.secondary">Artist</Typography>
        </Grid2>
      </Grid2>
    </ArtistCardItem>
  );
};

export default ArtistCard;
