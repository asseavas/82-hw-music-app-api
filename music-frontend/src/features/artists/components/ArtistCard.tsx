import React from 'react';
import { Avatar, Grid2, Typography } from '@mui/material';
import { Artist } from '../../../types';
import { API_URL, CardItem, CardLinkItem } from '../../../constants';
import noArtistImage from '../../../assets/images/no-artist-image.jpg';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';

interface Props {
  artist: Artist;
  isDeleting: boolean;
  onDelete: VoidFunction;
  isPublication: boolean;
  onPublish: VoidFunction;
}

const ArtistCard: React.FC<Props> = ({
  artist,
  isDeleting,
  onDelete,
  isPublication,
  onPublish,
}) => {
  const user = useAppSelector(selectUser);
  let avatarImage = noArtistImage;

  if (artist.image) {
    avatarImage = `${API_URL}/${artist.image}`;
  }

  return (
    <CardItem
      sx={{
        height:
          user?.role === 'admin'
            ? '305px'
            : !artist.isPublished
              ? '290px'
              : '275px',
      }}
    >
      <CardLinkItem to={`/artists/${artist._id}`}>
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
          <Typography sx={{ mt: 1, mb: '3px' }}>{artist.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Artist
          </Typography>
          {!artist.isPublished && user?.role !== 'admin' && (
            <Typography
              variant="body2"
              sx={{
                padding: '4px 8px',
                marginTop: '4px',
                backgroundColor: '#333',
                borderRadius: '6px',
              }}
            >
              Unpublished
            </Typography>
          )}
        </Grid2>
      </CardLinkItem>
      {user?.role === 'admin' && (
        <Grid2 mt={2} container spacing={1}>
          {!artist.isPublished && (
            <Grid2>
              <LoadingButton
                loading={isPublication}
                color="info"
                variant="contained"
                onClick={onPublish}
                sx={{ width: '100%', height: '30px' }}
              >
                Publish
              </LoadingButton>
            </Grid2>
          )}
          <Grid2 ml="auto">
            <LoadingButton
              loading={isDeleting}
              color="error"
              variant="contained"
              onClick={onDelete}
              sx={{ width: '100%', height: '30px' }}
            >
              Delete
            </LoadingButton>
          </Grid2>
        </Grid2>
      )}
    </CardItem>
  );
};

export default ArtistCard;
