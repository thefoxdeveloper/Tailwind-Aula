<script setup lang="ts">

</script>

<template>
<div class="bg-[#f2f2f2] h-screen w-screen flex justify-center items-center">

  <div class=" w-2/3 h-2/5 rounded-3xl flex flex-row">
  <div class="bg-sky-500 w-3/5 rounded-l-xl flex flex-col justify-center items-center">
    <div class="px-6 py-12 flex flex-col">

      <h1 class="text-3xl font-semibold text-white">Growtwitter</h1>
      <p class="text-xs text-white my-2">Trabalho final do bloco intermediário</p>
      <p class="text-white text-md font-semibold"> O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais que buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um toque único. Seja parte desta comunidade que valoriza a liberdade de expressão, a conexão com pessoas de todo o mundo e a disseminação de ideias. </p>
    </div>
  </div>
    <div class="bg-white w-2/5 rounded-r-xl flex flex-col justify-center ">

      <div class="px-6 py-12 flex flex-col">
        <h1 class="text-2xl font-semibold text-black">Entrar no Growtwitter</h1>
      <form class="flex flex-col mt-2">

        <label for="username" class="text-sm font-semibold text-gray-500">Username</label>
        <input type="text" id="username" placeholder="" class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" />
        <label for="password" class="text-sm font-semibold text-gray-500">Password</label>
        <input type="password" id="password" placeholder="" class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" />

        <button class="bg-sky-500 text-white font-semibold p-1 rounded-md my-2">Entrar</button>
      </form>
      </div>
    </div>
  </div>
</div>
</template>

