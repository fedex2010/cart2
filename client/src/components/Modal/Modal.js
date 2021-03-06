import React, { Component } from "react";
import { connect } from "react-redux";
import { selectProduct, deleteProduct, editWarranty } from "../../actions/CartAction";
import Cookie from "js-cookie";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalWarranty:true,
      productIdModal: {},
      warrantyIdModal: {},
      idWarranty: this.props.idWarranty,
      monthWarranty: {}
    };
  }

  _handleDeleteProductS(productIdModal) {
    this.props.deleteProduct(productIdModal);
  }
  _showTermAndCondition(){
    this.setState({ showModalWarranty: false });
    
  }
  _hideTermAndCondition(){
    this.setState({ showModalWarranty: true });
  }

  _onSelectOption(){
    let cartId = Cookie.get("cartId");
    this.props.editWarranty(cartId,this.props.productIdModal,this.props.warrantyIdModal);
  }

  escFunction(event){
    if(event.keyCode === 27) {
        document.querySelector(".keyEscModal").click();
        document.getElementById("KeyEscModal").click();
    }
}
componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
}

  render() {
    return (
      <div>
        {/* MODAL ELIMINAR PRODUCTO*/}
        <div
          id="delete-product"
          className="gui-modal delete-product"
          tabIndex="-1"
          role="dialog"
        >
          <div className="gui-modal-dialog gui-modal-md modal-dialog--is-centered">
            <div className="gui-modal-content">
              <div className="gui-modal-header">
                <button
                  className="button--icon gui-icon-close button--icon-md keyEscModal"
                  type="button"
                  data-dismiss="modal"
                  id="keyEscModal"
                />
              </div>
              <div className="gui-modal-body text-center">
                <p className="confirm-msj">
                  ¿Estás seguro de que querés eliminar este producto de tu
                  carrito?
                </p>
              </div>
              <div className="gui-modal-footer">
                <button
                  className="button--link"
                  type="button"
                  data-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  data-dismiss="modal"
                  className="button--primary"
                  type="button"
                  onClick={this._handleDeleteProductS.bind(
                    this,
                    this.props.productIdModal
                  )}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL GATANTIAS */}
        <div
          id="warranty-modal"
          className="gui-modal fade"
          tabIndex="-1"
          role="dialog"
        >
          <div className="gui-modal-dialog gui-modal-md">
            {/* info garantías */}
            <div className={`gui-modal-content ${this.state.showModalWarranty ? '' : 'hide'}`}   id="warranty-info" >
              <div className="gui-modal-header gui-modal-header--has-border">
                <h5 className="gui-modal-title">
                  Extendé tu protección por {this.props.monthWarranty} meses
                </h5>
                <button
                  className="gui-modal-title--action-link link-to-button"
                  id="show-warranties-tyc"
                  onClick={this._showTermAndCondition.bind(this)}
                >
                  Ver términos y condiciones 
                </button>
                <button
                  className="button--icon gui-icon-close button--icon-md keyEscModal"
                  type="button"
                  data-dismiss="modal" 
                  id="KeyEscModal"
                />
              </div>
              <div className="gui-modal-body warranty-info">
                <h5>¿Por qué contratar una garantía de reparación?</h5>
                <picture>
                  <img src="https://d3lfzbr90tctqz.cloudfront.net/epi/resource/l/garantia-extendida/033335bd1fed9313f2feffb2b74890a79be791f3ff9ace2b2c6eafa535a5ee8f" alt="icon"/>
                </picture>
                <ul className="checkmark-list">
                  <li>Mayor tiempo de protección.</li>
                  <li>
                    Mano de obra y repuestos <strong>originales</strong>.
                  </li>
                  <li>
                    Reposición del 80% del valor del producto a nuevo si no es
                    posible la reparación.
                  </li>
                  <li>
                    Obtené <span className="benefits is-semibold">GRATIS</span>{" "}
                    60 días de cobertura por robo y daños.
                  </li>
                </ul>
              </div>
              <div className="gui-modal-footer">
                <button
                  className="button--link"
                  type="button"
                  data-dismiss="modal"
                >
                  No, gracias
                </button>
                <button className="button--primary" type="button" onClick={this._onSelectOption.bind(this)} data-dismiss="modal">
                  Agregar
                </button>
              </div>
            </div>
            {/* info TyC */}
            <div className={`gui-modal-content ${this.state.showModalWarranty ? 'hide' : ''}`} id="warranty-tyc">
              <div className="gui-modal-header gui-modal-header--has-border">
                <h5 className="gui-modal-title">Garantía de reparación</h5>
                <button
                  className="gui-modal-title--action-link link-to-button"
                  id="hide-warranties-tyc"
                  onClick={this._hideTermAndCondition.bind(this)}
                >
                  Volver
                </button>
               
              </div>
              <div className="gui-modal-body warranty-tyc">
                <p className="destacado">
                  La garantía de reparación inicia vigencia al finalizar el
                  período de garantía del fabricante.
                </p>
                <h5>Términos y condiciones</h5>
                <p>
                  Mediante la presente TWG Warranty Services INC se obliga a
                  reparar los daños que afecten al Bien durante el período de
                  servicio estipulado, siempre que el daño que sea objeto de la
                  reparación se encuentre comprendido dentro de la garantía
                  otorgada por el fabricante del Aparato y/o Equipo, conforme al
                  precio estipulado y a los demás términos y condiciones de la
                  presente.
                </p>
                <p>
                  El servicio de la presente se aplicará a cualquier aparato y/o
                  equipo mecánico, eléctrico y/o electrónico de fabricante
                  nacional o importado. Dicho Aparato y/o Equipo deberá ser
                  adquirido de primera mano con Certificado de Garantía Oficial
                  otorgada por el fabricante, debiendo en dicho Certificado de
                  Garantía consignarse las características del Aparato y/o
                  Equipo (marca, modelo, número de serie, artículo, etc.),
                  número de garantía, fecha de inicio de la misma, número de
                  factura y/o cualquier otro dato que el Certificado de Garantía
                  exija. El costo de la reparación del aparato y/o equipo
                  mecánico, eléctrico y/ o electrónico dañado, será cubierto
                  siempre que el Titular repare el aparato y/o equipo dañado con
                  un técnico designado. Se le indicará al Titular un técnico
                  idóneo en reparación de dicho aparato y/o equipo y el Titular
                  deberá efectuar con dicho técnico la reparación de su aparato
                  y/o equipo. Tal procedimiento deberá cumplirse tanto deba
                  efectuarse la reparación del aparato y/o equipo en el
                  domicilio del Titular como en el domicilio del técnico. En el
                  caso de que la reparación se efectúe en el domicilio del
                  Titular, los gastos de viáticos del técnico están incluidos en
                  el costo de la reparación, como así también los gastos de
                  transporte del aparato y/o equipo en la eventualidad de que
                  dicha reparación, por su importancia, no pueda llevarse a cabo
                  en el domicilio del Titular. En el caso que la reparación se
                  efectúe en el domicilio del técnico, el costo de la reparación
                  no incluye ni viático ni gastos de transporte, quedando éstos
                  a cargo del Titular. Conforme el informe del técnico, se
                  determinará si la reparación está alcanzada por la presente
                  servicio y, de acuerdo con esto, ordenará al técnico que
                  dentro de los treinta (30) días deberá efectuar la reparación
                  del aparato y/o equipo dañado. Dicho plazo de reparación podrá
                  extenderse a noventa (90) días como máximo cuando no se
                  disponga en plaza de los repuestos necesarios para la
                  reparación del aparato y/o equipo dañado. De no poderse
                  obtener los repuestos necesarios para la reparación del
                  aparato y/o equipo o cuando el costo de una o más
                  reparaciones, efectuadas sobre un mismo aparato y/o equipo,
                  sea igual o superior al ochenta por ciento (80%) del valor a
                  nuevo en plaza, se indemnizará al Titular por el ochenta por
                  ciento (80%) del valor a nuevo del aparato y/o equipo dañado y
                  el Titular deberá entregar el aparato y/o equipo dañado,
                  quedando en consecuencia rescindido el Garantía de Reparación.
                  Dicha indemnización se hará efectiva mediante la entrega de
                  una orden de compra y/o voucher equivalente al 80% del valor a
                  nuevo en plaza del aparato y/o equipo a ser canjeada ante el
                  vendedor original del aparato y/o equipo. Si al tiempo de
                  efectuarse la comparación prevista en el párrafo anterior, no
                  existiera en plaza el valor a nuevo del aparato y/o equipo
                  dañado, se reemplazará el mismo por el valor a nuevo de un
                  aparato y/o equipo de características y prestaciones
                  funcionales similares al dañado.
                </p>
                <p>
                  No se cubrirán los costos de la reparación cuando los daños al
                  aparato y/o equipo sean consecuencia de:
                </p>
                <p>
                  A) Su uso indebido o abusivo, o de deficiencias,
                  sobretensiones, descargas o interrupciones del circuito de
                  alimentación eléctrica o rayos, deficiencias en la instalación
                  eléctrica o línea telefónica, o presión de gas del domicilio
                  del usuario o conexiones indebidas.
                </p>
                <p>
                  B) Deterioro por depreciación y/o desgaste causado por el
                  natural y normal uso o funcionamiento del aparato y/o equipo,
                  siempre que dicha depreciación o desgaste no impida su
                  funcionamiento u operación.
                </p>
                <p>
                  C) El desgaste o daños de las superficies expuestas, tales
                  como pintura de los gabinetes, etc. como así también golpes,
                  roturas o rayaduras causadas por el transporte.
                </p>
                <p>
                  D) El uso de piezas, válvulas, tubos de rayos catódicos,
                  pilas, baterías y/o cualquier otro repuesto, contrariando las
                  instrucciones del fabricante.
                </p>
                <p>
                  E) Desperfectos causados por fallas en unidades
                  transformadoras o generadoras colocadas en forma externa al
                  equipo, excepto cuando ellas hayan sido provistas por el
                  fabricante del equipo junto con éste.
                </p>
                <p>
                  F) El arreglo, reparación o desarme de la instalación o
                  cualquier parte de la misma por un técnico no autorizado por
                  el fabricante en el período de Garantía ni por el Titular
                  durante la vigencia de la Garantía de Reparación.
                </p>
                <p>
                  G) Terremoto, maremoto; meteorito, tornado, huracán, ciclón;
                  granizo, inundación.
                </p>
                <p>H) Transmutaciones nucleares</p>
                <p>
                  I) Hechos de guerra civil o internacional, o por motín, o
                  tumulto popular
                </p>
                <p>
                  J) Hechos de guerrilla, terrorismo, rebelión, huelga o lock
                  out.
                </p>
                <p>
                  K) Secuestro, confiscación, incautación o decomiso u otras
                  decisiones, legítimas o no, de la autoridad o de quien se la
                  arrogue, salvo que la medida se deba al estado de los bienes a
                  raíz de un siniestro cubierto. Los daños acaecidos en el lugar
                  y en ocasión de producirse los acontecimientos enumerados, se
                  presume son consecuencia de los mismos, salvo prueba en
                  contrario del Titular. Asimismo, quedan excluidos accesorios
                  tales como baterías recargables, y/o cualquier otra excepción
                  que pudiera encontrarse en la garantía de fábrica. En el caso
                  de equipos de computación, no están cubiertos: 1. Cualquier
                  daño (completo o incompleto) de cintas de grabación o
                  cualquier otro medio magnético incluido cualquier programa,
                  datos, o información de setup que pudiera estar almacenada en
                  cualquiera de los dispositivos tales como discos rígidos, CD
                  Rom, discos flexibles, cintas, cintas de backup, como
                  resultado del mal funcionamiento de una de las partes.
                </p>
                <p>1. La pérdida de datos o restauración de programas</p>
                <p>
                  2. Ningún tipo de programas, software operativos o cualquier
                  tipo de software
                </p>
                <p>
                  3. Aquellas terceras partes que hayan sido instaladas por el
                  cliente en forma directa o a través de un tercero como por
                  ejemplo: discos duros, tarjetas de cualquier tipo,
                  equipamiento periférico o cualquier otro tipo de aditamento
                  incluyendo programas que han sido instalados posteriormente a
                  la compra original del equipo. Será responsabilidad del
                  Titular realizar los correspondientes backups previo al inicio
                  de la reparación.
                </p>
              </div>
            </div>
          </div>
        </div>
      
        {/* MODAL ARPLUS-TYC */}
        <div
          id="arplus-tyc"
          className="gui-modal fade"
          tabIndex="-1"
          role="dialog"
        >
          <div className="gui-modal-dialog gui-modal-lg">
            
            <div className={`gui-modal-content ${this.state.showModalWarranty ? '' : 'hide'}`}   id="warranty-info">
              <div className="gui-modal-header gui-modal-header--has-border">
                <h5 className="gui-modal-title">
                  Condiciones Generales Garbarino en Aerolíneas Plus
                </h5>
               
                <button
                  className="button--icon gui-icon-close button--icon-md keyEscModal"
                  type="button"
                  data-dismiss="modal"
                  id="KeyEscModal"
                />
              </div>
              <div className="gui-modal-body arplus-tyc">
              
                <ul>
                    <li>Promoción exclusiva para socios del programa Aerolineas Plus que realicen compras en sucursales presenciales y/o virtuales de Garbarino, sumarán Millas Aerolineas Plus.</li>
                    <li>La relación es por cada USD o su equivalente en Pesos de tu compra acredita 1 Milla Aerolíneas Plus.</li>
                    <li>Promoción vigente para compras realizadas desde el 07/05/2019 al 07/05/2022.</li>
                    <li>Promoción válida únicamente para la República Argentina.</li>
                    <li>Se considerarán consumos la compra de electrodomésticos, artículos de informática y/o del hogar abonados con cualquier medio de pago en todas las sucursales presenciales y por venta telefónica. Sólo acumularán Millas Aerolíneas Plus los productos de línea blanca abonados con cualquier medio de pago en la sucursal virtual: http://www.Garbarino.com/</li>
                    <li>Proceso de acreditación: al momento de compra será indispensable informes el número de socio Aerolíneas Plus, tu nombre y apellido y DNI. Las facturas deben estar a nombre del titular de la cuenta de Aerolíneas Plus, no se aceptarán facturas a nombre de empresas. En la factura de compra realizada en Garbarino se informarán la cantidad de Millas acumuladas. Las Millas Aerolíneas Plus generadas por los consumos del socio en Garbarino serán acreditadas en la Cuenta Plus dentro de los 15 (quince) días hábiles de la fecha de compra. Estas Millas Aerolíneas Plus, una vez acreditadas, se verán reflejadas en el balance de Millas del Programa Aerolíneas Plus a nombre del titular.</li>
                    <li>La utilización de las Millas Aerolineas Plus se encuentra sujeto a los términos y condiciones del programa Aerolíneas Plus administrado por Aerolineas Argentinas S.A. Consultar sobre el Programa Ar Plus en su site o telefónicamente a 0810-222-86527.Para acumular Millas será necesario contar con una cuenta activa de Aerolíneas Plus administrada por Aerolíneas Argentinas S.A. Rafael Obligado S/N, Terminal 4, 6to Piso, Aeroparque Jorge Newbery- CABA - CUIT 30-64140555-4</li>
                </ul>
                <hr/>
                <p>VALIDA EN LA REPUBLICA ARGENTINA DESDE EL DESDE EL 07 DE MAYO DE 2019 HASTA EL 07 DE MAYO DE 2022 CONSISTENTE EN QUE POR CADA COMPRA QUE REALICE EN LAS SUCURSALES PRESENCIALES, VENTA TELEFÓNICA Y VIRTUALES DE garbarino (PAGINA WEB:www.Garbarino.com.ar Y APLICACIÓN MOBILE: www.Garbarino.com/apps) DE LOS PRODUCTOS PROMOCIONADOS ACREDITARÁ 1 “MILLA AEROLÍNEAS PLUS” POR CADA USD O SU EQUIVALENTE EN PESOS DE SU COMPRA.</p>
                <p>PARA PODER SUMAR LAS MILLAS QUE ADICIONA POR SU COMPRA EN garbarino, SERÁ INDISPENSABLE QUE EN EL MOMENTO DE LA COMPRA INFORME SU NOMBRE Y APELLIDO, SU NRO DE DNI Y SU NÚMERO DE SOCIO AEROLÍNEAS PLUS, EL QUE SE DEBERA QUEDAR CONSIGNADO EN LA FACTURA. LAS MISMAS DEBEN ESTAR A NOMBRE DEL TITULAR DE LA CUENTA DE AEROLINEAS PLUS, NO ACEPTANDOSE FACTURAS A NOMBRE Y/O CON DATOS DE EMPRESAS Y/O RAZON SOCIAL. EL PROGRAMA AEROLÍNEAS PLUS 
                  PERTENECE A AEROLINEAS ARGENTINAS S.A, ÚNICO RESPONSABLE DE LA CORRECTA ADMINISTRACIÓN DE LAS MILLAS ACUMULADAS POR EL TITULAR. NO ES ACUMULABLE CON OTRO PROGRAMA DE BENEFICIOS. LAS “MILLAS AEROLÍNEAS PLUS” GENERADAS POR LOS CONSUMOS EN garbarino SERÁN ACREDITADAS A LOS SOCIOS EN UNA CUENTA DE SU TITULARIDAD –LA QUE DEBERA ESTAR DADA DE ALTA PREVIAMENTE A LA FECHA DE REALIZADA LA COMPRA EN garbarino- DENTRO DE LOS 15 HÁBILES DÍAS DE LA 
                  FECHA DE DICHA COMPRA. LAS “MILLAS AEROLÍNEAS PLUS” UNA VEZ ACREDITADAS SE VERÁN REFLEJADAS EN EL BALANCE DE MILLAS DEL PROGRAMA AEROLÍNEAS PLUS. EN CASO QUE EL SOCIO POSEA “MILLAS AEROLÍNEAS PLUS” PRÓXIMAS A VENCER, LA ACREDITACIÓN DE LAS MILLAS PREVENIENTES DE LAS COMPRAS REALIZADAS EN garbarino NO EXTENDERÁ LA VIGENCIA DE LAS MISMAS, Y, SI NO HUBIESEN SIDO USADAS A LA FECHA DE VENCIMIENTO, LAS “MILLAS AEROLÍNEAS PLUS” PROVENIENTES 
                  DE DICHAS COMPRAS VENCERÁN JUNTO CON EL TOTAL DE LAS MILLAS. AEROLÍNEAS ARGENTINAS S.A. NO PROMOCIONA, GARANTIZA O SE RESPONSABILIZA POR LOS PRODUCTOS (ELECTRODOMÉSTICOS, ARTÍCULOS DE INFORMÁTICA, ETC.) Y/O SERVICIOS COMPRADOS EN garbarino POR EL SOCIO, DURANTE LA VIGENCIA DE ESTA PROMOCIÓN. PARA CONOCER LAS CONDICIONES DEL PROGRAMA AEROLÍNEAS PLUS INGRESE EN http://www.aerolineas.com.ar/es-ar/aerolineas_plus/nuevo AEROLÍNEAS ARGENTINAS S.A. 
                  - AV. RAFAEL OBLIGADO S/N, TERMINAL 4, 6° PISO, AEROPARQUE JORGE NEWBERY - CABA - CUIT 30-64140555-4. Y PARA LA TOTALIDAD DE CONDICIONES DE ESTA PROMOCIÓN Y LAS SUCURSALES DE garbarino PARTICIPANTES DE LA MISMA EN <a rel="noopener noreferrer" href="//www.Garbarino.com/aerolineas-plus" target="_blank">https://www.Garbarino.com/aerolineas-plus</a>. Garbarino S.A.I.C. E I. Bolívar 874, Ciudad Autónoma de Buenos Aires - CUIT 30-54008821-3</p>
              </div>
              
            </div>
            {/* info TyC */}
            <div className={`gui-modal-content ${this.state.showModalWarranty ? 'hide' : ''}`} id="warranty-tyc">
              <div className="gui-modal-header gui-modal-header--has-border">
                <h5 className="gui-modal-title">Garantía de reparación</h5>
                <button
                  className="gui-modal-title--action-link link-to-button"
                  id="hide-warranties-tyc"
                  onClick={this._hideTermAndCondition.bind(this)}
                >
                  Volver
                </button>
                <button
                  className="button--icon gui-icon-close button--icon-md"
                  type="button"
                  data-dismiss="modal"
                />
              </div>
              <div className="gui-modal-body warranty-tyc">
                <p className="destacado">
                  La garantía de reparación inicia vigencia al finalizar el
                  período de garantía del fabricante.
                </p>
                <h5>Términos y condiciones</h5>
                <p>
                  Mediante la presente TWG Warranty Services INC se obliga a
                  reparar los daños que afecten al Bien durante el período de
                  servicio estipulado, siempre que el daño que sea objeto de la
                  reparación se encuentre comprendido dentro de la garantía
                  otorgada por el fabricante del Aparato y/o Equipo, conforme al
                  precio estipulado y a los demás términos y condiciones de la
                  presente.
                </p>
                <p>
                  El servicio de la presente se aplicará a cualquier aparato y/o
                  equipo mecánico, eléctrico y/o electrónico de fabricante
                  nacional o importado. Dicho Aparato y/o Equipo deberá ser
                  adquirido de primera mano con Certificado de Garantía Oficial
                  otorgada por el fabricante, debiendo en dicho Certificado de
                  Garantía consignarse las características del Aparato y/o
                  Equipo (marca, modelo, número de serie, artículo, etc.),
                  número de garantía, fecha de inicio de la misma, número de
                  factura y/o cualquier otro dato que el Certificado de Garantía
                  exija. El costo de la reparación del aparato y/o equipo
                  mecánico, eléctrico y/ o electrónico dañado, será cubierto
                  siempre que el Titular repare el aparato y/o equipo dañado con
                  un técnico designado. Se le indicará al Titular un técnico
                  idóneo en reparación de dicho aparato y/o equipo y el Titular
                  deberá efectuar con dicho técnico la reparación de su aparato
                  y/o equipo. Tal procedimiento deberá cumplirse tanto deba
                  efectuarse la reparación del aparato y/o equipo en el
                  domicilio del Titular como en el domicilio del técnico. En el
                  caso de que la reparación se efectúe en el domicilio del
                  Titular, los gastos de viáticos del técnico están incluidos en
                  el costo de la reparación, como así también los gastos de
                  transporte del aparato y/o equipo en la eventualidad de que
                  dicha reparación, por su importancia, no pueda llevarse a cabo
                  en el domicilio del Titular. En el caso que la reparación se
                  efectúe en el domicilio del técnico, el costo de la reparación
                  no incluye ni viático ni gastos de transporte, quedando éstos
                  a cargo del Titular. Conforme el informe del técnico, se
                  determinará si la reparación está alcanzada por la presente
                  servicio y, de acuerdo con esto, ordenará al técnico que
                  dentro de los treinta (30) días deberá efectuar la reparación
                  del aparato y/o equipo dañado. Dicho plazo de reparación podrá
                  extenderse a noventa (90) días como máximo cuando no se
                  disponga en plaza de los repuestos necesarios para la
                  reparación del aparato y/o equipo dañado. De no poderse
                  obtener los repuestos necesarios para la reparación del
                  aparato y/o equipo o cuando el costo de una o más
                  reparaciones, efectuadas sobre un mismo aparato y/o equipo,
                  sea igual o superior al ochenta por ciento (80%) del valor a
                  nuevo en plaza, se indemnizará al Titular por el ochenta por
                  ciento (80%) del valor a nuevo del aparato y/o equipo dañado y
                  el Titular deberá entregar el aparato y/o equipo dañado,
                  quedando en consecuencia rescindido el Garantía de Reparación.
                  Dicha indemnización se hará efectiva mediante la entrega de
                  una orden de compra y/o voucher equivalente al 80% del valor a
                  nuevo en plaza del aparato y/o equipo a ser canjeada ante el
                  vendedor original del aparato y/o equipo. Si al tiempo de
                  efectuarse la comparación prevista en el párrafo anterior, no
                  existiera en plaza el valor a nuevo del aparato y/o equipo
                  dañado, se reemplazará el mismo por el valor a nuevo de un
                  aparato y/o equipo de características y prestaciones
                  funcionales similares al dañado.
                </p>
                <p>
                  No se cubrirán los costos de la reparación cuando los daños al
                  aparato y/o equipo sean consecuencia de:
                </p>
                <p>
                  A) Su uso indebido o abusivo, o de deficiencias,
                  sobretensiones, descargas o interrupciones del circuito de
                  alimentación eléctrica o rayos, deficiencias en la instalación
                  eléctrica o línea telefónica, o presión de gas del domicilio
                  del usuario o conexiones indebidas.
                </p>
                <p>
                  B) Deterioro por depreciación y/o desgaste causado por el
                  natural y normal uso o funcionamiento del aparato y/o equipo,
                  siempre que dicha depreciación o desgaste no impida su
                  funcionamiento u operación.
                </p>
                <p>
                  C) El desgaste o daños de las superficies expuestas, tales
                  como pintura de los gabinetes, etc. como así también golpes,
                  roturas o rayaduras causadas por el transporte.
                </p>
                <p>
                  D) El uso de piezas, válvulas, tubos de rayos catódicos,
                  pilas, baterías y/o cualquier otro repuesto, contrariando las
                  instrucciones del fabricante.
                </p>
                <p>
                  E) Desperfectos causados por fallas en unidades
                  transformadoras o generadoras colocadas en forma externa al
                  equipo, excepto cuando ellas hayan sido provistas por el
                  fabricante del equipo junto con éste.
                </p>
                <p>
                  F) El arreglo, reparación o desarme de la instalación o
                  cualquier parte de la misma por un técnico no autorizado por
                  el fabricante en el período de Garantía ni por el Titular
                  durante la vigencia de la Garantía de Reparación.
                </p>
                <p>
                  G) Terremoto, maremoto; meteorito, tornado, huracán, ciclón;
                  granizo, inundación.
                </p>
                <p>H) Transmutaciones nucleares</p>
                <p>
                  I) Hechos de guerra civil o internacional, o por motín, o
                  tumulto popular
                </p>
                <p>
                  J) Hechos de guerrilla, terrorismo, rebelión, huelga o lock
                  out.
                </p>
                <p>
                  K) Secuestro, confiscación, incautación o decomiso u otras
                  decisiones, legítimas o no, de la autoridad o de quien se la
                  arrogue, salvo que la medida se deba al estado de los bienes a
                  raíz de un siniestro cubierto. Los daños acaecidos en el lugar
                  y en ocasión de producirse los acontecimientos enumerados, se
                  presume son consecuencia de los mismos, salvo prueba en
                  contrario del Titular. Asimismo, quedan excluidos accesorios
                  tales como baterías recargables, y/o cualquier otra excepción
                  que pudiera encontrarse en la garantía de fábrica. En el caso
                  de equipos de computación, no están cubiertos: 1. Cualquier
                  daño (completo o incompleto) de cintas de grabación o
                  cualquier otro medio magnético incluido cualquier programa,
                  datos, o información de setup que pudiera estar almacenada en
                  cualquiera de los dispositivos tales como discos rígidos, CD
                  Rom, discos flexibles, cintas, cintas de backup, como
                  resultado del mal funcionamiento de una de las partes.
                </p>
                <p>1. La pérdida de datos o restauración de programas</p>
                <p>
                  2. Ningún tipo de programas, software operativos o cualquier
                  tipo de software
                </p>
                <p>
                  3. Aquellas terceras partes que hayan sido instaladas por el
                  cliente en forma directa o a través de un tercero como por
                  ejemplo: discos duros, tarjetas de cualquier tipo,
                  equipamiento periférico o cualquier otro tipo de aditamento
                  incluyendo programas que han sido instalados posteriormente a
                  la compra original del equipo. Será responsabilidad del
                  Titular realizar los correspondientes backups previo al inicio
                  de la reparación.
                </p>
              </div>
              <div className="gui-modal-footer">
                <button className="button--link" type="button"  onClick={this._hideTermAndCondition.bind(this)}>
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      
      
      
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { productIdModal: state.cartReducer.selectedProduct.product_id,
    monthWarranty: state.cartReducer.selectedProduct.monthWarranty,
    warrantyIdModal: state.cartReducer.selectedProduct.selectedWarranty_id
    }
  };

export default connect(
  mapStateToProps,
  { selectProduct, deleteProduct, editWarranty }
)(Modal);
