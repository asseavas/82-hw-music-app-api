import { Box, CardMedia, Grid2, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const API_URL = 'http://localhost:8000';
export const GOOGLE_CLIENT_ID = '361227404492-15in7poel39gi3r5oe2g6ef4snkc3dvn.apps.googleusercontent.com';

export const ContentContainer = styled(Grid2)({
  borderRadius: '10px',
  background: '#121212',
  paddingBottom: '32px',
  marginBottom: '30px',
});

export const CardItem = styled(Box)({
  padding: '12px',
  display: 'inline-block',
  borderRadius: '10px',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#333',
  },
  cursor: 'pointer',
});

export const CardLinkItem = styled(Link)({
  textDecoration: 'none',
  color: 'white',
});

export const AlbumImageContainer = styled(Grid2)({
  padding: '30px',
  display: 'flex',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  background: 'linear-gradient(to bottom, rgba(80, 80, 80, 0.7), rgba(12, 12, 12, 0.1))',
});

export const OneAlbumCardMedia = styled(CardMedia)({
  height: '250px',
  width: '250px',
  borderRadius: '6px',
});

export const AlbumTracksInfoContainer = styled(Grid2)({
  display: 'flex',
  alignItems: 'center',
  paddingInline: '16px',
  borderBottom: '1px solid rgba(80, 80, 80, 0.7)',
  color: 'grey',
});

export const TrackItem = styled(Box)({
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  paddingInline: '16px',
  borderRadius: '6px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#333',
  },
});
