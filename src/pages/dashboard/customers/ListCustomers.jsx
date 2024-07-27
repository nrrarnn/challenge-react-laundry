import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"


export const ListCustomers = ({listCustomers, onDelete, onEditOpen}) => {
  return(
     <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NO</TableColumn>
        <TableColumn>NAME</TableColumn>
        <TableColumn>PHONE NUMBER</TableColumn>
        <TableColumn>ADDRESS</TableColumn>
        <TableColumn>ACTION</TableColumn>
      </TableHeader>
      <TableBody>
        {listCustomers.map((customer, index) => (
          <TableRow key={customer.id}>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              {index + 1}
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              {customer.name}
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              {customer.phoneNumber}
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              {customer.address}
            </TableCell>
            <TableCell className="flex gap-1">
              <Button color="primary" onPress={() => onEditOpen(customer)} >Edit</Button>
              <Button color="danger" onClick={() => onDelete(customer.id)}>Hapus</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}