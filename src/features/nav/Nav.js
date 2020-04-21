import React, { Fragment, Component, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbarMargin: theme.mixins.toolbar,
  tabContent: {
    padding: theme.spacing(2),
  },
});

const MyToolbar = withStyles(styles)(
  class extends Component {
    static defaultProps = {
      MenuItems: () => (
        <Fragment>
          <MenuItem component={Link} to="/">
            Home
          </MenuItem>
          <MenuItem component={Link} to="/page2">
            Page 2
          </MenuItem>
          <MenuItem component={Link} to="/page3">
            Page 3
          </MenuItem>
        </Fragment>
      ),
      RightButton: () => <Button color="inherit">Login</Button>,
    };

    state = { anchor: null };

    closeMenu = () => this.setState({ anchor: null });

    render() {
      const { classes, title, MenuItems, RightButton } = this.props;
      //Tabes state
      const [value, setValue] = useState(0);
      const onChange = (e, value) => {
        setValue(value);
      };
      //Tabes state
      return (
        <Fragment>
          <AppBar>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={(e) => this.setState({ anchor: e.currentTarget })}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={this.state.anchor}
                open={Boolean(this.state.anchor)}
                onClose={this.closeMenu}
              >
                <MenuItems />
              </Menu>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {title}
              </Typography>
              <RightButton />
            </Toolbar>

            <Tabs value={value} onChange={onChange}>
              <Tab label="Item One" component={Link} to="/" />
              <Tab label="Item Two" component={Link} to="/page2" />
              <Tab label="Item Three" component={Link} to="/page3" />
            </Tabs>

          </AppBar>
         
<Typography component="div" className={classes.tabContent}></Typography>
          <div className={classes.toolbarMargin} />
        </Fragment>
      );
    }
  }
);

export const WithNavigation = withStyles(styles)(({ classes }) => (
  <div className={classes.root}>
    <Route
      exact
      path="/"
      render={() => (
        <Fragment>
          <MyToolbar title="Home" />
          <Typography>Home</Typography>
        </Fragment>
      )}
    />
    <Route
      exact
      path="/page2"
      render={() => (
        <Fragment>
          <MyToolbar title="Page 2" />
          <Typography>Page 2</Typography>
        </Fragment>
      )}
    />
    <Route
      exact
      path="/page3"
      render={() => (
        <Fragment>
          <MyToolbar title="Page 3" />
          <Typography>Page 3</Typography>
        </Fragment>
      )}
    />
  </div>
));
