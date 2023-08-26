import { IoAddOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icon-.png";
import { signout } from "../../features/user/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdd = () => {
    navigate("/form");
  };
  const handleLogout = () => {
    dispatch(signout());
    navigate("/");
  };
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
      <div className="flex gap-x-5 items-center">
        <div className="text-primary text-3xl" onClick={handleAdd}>
          <IoAddOutline />
        </div>
        <div
          className="flex items-center text-2xl text-white rounded-sm h-10 ml-2 bg-primary px-4 cursor-pointer hover:bg-transparent hover:text-secondary hover:border hover:border-primary"
          onClick={handleLogout}
        >
          <PiSignOutBold />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
