import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form"
import { axiosInstance } from "../../../services/axios"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { toast } from "sonner"


export const AddTransaction = ({isOpen, onOpenChange, onAddTransaction}) => {
  const token = useSelector((store) => store.auth.token);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const { control, handleSubmit, watch} = useForm();

  // GET DATA CUSTOMER DAN PRODUCT UNTUK SELECTED
  const FetchData = async () => {
    try {
       const headers = {
        Authorization: `Bearer ${token}`,
      };
      const productResponse = await axiosInstance.get("/products", { headers });
      setSelectedProducts(productResponse.data.data)

      const customerResponse = await axiosInstance.get("/customers", { headers });
      setSelectedCustomers(customerResponse.data.data)
    } catch(error) {
      console.log("Error : ", error)
    }
  }

  const handleAddTransaction = async () => {
    // mendapatkan nilai input dari form secara realtime
    const customerIdTr = watch('customerIdTr');
    const productId = watch('productId');
    const qty = watch('qty');
    
    // masukin ke dalam variabel payload buat data post ke api nya
    const payload = {
     customerId: customerIdTr,
     billDetails: [
       {
         product: {
           id: productId,
         },
         qty: qty,
       },
     ],
   };

   console.log(payload)
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axiosInstance.post('/bills', payload, { headers });
      onAddTransaction(response.data)
      toast.success('Transaction created successfully');
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast.error('Only admin can add transactions');
    }
  };


  useEffect(() => {
    if(token){
      FetchData()
    }
    
  }, [token])

  

  return(
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Transaction</ModalHeader>
            <form onSubmit={handleSubmit(handleAddTransaction)}>
              <ModalBody>
                <Controller
                  name="customerIdTr"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Customer"
                      size="sm"
                      className="mb-5"
                    >
                      {selectedCustomers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  name="productId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Product"
                      size="sm"
                      className="mb-5"
                    >
                      {selectedProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  name="qty"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      label="Quantity (kg)"
                      size="sm"
                      className="mb-5"
                      onChange={(e) => {field.onChange(e.target.valueAsNumber)}}
                      value={field.value || ""}
                    />
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
    </>
  )
}