import { useHistory } from 'react-router-dom';
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
import InputAdornment from '@mui/material/InputAdornment';
import Container from '@mui/material/Container';
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { width } from '@mui/system';
const theme = createTheme();
export default function Createuser() {
    const[email,setemail]=React.useState("")
    const[mesage,setmessage]=React.useState(false)
    const[err,seterr]=React.useState("");  
    const [open, setOpen] = React.useState(true);
    const [statuserr, setstatuserr] = React.useState(true);
    const [values, setValues] = React.useState({
      password: '',
      showPassword: false,
    });
   
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    const history =useHistory()
    const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, values.password)
  .then((userCredential) => {
    setstatuserr(true)
    setmessage(true)
    seterr("Logged in Successfully");
    history.push("/")
  })

  .catch((error) => {
    setstatuserr(false)
    const errorCode = error.code;
    const errorMessage = error.message;
    setmessage(true)
    seterr(errorMessage);
    setTimeout(() => {
        window.location.reload(true)
      },5000);
    // ..
  });
  };

  return (

<ThemeProvider theme={theme}>
{
          mesage&&
      <Box  className="isc">
      <Collapse in={open}>
        <Alert
        style={{backgroundColor:!statuserr&&"#ff9999"}}
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
        <div className='loglogin'>
        </div>

          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
            onChange={(e)=>setemail(e.target.value)}
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
           <FormControl style={{width:"100%",marginTop:"10px"}} variant="outlined">
            <InputLabel   color={"success"} htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              color={"success"}
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            fullWidth
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
              <div style={{height:"40px" ,width:"40px"}}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </div>
              </InputAdornment>
            }
            label="Password"
            
          />
          </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:"#548a3e"}}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}