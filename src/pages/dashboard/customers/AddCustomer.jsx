import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { axiosInstance } from "../../../services/axios";
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from "react-redux";
import { toast } from "sonner";



export const AddCustomerModal = ({isOpen, onOpenChange,handleCreateCustomer }) => {
const token = useSelector((store) => store.auth.token)

 const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      phoneNumber: '',
      address: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleAddCustomer = async (data) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.post('/customers', data, {headers});
      handleCreateCustomer(response.data)
      toast.success("Customer added")
      reset()
      onOpenChange(false)
    } catch (error) {
      console.error(error);
      toast.error('Failed to add customer');
    }
  };

  return(
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Customer</ModalHeader> 
             <form onSubmit={handleSubmit(handleAddCustomer)} >
              <ModalBody>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      type="text"
                      label="Name"
                      size="sm"
                      isInvalid={Boolean(fieldState.error)}
                      errorMessage={fieldState.error?.message}
                      className="mb-5"
                      />
                    )}
                />
                  <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      type="text"
                      label="Phone Number"
                      size="sm"
                      isInvalid={Boolean(fieldState.error)}
                      errorMessage={fieldState.error?.message}
                      className="mb-5"
                    />
                  )}
                />
                  <Controller
                  name="address"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      type="text"
                      label="Address"
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