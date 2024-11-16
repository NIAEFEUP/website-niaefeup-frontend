<script lang="ts">
  import Icon from '../../../../lib/components/icons/icon.svelte';
  import Icons from '../../../../lib/components/icons/icons';
</script>

<section>
  <div class="flex w-full justify-center">
    <div class="w-1/2 content-center">
      <div class="flex h-10 justify-end">
        <div class="rounded-md bg-muted-red-500 p-2">
          <a href="google.com">
            <Icon src={Icons.Pencil} color="white" size="100%" />
          </a>
        </div>
      </div>
      <div class="flex">
        <img src="/images/default_profile_pic.png" alt="User pic" class="size-48 rounded-lg" />
        <div class="mx-8 flex flex-grow flex-col" style="margin-x: 2em;">
          <div class="flex gap-x-3" style="margin-bottom: 1em;">
            <h3 class="text-3xl font-bold">Vasco Guedes</h3>
            <div class="rounded-2xl bg-green-200/20 p-2">
              <div class="flex content-center justify-center gap-x-1">
                <div class="h-3 w-3 self-center rounded-full bg-green-200" />
                <p class="self-center font-semibold">Membro ativo</p>
              </div>
            </div>
          </div>
          <p style="margin-bottom: 1em;">No meu tempo livre gosto de blabalbaba</p>
          <div class="flex gap-2" id="socials">
            <div class="h-12 rounded-md bg-white/20 p-3">
              <a href="google.com">
                <Icon src={Icons.Linkedin} color="white" size="100%" />
              </a>
            </div>
            <div class="h-12 rounded-md bg-white/20 p-3">
              <a href="google.com">
                <Icon src={Icons.Linkedin} color="white" size="100%" />
              </a>
            </div>
            <div class="h-12 rounded-md bg-white/20 p-3">
              <a href="google.com">
                <Icon src={Icons.Linkedin} color="white" size="100%" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
