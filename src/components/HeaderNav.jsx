import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "sonner";

export const HeaderNav = ({handleExpandedSidebar}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    toast.success("Logout Success");
    navigate("/");

  };

  const onLogout = () => {
    Swal.fire({
    title: 'Apakah kamu yakin?',
    text: 'Kamu ingin keluar?',
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
        handleLogout();
      }
    });
  }
  return (
    <>
       <Navbar className="shadow-md py-2">
      <NavbarContent>
        <NavbarMenuToggle onClick={handleExpandedSidebar}/>
      </NavbarContent>

       <NavbarContent as="div" justify="end">
          <Button color="danger" variant="flat" onClick={onLogout}>Logout</Button>
      </NavbarContent>

    </Navbar>
    </>
  )
}