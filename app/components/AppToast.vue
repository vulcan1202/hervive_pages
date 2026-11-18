<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toasts, remove } = useToast()
</script>

<template>
  <div class="fixed top-5 left-1/2 -translate-x-1/2 z-[10000] flex flex-col items-center gap-2.5 pointer-events-none w-full max-w-md px-4">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-[0_16px_36px_-6px_rgba(21,67,55,0.18)] border backdrop-blur-2xl transition-all duration-300 max-w-full"
        :class="[
          toast.type === 'error'
            ? 'bg-[#FDF6F6]/95 border-red-300 text-red-900'
            : toast.type === 'success'
              ? 'bg-[#F5FAF8]/95 border-[#154337]/30 text-[#154337]'
              : 'bg-white/95 border-[#C5A880]/40 text-[#154337]'
        ]"
      >
        <span
          class="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white shadow-xs"
          :class="[
            toast.type === 'error'
              ? 'bg-red-500'
              : toast.type === 'success'
                ? 'bg-[#154337]'
                : 'bg-[#C5A880]'
          ]"
        >
          <Icon
            :name="
              toast.type === 'error'
                ? 'mdi:alert-circle-outline'
                : toast.type === 'success'
                  ? 'mdi:check-circle-outline'
                  : 'mdi:information-outline'
            "
            size="15"
          />
        </span>

        <span class="text-xs sm:text-sm font-medium tracking-wide flex-1 break-words">
          {{ toast.message }}
        </span>

        <button
          @click="remove(toast.id)"
          class="p-1 text-gray-400 hover:text-gray-700 transition-colors rounded-full focus:outline-none"
          aria-label="關閉通知"
        >
          <Icon name="mdi:close" size="14" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-16px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}
</style>
