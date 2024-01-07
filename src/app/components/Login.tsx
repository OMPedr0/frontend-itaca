"use client"

// Login.tsx

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from "@material-tailwind/react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import logo from "../../../public/logo.png";

const Login = () => {
  const router = useRouter();
  const [emailCorporativo, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/user/login/${emailCorporativo}`);
      
      if (response.data) {
        const { isAdmin, ID_ALUMNO_CENTRO } = response.data;
        
        localStorage.setItem("userId", ID_ALUMNO_CENTRO);

        if (isAdmin) {
          router.push(`/admin/${ID_ALUMNO_CENTRO}`);
        } else {
          router.push(`/dashboard/${ID_ALUMNO_CENTRO}`);
        }
      } else {
        toast.error("E-mail não encontrado.", { theme: "dark" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao fazer login. Verifique suas credenciais.", { theme: "dark" });
    }
  };

  return (
    <div>
      <ToastContainer />

      <div className="relative flex flex-col justify-center min-h-screen">
        <div className="w-full p-6 m-auto bg-gradient-to-r from-greenbg1 via-greenbg3 to-greenbg2 rounded-lg shadow-xl lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-black uppercase">
            Matrículas
          </h1>
          <Image src={logo} alt="Logo" width={150} height={150} className="mx-auto gap-10 mt-10" />

          <div className="flex flex-col mt-4 gap-y-2 p-4">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={emailCorporativo}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border text-gray-700 border-gray-600 rounded-md"
            />
            <Button
              type="button"
              onClick={handleLogin}
              className="flex items-center justify-center w-full p-2 bg-greenbuttonlogin border border-gray-600 hover:bg-greenbg3 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-green-600"
            >
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

