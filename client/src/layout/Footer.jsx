import logo from "../assets/icon-.png";

const Footer = () => {
  return (
    <section className="bg-black p-5 text-white mt-10 flex items-center gap-x-10">
      <div>
        <img src={logo} alt="" className="w-20 h-20" />
      </div>
      <div className="text-sm">
        <p>Gideon for Fundinit © 2023</p>
      </div>
    </section>
  );
};

export default Footer;
