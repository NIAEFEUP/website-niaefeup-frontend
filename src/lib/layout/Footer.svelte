<script>
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FaBrandsInstagram from "svelte-icons-pack/fa/FaBrandsInstagram";
    import FaBrandsTwitter from "svelte-icons-pack/fa/FaBrandsTwitter";
    import FaBrandsFacebook from "svelte-icons-pack/fa/FaBrandsFacebook";
    import FaBrandsGithub from "svelte-icons-pack/fa/FaBrandsGithub"; 
    import IoMail from "svelte-icons-pack/io/IoMail"; 
    import FaBrandsLinkedin from "svelte-icons-pack/fa/FaBrandsLinkedin";
    import FaSolidUser from "svelte-icons-pack/fa/FaSolidUser";
</script>

<div class="w-full bg-transparent p-3 max-sm:hidden z-10">
    <footer class="p-2 text-white grid grid-cols-3 justify-between border-t-2 border-secondary">
        <div class="flex p-3 self-center gap-3">
            <a href="https://www.instagram.com/niaefeup/"><Icon src={FaBrandsInstagram} color="white" size="24px" /></a>
            <a href="https://twitter.com/niaefeup"><Icon src={FaBrandsTwitter} color="white" size="24px" /></a>
            <a href="https://www.facebook.com/NIAEFEUP"><Icon src={FaBrandsFacebook} color="white" size="24px" /></a>
            <a href="https://github.com/NIAEFEUP"><Icon src={FaBrandsGithub} color="white" size="24px" /></a>
            <a href="https://www.linkedin.com/company/nifeup"><Icon src={FaBrandsLinkedin} color="white" size="24px" /></a>
            <a href="mailto: ni@aefeup.pt"><Icon src={IoMail} color="white" size="24px" /></a>
        </div>
        <div class="flex flex-col items-center gap-1">
            <img src="/images/ni_negative_logo.svg" alt="NIAFEUP logo" class="w-11 h-auto">
            <p class="text-sm">&copy; NIAEFEUP 2022</p>
        </div>
        <div class="flex flex-row justify-end p-3 self-center items-center gap-2">
            <div class="relative flex flex-row self-center items-center gap-1 bg-tertiary60 w-40 justify-between rounded-md content-center h-10 cursor-pointer">
                <div class="flex content-center pl-2">
                    <a href="" class="pr-1 w-full font-source-code">Área Membro</a>
                </div>
                <div class="absolute bg-tertiary rounded-md w-fit p-1 pb-0 pt-2 h-fit right-0 ">
                    <Icon src={FaSolidUser} color="#411315" size="31px" />
                </div>
            </div>
            <div class="text-sm text-right">
                <p class="font-bold">FEUP</p>
                <p>Sala B315</p>
            </div>    
        </div>
    </footer>
</div>

<div class="hidden w-full bg-transparent p-3 max-sm:block">
    <footer class="p-2 text-white flex flex-col justify-between border-t-2 text-sm border-secondary">
        <div class="flex flex-row p-3 self-center justify-between w-full items-center">
            <span>NIAEFEUP</span>
            <img src="/images/ni_negative_logo.svg" alt="NIAFEUP logo" class="w-11 h-auto">
            <div class="flex flex-row gap-1">
                <span class="font-bold">FEUP</span>
                <span>B315</span>
            </div>
        </div>
        <div class="grid grid-cols-3 grid-rows-2 items-center p-2 gap-2 justify-items-center">
            <a href="https://www.instagram.com/niaefeup/"><Icon src={FaBrandsInstagram} color="white" size="24px" /></a>
            <a href="https://twitter.com/niaefeup"><Icon src={FaBrandsTwitter} color="white" size="24px" /></a>
            <a href="https://www.facebook.com/NIAEFEUP"><Icon src={FaBrandsFacebook} color="white" size="24px" /></a>
            <a href="https://github.com/NIAEFEUP"><Icon src={FaBrandsGithub} color="white" size="24px" /></a>
            <a href="https://www.linkedin.com/company/nifeup"><Icon src={FaBrandsLinkedin} color="white" size="24px" /></a>
            <a href="mailto: ni@aefeup.pt"><Icon src={IoMail} color="white" size="24px" /></a>
        </div>
        <div class="relative flex flex-row self-center items-center gap-1 bg-tertiary60 w-30 justify-between rounded-md content-center h-10 cursor-pointer">
            <div class="flex content-center pl-11">
                <a href="" class="pr-1 w-full font-source-code">Área Membro</a>
            </div>
            <div class="absolute bg-tertiary rounded-md w-fit p-1 pb-0 pt-2 h-fit left-0 ">
                <Icon src={FaSolidUser} color="#411315" size="31px" />
            </div>
        </div>
    <span class="self-center pt-4">&copy; NIAEFEUP 2022</span>
    </footer>
</div>
