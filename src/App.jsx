

import './App.css'
import { useEffect, useState } from 'react'
import { URL } from './constants'
import Answers from './Componets/Answers';


function App() {

    const [question , setQuestion]  = useState("") ;
    const [result , setResult]      =  useState([])   ;
    const [recentHistory, setHistory]  = useState(JSON.parse(localStorage.getItem("history"))); 
    const [selectedHistory , setSelectedHistory]  = useState("") ;

    useEffect(()=>{ 
      if(selectedHistory){
      setQuestion("")
        askQuestion()
        setSelectedHistory("")
      } 

    
    } , [selectedHistory])


      

    const askQuestion = async() =>{
      
      
      if(question){

                  if(localStorage.getItem("history")){
                    let history = JSON.parse(localStorage.getItem("history"))  ;  
                        history = [question , ...history] ; 
                    localStorage.setItem("history", JSON.stringify(history)) ;
                    setHistory(history)
              }
              else{
                localStorage.setItem("history", JSON.stringify([question])) ;
                setHistory([question]) ;
              }
    
      }



      const payLoadData = question ? question :   selectedHistory   

        const payLoad = {
                  "contents": [{
                    "parts":[{"text": payLoadData}]
                    }]}

           let response = await fetch(URL , {
                                        method: "POST" , 
                                        body : JSON.stringify(payLoad)
                                      }) ;


           response =  await response.json() ;

           response ? setQuestion("") : null

            let dataString =  response.candidates[0].content.parts[0].text  ;
        
            dataString =   dataString.split("* ") ;  
            
            dataString =  dataString.map((el)=>
                               {
                               return  el.trim()
                                })
            
            setResult([...result , {type : 'q' ,text: question ? question : selectedHistory} , {type: 'a' , text : dataString}])
            setQuestion("")
           
    } 
  
    const clearHistory = ()=>{

        localStorage.clear(); 
        setHistory([]) ;

    }


    const isEnter =(e)=>{
      if(e.key == "Enter" && e.target.value != ""){ 
            askQuestion()
      }else 
      if(e.key == "Enter" && e.target.value == ""){
        alert("please Type you Question")
      }

    }

  return (
      
    <>  
    
        <div className='grid grid-cols-5'>

            <div className='col-span-1 bg-zinc-800  h-screen text-center text-white'>  
              <div className='flex text-center justify-between px-3'>
              <h1 className='my-4 font-bold'>Recent Search</h1>

              <button 
              onClick={clearHistory}
               className='cursor-pointer text-white '><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>

              </div>
                    <ul className='list-none text-white text-start'>
                      
                       {  recentHistory && recentHistory.map((el,index)=>{
                             return <li key={index} 
                             onClick={()=>setSelectedHistory(el)}
                             className='my-2 ps-2 hover:bg-zinc-700 text-zinc-400 cursor-pointer hover:text-zinc-200 truncate'> {el} </li>
                         })

                         }
                        
                    </ul>

                        
            </div>


              <div className='col-span-4 text-center p-10 '>
              <h1
                      className=" text-4xl font-semibold mb-4"
                      style={{
                        background: "linear-gradient(to left  , #3F5EFB , #FC466B)",
                        WebkitBackgroundClip: "text", 
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Hello Users Ask Me Anything
                    </h1>

                 <div className='container h-120 overflow-scroll scrollbar-hide'>
                                <ul className='list-none'>
                                {
                                  result.map((el ,index)=>{

                                      if(el.type == "q"){
                                 return( <div className= "flex justify-end" key={index+Math.random()}> 
                                         <li className='text-white
                                          text-right m-4 font-bold border  border-zinc-700 rounded-tl-3xl 
                                          rounded-bl-3xl rounded-br-3xl w-fit py-1 px-4   
                                            bg-zinc-700 ' key={index+Math.random()}><Answers ansLength={index} index={index} answers={el.text}  />
                                            </li>  
                                      </div>   )                                   
                                      }
                                      else if(el.type == "a"){
                                        
                                           return    el.text.map((el,index)=>{
                               
                                      return ( <li className='text-white text-left'  key={index+Math.random()}> 
                                      <Answers     ansLength={index} index={index} answers={el} />  
                                              </li> )
                                                     
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
                          onKeyDown={isEnter}
                          onChange={(e)=>setQuestion(e.target.value)} 
                          value={question}
                            type="text" className='w-full h-full outline-none p-3' placeholder='Ask Me Anything' />
                          <button  
                          onClick={()=> question !== ""  ? askQuestion() : alert("please Type you Question") }
                            className="cursor-pointer">Ask</button>
                 </div>


             </div>
     </div>
    </>
  )
}

export default App
