import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../services/axios";
import { useEffect } from "react";
import { toast } from "sonner";

export const EditProductModal = ({ isOpen, onOpenChange, productData, handleUpdateProduct }) => {
  const token = useSelector((store) => store.auth.token);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      id: '',
      name: '',
      price: 0,
      type: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // Set default values when productData changes
  useEffect(() => {
    if (productData) {
      setValue('id', productData.id);
      setValue('name', productData.name);
      setValue('price', productData.price);
      setValue('type', productData.type);
    }
  }, [productData, setValue]);

  const handleEditProduct = async ( data) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.put(`/products`, data, { headers });
    handleUpdateProduct(response.data);
    toast.success('Product updated successfully');
    onOpenChange(false);
  } catch (error) {
    console.error("Error:", error);
    toast.error('Failed to update product');
  }
};


  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader>
            <form onSubmit={handleSubmit(handleEditProduct)}>
              <ModalBody>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="text" label="Product Name" size="sm" className="mb-5" />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="number" label="Price" size="sm" className="mb-5" onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                  )}
                />
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="text" label="Type" size="sm" className="mb-5"  />
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
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
