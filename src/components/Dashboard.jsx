import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem'
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Menu from '@mui/material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DashboardMain from "./dashboard/DashboardMain";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Applications from "./applications/Applications";
import Emails from "./emails/Emails.jsx"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, 
  useNavigate
} from "react-router-dom";
import "./dashboard.css"
import { StoreMallDirectory } from '@mui/icons-material';


const drawerWidth = 240;

function Dashboard(props) {

  let navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [reload, setReload] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
       
          <Link className="dash-links" to="/" >
            <ListItem button >
              <ListItemIcon>
                  <DashboardIcon /> 
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>

          <Link className="dash-links" to="/applications">
            <ListItem button >
              <ListItemIcon>
                  <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Applications" />
            </ListItem>
          </Link>

          <Link className="dash-links" to="/accepted">
            <ListItem button >
              <ListItemIcon>
                  <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="Accepted" />
            </ListItem>
          </Link>

          <Link className="dash-links" to="/rejected">
            <ListItem button >
              <ListItemIcon>
                  <CloseIcon />
              </ListItemIcon>
              <ListItemText primary="Rejected" />
            </ListItem>
          </Link>

          <Link className="dash-links" to="/emails" >
            <ListItem button >
              <ListItemIcon>
                  <AlternateEmailIcon /> 
              </ListItemIcon>
              <ListItemText primary="Emails" />
            </ListItem>
          </Link>
 
      </List>
      <Divider />
      <List>
          <ListItem 
            button
            onClick={() => {
              props.loggedIn()
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="logout" />
          </ListItem>
      </List>
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
// Clears everything from the local Storage  

  return (
    
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#9c27b0'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            UNYCC DASHBOARD
          </Typography>
        </Toolbar>
     
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
       {/* Enter Body Content Here */}
      
        <Routes>
          <Route path="/applications" element={<Applications />} />
          <Route path="/emails" element={<Emails />} />
          <Route path="/" element={<DashboardMain />} />
        </Routes>
      </Box>
    </Box>

  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;