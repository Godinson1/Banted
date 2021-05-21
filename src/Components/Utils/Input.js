import React from "react";
import "../../Pages/css/utils/auth/auth.scss";

const Input = ({
  placeholder,
  type,
  label,
  show,
  setShowPassword,
  value,
  onChange,
  onkeyDown,
}) => {
  return (
    <div>
      <div className="auth">
        {(type === "text" && show === undefined) || null ? (
          <div className="inputed">
            <label>{label}</label>
            <div>
              <input
                id="input-container"
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
        ) : (
          <div className="inputed">
            <label>{label}</label>
            <div className="inputed-password">
              <div>
                <input
                  id="input-container"
                  placeholder={placeholder}
                  type={type}
                  value={value}
                  onChange={(e) => onChange(e)}
                  onKeyDown={onkeyDown}
                />
              </div>
              {/*<div
                className="icon-container"
                onClick={() => setShowPassword(!show)}
              >
                {show ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>*/}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
