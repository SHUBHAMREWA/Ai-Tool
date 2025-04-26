


const Recentsearch =({recentHistory , setSelectedHistory , setHistory})=>{

    const clearHistory = () => {

        localStorage.clear();
        setHistory([]);
    
      }
return (
    <>
     <div className='col-span-1 dark:bg-zinc-800 bg-red-200 h-screen text-center dark:text-white text-black'>
          <div className='flex text-center justify-between px-3'>
            <h1 className='my-4 font-bold  '>Recent Search</h1>

            <button
              onClick={clearHistory}
              className='cursor-pointer text-black dark:text-white '><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill = " #ffffff " ><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg></button>

          </div>
          <ul className='list-none text-white text-start'>

            {recentHistory && recentHistory.map((el, index) => {
              return <li key={index}
                onClick={() => setSelectedHistory(el)}
                className='my-2 ps-2 dark:hover:bg-zinc-700 hover:bg-rose-300 dark:text-zinc-400 text-black cursor-pointer dark:hover:text-zinc-200 text-zinc-600 truncate'> {el} </li>
            })

            }

          </ul>


        </div>
    </>
)
}


export default Recentsearch ;