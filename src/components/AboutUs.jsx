import { Image } from "@nextui-org/react"

export const AboutUs = () => {
  return(
    <>
      <div className="flex flex-col w-full p-16">
        <h1 className="text-4xl font-bold text-center mt-10">About Us</h1>
        <div className="flex flex-wrap px-2 sm:px-28  items-center mt-10">
          <div className="w-full sm:w-1/2">
            <Image src="./src/assets/laundry.jpg" width={400}/>
          </div>
          <div className="w-full sm:w-1/2 leading-2 p-1 sm:p-4 sm:text-center mt-6">
            <p>Enigma Laundry adalah penyedia layanan laundry yang berdedikasi untuk memberikan pengalaman mencuci yang berkualitas tinggi dan efisien. kami berkomitmen untuk menjaga pakaian pelanggan dengan perhatian dan keahlian.</p>
          </div>
        </div>
      </div>
    </>
  )
}