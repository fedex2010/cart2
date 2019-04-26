export function formatPrice(value, decimals){
  if(value === undefined){
      return 0;
  }
    /**
     * Number.prototype.format(n, x, s, c)
     *
     * @param integer n: length of decimal
     * @param integer x: length of whole part
     * @param mixed   s: sections delimiter
     * @param mixed   c: decimal delimiter
     */
    if(!decimals){
        decimals = 0;
    }

    var n = decimals,
        x = 3,
        s = ".",
        c = ",";

    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = value.toFixed(Math.max(0, ~~n));

  
    num = (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    return num.replace(",00", "")
}