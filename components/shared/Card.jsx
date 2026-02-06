import "./Card.css";

export const Card = ({ children, className = "" }) => {
  return <div className={`card-container ${className}`}>{children}</div>;
};

export const CardHeader = ({ children, className = "" }) => {
  return <div className={`card-header ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, icon: Icon, className = "" }) => {
  return (
    <div className={`card-title ${className}`}>
      {Icon && <Icon />}
      {children}
    </div>
  );
};

export const CardDescription = ({ children, className = "" }) => {
  return <p className={`card-description ${className}`}>{children}</p>;
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={`card-content ${className}`}>{children}</div>;
};
