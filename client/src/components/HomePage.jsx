// import glowing2 from '../assets/glowing2.jpg'
import {MdOutlineKeyboardArrowRight} from 'react-icons/md';
import horse from "../assets/horse.jpg";



function HomePage() {
  return (
    <div className=" mt-40">

      <div className='lg:ml-8 xl:ml-[135px] flex flex-col items-center  text-center lg:text-left justify-center flex-1 px-4 lg:px-0 text-balance'>

      <h1 className="text-4xl font-bold leading-none mb-12" >
      Step Up To The Plate - Bet With Confidence
      </h1>
      <p> This Irish proverb is as wise as it is old. Trying to chase your losses is one of the worst decisions you could make as a sports bettor.</p>
      <button className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-[#00A6AB] cursor-pointer mt-12">
      SignUp to get started
              <span className="group-hover:rotate-90 durtion-300">
              <MdOutlineKeyboardArrowRight size={25} className="ml-1"/>
              </span>
              
            </button>
      <img src={horse} alt=''/>
      
      </div>

      





    </div>
  )
}

export default HomePage