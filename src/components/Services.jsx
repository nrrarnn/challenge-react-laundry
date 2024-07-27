import { CardService } from "./CardService"

export const Services = () => {
  const services = [
    { 
      id: 1,
      title: "Laundry Kiloan",
      description: "Cuci pakaian dengan harga terjangkau."
    },
    { 
      id: 2,
      title: "Laundry Satuan",
      description: "Cuci dan setrika pakaian, seprai, dan handuk."
    },
    { 
      id: 3,
      title: "Dry Cleaning",
      description: "Perawatan khusus untuk pakaian berbahan sensitif."
    },
    { 
      id: 4,
      title: "Layanan Antar-Jemput",
      description: "Kami akan menjemput dan mengantar pakaian Anda."
    },
  ]
  return(
    <>  
      <div className="pt-10 pb-10 bg-slate-100">
        <h1 className="font-bold text-3xl text-slate-700 text-center ">Layanan Kami</h1>
        <div className="flex flex-wrap w-full gap-4 p-10 justify-center mt-5">
          {
            services.map((val) => (
              <CardService key={val.id} title={val.title} description={val.description}/>
            ))
          }
        </div>
      </div>
    </>
  )
}