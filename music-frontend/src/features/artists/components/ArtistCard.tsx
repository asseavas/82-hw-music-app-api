import React from 'react';
import { Avatar, Grid2, Typography } from '@mui/material';
import { Artist } from '../../../types';
import { API_URL, CardItem } from '../../../constants';
import noArtistImage from '../../../assets/images/no-artist-image.jpg';

interface Props {
  artist: Artist;
}

const ArtistCard: React.FC<Props> = ({ artist }) => {
  let avatarImage = noArtistImage;

  if (artist.image) {
    avatarImage = `${API_URL}/${artist.image}`;
  }

  return (
    <CardItem to={`/artists/${artist._id}`} sx={{ height: '270px' }}>
      <Grid2 container direction="column" spacing={1}>
        <Grid2
          component={Avatar}
          alt={artist.name}
          src={avatarImage}
          sx={{
            width: 180,
            height: 180,
            boxShadow: '5px 10px 10px 0px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Grid2>
      <Grid2>
        <Typography sx={{ mb: '3px' }}>{artist.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Artist
        </Typography>
      </Grid2>
    </CardItem>
  );
};

export default ArtistCard;
