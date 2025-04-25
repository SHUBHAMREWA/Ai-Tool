

import './App.css'
import { useEffect, useState , useRef, useCallback } from 'react'
import { URL } from './constants'
import Answers from './Componets/Answers';


function App() {

  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setHistory] = useState(JSON.parse(localStorage.getItem("history")));
  const [selectedHistory, setSelectedHistory] = useState(""); 
  const scrollEl                             =  useRef()  ;
  const [loader , setLoader]                 =   useState(false);  

  useEffect(() => {

    setQuestion("")
    if (selectedHistory) {
      askQuestion()
      setSelectedHistory("")
    }


  }, [selectedHistory])

useCallback(()=>{
    result
} , [result])


  const askQuestion = async () => {

      setLoader(true) 

    if (question) {

      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history = [question, ...history];
        localStorage.setItem("history", JSON.stringify(history));
        setHistory(history)
      }
      else {
        localStorage.setItem("history", JSON.stringify([question]));
        setHistory([question]);
      }

    }



    const payLoadData = question ? question : selectedHistory

    const payLoad = {
      "contents": [{
        "parts": [{ "text": payLoadData }]
      }]
    }

    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payLoad)
    });


    response = await response.json();

    response ? setQuestion("") : null

    let dataString = response.candidates[0].content.parts[0].text;

    dataString = dataString.split("* ");

    dataString = dataString.map((el) => {
      return el.trim()
    })

    setResult([...result, { type: 'q', text: question ? question : selectedHistory }, { type: 'a', text: dataString }])
    setQuestion("")


     setTimeout(()=>{
       setLoader(false) ;
      scrollEl.current.scrollTop = scrollEl.current.scrollHeight  ; 
     } , 500)
  }

  const clearHistory = () => {

    localStorage.clear();
    setHistory([]);

  }


  const isEnter = (e) => {
    if (e.key == "Enter" && e.target.value != "") {
      askQuestion()
    } else
      if (e.key == "Enter" && e.target.value == "") {
        alert("please Type you Question")
      }

  }

  return (

    <>
      {/*Main Container*/}
      <div className='grid grid-cols-5'>

        {/* Left Elements ,, Recent History Box */}
        <div className='col-span-1 bg-zinc-800  h-screen text-center text-white'>
          <div className='flex text-center justify-between px-3'>
            <h1 className='my-4 font-bold'>Recent Search</h1>

            <button
              onClick={clearHistory}
              className='cursor-pointer text-white '><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg></button>

          </div>
          <ul className='list-none text-white text-start'>

            {recentHistory && recentHistory.map((el, index) => {
              return <li key={index}
                onClick={() => setSelectedHistory(el)}
                className='my-2 ps-2 hover:bg-zinc-700 text-zinc-400 cursor-pointer hover:text-zinc-200 truncate'> {el} </li>
            })

            }

          </ul>


        </div>


        {/* Right Elements */}
        <div className='col-span-4 text-center p-10 '>

          {/* right heading */}
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
          
        
          {/* right Answer Box */}
          <div  ref={scrollEl}
            className='container h-120 overflow-scroll scrollbar-hide'>
            <ul className='list-none '>
              {
                result.map((el, index) => {

                  if (el.type == "q") {
                    return (<div className="flex justify-end" key={index + Math.random()}>
                      <li className='text-white
                                          text-right m-4 font-bold border  border-zinc-700 rounded-tl-3xl 
                                          rounded-bl-3xl rounded-br-3xl w-fit py-1 px-4   
                                            bg-zinc-700 ' key={index + Math.random()}><Answers ansLength={index} index={index} answers={el.text} />
                      </li>
                    </div>)
                  }
                  else if (el.type == "a") {

                    return el.text.map((el, index) => {

                      return (<li className='text-white text-left' key={index + Math.random()}>
                        <Answers ansLength={index} index={index} answers={el} />
                      </li>)

                    })

                  }
                })
              }
            </ul>

             {/* spinner Loader */} 
        {    loader ? 
                <div role="status"  className='p-3'>
                  <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span class="sr-only">Loading...</span>
              </div> : 
              null
        }

            <div >
            </div>
          </div>

          {/* Search input  */}
          <div className='bg-zinc-800  w-1/2 text-white m-auto rounded-4xl border pr-5 border-zinc-600 
                          flex p-1 h-16 '>
            <input
              onKeyDown={isEnter}
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              type="text" className='w-full h-full outline-none p-3' placeholder='Ask Me Anything' />
            <button
              onClick={() => question !== "" ? askQuestion() : alert("please Type you Question")}
              className="cursor-pointer">Ask</button>
          </div>


        </div>
      </div>
    </>
  )
}

export default App
