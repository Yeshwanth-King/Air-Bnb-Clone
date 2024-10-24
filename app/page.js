import axios from "axios";
import Navbar from "./components/Navbar";

export default function Home() {
  axios.defaults.withCredentials = true;
  return (
    <div>
      <Navbar />
    </div>
  );
}
