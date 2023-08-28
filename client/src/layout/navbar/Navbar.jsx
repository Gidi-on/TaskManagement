import { useNavigate } from "react-router-dom";
import logo from "../../assets/icon-.png";

const Navbar = () => {
  const navigate = useNavigate();
  //
  return (
    <div className="fixed z-10 w-full h-14 md:h-20 bg-white px-4 md:px-10 flex justify-between items-center border border-primary">
      <div className="w-20 h-20 flex items-center">
        <img
          src={logo}
          alt="Fundinit logo"
          onClick={() => {
            navigate("/");
          }}
          className="h-14 w-14 md:h-20 md:w-20"
        />
      </div>
      <h1 className="text-primary text-lg font-bold hidden md:block">
        Superhero to Fundinit
      </h1>
    </div>
  );
};

export default Navbar;
