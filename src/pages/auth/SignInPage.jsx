import { Button, Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axiosInstance } from "../../services/axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const loginSchema = z.object({
  username: z.string().min(4, "Username minimal 4 karakter"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export const SignInPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleLogin = async (data) => {
    try {
      const response = await axiosInstance.post('/auth/login', data)
      const { token } = response.data.data;
      const { code } = response.data.status;

      if (code === 201) {
        localStorage.setItem("token", token);
        dispatch({
          type: 'LOGIN',
          payload : token
        })
        toast.success("Login succesfully", {
          duration: 2000,
        })
        navigate('/dashboard')

      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      if(error.code) {
        toast.error("invalid username or password");
      } else {
        toast.error("server error");
      }
      toast.error(error.message);
    }


  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[300px] text-center">
        <CardHeader className="font-bold text-lg flex justify-center">Login</CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4 "> 
          <form onSubmit={form.handleSubmit(handleLogin)}> 
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
            <Button type="submit" className="relative w-full bg-indigo-500 text-white font-semibold">Login</Button>
            <p className="text-sm text-center py-4">Belum punya akun ? <Link to={'/sign-up'} className="text-blue-600">Register</Link></p>
          </form> 
        </CardBody>
      </Card>
    </div>
  );

}