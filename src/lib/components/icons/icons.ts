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
import { BiMap } from 'svelte-icons-pack/bi';
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
  Pin: BiMap,
  Visible: IoEye,
  Hidden: IoEyeOff
};

export default Icons;
