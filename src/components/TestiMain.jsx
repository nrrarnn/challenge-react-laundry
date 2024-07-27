import Testimoni from "./Testimoni"

export const TestiMain = () => {
  const data = [
    {
      id:1,
      link:'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      name:'arin',
      review:'Saya sangat puas dengan layanan Laundry Bersih! Pakaian saya selalu kembali dalam kondisi sempurna dan wangi. Timnya juga sangat ramah dan profesional. Sangat merekomendasikan!'
    },
    {
      id:2,
      link:'https://i.pravatar.cc/150?u=a04258a2462d826712d',
      name:'affan',
      review: 'Laundry Bersih adalah pilihan terbaik untuk kebutuhan laundry saya. Pelayanan cepat dan hasilnya selalu memuaskan!'
    }
  ]
  return(
    <>
      <div className="flex flex-wrap p-28 w-full bg-slate-100 mt-20">
        <div className="w-full sm:w-[40%] flex justify-center items-center pb-5">
          <h1 className="text-5xl font-bold text-slate-800">What People Are <span className="text-indigo-500">Saying</span></h1>
        </div>
        <div className="flex flex-wrap gap-9 w-full sm:w-[60%]">
          {
            data.map((val) => (
              <Testimoni key={val.id} name={val.name} review={val.review} link={val.link} />
            ))
          }
        </div>
      </div>
    </>
  )
}