<script lang="ts">
  import NiLogo from '@/images/ni_negative_logo.svelte';
</script>

<div
  class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-200"
>
  <div class="custom-scaler">
    <div class="custom-spinner">
      <NiLogo class="block h-20 w-20" />
    </div>
  </div>
</div>

<style>
  .custom-scaler {
    will-change: transform;
    animation: scale-up-down 4s infinite ease-in-out;
  }

  @keyframes scale-up-down {
    0%,
    100% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.2);
    }
  }

  .custom-spinner {
    will-change: transform;
    animation: full-spin 2s infinite ease-in-out;
  }

  @keyframes full-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .custom-scaler,
    .custom-spinner {
      animation: none;
    }
  }
</style>
