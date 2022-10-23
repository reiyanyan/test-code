<template>
  <div>
    <header class="bg-primary">
      <div class="container py-5">
        <p class="font-semibold text-white text-xl" data-cy="header-title">To Do List App</p>
      </div>
    </header>
    <div class="bg-background h-screen w-screen" data-cy="header-background">
      <slot />
    </div>
  </div>
</template>
