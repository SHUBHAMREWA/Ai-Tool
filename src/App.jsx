

import './App.css'
import { useState } from 'react'
import { URL } from './constants'
import Answers from './Componets/Answers';


function App() {

    const [question , setQuestion]  = useState("") ;
    const [result , setResult]      =  useState([])

      

    const askQuestion = async() =>{
        const payLoad = {
                  "contents": [{
                    "parts":[{"text": question}]
                    }]}

           let response = await fetch(URL , {
                                        method: "POST" , 
                                        body : JSON.stringify(payLoad)
                                      }) ;


           response =  await response.json() ;

            let dataString =  response.candidates[0].content.parts[0].text  ;
        
            dataString =   dataString.split("* ") ;  
            
            dataString =  dataString.map((el)=>el.trim())
            
            setResult([...result , {type : 'q' ,text: question} , {type: 'a' , text : dataString}])
            setQuestion("")
           
    } 

    console.log(result)


  return (
      
    <>  
    
        <div className='grid grid-cols-5'>

            <div className='col-span-1 bg-zinc-800 h-screen text-center'>
                        
            </div>


              <div className='col-span-4 text-center p-10 '>

                 <div className='container h-120 overflow-scroll scrollbar-hide'>
                                <ul className='list-none'>
                                {
                                  result.map((el ,index)=>{

                                      if(el.type == "q"){
                                 return <div className= "flex justify-end" key={index+Math.random()}> <li className='text-white
                                  text-right m-4 font-bold border  border-zinc-700 rounded-tl-3xl 
                                  rounded-bl-3xl rounded-br-3xl w-fit py-1 px-4   
                                    bg-zinc-700 ' key={index+Math.random()}><Answers ansLength={index}   answers={el.text}  /> </li>   </div>                                      
                                      }
                                      else if(el.type == "a"){
                                        
                                           return    el.text.map((el,index)=>{
                               
                                            return  <li className='text-white text-left'  key={index+Math.random()} >   <Answers ansLength={index} answers={el} />  </li> 
                                                     
                                              })

                                      }
                                  })
                                }
                                </ul>
                              <div >
                              </div>
                  </div>


                    <div className='bg-zinc-800  w-1/2 text-white m-auto rounded-4xl border pr-5 border-zinc-600 
                          flex p-1 h-16 '>
                        <input  
                          onChange={(e)=>setQuestion(e.target.value)} 
                          value={question}
                            type="text" className='w-full h-full outline-none p-3' placeholder='Ask Me Anything' />
                          <button  
                          onClick={()=>askQuestion() }
                            className="cursor-pointer">Ask</button>
                 </div>


             </div>
     </div>
    </>
  )
}

export default App
