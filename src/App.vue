<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { initializeB24Frame, B24Frame } from '@bitrix24/b24jssdk'
import { useB24Helper, LoadDataType } from '@bitrix24/b24jssdk'
import { LoggerBrowser, LoggerType } from '@bitrix24/b24jssdk'
import type { TypeUser } from '@bitrix24/b24jssdk'

const { initB24Helper, getB24Helper } = useB24Helper()
let $b24: B24Frame


// Указываем правильный тип для переменной profileInfo
const profileInfo = ref<TypeUser | null>(null)

const logger = LoggerBrowser.build(
  'MyApp',
  import.meta.env?.DEV === true, // or process.env?.NODE_ENV === 'development'
)

onMounted(async () => {
  console.log('Initializing Bitrix24 Frame...')
  try {
    $b24 = await initializeB24Frame()
    await initB24Helper($b24, [LoadDataType.Profile])
    logger.enable(LoggerType.log)
    profileInfo.value = getB24Helper().profileInfo.data
    logger.info(profileInfo.value)
    console.log('Bitrix24 Frame initialized')
  } catch (error) {
    console.error(error)
  }
  console.log('App mounted')
})

onUnmounted(() => {
  $b24?.destroy()
})
</script>

<template>
  <header>
    Тестовое приложение Bitrix24 Frame SDK
  </header>

  <main>
    <span>profileInfo:{{profileInfo}}</span>
  </main>
</template>

<style scoped>

</style>
