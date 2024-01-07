// DataCard.tsx
import React from "react";
import { Button } from "@material-tailwind/react";

interface DataCardProps {
  title: string;
  data: { [key: string]: any };
  section: string;
  isEditing: boolean;
  onEditClick: () => void;
  onSaveClick: () => void;
  onCancelClick: () => void; // Função para lidar com o clique no botão Cancelar
  onInputChange: (key: string, value: string) => void;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  data,
  section,
  isEditing,
  onEditClick,
  onSaveClick,
  onCancelClick, // Adiciona a função para lidar com o clique no botão Cancelar
  onInputChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-fit mr-4">
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>
        <ul className="text-gray-800">
          {Object.entries(data).map(([key, value]) => (
            <li key={key} className="mb-2">
              <strong>{key}:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={data[key]}
                  onChange={(e) => onInputChange(key, e.target.value)}
                  className="border p-2 w-full"
                />
              ) : (
                <span>{value}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-4">
        {isEditing ? (
          <div>
            <Button variant="gradient" onClick={onCancelClick}>
              Cancelar
            </Button>
            <Button variant="gradient" color="green" onClick={onSaveClick} className="ml-4">
              Salvar
            </Button>
          </div>
        ) : (
          <Button variant="gradient" color="green" onClick={onEditClick}>
            Editar
          </Button>
        )}
      </div>
    </div>
  );
};

export default DataCard;
