<script lang="ts">
    import LabelInput from '@/lib/components/forms/label-input.svelte';
    interface Props{
        label: string;
        name: string;
        isTextArea: boolean;
    }

</script>

 <LabelInput
          label
          name
          horizontal
          isTextArea
          placeholder="Insira o texto"
          className="flex-col md:flex-row"
          textGap="10"
        />