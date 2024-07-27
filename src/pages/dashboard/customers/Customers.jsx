import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { axiosInstance } from "../../../services/axios";
import { ListCustomers } from "./ListCustomers";
import { Button, useDisclosure } from "@nextui-org/react";
import { AddCustomerModal } from "./AddCustomer";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { EditCustomerModal } from "./EditCustomers";

export const Customers = () => {
  const token = useSelector((store) => store.auth.token);
  const [listCustomers, setListCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();


  // GET DATA CUSTOMERS
  const getListCustomers = async () => {
    try {
      const response = await axiosInstance.get('/customers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setListCustomers(response.data.data)

    } catch(error) {
      console.error("Error fetching customers list:", error)
    }
  }

  // ADD DATA CUSTOMER
  const handleCreateCustomer = (newCustomer) => {
    setListCustomers([...listCustomers, newCustomer])
    getListCustomers();
  }

  // DELETE CUSTOMER
  const handleDeleteCustomer = async (id) => {
    try {
      await axiosInstance.delete(`/customers/${id}`, {
        headers: {
          Authorization : `Bearer ${token}`
        }
      });
      toast.success("Customer has been deleted")
      getListCustomers();

    } catch(error) {
      console.error("Error", error)
      toast.error('Delete failed')
    }
  }

  // CONFIRM DELETE
  const onDelete = (id) => {
    Swal.fire({
    title: 'Apakah kamu yakin?',
    text: 'Kamu ingin menghapus produk ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    customClass: {
      container: 'swal-container',
      popup: 'swal-popup',
      title: 'swal-title',
      content: 'swal-content',
      confirmButton: 'swal-confirm',
      cancelButton: 'swal-cancel'
    }}).then((result) => {
      if (result.isConfirmed) {
        handleDeleteCustomer(id);
      }
    });
  };

  // EDIT CUSTOMERS
  const handleUpdateCustomer = (updatedCustomer) => {
    setListCustomers((prevCustomerList) => 
      prevCustomerList.map((customer) => 
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
    getListCustomers(); 
    onEditOpenChange(false); 
  };

  const openEditModal = (customer) => {
    console.log('Editing customer:', customer); 
    setEditCustomer(customer);
    onEditOpen();
};



  useEffect(() => {
    if(token) {
      getListCustomers()
    }
  },[token])

  return(
    <>
      <div className="w-full flex flex-col">
        <div className="p-6">

          <Button className="bg-indigo-500 text-white font-semibold" onPress={onOpen}>Add</Button>
          <AddCustomerModal 
            onOpenChange={onOpenChange} 
            isOpen={isOpen} 
            handleCreateCustomer={handleCreateCustomer}
          />

        </div>

        <div className="flex p-6">
          <ListCustomers listCustomers={listCustomers} onDelete={onDelete} onEditOpen={openEditModal}/>
        </div>

        <EditCustomerModal 
          isOpen={isEditOpen} 
          onOpenChange={onEditOpenChange}
          customerData={editCustomer}
          handleUpdateCustomer={handleUpdateCustomer}
          />

      </div>
    </>
  )
}