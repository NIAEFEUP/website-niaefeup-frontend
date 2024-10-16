import {
  FaBrandsInstagram,
  FaBrandsTwitter,
  FaBrandsFacebook,
  FaBrandsGithub,
  FaBrandsLinkedin,
  FaSolidUser,
  FaSolidBars,
  FaSolidGlobe
} from 'svelte-icons-pack/fa';
import { IoMail, IoClose, IoEye, IoEyeOff } from 'svelte-icons-pack/io';

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
  Visible: IoEye,
  Hidden: IoEyeOff
};

export default Icons;
