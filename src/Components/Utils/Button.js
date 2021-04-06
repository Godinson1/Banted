import React from "react";
import "../../Pages/css/utils/auth/auth.scss";

const Button = ({ label, disabled, onClick }) => {
  return (
    <div className="auth">
      <div className="buttoned">
        <form onSubmit={onClick}>
          <button
            type="submit"
            disabled={disabled}
            id={disabled ? "button-container-disabled" : "button-container"}
          >
            {label}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Button;
