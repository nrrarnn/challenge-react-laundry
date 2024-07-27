import { Button, Input } from "@nextui-org/react"


export const HomeFooter = () => {
  return(
    <>
      <footer className="bg-gray-800 text-slate-50 py-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
        {/* Informasi Kontak */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Kontak Kami</h3>
          <p>Alamat: Jl. Braga No. 123, Bandung</p>
          <p>Telepon: (021) 123-4567</p>
          <p>Email: info@enigmalaundry.com</p>
        </div>

        {/* Jam Operasional */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Jam Operasional</h3>
          <p>Senin - Jumat: 08.00 - 20.00</p>
          <p>Sabtu: 09.00 - 18.00</p>
          <p>Minggu: Tutup</p>
        </div>

        {/* Sosial Media */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Ikuti Kami</h3>
          <a href="https://facebook.com/laundrybersih" className="block">Facebook</a>
          <a href="https://instagram.com/laundrybersih" className="block">Instagram</a>
        </div>

        {/* Newsletter */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Daftar Newsletter</h3>
          <form className="flex">
            <Input
              type="email"
              placeholder="Email Anda"
              className="mr-2"
              required
            />
            <Button type="submit" color="primary">Daftar</Button>
          </form>
        </div>
      </div>

      {/* Hak Cipta */}
      <div className="text-center mt-4">
        <p>© 2024 Enigma Laundry. Semua hak dilindungi.</p>
        <a href="/privacy-policy" className="text-gray-400">Kebijakan Privasi</a>
        <span className="mx-2">|</span>
        <a href="/terms" className="text-gray-400">Syarat dan Ketentuan</a>
      </div>
    </footer>
    </>
  )
}