
import { useState ,useEffect } from "react";
import { checkHeading ,changeAns } from "../helper";

const Answers =({answers , ansLength, index})=>{
          
     const [heading ,setHeading]  = useState(false) ;
     const [ans ,setAns]          = useState(answers) ;
    
    useEffect(()=>{

         if(checkHeading(ans)){
                    setHeading(true) ;
                    setAns(changeAns(ans)) ;
         }
         else{
               setAns(changeAns(ans)) ;
               setHeading(false) ;
         }
      
         } , [answers])

          
    return  (
        <>    
              {   
              index ==  0 &&  ansLength > 1 ?  <span className="font-bold p-2  text-xl  block" >{ans} </span> 
              :
              heading ? <span className="font-bold p-2 text-lg  block" >{ans} </span> 
              :  <span className=" p-1 block" >{ans} </span> }
        </>
    )
}


export default Answers ;
