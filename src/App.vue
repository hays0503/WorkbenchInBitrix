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
    await initB24Helper($b24, [
      LoadDataType.Profile,
      LoadDataType.App,
      LoadDataType.Currency,
      LoadDataType.AppOptions,
      LoadDataType.UserOptions,
    ]).then((b24Helper)=>{
      console.log('Profile info:', b24Helper.profileInfo)
    })
    // console.log('B24Helper initialized')

    // // Устанавливаем флаг, что B24Helper инициализирован
    // isInitB24Helper.value = true

    // // Теперь можно безопасно использовать getB24Helper()
    // const profileInfo = getB24Helper().profileInfo
    // if (profileInfo) {
    //   console.log('Profile info:', profileInfo)
    // } else {
    //   console.error('Profile information is not available!')
    // }

    // // Используем хук useTasks и передаем объект Bitrix24
    // const { loadTasks } = useTasks($b24)

    // // Загружаем задачи
    // await loadTasks()

    // logger.enable(LoggerType.log)
    // console.log('Bitrix24 Frame initialized')
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
