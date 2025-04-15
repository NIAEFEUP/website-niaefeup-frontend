<script lang="ts">
  import type { PageData } from './$types';
  import type { Project } from '@/types/project';

  export let data: PageData;
  export let project: Project = data.project;
</script>

{#await project then project}
  <section class="min-h-screen pt-60 font-raleway">
    <header class="flex flex-row justify-center gap-6">
      <div class="inline-block rounded-2xl bg-white/20 p-4">
        <img src={project.thumbnail} alt="{project.title}'s thumbnail" />
      </div>
      <div class="my-auto">
        <h1 class="text-8xl font-semibold text-white">{project.title}</h1>
        <ul class="flex flex-row gap-2 px-2">
          <li>
            <a href={project.github}>
              <svg
                height="32"
                viewBox="0 0 16 16"
                version="1.1"
                width="32"
                class="h-11 w-11 fill-white"
              >
                <path
                  d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </header>

    <div class="mt-28 text-center">
      <strong class="text-5xl text-white">{project.slogan}</strong>
    </div>

    <ul class="mt-24 flex justify-center gap-11">
      {#each project.links as link}
        <li>
          <a
            href={link.url}
            class="flex h-20 w-60 items-center justify-center rounded-xl bg-[#872020] text-white"
          >
            <img src={link.iconPath} alt="{project.title}'s custom website" />
          </a>
        </li>
      {/each}
    </ul>

    <div class="mt-32 flex items-center justify-center gap-4">
      <img
        class="w-max-xl w-1/3"
        src={project.image}
        alt="Three printscreens of phones showcasing the uni app"
      />
      <p class="w-1/3 max-w-xl text-right text-4xl text-gray-100">
        {project.description}
      </p>
    </div>

    <div class="mt-24 flex justify-evenly">
      <div class="flex w-1/3 flex-col items-center">
        <p class="font-source_code text-5xl font-bold text-white">&lt; Tecnologias /&gt;</p>
        <div class="mt-6 flex justify-center gap-8">
          <div class="flex gap-4 rounded-full bg-[#674244]/40 px-8 py-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.3828 18.316L18.7438 15.042H27.0928L19.6968 22.438L15.3828 18.316Z"
                fill="#40D0FD"
              />
              <path
                d="M4.90723 16.1251L9.10623 20.4241L27.0932 2.28711H18.7442L4.90723 16.1251Z"
                fill="#41D0FD"
              />
              <path
                d="M11.1758 22.4794L15.4348 26.6754L19.6968 22.4384L15.3828 18.3164L11.1758 22.4794Z"
                fill="#1FBCFD"
              />
              <path
                d="M15.4346 26.6745L19.6966 22.4375L26.9886 29.8125H18.5926L15.4346 26.6745Z"
                fill="#095A9D"
              />
              <path
                d="M15.4346 26.6746L19.4056 25.3536L18.0676 24.0566L15.4346 26.6746Z"
                fill="#0E5199"
              />
            </svg>
            <p class="text-2xl text-white">Flutter</p>
          </div>
          <div class="flex gap-4 rounded-full bg-[#674244]/40 px-8 py-4">
            <img
              src="/images/technologies/dart.png"
              alt="Logótipo da linguagem de programação Dart"
            />
            <p class="text-2xl text-white">Dart</p>
          </div>
        </div>
      </div>
      <div class="flex w-1/3 flex-col items-center">
        <p class="font-source_code text-5xl font-bold text-white">&lt; Público Alvo /&gt;</p>
        <div class="mt-6 flex justify-center gap-8">
          <p class="text-center text-3xl font-semibold text-white">
            {project.targetAudience}
          </p>
        </div>
      </div>
    </div>
  </section>
{/await}
