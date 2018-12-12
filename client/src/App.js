
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Alert from './components/alert/alert';
import Card from './components/product/card/card';
import Summary from './components/summary/summary';

import './App.scss';

class App extends Component {
 
  render() {
  return (
   <div className="App">
      <Alert mensaje={"¡Buenas noticias! Tenés un descuento especial por producto combinado y bonificación."} tipo={"success"}/>
      <Alert mensaje={"¡Buenas noticias! Tenés un descuento especial por bonificación."} tipo={"success"}/>
      <Alert mensaje={"¡Buenas noticias! Tenés un descuento especial por producto combinado."} tipo={"success"}/>
      <Alert mensaje={"¡Buenas noticias! Tenes un cupón de descuento aplicado."} tipo={"success"}/>


      <Alert mensaje={"El producto seleccionado está agotado. Eliminalo para poder continuar."} tipo={"error"}/>
      <Alert mensaje={"Atención! No es posible comprar estos productos en el mismo carrito.Te sugerimos comprarlos por separado así podemos ofrecerte más opciones de entrega."} tipo={"error"}/>
      <Alert mensaje={"Ocurrio un error. Intente nuevamente más tarde."} tipo={"error"}/>

      <Card tipo={"success"}/>

      <Summary tipo={"success"}/>

   </div>
  );
 }
}
export default App;


