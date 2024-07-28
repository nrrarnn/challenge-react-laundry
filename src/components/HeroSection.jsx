import { Button, Image } from "@nextui-org/react"
import { Link } from "react-router-dom"

export const HeroSection = () => {
  return(
    <>
      <div className="flex flex-col sm:flex-row w-full p-5 top-20">
        <div className="flex flex-col justify-center pl-2 sm:pl-10 w-full sm:w-1/2">
          <h1 className="text-5xl font-extrabold p-6">Selamat Datang di <span className="text-indigo-500">Enigma Laundry</span></h1>
          <p className="font-normal px-6 ">Layanan laundry cepat dan berkualitas untuk kebutuhan Anda. Kami siap membantu Anda menjaga pakaian tetap bersih dan segar!</p>
          <div className="px-5 mt-4">
            <Button className="bg-indigo-500 text-white hover:bg-indigo-700 font-semibold">Get <Link to={'/sign-in'}>Started</Link></Button>
          </div>
        </div>
        <div className="flex justify-center items-center w-full sm:w-1/2">
          <Image src="./src/assets/laundry-section.png"/>
        </div>
      </div>
    </>
  )
}