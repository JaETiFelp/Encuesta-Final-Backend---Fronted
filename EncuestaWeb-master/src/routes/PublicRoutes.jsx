import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navegacion from '../components/Navegacion'
import HomePage from '../pages/HomePage'
import EncuestasPage from '../pages/EncuestasPage'
import TipoEncuestaPage from '../pages/TipoEncuestaPage'
import VerEncuesta from '../components/encuesta/VerEncuesta'
import Resultado from '../components/resultados/Resultados'
const PublicRoutes = () => {
    return (
        <BrowserRouter>
              <Navegacion/>
              <Routes>
                <Route exact path="/" element= {<HomePage/>}/>
                <Route path="/encuestas" element= { <EncuestasPage/>} />
                <Route path="/resultados" element= {<Resultado/>}/>
                <Route path="/encuestas/:id" element= { <VerEncuesta/> }/>
             </Routes>
        </BrowserRouter>
      
    )
}

export default PublicRoutes
