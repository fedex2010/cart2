export function customURLSearchParams(param){
    let result = new RegExp('[?&]' + param + '=([^&#]*)').exec(window.location.search)
  
    if(result){
      return result[1]
    }else{
      return null
    }
  }