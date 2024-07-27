import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar} from "@nextui-org/react";

export default function Testimoni({link,name,review}) {
  return (
    <Card className="max-w-[280px]">
      <CardHeader className="flex gap-3 bg-indigo-500 py-12">
        <div className="flex flex-col justify-center items-center mx-auto">
           <Avatar src={link} size="lg" className="absolute top-6 w-[100px] h-[100px]"/>
        </div>
      </CardHeader>
      <CardBody className="pt-10">
        <blockquote className="italic">
          "{review}"
          </blockquote>
      </CardBody>
      <CardFooter className="flex justify-center pb-8">
        <p className="text-xl font-bold ">{name}</p>
      </CardFooter>
    </Card>
  );
}
