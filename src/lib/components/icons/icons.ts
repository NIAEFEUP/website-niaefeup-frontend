import {
  FaBrandsFacebook,
  FaBrandsGithub,
  FaBrandsInstagram,
  FaBrandsLinkedin,
  FaBrandsTwitter,
  FaCalendar,
  FaSolidBars,
  FaSolidGlobe,
  FaSolidLocationDot,
  FaSolidUser
} from 'svelte-icons-pack/fa';
import { IoClose, IoMail } from 'svelte-icons-pack/io';

const Icons = {
  Instagram: FaBrandsInstagram,
  Twitter: FaBrandsTwitter,
  Facebook: FaBrandsFacebook,
  Github: FaBrandsGithub,
  Mail: IoMail,
  Linkedin: FaBrandsLinkedin,
  User: FaSolidUser,
  Bars: FaSolidBars,
  Close: IoClose,
  Globe: FaSolidGlobe,
  Location: FaSolidLocationDot,
  Calendar: FaCalendar
};

export default Icons;
