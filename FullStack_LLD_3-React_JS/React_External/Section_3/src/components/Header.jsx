import './Header.css';
import reactImg from "../assets/react-core-concepts.png";

const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

const genRandomInt = (max) => {
  return Math.floor(Math.random() * (max + 1));
}

const Header = () => {
  let reactDesc = reactDescriptions[genRandomInt(2)];

  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {reactDesc} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

export default Header;