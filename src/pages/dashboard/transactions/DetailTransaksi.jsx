import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

export const DetailTransaksi = ({customerDataTransaction, onBackPage}) => {
  // untuk mengubah format tanggal
  const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-CA', options); 
  };
  // mengambil angka 8 digit saja
  const formatCustomerCode = (code) => {
    return code.slice(0, 8);
  };


  return(
    <>
    <div className="flex flex-col p-6">
    <div className="flex justify-between py-6">
    <p> Riwayat Transaksi : {customerDataTransaction.name}</p>
     <div>
        <Button onPress={() => onBackPage()} variant="flat" color="success">kembali</Button>
      </div>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader className="bg-indigo-400" >
          <TableColumn>KODE TRANSAKSI</TableColumn>
          <TableColumn>TANGGAL TRANSAKSI</TableColumn>
          <TableColumn>QTY</TableColumn>
          <TableColumn>JENIS LAUNDRY</TableColumn>
          <TableColumn>TOTAL HARGA</TableColumn>
        </TableHeader>
        <TableBody>
          {customerDataTransaction.transactions?.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                TR{formatCustomerCode(transaction.id).toUpperCase()}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {formatDate(transaction.billDate)}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {transaction.billDetails.reduce(
                    (acc, item) => acc + item.qty,
                    0
                  )}{" "}
                  {transaction.billDetails.map((item) => item.product.type)}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {transaction.billDetails.map((item) => item.product.name)}
              </TableCell>
              <TableCell className="flex gap-1">
                {transaction.billDetails.reduce(
                    (acc, item) => acc + item.price * item.qty,
                    0
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
      </div>
    </>
  )
}