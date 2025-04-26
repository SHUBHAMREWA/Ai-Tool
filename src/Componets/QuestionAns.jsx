import Answers from "./Answers";
 
function QuestionAns ({result}){
    return (
        <>
         {
                result.map((el, index) => {

                  if (el.type == "q") {
                    return (<div className="flex justify-end" key={index + Math.random()}>
                      <li className='dark:text-white text-black
                                          text-right m-4 font-bold border  border-zinc-700 rounded-tl-3xl 
                                          rounded-bl-3xl rounded-br-3xl w-fit py-1 px-4   
                                            dark:bg-zinc-700 bg-lime-100' key={index + Math.random()}><Answers ansLength={index} index={index} answers={el.text} />
                      </li>
                    </div>)
                  }
                  else if (el.type == "a") {

                    return el.text.map((el, index) => {

                      return (<li className=' dark:text-white text-black text-left ' key={index + Math.random()}>
                        <Answers ansLength={index} index={index} answers={el} />
                      </li>)

                    })

                  }
                })
              }
        </>
    )
}

export default QuestionAns ;