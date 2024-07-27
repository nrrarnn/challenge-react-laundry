import { Button, Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axiosInstance } from "../../services/axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().min(4, "Name minimal 4 karakter"),
  email: z.string().email("Format email belum sesuai"),
  username: z.string().min(4, "Username minimal 4 karakter"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  confirmPassword: z.string().min(8, "Konfirmasi password minimal 8 karakter").refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"], // Menunjukkan bahwa kesalahan terkait dengan confirmPassword
  }),
});

export const SignUpPage = () => {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleRegister = async (data) => {
    try {
      const {confirmPassword, ...userData} = data
      const response = await axiosInstance.post('/auth/register',{...userData, role: 'employee'})
      console.log(response.data)
      toast.success("Register successfully")
      navigate('/sign-in')

      
    } catch (error) {
      if(error.code) {
        toast.error("invalid username or password");
      } else {
        toast.error("server error");
      }
      toast.error(error.message);
    }

  }

  return(
   <div className="h-screen flex justify-center items-center">
      <Card className="w-[300px] text-center">
        <CardHeader className="font-bold text-lg flex justify-center">Register</CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4 "> 
          <form onSubmit={form.handleSubmit(handleRegister)}> 
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type="text"
                  label="Name"
                  size="sm"
                  isInvalid={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                  className="mb-5"
                />
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type="email"
                  label="Email"
                  size="sm"
                  isInvalid={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                  className="mb-5"
                />
              )}
            />
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type="text"
                  label="Username"
                  size="sm"
                  isInvalid={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                  className="mb-5"
                />
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type="password"
                  label="Password"
                  size="sm"
                  isInvalid={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                  className="mb-5"
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type="password"
                  label="Confirm Password"
                  size="sm"
                  isInvalid={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                  className="mb-5"
                />
              )}
            />
            <Button type="submit" className="w-full bg-indigo-500 text-white font-semibold">Register</Button>
            <p className="text-sm text-center py-4">Sudah punya akun ? <Link to={'/sign-in'} className="text-blue-600">Login</Link></p>
          </form> 
        </CardBody>
      </Card>
    </div>
  );
}