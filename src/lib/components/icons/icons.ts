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
import { OiDiffAdded16 } from 'svelte-icons-pack/oi';
import { AiOutlineSearch } from 'svelte-icons-pack/ai';
import { FiLogOut, FiEdit2 } from 'svelte-icons-pack/fi';
import { BsTrash } from 'svelte-icons-pack/bs';

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
  Edit: FiEdit2,
  Add: OiDiffAdded16,
  Search: AiOutlineSearch,
  Trash: BsTrash
};

export default Icons;
