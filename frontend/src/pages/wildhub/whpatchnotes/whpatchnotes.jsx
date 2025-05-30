import React from 'react';
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const WhPatchnotes = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>

      <Typography variant="h3" gutterBottom align="center" fontWeight="bold">
        WildHub Patchnotes
      </Typography>

      {/* Leeres Patchnote-Paper als Platzhalter */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          minHeight: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.disabled',
          borderStyle: 'dashed',
          borderColor: 'grey.400',
          backgroundColor: '#fafafa',
          fontStyle: 'italic',
        }}
      >
        <Typography variant="body1"> New Patchnotes soon.</Typography>
      </Paper>

      {/* Neuester Patch */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Beta 0.7.20 KW22
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          🌟 Added Features
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'secondary.main' }} />
            </ListItemIcon>
            <ListItemText primary="🔑 Secure login and registration system with password hashing" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'secondary.main' }} />
            </ListItemIcon>
            <ListItemText primary="🛡️ Initial ranked and ARAM match data tables integrated (Improve over time)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'secondary.main' }} />
            </ListItemIcon>
            <ListItemText primary="🔒 JWT authentication with protected routes" />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          🐞 Bug Fixes & 📈 Improvements
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Improved database schema for user and profile data" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Optimized user creation flow and data integrity checks" />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          📑 Added Pages
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Improved database schema for user and profile data" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Optimized user creation flow and data integrity checks" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Added WildHub Page (Menue)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Added Wild-Hub Patchnotes Page || Navbar Wildhub --> Wildhub Patchnotes" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Added 1 More Error Page With Custom Error Message" />
          </ListItem>
        </List>
        <Typography variant="h6" gutterBottom sx={{ mt: 2, fontSize: 12 }}>
          Updated: 30.05.2025
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Beta 0.7.0 KW21
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          🌟 Added Features
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'primary.main' }} />
            </ListItemIcon>
            <ListItemText primary="🖥️ Basic React layout for the frontpage implemented (Navbar and Content Space)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'primary.main' }} />
            </ListItemIcon>
            <ListItemText primary="⚙️ Created base and functional layout for login, registration, and authentication" />
          </ListItem>
        </List>
        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          📑 Added Pages
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Added Register and Login Page || In Navbar (When not logged in)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Added Profile picture || In Navbar When Login (For Settings) " />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Added Aram Page || In Navbar" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Added Ranked Page || In Navbar" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Added Error Pages 3 With Custom Error Messages" />
          </ListItem>
        </List>
        <Typography variant="h6" gutterBottom sx={{ mt: 2, fontSize: 12 }}>
          Updated: 30.05.2025
        </Typography>
      </Paper>
    </Container>
  );
};

export default WhPatchnotes;
