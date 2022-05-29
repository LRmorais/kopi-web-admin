import React, {createContext, useContext, useState} from 'react';
// import uibuilder from '../libs/uibuilderfe';
// import uibuilder from 'node-red-contrib-uibuilder/front-end/src/uibuilderfe'



const DataContext = createContext();
// starta a conexão com node red
// uibuilder.start();

export default function DataProvider({children}) {
  const [msg, setMsg] = useState({})

    // const data = () =>{
    //   uibuilder.onChange('msg', (newVal) => {
    //     setMsg(newVal.payload)
    //   })
    // }
    // data();


    return <DataContext.Provider 
    value={{msg, setMsg}}>
      {children}
    </DataContext.Provider>
}
// um hook pra facilitar a obtenção dos dados
export function useData(){
  const context = useContext(DataContext)

  const { msg, setMsg } = context;
  return { msg, setMsg}
}