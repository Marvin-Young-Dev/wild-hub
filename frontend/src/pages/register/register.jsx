import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();

    // Passwort überprüfen
    if (password !== repeatPassword) {
      setMessage("Passwörter stimmen nicht überein.");
      setPassword("");
      setRepeatPassword("");
      return;
    }

    if (password.length < 6) {
      setMessage("Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }

    if (username.trim() === "") {
      setMessage("Benutzername darf nicht leer sein.");
      return;
    }

    try {
      await axios.post("http://localhost:9000/api/userregister", { username, password });
      alert("Registrierung erfolgreich!");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("Server-Fehler. Bitte später erneut versuchen.");
      }
    }
  }

  return (
    <div className="center-wrapperRegister">
      <div className="reg_formRegister">
        <form onSubmit={handleRegister}>
          <TextField
            required
            label="Benutzername"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            label="Passwort"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                    aria-label="Passwort anzeigen"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            label="Passwort wiederholen"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showRepeatPassword ? "text" : "password"}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                    aria-label="Passwort wiederholen anzeigen"
                  >
                    {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#8B0000",
              color: "white",
              '&:hover': { backgroundColor: "#ac2727" },
              marginTop: 2,
            }}
            fullWidth
          >
            Registrieren
          </Button>
          {message && <p style={{ color: "red", marginTop: 10 }}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
