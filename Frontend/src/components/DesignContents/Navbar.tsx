import CardNav from '../../components/CardNav'
import logo from '../../assets/react.svg';

const Navbar = () => {
  const items = [
    {
      label: "Home",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Dashboard", ariaLabel: "About Dashboard", to: "/dashboard" },
      ]
    },
    {
      label: "Connect", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Connect with People", ariaLabel: "Connect with People", to: "/connect/people" },
        { label: "Project Case Studies", ariaLabel: "Project Case Studies", to: "/connect/projects" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Message", ariaLabel: "Message us", to: "/contact/message" },
        { label: "Twitter", ariaLabel: "Twitter", to: "/contact/twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", to: "/contact/linkedin" }
      ]
    }
  ];

  return (
    <CardNav
      logo={logo}
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
};
export default Navbar;
