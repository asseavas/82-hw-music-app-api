import React from 'react';
import imageNotFound from '../../../assets/images//no-image.jpg';
import { API_URL, CardItem, CardLinkItem } from '../../../constants';
import { CardMedia, Grid2, styled, Typography } from '@mui/material';
import { Album } from '../../../types';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { LoadingButton } from '@mui/lab';

const AlbumCardMedia = styled(CardMedia)({
  height: '200px',
  width: '200px',
  borderRadius: '10px',
});

interface Props {
  album: Album;
  isDeleting: boolean;
  onDelete: VoidFunction;
  isPublication: boolean;
  onPublish: VoidFunction;
}

const AlbumCard: React.FC<Props> = ({
  album,
  isDeleting,
  onDelete,
  isPublication,
  onPublish,
}) => {
  const user = useAppSelector(selectUser);
  let albumImage = imageNotFound;

  if (album.image) {
    albumImage = `${API_URL}/${album.image}`;
  }

  return (
    <CardItem sx={{ width: '224px' }}>
      <CardLinkItem to={`/albums/${album._id}`}>
        <Grid2 container direction="column" spacing={1}>
          <Grid2>
            <AlbumCardMedia image={albumImage} />
          </Grid2>
          <Grid2 mt={1}>
            <Typography sx={{ mb: '3px' }}>{album.title}</Typography>
            <Typography color="text.secondary" variant="body2">
              {album.releaseYear} • Album
            </Typography>
            {!album.isPublished && user?.role !== 'admin' && (
              <Typography
                variant="body2"
                sx={{
                  padding: '4px 8px',
                  mt: 1,
                  backgroundColor: '#333',
                  borderRadius: '6px',
                }}
              >
                Unpublished
              </Typography>
            )}
          </Grid2>
        </Grid2>
      </CardLinkItem>
      {user?.role === 'admin' && (
        <Grid2 mt={2} container spacing={1}>
          {!album.isPublished && (
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

export default AlbumCard;
