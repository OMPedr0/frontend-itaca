import React from "react";
import { Checkbox } from "@material-tailwind/react";

interface Subject {
  Id: number;
  Codigo: string;
  Designacion: string;
  Grupo: string;
}

interface SubjectCheckboxProps {
  subject: Subject;
  isSelected: boolean;
  onCheckboxChange: (subject: Subject, isSelected: boolean) => void;
}

const SubjectCheckbox: React.FC<SubjectCheckboxProps> = ({
  subject,
  isSelected,
  onCheckboxChange,
}) => {
  const handleCheckboxChange = () => {
    onCheckboxChange(subject, !isSelected);
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer py-2">
      <Checkbox
        checked={isSelected}
        onChange={handleCheckboxChange}
        color="blue"
        crossOrigin={undefined}
      />
      <span className="text-sm text-gray-500 whitespace-nowrap">
        {`${subject.Designacion} - ${subject.Grupo}`}
      </span>
    </label>
  );
};

export default SubjectCheckbox;
