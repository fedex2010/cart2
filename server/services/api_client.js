const config = require('../config/config');
const self = {};


self.getMockServiceCart = (req, res) => {

	let mockData = {"cart_id": "5bef6c0be4b0d0595dc055b1","session": "0970d4b3-bb25-426b-b1f8-3e52180a9d1c","products": [{"product_id": "4f2e9c51ff","category_id": "4278","quantity": 1,"warranty_id": "DEFAULT_FACTORY","price": 18499,"price_matching_discount": 0,"last_price": 18499,"subtotal_price": 18499,"subtotal_base_price": 15288,"validations": {"saleable": true,"found": true},"status": "VALID","virtual": false,"presale": false,"third_party_product": false,"loyalties": [{"id": "AEROLINEAS_PLUS","description": "Aerolineas Plus","value": 513,"subtotal_value": 513}],"price_without_vat": 15288,"vat_percentage": 21}],"loyalties": [{"id": "AEROLINEAS_PLUS","description": "Aerolineas Plus","value": 513,"subtotal_value": 513}],"deliveries": [{"id": "96153891","delivery_type": "PICKUP","city_id": 20000,"store_id": 69,"calendar": {"id": "0","cost": 0},"status": "VALID","address_jurisdiction_id": "20247655","items": [{"salable_id": 659506,"xid": "4f2e9c51ff","lading_cost": 0,"stock_status": {"status": "OK","state": "AVAIL","location": "DEPOSIT"},"origin_warehouse_id": 69}],"fulfillment_response": "{\"storeId\":69,\"storeName\":\"Villa del Parque\",\"date\":\"2018-11-17T12:30:00Z\",\"deferred\":false,\"logResources\":[],\"stockOrigins\":[{\"productAmount\":{\"salableProductId\":659506,\"ladingCost\":0,\"stockStatus\":{\"status\":\"OK\",\"state\":\"AVAIL\",\"location\":\"DEPOSIT\"},\"originWhId\":69}],\"cost\":0}"}],"billings": [{"id": "841094846","titular_info": {"id": "DNI27535591","first_name": "Emiliano Carlos ","last_name": "Griego","company_name": "","email": "emigriego@gmail.com","document_type": "DNI","document_number": "27535591","gender": "MALE","bday": "1979-08-06T00:00:00+0000"},"titular_info_validated": {"id": "DNI27535591","first_name": "Emiliano","last_name": "Griego","company_name": "","email": "emigriego@gmail.com","document_type": "DNI","document_number": "27535591","gender": "MALE","bday": "1979-08-06T00:00:00+0000"},"type": "B","address": {"street_name": "Andonaegui","street_number": "2528","zip_code": "1431","phone": "1130989928","city_id": 20000,"floor": "3","room": "F","between_streets": [null,null]},"status": "VALID"}],"payments": [{"id": "1686538227","payment_method_id": "2304","installments": 25,"gateway_installments": 25,"total_amount": 18499,"url_ok": "/compra/gracias","url_error": "/compra/rechazado","merchant": [{"id": "00250910","pps": "DECIDIR","priority": 0,"method_id": "42"},{"id": "garbarino:promo_nativamaster","pps": "NPS","priority": 1,"method_id": "63"}],"gateway_response": {"code": "DECLINED","authorization_code": "9999","date": "2018-11-17T04:50:46+0000","card_number": "518664XXXXXX4914","card_name": "","gateway": "DECIDIR","transaction_id": "5bef6c0be4b0d0595dc055b1-1686538227","raw": {"content_type": "application/json","value": "{\"error_type\":\"invalid_request_error\",\"validation_errors\":[{\"code\":\"invalid_param\",\"param\":\"in\"}],\"site_transaction_id\":\"5bef6c0be4b0d0595dc055b1-1686538227\",\"bin\":\"518664\"}"}},"status": "DECLINED","payment_option": {"card": {"id": 1206,"name": "Nativa MasterCard","logo_url": "//d3lfzbr90tctqz.cloudfront.net/epi/resource/r/dd053c8c9373bf701e5ce491db0072891c47fe1f78a2817a5faa8757526bf5988","type": "CREDIT_CARD","has_tfczero": true,"priority": 12},"payment_methods": [{"id": 2304,"name": "Mastercard Nativa Banco de la Nación Argentina","description": "Mastercard Nativa Banco de la Nación Argentina hasta 25 cuotas","bank": {"name": "Banco de la Nación Argentina"},"payment_method_data": [{"general_condition": false,"installment_price": {"base_price": 18499,"installments": 25,"interest": 0,"surcharge": 0,"final_price": 18499,"installment_price": 739.96,"description": "En 25 cuotas fijas de $739,96 ¡Sin Interés!","gateway_installments": 25,"tfc": 0,"eapr": 0,"discount_amount": 0,"discount": 0}}],"installments_description": "Hasta 25 cuotas","merchants": [{"id": "00250910","pps": "DECIDIR","priority": 0,"method_id": "42"},{"id": "garbarino:promo_nativamaster","pps": "NPS","priority": 1,"method_id": "63"}],"preferred": false,"installment_summary": {"max_installments_tfczero": 25,"installment_summary_data": [{"installments": 2,"tfc_zero": false,"discount": 0,"repayment": 0},{"installments": 3,"tfc_zero": false,"discount": 0,"repayment": 0},{"installments": 6,"tfc_zero": false,"discount": 0,"repayment": 0},{"installments": 25,"tfc_zero": true,"discount": 0,"repayment": 0}],"general_tfczero": false,"general_discount": false,"general_repayment": false}}]},"discount_amount": 0}],"coupons": [],"payment_options": [],"discount_details": [],"total_price": 18499,"total_base_price": 15288,"total_warranties": 0,"total_discounts": 0,"total_base_discounts": 0,"total_delivery_cost": 0,"total_billing_price": 18499,"total_surcharge_cost": 0,"subtotal_price": 18499,"subtotal_base_price": 15288,"status": "ERROR","status_reason": "invalid_param: [CART ID: 5bef6c0be4b0d0595dc055b1] Cart with invalid_param","brand": "GARBARINO","store_id": 42,"parent_id": "5bef6b6de4b057ea3d701442","sale_source": "WEB","source_platform": "BROWSER","validations": [],"price_change": false,"search_fields": {"email": "emigriego@gmail.com","document_number": "27535591"}};
	
	return mockData;
}


module.exports = self;