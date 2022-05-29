import React, {useCallback} from 'react';
import uibuilder from '../libs/uibuilderfe';



const Send = () => {

// envia uma mensagem de volta ao nodered
  const message = useCallback(
    () => {
      console.log('tudo ok')
    uibuilder.send({'topic':'uibuilderfe','payload':'Funcionando ok'})
    },[]);

  return(
    <div>
      <button onClick={message}>Click</button>
    </div>
  )
}

export default Send;