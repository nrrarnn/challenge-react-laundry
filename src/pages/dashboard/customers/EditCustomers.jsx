import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../services/axios";
import { useEffect } from "react";
import { toast } from "sonner";

export const EditCustomerModal = ({ isOpen, onOpenChange, customerData, handleUpdateCustomer }) => {
  const token = useSelector((store) => store.auth.token);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      id: '',
      name: '',
      phoneNumber: '',
      address: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (customerData) {
      setValue('id', customerData.id);
      setValue('name', customerData.name);
      setValue('phoneNumber', customerData.phoneNumber);
      setValue('address', customerData.address);
    }
  }, [customerData, setValue]);

  const handleEditCustomer = async (data) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.put(`/customers`, data, { headers });
      handleUpdateCustomer(response.data);
      toast.success('Customer updated successfully');
      onOpenChange(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error('Failed to update Customer');
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Customer</ModalHeader>
            <form onSubmit={handleSubmit(handleEditCustomer)}>
              <ModalBody>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="text" label="Name" size="sm" className="mb-5" />
                  )}
                />
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="text" label="Phone Number" size="sm" className="mb-5" />
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="text" label="Address" size="sm" className="mb-5" />
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Save Changes
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
