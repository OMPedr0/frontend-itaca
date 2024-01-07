"use client"

// UserDashboard.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@material-tailwind/react";

interface UserData {
  [key: string]: any;
}

const AdminDashboard: React.FC = () => {
  const router = useRouter();

  const [storedUserId, setStoredUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);


  useEffect(() => {

    
    const userIdFromLocalStorage = localStorage.getItem("userId");
    setStoredUserId(userIdFromLocalStorage);

    const checkAdminStatus = async () => {
      try {
        const ID_ALUMNO_CENTRO = await  storedUserId;
        const response = await axios.get(`http://localhost:8081/server/adminProtect/${ID_ALUMNO_CENTRO}`);
        setIsAdmin(true);
      } catch (error) {
        setIsAdmin(false);
        console.error(error);
      }
    };

    const fetchUserData = async () => {
      try {
        const idToFetch = storedUserId;

        if (idToFetch && typeof idToFetch === "string") {
          const response = await axios.get<UserData[]>(`http://localhost:8081/user/userData/${idToFetch}`);
          setUserData(response.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

  
    if (storedUserId) {
      // Aguarde a obtenção do userID antes de fazer a verificação de admin
       checkAdminStatus();
    }
    if (userIdFromLocalStorage) {
      fetchUserData();
    }
  }, [storedUserId]);

  const editCiclos = () => {
    router.push(`/admin/${storedUserId}/ciclos`);
  };

  const nuevosAllumno = () => {
    router.push(`/admin/${storedUserId}/nuevos`);
  };

  return (
    <div className="p-6">
      {isAdmin && userData !== null ? (
        <div>
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          <h2>{userData.Nombre}</h2>
          <Button
            variant="gradient"
            color="green"
            onClick={editCiclos}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Edit Ciclos
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={nuevosAllumno}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Nuevos Alumnos
          </Button>
        </div>
      ) : isAdmin === false ? (
        <div className="text-center">
          <p className="text-red-500 font-semibold">No tienes permiso para acceder al panel de administración.</p>
        </div>
      ) : (
        <div className="text-center">
          <p>Comprobación del estado del administrador...</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
