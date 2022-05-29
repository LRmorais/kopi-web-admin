import React, {useState, useEffect} from 'react';
import { useData } from '../services/context';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';

import Select from '@material-ui/core/Select';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';

import socketIOClient from 'socket.io-client';
// import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:8080";


import {ChartBar} from '../components/chart'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    flex: 1,
    padding: theme.spacing(2),
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontSize: 20,
  },
  paperChart: {
    flex: 1,
    padding: theme.spacing(2),
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    background: "#61DD78",
    margin: theme.spacing(1),
    color: "#112312",
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
  activeButton: {
    background: "#DB4437",
    margin: theme.spacing(1),
    color: "#112312",
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
}));

export default function CenteredGrid() {
  const [step, setStep] = useState(1)
  const [askNumber, setAskNumber] = useState()
  const [timeNumber, setTimeNumber] = useState()
  const [actionButton, setActionButton] = useState('')
  const [actualAsk, setActualAsk] = useState(0)


  const socket = socketIOClient(ENDPOINT);

  const data = [
    ["Questões", "Acertos", "Erros"],
    ["Q1", 10, 8],
    ["Q2", 15, 7],
    ["Q3", 12, 10],
    ["Q4", 16, 6],
    ["Q5", 13, 11],
    ["Q6", 20,12],
    ["Q7", 18,5],
  ]
  const [ip, setIP] = useState('');

  const teste = [["Questões", "Acertos", "Erros"]];

  const { msg } = useData();


  useEffect( () => {
    
    socket.on("ip", (data) =>{
      setIP(data);
    });

    socket.emit("select_room", {
      username: 'admin',
      room: 'atividade',
    });

    socket.on("message", data => {
      console.log(data)
    })
  }, [])

  useEffect(() => {
    socket.emit('config',
    {
      teste: 'ok'
    },
    (response) => {

      if(response.length !== 0){
        console.log(response[0])
        setStep(3);
        setAskNumber(response[0]?.askNumber);
        setTimeNumber(response[0]?.timeNumber);
      }else{
        setStep(1)
      }
    }
    )

  }, []);




  useEffect(() =>{

    let qAsk = 10;
    let teste2 = Array(qAsk+1).fill().map(()=>Array(3).fill())


    for (let i=0; i < 1 ; i++) {
      teste2[i][0] = "Questões"
      teste2[i][1] = "Acertos"
      teste2[i][2] = "Erros"
    }
    for (let i=1; i <= qAsk; i++) {
      teste2[i][0] = "Q" + i
      teste2[i][1] = 0
      teste2[i][2] = 0
    }[]
    // console.log(teste2)
  },[])

  const handleChangeAsk = (prop) => (event) => {
    // setValues({ ...values, [prop]: event.target.value });
    setAskNumber(event.target.value)
  };
  const handleChangeTime = (prop) => (event) => {
    // setValues({ ...values, [prop]: event.target.value });
    setTimeNumber(event.target.value)
  };

  const classes = useStyles();

  const [seconds, setSeconds] = useState(5);
  const [pause, setPause] = useState(true);

  
  useEffect(() => {
    let data;
    const interval = setInterval(() => {
      if(!pause) {
        if (seconds > 0) {
          setSeconds(seconds - 1)
          data = {
            room: 'atividade',
            username: 'commonUser',
            message: seconds,
            next:false,
          };
      
          socket.emit('realTime', data);
          
          if(actualAsk <= askNumber   && seconds === 1) {
            setActualAsk(actualAsk +1)
            setSeconds(5)
            console.log("Q", actualAsk)
            data = {
              room: 'atividade',
              username: 'commonUser',
              message: seconds,
              next: true,
            };
            socket.emit('realTime', data);
          }
        }
      }else{
        const data = {
          room: 'atividade',
          username: 'commonUser',
          message: seconds,
        };
    
        socket.emit('realTime', data);
      }
    }, 1000);
    return () => clearInterval(interval);
  });
  // console.log(seconds) 
  const handlePauseToggle = () => {
    setPause(!pause);
  }

  

  return (
    <div className={classes.root}>
                {
          ( () => {
            if (step == 1){
              return (
              <div>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={6}>
                  <Paper  className={classes.paper}>
                    Digite o numero de questões
                  <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Valor</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      value={askNumber}
                      onChange={handleChangeAsk()}
                      labelWidth={60}
                    />
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => {
                      setStep(2);
                      // socket.emit("askNumber", {
                      //   askNumber: Number(askNumber)
                      // });
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    continuar
                  </Button>
                  </Paper>

                </Grid>
              </Grid>
              </div>
              )
            }else if (step == 2){
              return (
                <div>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={8}>
                  <Paper  className={classes.paper}>
                    Digite o tempo de duração de cada questão em segundos
                  <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Valor</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      value={timeNumber}
                      onChange={handleChangeTime()}
                      labelWidth={60}
                    />
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => {
                      setStep(3)
                      socket.emit("configArray", {
                        askNumber: Number(askNumber),
                        timeNumber: Number(timeNumber),
                      });
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    continuar
                  </Button>
                  </Paper>

                </Grid>
              </Grid>
              </div>
              )
            } else if(step == 3){
              return(
                <div>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >

                    {
                      Array.from({length: 6}).map((_, index) => (
                        <Grid item xs={8}>
                          <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel htmlFor="outlined-age-native-simple">{index}</InputLabel>
                          <Select
                            native
                            // value={state.age}
                            // onChange={handleChange}
                            label="Age"
                            inputProps={{
                              name: 'age',
                              id: 'outlined-age-native-simple',
                            }}
                          >
                            <option aria-label="None" value="" />
                            <option value={10}>A</option>
                            <option value={20}>B</option>
                            <option value={30}>C</option>
                            <option value={30}>D</option>
                          </Select>
                        </FormControl>
                      </Grid>
                      ))
                    }


                </Grid>

                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => {
                      setStep(4);
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    continuar
                  </Button>
                </div>
              )
            } else if (step == 4){
              return (
                <div>
              <Grid
                container
                spacing={3}
                // direction="column"
                // justify="center"
                // alignItems="center"
              >
                <Grid item xs={4}>
                  <Paper  className={classes.paper}>
                    Status da atividade: Iniciada
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper  className={classes.paper}>
                    Tempo Q{actualAsk}: {seconds}
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper  className={classes.paper}>
                    Codigo de acesso: {ip} 
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper  className={classes.paper}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={actionButton === 'Play' ? classes.activeButton: classes.button}
                      onClick={() => {
                        setActionButton('Play')
                        handlePauseToggle()
                      }}
                      endIcon={<PlayArrow />}
                    >
                      Iniciar atividade
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper  className={classes.paper}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={actionButton === 'Pause' ? classes.activeButton: classes.button}
                      onClick={() => {
                        setActionButton('Pause')
                        handlePauseToggle()
                      }}
                      endIcon={<PauseIcon />}
                    >
                      Pausar atividade
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper  className={classes.paper}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={actionButton === 'Stop' ? classes.activeButton: classes.button}
                      onClick={() => {
                        setActionButton('Stop')
                        let check = 'teste1';
                        socket.emit("check", check)
                      }}
                      endIcon={<StopIcon />}
                    >
                      Finalizar atividade
                    </Button>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper  className={classes.paperChart}>
                    <ChartBar data={data}/>
                  </Paper>
                </Grid>
              </Grid>
              </div>
              )
            }
          })()
        }

    </div>
  );
}
