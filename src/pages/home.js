  
import React, {useState} from 'react';

// material ui imports
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// icones 
import { FcBarChart, FcAutomatic } from "react-icons/fc";



// componentes a serem renderizados
import Dashboard from './dashboard';
import Teste from './teste';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: "#112312"
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grow:{
    flexGrow: 1
  },
  topBar:{
    background: "#61DD78"
  },
  topBarTitle: {
    color: "#112312"
  },
  drawerIcon:{
    color: "#112312"
   }
}));

export default function MiniDrawer() {


  // component define qual componente sera renderizado no Main
  const [component, setComponent] = useState('Dashboard')

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
// função para abrir site externo
  function siteExterno(props) {
    return window.open(props,"_blank")
  }
  
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.topBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.grow}/>
          <Typography variant="h6" noWrap className={classes.topBarTitle}>
          KOPI
          </Typography>
          <div className={classes.grow}/>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose} className={classes.drawerIcon}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Dashboard','Configuração'].map((text, index) => (
            <ListItem 
            button key={text} 
            // setando os nomes na variavel auxiliar
            onClick={ () => {
              if(text === 'Dashboard'){
                setComponent('Dashboard')
              }else if(text === 'Configuração'){
                setComponent('Configuração')
              }else if(text === 'Oxigenação'){
                setComponent('Oxi')
              }
              else if( text === 'Cardio'){
                setComponent('bmp')
              }
              } }>
              <ListItemIcon>
                {/* If aninhado para organizar icons e textos respectivos */}
                {
                  ( () => {
                    if(index === 0){return <FcBarChart size={50}/>}
                    else if(index === 1){return <FcAutomatic size={50}/>}
                    // else if(index === 2) {return <FcLike size={50}/>}
                    // else if(index === 3) {return <FcElectricalSensor size={50}/>}

                  } )()
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> 
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* Estrutura condicional para selecionar componentes em main */}
        {
          ( () => {
            if (component === 'Dashboard'){
              return <Dashboard />
            }else if (component === 'Pressure'){
              return <p>ok</p>
            }else if(component === 'Oxi'){
              return <Teste />
            }else if(component === 'bmp'){
              return <p>ok</p>
            }
          })()
        }
        
      </main>
    </div>
  );
}