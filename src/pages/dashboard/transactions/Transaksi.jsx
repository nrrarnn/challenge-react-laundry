import { useSelector } from "react-redux"
import { axiosInstance } from "../../../services/axios"
import { useEffect, useState } from "react"
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { AddTransaction } from "./AddTransaction";

export const Transaksi = ({onShowDetail}) => {
  const token = useSelector((store) => store.auth.token);
  const [customerDataTransaction, setCustomerDataTransaction] = useState([])
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  

  // MENGAMBIL DATA TRANSAKSI DARI API
  const getListTransactions = async () => {
    try {
      const response = await axiosInstance.get('/bills', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const transactions = response.data.data;
      const customerDataTransaction = organizeTransactionsByCustomer(transactions);
      setCustomerDataTransaction(customerDataTransaction)
      console.log(customerDataTransaction)
    } catch(error) {
      console.log('Error : ', error)
    }
  }

  // MENGAMBIL DATA TRANSAKSI BERDASARKAN PELANGGAN
  const organizeTransactionsByCustomer = (transactions) => {
    // untuk menyimpan data transaksi berdasarkan pelanggan
    const customerDataTransactions = {}

    transactions.forEach((transaction) => {
      const customerId = transaction.customer.id;

      if(!customerDataTransactions[customerId]){
        customerDataTransactions[customerId] = {
          ...transaction.customer,
          transactions : [],
          transactionCount: 0
        }
      }

      customerDataTransactions[customerId].transactions.push(transaction);
      customerDataTransactions[customerId].transactionCount += 1;
    });

    return customerDataTransactions;

  }

  const formatCustomerCode = (code) => {
    return code.slice(0, 8);
  };

 const onAddTransaction = (newTransaction) => {
  setCustomerDataTransaction(prevData => {
    if (!Array.isArray(prevData)) {
      console.error('Error: prevData is not an array.');
      return prevData; 
    }
    
    return [...prevData, newTransaction];
  });

  onOpenChange(false);
  getListTransactions();
};

  
  useEffect(() => {
    if(token){
      getListTransactions()
    }
  }, [token])

  

  return(
    <>
      <div className="flex flex-col p-6">
    
      <div className="p-3 flex flex-row justify-between"> 
        <h1 className="font-bold">List Transaksi</h1>
        <Button onPress={onOpen} className="bg-indigo-500 text-white font-sans font-semibold">Add Transaction</Button>
      </div>
      <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>KODE PELANGGAN</TableColumn>
        <TableColumn>NAMA PELANGGAN</TableColumn>
        <TableColumn>JUMLAH TRANSAKSI</TableColumn>
        <TableColumn>ACTION</TableColumn>
      </TableHeader>
      <TableBody>
        {Object.values(customerDataTransaction).map((transaction, index) => (
          <TableRow key={transaction.id}>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              {index + 1}
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              LD{formatCustomerCode(transaction.id).toUpperCase()}
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              {transaction.name}
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              {transaction.transactionCount}
            </TableCell>
            <TableCell className="flex gap-1">
              <Button color="primary" onPress={() => onShowDetail(transaction)}>Detail</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    {/* Modal Add Transaction */}
    <AddTransaction isOpen={isOpen} onOpenChange={onOpenChange} onAddTransaction={onAddTransaction}/>
    </div>
    </>

  )
}