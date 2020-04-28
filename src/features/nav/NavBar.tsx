import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react-lite';
import NavStyles from '../nav/NavStyles';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ListIcon from '@material-ui/icons/List';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import CreateIcon from '@material-ui/icons/CreateNewFolder';
import { RootStoreContext } from '../../app/store/rootStore';
import { SignIn } from '../auth/signin';
import  SignUp  from '../auth/signup';

const NavBar: React.FC = () => {
  const classes = NavStyles();
  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn, logout } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const isMenuOpen = Boolean(anchorEl);


  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
    
    >
      <MenuItem >Profile</MenuItem>
      <MenuItem >My account</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const menuItems = [
    {
      link: '/',
      name: 'Home',
      icon: <HomeIcon className="text-white" />,
    },
    {
      link: '/events',
      name: 'Events',
      icon: <ListIcon className="text-white" />,
    },
    {
      link: '/create',
      name: 'Create',
      icon: <CreateIcon className="text-white" />,
    },
    
  ];

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <img src="/logo.png" height="50" alt="logo" />
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Hidden smDown>
            
            {menuItems.map((element) => {
              if (element.link) {
                return (
                  <NavLink
                    key={element.name}
                    to={element.link}
                    className={classes.spacing}
                  >
                    <Button
                      aria-controls="customized-menu"
                      aria-haspopup="true"
                      variant="text"
                      className={classes.colorWhite}
                      
                    >
                      {element.icon}
                      {element.name}
                    </Button>
                  </NavLink>
                );
              }
              return (
                !isLoggedIn && (
                  <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="outlined"
                    color="inherit"
                    size="small"
                    className={classes.spacing}
                    key={element.name}
                  >
                    {element.icon}
                    {element.name}
                  </Button>
                   
                )
              );
              
            })}
          </Hidden>
          <div className={classes.grow} />
          {!isLoggedIn && (   
            <div className={classes.sectionDesktop}>
             <Button
             aria-controls="customized-menu"
             aria-haspopup="true"
             variant="text"
             className={classes.colorWhite}
             size="small"
             onClick={() => openModal(<SignUp />)}
           >
            <HowToRegIcon className="text-white" /> Register
           </Button>

           <Button
             aria-controls="customized-menu"
             aria-haspopup="true"
             variant="text"
             className={classes.colorWhite}
             size="small"
             onClick={() => openModal(<SignIn />)}
           >
            <LockOpenIcon className="text-white" /> Login
           </Button>
           </div>
          )}
          
          {isLoggedIn && user && (
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {user.displayName}{' '}
                <Avatar
                  alt={user.displayName}
                  src={user.image || '/assets/user.png'}
                />
              </IconButton>
             
            </div>
          )}
        </Toolbar>
      </AppBar>
      
      {renderMenu}
    </div>
  );
};

export default observer(NavBar);
