
import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from './logo.svg';
//import { simpleAction } from '../actions/simpleAction'
import './App.scss';

import Alert from './components/alert/alert';
import Card from './components/product/card/card';
import Summary from './components/summary/summary';
import Carousel from './components/carousel/carousel';

//import Test from './components/Test/Test';

class App extends Component {
 
  render() {
  return (

   <div className="gb-wrapper container-fluid">
      <div className="row">
         <div className="alert-message-gbChk col-md-12">
             <Alert mensaje={"¡Buenas noticias! Tenés un descuento especial por producto combinado y bonificación."} tipo={"success"}/>
             <Alert mensaje={"¡Buenas noticias! Tenés un descuento especial por bonificación."} tipo={"success"}/>
             <Alert mensaje={"¡Buenas noticias! Tenés un descuento especial por producto combinado."} tipo={"success"}/>
             <Alert mensaje={"¡Buenas noticias! Tenes un cupón de descuento aplicado."} tipo={"success"}/>
             <Alert mensaje={"El producto seleccionado está agotado. Eliminalo para poder continuar."} tipo={"error"}/>
             <Alert mensaje={"Atención! No es posible comprar estos productos en el mismo carrito.Te sugerimos comprarlos por separado así podemos ofrecerte más opciones de entrega."} tipo={"error"}/>
             <Alert mensaje={"Ocurrio un error. Intente nuevamente más tarde."} tipo={"error"}/>
         </div>
        {/* <Test />
       <button onClick={this.simpleAction} className='jerry'>Test redux action</button>
        */}
         <div className="row product-summary-gbChk">
            <div className="product-gbChk col-md-8">
               <Card tipo={"success"}/>
            </div>
            <div className="summary-gbChk col-md-4">
               <Summary tipo={"success"}/>
            </div>
         </div>
         <div className="carousel-gbChk col-md-12">
         <Carousel tipo={"success"}/>
         </div>
      </div>
   </div>
  );
 }
}

export default App;