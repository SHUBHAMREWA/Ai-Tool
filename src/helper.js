
export function  checkHeading(str){
          
          return      ( /^\*\*(.*)\*$/.test(str) )
                        
}


export function changeAns (ans){
     return (ans.replace(/\*+/g, " "));
}