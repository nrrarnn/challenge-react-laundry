import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {
      name: 'Home',
      link: 'home'
    },
    {
      name: 'About Us',
      link: 'home'
    },
    {
      name: 'Layanan',
      link: 'service'
    },
    {
      name: 'Gallery',
      link: 'gallery'
    },
    {
      name: 'Testimony',
      link: 'testi'
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="shadow-md py-3">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          
          <p className="font-bold text-inherit">ENIGMA LAUNDRY</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-5" justify="center">
        <NavbarItem>
          <a color="foreground" href="#home">
            Home
          </a>
        </NavbarItem>
        <NavbarItem>
          <a color="foreground" href="#about">
           About us
          </a>
        </NavbarItem>
        <NavbarItem>
          <a href="#service" >
            Layanan
          </a>
        </NavbarItem>
        <NavbarItem>
          <a color="foreground" href="#gallery">
            Gallery
          </a>
        </NavbarItem>
        <NavbarItem>
          <a color="foreground" href="#testi">
            Testimoni
          </a>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link to={'/sign-in'}>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button  color="primary" variant="flat">
            <Link to={'/sign-up'}>Sign Up</Link>
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="pt-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${index}`}>
            <a
              className="w-full"
              href={`#${item.link}`}
            >
              {item.name}
            </a>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
