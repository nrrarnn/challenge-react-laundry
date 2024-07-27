import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"

export const ListProducts = ({products, onDelete, onEditOpen}) => {
  return(
    <>
      <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>NAME</TableColumn>
        <TableColumn>PRICE</TableColumn>
        <TableColumn>TYPE</TableColumn>
        <TableColumn>ACTION</TableColumn>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={product.id}>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              {index + 1}
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              {product.name}
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              {product.price}
            </TableCell>
            <TableCell className="px-6 py-4 whitespace-nowrap">
              {product.type}
            </TableCell>
            <TableCell className="flex gap-1">
              <Button color="primary" onPress={() => onEditOpen(product)}>Edit</Button>
              <Button color="danger" onClick={() => onDelete(product.id)}>Hapus</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  )
}