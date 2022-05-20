import { useState, useEffect } from 'react';
import './App.scss';

function App() {

  const [pixels, setPixels] = useState('');
  const [rems, setRems] = useState('');
  const [reverseinputs, setReverseinputs] = useState(false);
  
  useEffect(() => {
      setRems(pixels.toString().replace(/[a-z]/g,'')/16)
  }, [pixels]);

  useEffect(() => {
      setPixels(rems.toString().replace(/[a-z]/g,'')*16)
  }, [rems]);

  const reverse = () =>{
    setReverseinputs(!reverseinputs)
    reverseinputs ? setPixels(10) :setRems(10)
  }

  return (
    <div className="app">

      <div className="app__container">
      <h1>Conversor de PX a REM</h1>

   {reverseinputs ? (
     <div className="app__inputs"> 
     <div className="app__inputs__pixels">
   <p>Rems</p>
     <input
     value={rems}
     onChange={e=> setRems(e.target.value)}
     />
     </div>
     <div 
   onClick={reverse}
   className="app__inputs__reves">
       <img 
       src='data:image/png;base64,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' alt='reves' />
 
   </div>   
     <div className="app__inputs__rems">
      <p>Pixels</p>
      <input
      value={pixels}
      onChange={e=> setPixels(e.target.value)}
      />
      </div>
       </div>
   )   :<div className="app__inputs"> 
    <div className="app__inputs__pixels">
  <p>Pixels</p>
    <input
    value={pixels}
    onChange={e=> setPixels(e.target.value)}
    />
    </div>
    <div 
  onClick={reverse}
  className="app__inputs__reves">
      <img 
      src='data:image/png;base64,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' alt='reves' />

  </div>   
    <div className="app__inputs__rems">
     <p>Rems</p>
     <input
     value={rems}
     onChange={e=> setRems(e.target.value)}
     />
     </div>
      </div>}

      </div>
    </div>
  );
}

export default App;
