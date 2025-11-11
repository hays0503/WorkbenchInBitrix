<script setup lang="ts">
import { onMounted } from 'vue'
import { initializeB24Frame, B24Frame, useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'


let $b24: B24Frame
// Деструктурируем методы из useB24Helper
const { initB24Helper} = useB24Helper()


onMounted(async () => {
  console.log('Initializing Bitrix24 Frame...')
  try {
    // Инициализация Bitrix24 Frame
    $b24 = await initializeB24Frame()

    // Инициализация B24Helper, ждем завершения
    await initB24Helper($b24).then((b24Helper)=>{
      console.log('Profile info:', b24Helper.profileInfo)
    })
  } catch (error) {
    console.error('Error initializing Bitrix24:', error)
  }
  console.log('App mounted')
})
</script>

<template>
  <header>Список моих задач</header>

  <main>
    <!--<div v-if="tasks.length > 0">
      <h2>Мои задачи:</h2>
       <ul>
        <li v-for="task in tasks" :key="task.id">
          <p><strong>{{ task.title }}</strong></p>
          <p>{{ task.description }}</p>
          <p><small>{{ task.createdDate }}</small></p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Задачи не найдены.</p>
    </div> -->
  </main>
</template>

<style scoped>
/* Добавьте стили по вашему желанию */
</style>
