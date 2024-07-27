import {  Divider, Image } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faUsers, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ setActivePage, isSidebarExpanded, activePage }) => {
  const list = [
    { name: 'Home', icon: faHome },
    { name: 'Produk', icon: faBox },
    { name: 'Pelanggan', icon: faUsers },
    { name: 'Transaksi', icon: faMoneyCheck },
  ];

  return (
    <aside className={`bg-slate-800 text-white min-h-screen p-4 transition-all duration-300 ${isSidebarExpanded ? 'w-60' : 'w-16'} `}>
      <nav>
        <div className='font-bold sm:text-3xl text-xl mb-5 flex items-center'>
          <FontAwesomeIcon icon="fa-regular fa-washing-machine" />
          {isSidebarExpanded && <p className='text-white text-center'>Enigma <span className='text-indigo-500'>Laundry</span> </p>}
        </div>
        <Divider className='bg-white'/>
        <ul className="mt-2 space-y-2 flex flex-col gap-5 text-slate-900">
          {list.map((item) => (
            <li key={item.name} onClick={() => setActivePage(`${item.name}`)} className={`flex items-center py-2.5 px-2 cursor-pointer ${activePage === item.name ? 'bg-indigo-500 text-white' : ''}hover:bg-indigo-500 rounded-md text-white`}>
              <FontAwesomeIcon icon={item.icon} />
              {isSidebarExpanded && <span className='px-2'>{item.name}</span>}
            </li>
          ))}
        </ul>
        
      </nav>
    </aside>
  );
};

export default Sidebar;
