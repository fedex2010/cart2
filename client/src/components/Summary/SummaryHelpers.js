import React, { Component } from "react";
import Cookie from "js-cookie";

import { formatPrice } from "../../utils/formatPrice";

export function Salesman(){
    let salesman = Cookie.get("epi.salesman");
  
    if(salesman){
      return <p className="alert alert-success fade in alert-dismissable salesman">Vendedor: {salesman}</p>
    }
    return null 
  }
  
export function SubTotal( {cart} ){ 
    let subTotal = 0
    if( cart.subtotal_price ){
        subTotal =  formatPrice( cart.subtotal_price )
    }
    return (
        <li id="subtotal">
            <label>Subtotal</label>
            <span className="summary-detail-value">${ subTotal }</span>
        </li>
    )
}

export function Iva( {cart} ){ 
    let empresarias = (Cookie.get("empresarias")==='true'?true:false);

    let subtotalRound = 0    
    if(cart.subtotal_base_price && cart.subtotalPrice){
        subtotalRound = cart.subtotal_base_price - cart.subtotalPrice
        subtotalRound = formatPrice( subtotalRound )
    }

    return (
        <li className={`${empresarias ? '' : 'displaynone'}`} id="empresarias">
            <label>IVA</label>
            <span className="summary-detail-value">${subtotalRound}</span>
        </li>
    )
}

export function Warranties( {cart} ){
    let totalWarranties = 0
    
    if(cart.totalWarranties && cart.totalWarranties > 0){
        totalWarranties = formatPrice(cart.totalWarranties)
    }

    return(
        <li className={totalWarranties > 0 ? '' : 'displaynone'} id="warranty">
            <label>Garantías</label>
            <span className="summary-detail-value">${totalWarranties}</span>
        </li>
    )
}

export function TotalSummary( {cart} ){
    let totalPrice = 0

    if(cart.total_price && cart.total_price>0){
        totalPrice = formatPrice(cart.total_price)
    }

    return(
        <li className="summary-total" id="total">
            <label>Total</label>
            <span className="summary-detail-value">${totalPrice}</span>
        </li>
    )
}

export function SpecialDiscount( {cart} ){
    //inner function
    function _getSpecialDiscount(cart){
        let specialDiscountAmount = 0
        if (cart.discount_details !== undefined && cart.discount_details.length >= 1 ) {
            if (cart.discount_details[0].source === "CROSSELLING") {
                specialDiscountAmount += cart.discount_details[0].amount;
            }

            if (cart.discount_details[0].source === "POLCOM" || cart.discount_details[0].source === "PRICE_MATCHING") {
                specialDiscountAmount += cart.total_discounts || cart.discount_details[0].amount ;
            }
        }
        return specialDiscountAmount
    }


    let specialDiscountAmount = 0

    if(cart.discount_details && cart.discount_details.length>0){
        specialDiscountAmount = formatPrice(_getSpecialDiscount(cart))
    }

    return(
        <li className={specialDiscountAmount > 0 ? 'benefits' : 'benefits displaynone'} id="special-discount-line">
            <label>Descuento especial</label>
            <span className="summary-detail-value">- ${specialDiscountAmount}</span>
        </li>
    )
}

export function CuponDiscount( {cart} ){
    let couponDiscount = 0
    let couponApplied = false
    let couponClass = 'displaynone'

    if(cart.coupons && cart.coupons.length>0){
        couponDiscount = formatPrice(cart.total_discounts)
        couponApplied = true
        couponClass = 'highlight-benefit'
    }

    return(
        <li className={!couponApplied ? "displaynone" : couponClass} id="coupon">
            <label>Descuento por cupón</label>
            <span className="summary-detail-value">- ${couponDiscount}</span>
        </li>
    )
}

