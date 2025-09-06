<script lang="ts">
  import { run } from 'svelte/legacy';

  import type { PageData } from './$types';
  import type { Account } from '@/types/account';
  import FormsHeader from '$lib/components/forms-header.svelte';
  import LabelInput from '$lib/components/forms/label-input.svelte';
  import PictureInput from '$lib/components/forms/picture-input.svelte';
  import Button from '$lib/components/buttons/button.svelte';
  import RadioButton from '$lib/components/forms/radio-buttons.svelte';
  import { toISOLocal } from '$lib/utils.ts';
  import * as Carousel from '$lib/components/ui/carousel/index.js';
  import * as Card from '$lib/components/ui/card/index.js';

  interface Props {
    data: PageData;
    account?: Account;
    form: any;
  }

  let { data, account = data.account, form }: Props = $props();

  let api: any = $state();
  let current = $state(0);
  let count = $state(0);

  run(() => {
    if (api) {
      count = api.scrollSnapList().length;
      current = api.selectedScrollSnap();

      api.on('select', () => {
        current = api.selectedScrollSnap();
      });
    }
  });

  let websites = $state(account.websites ? [...account.websites] : []);

  function addCustomWebsite() {
    websites = [...websites, { label: '', url: '', iconPath: '' }];
  }

  function removeCustomWebsite() {
    if (websites.length >= 1) {
      const currentPosition = api ? api.selectedScrollSnap() : 0;
      websites = [...websites.slice(0, currentPosition), ...websites.slice(currentPosition + 1, websites.length)];
    }
  }
</script>

{#await account}
  <p>...waiting</p>
{:then account}
  <div class="flex flex-col gap-10">
    <FormsHeader label="Informações Pessoais" />

    <form
      method="POST"
      enctype="multipart/form-data"
      class="flex flex-col md:flex-row md:justify-evenly"
    >
      <div class="order-2 ml-5 mr-5 flex flex-col gap-5">
        <LabelInput
          name="name"
          label="Name"
          placeholder="John Doe"
          value={account.name}
          textGap={30}
        />

        <RadioButton
          name="isActive"
          label="Is Active"
          options={['Active', 'Inactive']}
          selected={account.isActive ? 'Active' : 'Inactive'}
        />

        <LabelInput
          name="email"
          label="Email"
          placeholder="Insira o Texto"
          value={account.email}
          textGap={30}
        />

        <LabelInput
          name="birthDate"
          label="Birth Date"
          type="datetime-local"
          value={toISOLocal(account.birthDate)}
          textGap={30}
        />

        <LabelInput
          name="linkedin"
          label="Linkedin"
          placeholder="Insira o Texto"
          value={account.linkedin ? account.linkedin : ''}
          textGap={30}
        />
        <div class = "flex flex-row justify-center">
          {#if websites.length}
            <Carousel.Root bind:api class="w-full max-w-[550px]">
              <Carousel.Content class="w-full">
                {#each websites as website, index}
                  <Carousel.Item class="w-full">
                    <Card.Root>
                      <Card.Content>
                        <LabelInput
                          name={`label ${index + 1}`}
                          label={`Custom Website ${index + 1} Name`}
                          placeholder="Insira o Texto"
                          bind:value={website.label}
                        />
                        <LabelInput
                          name={`url ${index + 1}`}
                          label={`Custom Website ${index + 1} Url`}
                          placeholder="Insira o Texto"
                          bind:value={website.url}
                          required
                        />
                        <LabelInput
                          name={`icon ${index + 1}`}
                          label={`Custom Website ${index + 1} Icon`}
                          placeholder="Insira o Texto"
                          bind:value={website.iconPath}
                        />
                      </Card.Content>
                    </Card.Root>
                  </Carousel.Item>
                {/each}
              </Carousel.Content>
              <Carousel.Previous class="hidden md:inline-flex" />
              <Carousel.Next class="hidden md:inline-flex" />
            </Carousel.Root>
          {/if}
        </div>

        <div class="flex flex-row justify-start gap-10">
          <Button
            type="button"
            color="secondary"
            hoverColor="secondary"
            width="large"
            text="Add Custom Website"
            
            on:click={addCustomWebsite}
          />
          <Button
            type="button"
            color="secondary"
            hoverColor="secondary"
            width="large"
            text="Remove Custom Website"
            on:click={removeCustomWebsite}
          />
        </div>

        <LabelInput
          name="github"
          label="Github"
          placeholder="Insira o Texto"
          value={account.github ? account.github : ''}
          textGap={30}
        />

        <LabelInput
          name="bio"
          label="Bio"
          placeholder="Insira o Texto"
          isTextArea={true}
          value={account.bio ? account.bio : ''}
          textGap={30}
        />

        {#if form?.errorMessage}
          {#each form.errorMessage as message}
            <p class="mt-2 text-red-500">{message}</p>
          {/each}
        {/if}
        <div class = "flex flex-row md:justify-start justify-center">
          <Button
            type="submit"
            color="primary"
            hoverColor="primary"
            width="large"
            text="Guardar Alterações"
          />
          </div>
      </div>
      <div class="flex flex-row justify-center md:justify-start">
        <div class="order-1 mt-5 flex max-w-[278px] flex-col items-center">
          <PictureInput text="Foto de perfil" name="photo" source={account.photo} />

          <Button color="primary" hoverColor="primary" width="large" text="Alterar Senha" />
        </div>
      </div>
    </form>
  </div>
{/await}
