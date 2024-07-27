import { Route, Routes } from "react-router-dom"
import { SignInPage } from "./pages/auth/SignInPage"
import { DashboardPage } from "./pages/dashboard/DashboardPage"
import { SignUpPage } from "./pages/auth/SignUpPage"
import PrivateRoute from "./pages/dashboard/PrivateRoute"
import { Toaster } from "sonner"
import { Home } from "./pages/Home"

function App() {
  return (
    <>
      <Toaster position="top-center" />
      {/* <Suspense fallback={<Spinner />}> */}
        <Routes>
          <Route element={<SignInPage/>} path="/sign-in"/>
          <Route element={<SignUpPage/>} path="/sign-up"/>
          <Route element={<Home/>} path="/"/>
          <Route element={
            <PrivateRoute>
              <DashboardPage/>
            </PrivateRoute> 
          } path="/dashboard"/>
        </Routes>
      {/* </Suspense> */}
    </>
  )
}

export default App
