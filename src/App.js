import React, { Fragment, useState, useEffect } from 'react';
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {

     //State del formulario
     const [busqueda, guardarBusqueda] = useState({ 
      ciudad: '',
      pais: ''
                });

      //State de la consulta
    const [consultar, guardarConsultar] = useState(false);

    //State para mostrar resultado
    const [resultado, guardarResultado] = useState({});

    //State en caso de error
    const [error, guardarError] = useState(false);

  //extraer ciudad y pais 
  const { ciudad, pais } = busqueda;

  useEffect(() => {
      
    const consultarAPI = async () => {

      if(consultar)  {
            const appId = '21cf11961e51efb458ee998e4b522c4c';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${appId}`;

            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            guardarResultado(resultado);
            guardarConsultar(false);

            //Detecta si hubo resultados correctos en la consulta

            if(resultado.cod === "404") {
              guardarError(true);
            } else {
                guardarError(false);
            }
          }

      }

      consultarAPI();
      // eslint-disable-next-line
  }, [consultar]);

let componente;
 if(error) {
  
    componente = <Error mensaje="No hay resultado" />
 } else {
    componente =   <Clima 
                resultado={resultado}
            />
 }

  return (
    <Fragment>
        <Header
        titulo='Clima React App'
        >
        </Header>

        <div className="contenedor-form">
                <div className="container">
                          <div className="row">
                                    <div className="col m6 s12">
                                        <Formulario 
                                          busqueda={busqueda}
                                          guardarBusqueda={guardarBusqueda}
                                          guardarConsultar={guardarConsultar}
                                        
                                        />
                                    </div>
                                    <div className="col m6 s12"> 
                                      {componente}
                                    </div>
                          </div>

                </div>
        </div>


    </Fragment>
  );
}

export default App;
