import FaBrandsInstagram from 'svelte-icons-pack/fa/FaBrandsInstagram';
import FaBrandsTwitter from 'svelte-icons-pack/fa/FaBrandsTwitter';
import FaBrandsFacebook from 'svelte-icons-pack/fa/FaBrandsFacebook';
import FaBrandsGithub from 'svelte-icons-pack/fa/FaBrandsGithub';
import IoMail from 'svelte-icons-pack/io/IoMail';
import FaBrandsLinkedin from 'svelte-icons-pack/fa/FaBrandsLinkedin';
import FaSolidUser from 'svelte-icons-pack/fa/FaSolidUser';
import FaBars from 'svelte-icons-pack/fa/FaSolidBars';
import FaTimes from 'svelte-icons-pack/fa/FaSolidTimes';
import AiOutlineSearch from "svelte-icons-pack/ai/AiOutlineSearch";

const Icons = {
  Instagram: FaBrandsInstagram,
  Twitter: FaBrandsTwitter,
  Facebook: FaBrandsFacebook,
  Github: FaBrandsGithub,
  Mail: IoMail,
  Linkedin: FaBrandsLinkedin,
  User: FaSolidUser,
  Bars: FaBars,
  Times: FaTimes,
  Search: AiOutlineSearch
};

type Keys = keyof typeof Icons;
export type IconsType = typeof Icons[Keys];


export default Icons;
