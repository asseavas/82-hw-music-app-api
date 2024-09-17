import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneArtist, selectOneArtistFetching } from './artistsSlice';
import { fetchOneArtist } from './artistsThunks';
import {
  Button,
  CircularProgress,
  Grid2,
  styled,
  Typography,
} from '@mui/material';
import { fetchAlbums } from '../albums/albumsThunks';
import { selectAlbums } from '../albums/albumsSlice';
import AlbumCard from '../albums/components/AlbumCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { API_URL, ContentContainer } from '../../constants';

const OneArtist = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const artist = useAppSelector(selectOneArtist);
  const albums = useAppSelector(selectAlbums);
  const isFetching = useAppSelector(selectOneArtistFetching);
  const artistImage = `${API_URL}/${artist?.image}`;

  const ImageBox = styled(Grid2)({
    padding: '30px',
    display: 'flex',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    flexDirection: 'column',
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${artistImage})`,
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  });

  useEffect(() => {
    dispatch(fetchOneArtist(id));
    dispatch(fetchAlbums(id));
  }, [dispatch, id]);

  return (
    <Grid2 container direction="column" spacing={2}>
      <Grid2>
        <Button
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/"
          sx={{ color: 'lightGrey' }}
        >
          To main
        </Button>
      </Grid2>
      {isFetching && (
        <Grid2>
          <CircularProgress />
        </Grid2>
      )}
      {artist && (
        <ContentContainer>
          <ImageBox>
            <Grid2
              component={Typography}
              variant="h1"
              sx={{ fontWeight: 900, mb: 1, mt: 'auto' }}
            >
              {artist.name}
            </Grid2>
            <Grid2
              component={Typography}
              color="text.secondary"
              sx={{ maxWidth: '70%', fontSize: '16px' }}
            >
              {artist.information || 'No information available'}
            </Grid2>
          </ImageBox>
          <Grid2 container mt={4} ml={2} direction="column" spacing={2}>
            <Grid2
              component={Typography}
              variant="h5"
              sx={{ fontWeight: 'medium', ml: 2, mt: 2 }}
            >
              Albums
            </Grid2>
            <Grid2>
              {albums && albums.length > 0 ? (
                albums.map((album) => (
                  <AlbumCard album={album} key={album._id} />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" ml={2}>
                  No albums available
                </Typography>
              )}
            </Grid2>
          </Grid2>
        </ContentContainer>
      )}
    </Grid2>
  );
};

export default OneArtist;
