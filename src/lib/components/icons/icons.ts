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
import { FiLogOut } from 'svelte-icons-pack/fi';
import { FiEdit2 } from 'svelte-icons-pack/fi';

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
  Hidden: IoEyeOff,
  Logout: FiLogOut,
  Edit: FiEdit2
};

export default Icons;
