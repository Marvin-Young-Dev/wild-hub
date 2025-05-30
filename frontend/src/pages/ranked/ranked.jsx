import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, TableSortLabel, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Ranked() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [totalMatches, setTotalMatches] = useState(0);
  const [orderBy, setOrderBy] = useState('picks');
  const [order, setOrder] = useState('desc');

  // States für das Popup zur Namenskorrektur
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [newName, setNewName] = useState('');

  const link = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");

    axios.get('http://localhost:9000/api/ranked_matches', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setTotalMatches(res.data.length);
        processStats(res.data);
      })
      .catch(error => {
        if (error.response?.status === 403) {
          navigate("/login");
        } else {
          console.error("Fehler beim Laden:", error);
        }
      });
  }, [navigate]);

  const processStats = (matches) => {
    const data = {};

    matches.forEach(({ ranked_bans, ranked_blue_team, ranked_red_team, ranked_winner }) => {
      const bans = ranked_bans.split(',').map(ch => ch.trim());
      const blue = ranked_blue_team.split(',').map(ch => ch.trim());
      const red = ranked_red_team.split(',').map(ch => ch.trim());

      [...blue, ...red].forEach(champ => {
        if (!data[champ]) data[champ] = { picks: 0, bans: 0, wins: 0 };
        data[champ].picks++;
      });

      bans.forEach(champ => {
        if (!data[champ]) data[champ] = { picks: 0, bans: 0, wins: 0 };
        data[champ].bans++;
      });

      const winningTeam = ranked_winner === "Blue" ? blue : red;
      winningTeam.forEach(champ => {
        if (!data[champ]) data[champ] = { picks: 0, bans: 0, wins: 0 };
        data[champ].wins++;
      });
    });

    setStats(data);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getChampionIcon = (champName) => {
    try {
      return require(`../../assets/icons/champion/${champName}.webp`);
    } catch {
      return null;
    }
  };

  // Popup-Dialog-Funktionen
  const handleOpenDialog = (champ) => {
    setSelectedName(champ);
    setNewName(champ);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedName('');
    setNewName('');
  };

  const handleNameCorrection = () => {
    const token = localStorage.getItem("jwt_token");
    axios.post('http://localhost:9000/api/ranked_name_correction', {
      fromName: selectedName,
      toName: newName
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setOpenDialog(false);
      window.location.reload(); // Alternativ: Stats neu laden ohne reload
    }).catch(err => {
      console.error("Fehler bei Namenskorrektur:", err);
    });
  };

  const sortedStats = Object.entries(stats).sort(([, a], [, b]) => {
    const valA = orderBy === 'winrate' ? a.wins / (a.picks || 1) :
      orderBy === 'pickrate' ? a.picks :
        orderBy === 'banrate' ? a.bans :
          a[orderBy];
    const valB = orderBy === 'winrate' ? b.wins / (b.picks || 1) :
      orderBy === 'pickrate' ? b.picks :
        orderBy === 'banrate' ? b.bans :
          b[orderBy];

    return order === 'asc' ? valA - valB : valB - valA;
  });

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Ranked Champion Stats : Current Matches <span style={{ color: "#F00", textDecoration: "underline" }}>{totalMatches}</span> inside the database
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        <Table>
          <button variant="contained" color="primary" onClick={() => link('/ranked/supportranked')}>
            Import Data
          </button>
        </Table>
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Champion</strong></TableCell>
              {['picks', 'pickrate', 'bans', 'banrate', 'winrate'].map((key) => (
                <TableCell key={key} align="right">
                  <TableSortLabel
                    active={orderBy === key}
                    direction={orderBy === key ? order : 'asc'}
                    onClick={() => handleSort(key)}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStats.map(([champ, { picks, bans, wins }]) => {
              const winrate = picks > 0 ? (wins / picks) * 100 : 0;
              const pickrate = (picks / (totalMatches * 2)) * 100;
              const banrate = (bans / (totalMatches * 10)) * 100;
              const icon = getChampionIcon(champ);

              return (
                <TableRow key={champ}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      {icon && (
                        <img
                          src={icon}
                          alt={champ}
                          style={{ width: 40, height: 40, marginRight: 16, borderRadius: 8 }}
                        />
                      )}
                      <span
                        onClick={() => handleOpenDialog(champ)}
                        style={{ cursor: 'pointer', textDecoration: 'underline', color: '#1976d2' }}
                        title="Name korrigieren"
                      >
                        {champ}
                      </span>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{picks}</TableCell>
                  <TableCell align="right">{pickrate.toFixed(1)}%</TableCell>
                  <TableCell align="right">{bans}</TableCell>
                  <TableCell align="right">{banrate.toFixed(1)}%</TableCell>
                  <TableCell align="right">
                    <Tooltip title={`Siege: ${wins} / Picks: ${picks}`}>
                      <span>{picks > 0 ? `${winrate.toFixed(1)}%` : '–'}</span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup zur Namenskorrektur */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Champion-Namen korrigieren</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Neuer Name"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Abbrechen</Button>
          <Button onClick={handleNameCorrection} variant="contained" color="primary">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Ranked;
