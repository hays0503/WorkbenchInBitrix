/* eslint-disable @typescript-eslint/no-explicit-any */

// useTasks.ts
import { ref } from 'vue'
import { AjaxResult, B24Frame } from '@bitrix24/b24jssdk'
import { useB24Helper } from '@bitrix24/b24jssdk'

export const useTasks = (b24: B24Frame) => {
  const { getB24Helper } = useB24Helper()
  const tasks = ref<Task[]>([])

  const loadTasks = async () => {
    try {
      const currentUserId = getB24Helper().profileInfo.data.id // Получаем ID текущего пользователя
      const result = (await b24.callMethod('tasks.task.list', {
        filter: { RESPONSIBLE_ID: currentUserId }, // Фильтруем задачи по ответственному
      })) as AjaxResult<TaskListResults>
      console.log('Tasks loaded:', result)
    } catch (error) {
      console.error('Error loading tasks:', error)
    }
  }

  return {
    tasks,
    loadTasks,
  }
}

export interface TaskListResults {
  result: Result
  total: number
  time: Time
}

export interface Result {
  tasks: Task[]
}

export interface Task {
  id: string
  title: string
  description: string
  deadline: Date
  createdDate: Date
  responsibleId: string
  priority: string
  mark: string
  descriptionInBbcode: string
  lengthDeadline: string
  status: string
  auditors: string[]
  accomplices: any[]
  group: any[]
  responsible: Responsible
  accomplicesData: any[]
  auditorsData: { [key: string]: Responsible }
  taskRequireResult: string
  taskHasOpenResult: string
  taskHasResult: string
  timeElapsed: null
  timerIsRunningForCurrentUser: string
  parsedDescription: string
  counter: Counter
  tags: Tags
  subStatus: string
}

export interface Responsible {
  id: string
  name: string
  link: string
  icon: string
  workPosition: string
}

export interface Counter {
  counters: Counters
  color: string
  value: number
}

export interface Counters {
  expired: number
  newComments: number
  projectExpired: number
  projectNewComments: number
  mutedExpired: number
  mutedNewComments: number
}

export interface Tags {
  [key: string]: Tag
}

export interface Tag {
  id: number
  title: string
}

export interface Time {
  start: number
  finish: number
  duration: number
  processing: number
  date_start: Date
  date_finish: Date
  operating_reset_at: number
  operating: number
}
