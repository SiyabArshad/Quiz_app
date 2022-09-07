import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Navigation from "./Navigation"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

export default function Createuser() {
  const [email, setemail] = React.useState("")
  const [password, setpassword] = React.useState("")
  const [mesage, setmessage] = React.useState(false)
  const [err, seterr] = React.useState("");
  const [open, setOpen] = React.useState(true);
  const [statuserr, setstatuserr] = React.useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setstatuserr(true)
        setmessage(true)
        seterr("User Added Successfully");
        setTimeout(() => {
          window.location.reload(true)
        }, 2000);
      })
      .catch((error) => {
        setstatuserr(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        setmessage(true)
        seterr(errorMessage);
        setTimeout(() => {
          window.location.reload(true)
        }, 2000);
        // ..
      });
  };

  return (
    <>
      <Navigation></Navigation>

      <ThemeProvider theme={theme}>
        {
          mesage &&
          <Box  className="isc">
            <Collapse in={open}>
              <Alert
                style={{ backgroundColor: !statuserr && "#ff9999" }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {err}!
              </Alert>
            </Collapse>
          </Box>
        }
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create New User
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                onChange={(e) => setemail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                color={"success"}

              />
              <TextField
                onChange={(e) => setpassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color={"success"}

              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{backgroundColor:"#548a3e"}}
              >
                Create user
              </Button>
              <Typography color="darkorange" fontSize="13px">Kindly set Password minimum of 8 Characters includes letter numbers and symbols </Typography>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}