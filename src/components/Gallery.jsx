import { Card, CardBody, Image } from "@nextui-org/react"

export const Gallery = () => {
  const numbers = Array.from({ length: 8 }, (_, index) => index + 1)
  return(
    <>
    <div className="flex flex-col px-10 sm:px-36 pb-20">
      <div>
        <h1 className="text-center font-bold text-4xl my-20">Gallery</h1>
      </div>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {numbers.map((num) => (
            <Card shadow="sm" key={num} isPressable onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={num}
                  className="w-full object-cover h-[140px]"
                  src={`./src/assets/${num}.jpg`}
                />
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}