import { useState } from "react";
import { HeaderNav } from "../../components/HeaderNav"
import Sidebar from "../../components/Sidebar"
import { Produk } from "./products/Produk";
import { HomePage } from "./HomePage";
import { Transaksi } from "./transactions/Transaksi";
import { Customers } from "./customers/Customers";
import { DetailTransaksi } from "./transactions/DetailTransaksi";

export const DashboardPage = () => {
  const [activePage, setActivePage] = useState('home');
  const [customerDetail, setCustomerDetail] = useState({});
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  const handleShowDetail = (customer) => {
    setCustomerDetail(customer);
    setActivePage('DetailTransaksi');
  };

  const handleBackPage = () => {
    setActivePage('Transaksi')
  }

  const handleExpandedSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded)
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Home':
        return <HomePage />;
      case 'Produk':
        return <Produk/>;
      case 'Pelanggan':
        return <Customers/>;
      case 'Transaksi':
        return <Transaksi onShowDetail={handleShowDetail} />;
      case 'DetailTransaksi':
        return <DetailTransaksi customerDataTransaction={customerDetail} onBackPage={handleBackPage} />
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex min-h-screen">
            <Sidebar setActivePage={setActivePage} activePage={activePage} isSidebarExpanded={isSidebarExpanded}/>
            <div className={`flex-1 flex flex-col`}>
              <HeaderNav handleExpandedSidebar={handleExpandedSidebar}/>
              <div className="flex-1">
                {renderPage()}
              </div>
            </div>
        </div>
  )
}