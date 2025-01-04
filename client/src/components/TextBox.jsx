import React from "react";

const TextBox = ({ placeholder, label, name, type, register, error, rows, cols }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={name} className="text-gray-700">{label}</label>}
      {type === "textarea" ? (
        <textarea
          className="py-2 px-4 my-2 border-b focus:outline-none focus:border-blue-500"
          placeholder={placeholder}
          name={name}
          rows={rows}
          cols={cols}
          {...register}
        />
      ) : (
        <input
          className="py-2 px-4 my-2 border-b focus:outline-none focus:border-blue-500"
          placeholder={placeholder}
          name={name}
          type={type}
          {...register}
        />
      )}
      {/* Error Message */}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default TextBox;
