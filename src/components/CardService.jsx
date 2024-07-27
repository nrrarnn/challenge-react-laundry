import { Card, CardBody } from "@nextui-org/react"

export const CardService = ({title, description}) => {
  return(
    <Card className="py-4 w-96">
      <CardBody className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{title}</p>
        <h4 className="mt-2 font-normal text-md">{description}</h4>
      </CardBody>
    </Card>
  )
}