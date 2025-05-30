import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, TableSortLabel, Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Aram() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [totalMatches, setTotalMatches] = useState(0);
  const [orderBy, setOrderBy] = useState('picks');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");

    axios.get('http://localhost:9000/api/aram_matches', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setTotalMatches(res.data.length);
      processStats(res.data);
    })
    .catch(error => {
      if (error.response && error.response.status === 403) {
        navigate("/login");
      } else {
        console.error("Fehler beim Laden:", error);
      }
    });
  }, [navigate]);

  const processStats = (matches) => {
    const data = {};

    matches.forEach(({ aram_blue_team, aram_red_team, aram_winner }) => {
      const blue = aram_blue_team.split(',').map(ch => ch.trim());
      const red = aram_red_team.split(',').map(ch => ch.trim());

      [...blue, ...red].forEach(champ => {
        if (!data[champ]) data[champ] = { picks: 0, wins: 0 };
        data[champ].picks++;
      });

      const winningTeam = aram_winner === "Blue" ? blue : red;
      winningTeam.forEach(champ => {
        if (!data[champ]) data[champ] = { picks: 0, wins: 0 };
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

  const sortedStats = Object.entries(stats).sort(([, a], [, b]) => {
    const getValue = (stat) => {
      if (orderBy === 'winrate') return stat.picks > 0 ? stat.wins / stat.picks : 0;
      if (orderBy === 'pickrate') return stat.picks / (totalMatches * 10); // 10 = 5v5 Picks
      return stat[orderBy] || 0;
    };
    const valA = getValue(a);
    const valB = getValue(b);

    return order === 'asc' ? valA - valB : valB - valA;
  });

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Aram Champion Stats : Current Matches <span style={{ color: "#F00", textDecoration: "underline" }}>{totalMatches}</span> inside the database
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Champion</strong></TableCell>
              {['picks', 'pickrate', 'winrate'].map((key) => (
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
            {sortedStats.map(([champ, { picks, wins }]) => {
              const winrate = picks > 0 ? (wins / picks) * 100 : 0;
              const pickrate = totalMatches > 0 ? (picks / (totalMatches * 10)) * 100 : 0; // 10 = 5v5 Picks
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
                      {champ}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{picks}</TableCell>
                  <TableCell align="right">{pickrate.toFixed(1)}%</TableCell>
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
    </div>
  );
}

export default Aram;
