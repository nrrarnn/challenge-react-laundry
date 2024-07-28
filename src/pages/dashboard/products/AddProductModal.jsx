import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { axiosInstance } from "../../../services/axios";
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from "react-redux";
import { toast } from "sonner";



export const AddProductModal = ({isOpen, onOpenChange,handleCreateProduct }) => {
const token = useSelector((store) => store.auth.token)

 const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      price: 0,
      type: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleAddProduct = async (data) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.post('/products', data, {headers});
      handleCreateProduct(response.data)
      toast.success("Product added")
      reset()
      onOpenChange(false) 
    } catch (error) {
      toast.error('Only Admin can add product')
    }
  };

  return(
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Product</ModalHeader> 
             <form onSubmit={handleSubmit(handleAddProduct)} >
              <ModalBody>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      type="text"
                      label="Product Name"
                      size="sm"
                      isInvalid={Boolean(fieldState.error)}
                      errorMessage={fieldState.error?.message}
                      className="mb-5"
                      />
                    )}
                />
                  <Controller
                  name="price"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      type="number"
                      label="Price"
                      size="sm"
                      isInvalid={Boolean(fieldState.error)}
                      errorMessage={fieldState.error?.message}
                      className="mb-5"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  )}
                />
                  <Controller
                  name="type"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      type="text"
                      label="Type"
                      size="sm"
                      isInvalid={Boolean(fieldState.error)}
                      errorMessage={fieldState.error?.message}
                      className="mb-5"
                      
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
  )
}