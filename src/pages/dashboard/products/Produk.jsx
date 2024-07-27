import { useSelector } from "react-redux"
import { axiosInstance } from "../../../services/axios"
import { useEffect, useState } from "react"
import { Button,  useDisclosure } from "@nextui-org/react"
import { ListProducts } from "./ListProducts"
import { AddProductModal } from "./AddProductModal"
import { EditProductModal } from "./EditProductModal"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'
import { toast } from "sonner"

export const Produk = () => {

  const [produklist, setProdukList] = useState([])
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [editProductData, setEditProductData] = useState(null);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
  const token = useSelector((store) => store.auth.token)

  //  GET DATA PRODUCT 
  const getListProducts = async () => {
    try {
      const response = await axiosInstance.get('/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProdukList(response.data.data);
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  };

  // ADD DATA PRODUCT 
  const handleCreateProduct = (newProduct) => {
    setProdukList([...produklist, newProduct]);
    onOpenChange(false)
    getListProducts();
  };



  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axiosInstance.delete(`/products/${id}`, { headers });
      toast.success("Delete Success");
      getListProducts();
    
    } catch (error) {
      console.log(error.message);
      toast.error("Delete Failed");
    }
  };


  

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
        deleteProduct(id);
      }
    });
  };

  // EDIT PRODUCT
  const handleUpdateProduct = (updatedProduct) => {
    setProdukList((prevProduklist) => 
      prevProduklist.map((product) => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    getListProducts(); 
    onEditOpenChange(false); 
  };


  // OPEN MODAL EDIT PRODUCT
  const openEditModal = (product) => {
    setEditProductData(product);
    onEditOpen();
  };
  
  // TRIGGER GETLIST JIKA ADA TOKEN
  useEffect(() => {
    if (token) {
      getListProducts();
    }
  }, [token]);


  return(
    <>
      <div className="w-full flex flex-col">
        <div className="p-6">
          <Button onPress={onOpen} className="bg-indigo-500 text-white font-semibold">Add</Button>
        </div>

        <AddProductModal isOpen={isOpen} onOpenChange={onOpenChange} handleCreateProduct={handleCreateProduct}/>

        <div className="flex p-5">
          <ListProducts products={produklist} onDelete={onDelete} onEditOpen={openEditModal}/>   
            <EditProductModal
              isOpen={isEditOpen}
              onOpenChange={onEditOpenChange}
              productData={editProductData}
              handleUpdateProduct={handleUpdateProduct}
            />
        </div>
      </div>
    </>
  )
}