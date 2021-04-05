export function arrayFromPage(number) {
    return Array.from(new Array(number).keys()).map(k => k+1)
}

export function formatPrise(priseStr) {
   const priseDigit =  parseInt(priseStr.replace(/\D+/g, '')) 
   
   if (priseDigit >  100000000000) {
    return Math.ceil(priseDigit / 1000000)
   } else {
        if (priseDigit >  100000) {
            return Math.ceil(priseDigit / 100000)
        } else {
            return priseDigit
        }
   }   
    
}
