import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom"
import { getAuth, signOut } from "firebase/auth";
const pages = ['Questions', 'Add Question', 'Add User'];
const settings = ['Logout'];
const logoutuser=()=>{
  const auth = getAuth();
signOut(auth).then(() => {
  console.log("logout")
  setTimeout(() => {
    window.location.reload(true)
  }, 1000);
}).catch((error) => {
  // An error happened.
});
}
const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{backgroundColor:"#548a3e",overflow:"hidden"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
          style={{fontWeight:"bolder",fontSize:"1.4rem",textTransform:"capitalize"}}
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Admin Console
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem  onClick={handleCloseNavMenu}>
                <Link  to="/" className='link'>
                  <Typography style={{fontSize:"1.1rem",textTransform:"capitalize"}} textAlign="center">Questions</Typography>
                  </Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                <Link to="/addquestion" className='link'>    
                  <Typography style={{fontSize:"1.1rem",textTransform:"capitalize"}}  textAlign="center">Add Question</Typography>
                </Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                <Link to="/createuser" className='link'>
                  <Typography style={{fontSize:"1.1rem",textTransform:"capitalize"}} textAlign="center">Add User</Typography>
                </Link>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                <Link to="/addquantity" className='link'>
                  <Typography style={{fontSize:"1.1rem",textTransform:"capitalize"}}  textAlign="center">No.Questions</Typography>
                </Link>
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            style={{fontWeight:"bolder",fontSize:"1.4rem",textTransform:"capitalize"}}
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Admin Console
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link to="/" className='link'>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                style={{fontSize:"1.1rem",textTransform:"capitalize"}}
              >
                Questions
              </Button>
              </Link>
              <Link to="/addquestion" className='link'>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                style={{fontSize:"1.1rem",textTransform:"capitalize"}}
              >
                Add Question
              </Button>
              </Link>
              <Link to="/createuser" className='link'>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                style={{fontSize:"1.1rem",textTransform:"capitalize"}}
              >
                Add User
              </Button>
              </Link>
              <Link to="/addquantity" className='link'>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                style={{fontSize:"1.1rem",textTransform:"capitalize"}}
              >
                No.Questions
              </Button>
              </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="ExameFederativo.xxx" src={require("../images/favicon.png")} style={{height:"50px",width:"50px",backgroundRepeat:"no-repeat",backgroundSize:"contain"}} />
              </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem onClick={logoutuser} key={setting}>
                  <Typography style={{textTransform:"capitalize"}} textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navigation;
