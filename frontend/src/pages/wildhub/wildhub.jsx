import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, Stack, Container } from '@mui/material';

function WildHub() {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Wildhub Patchnotes', path: '/wildhub/whPatchnotes/whpatchnotes' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{ // helles Grau
        color: '#222',
        py: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 3,
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" fontWeight="600" mb={4}>
            WildHub Menü
          </Typography>

          <Stack spacing={3}>
            {menuItems.map(({ label, path }) => (
              <Button
                key={label}
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => handleNavigate(path)}
                sx={{
                  borderRadius: 2,
                  fontWeight: '500',
                  textTransform: 'none',
                }}
              >
                {label}
              </Button>
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default WildHub;
