<script setup lang="ts">
import { computed, ref } from 'vue'
import { addDays, format, getDaysInMonth, isSameDay, isToday, subDays } from 'date-fns'
const weekdays = ['一', '二', '三', '四', '五', '六', '日']

interface DateCell {
  text?: number
  isToday?: boolean
  isSelect?: boolean
  isDisabled?: boolean
  date: Date
  isCurrentMonth?: boolean
}

const currentDate = new Date()

const pickDate = ref<Date | null>(null)
const pickYear = ref<number>(currentDate.getFullYear())
const pickMonth = ref<number>(currentDate.getMonth())

const days = computed(() => {
  const firstDateOfMonth = new Date(pickYear.value, pickMonth.value, 1)
  const daysInMonth = getDaysInMonth(firstDateOfMonth)
  const firstDayOfMonth = firstDateOfMonth.getDay()
  return {
    firstDateOfMonth,
    firstDayOfMonth,
    daysInMonth,
  }
})

const tableRows = ref<DateCell[][]>([[], [], [], [], [], []])
// get 6*7 matrix DateCell[][] by year and month
const rows = computed(() => {
  const { firstDateOfMonth, firstDayOfMonth } = days.value

  let numberOfDaysFromPreviousMonth = (firstDayOfMonth || 7) - 1
  if (firstDayOfMonth === 1)
    numberOfDaysFromPreviousMonth += 7
  const minDate = subDays(firstDateOfMonth, numberOfDaysFromPreviousMonth)

  const _row = tableRows.value
  for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columeIndex = 0; columeIndex < 7; columeIndex++) {
      const date = addDays(minDate, rowIndex * 7 + columeIndex)
      const cell: DateCell = {
        text: date.getDate(),
        date,
        isCurrentMonth: date.getMonth() === pickMonth.value,
        isToday: isToday(date),
        isSelect: !!pickDate.value && isSameDay(date, pickDate.value),
      }

      _row[rowIndex][columeIndex] = cell
    }
  }
  return _row
})

function togglePage(yearOffset = 0, monthOffset = 0) {
  pickYear.value += yearOffset
  pickMonth.value += monthOffset
  if (pickMonth.value > 11) {
    pickMonth.value = 0
    pickYear.value += 1
  }
  else if (pickMonth.value < 0) {
    pickMonth.value = 11
    pickYear.value -= 1
  }
}

function selectDate(cell: DateCell) {
  pickDate.value = cell.date
  if (cell.isCurrentMonth)
    return
  if (cell.date.getMonth() > pickMonth.value)
    togglePage(0, 1)
  else
    togglePage(0, -1)
}
</script>

<template>
  {{ pickDate ? format(pickDate, 'yyyy-MM-dd') : '' }}
  <div class="absolute w-60  shadow-lg">
    <!-- picker-body -->
    <div class="">
      <!-- picker header -->
      <div class=" text-center m-2 text-sm">
        <!-- prev button -->
        <div class="float-left text-gray">
          <button
            class="i-carbon:caret-left cursor-pointer"
            @click="togglePage(-1)"
          />
          <button
            class="i-carbon:chevron-left cursor-pointer"
            @click="togglePage(0, -1)"
          />
        </div>
        <span class="text-center p-1">{{ pickYear }}年</span>
        <span class="text-center p-1">{{ pickMonth + 1 }}月</span>
        <!-- next button -->
        <div class="float-right text-gray">
          <button
            class="i-carbon:chevron-right cursor-pointer"
            @click="togglePage(0, 1)"
          />
          <button
            class="i-carbon:caret-right cursor-pointer"
            @click="togglePage(1)"
          />
        </div>
      </div>
      <!-- picker content -->
      <div class="">
        <table class="w-full text-sm select-none">
          <tbody>
            <tr class="border-solid">
              <th
                v-for="(weekday, index) in weekdays"
                :key="index"
                class="font-500"
              >
                {{ weekday }}
              </th>
            </tr>
            <tr
              v-for="(row, index) in rows"
              :key="index"
            >
              <td
                v-for="(cell, index) in row"
                :key="index"
                class="text-center cursor-pointer p-1 duration-100 ease-in-out relative"
                :class="[
                  {
                    'text-blue-400': cell.isToday,
                    'text-gray-800': cell.isCurrentMonth && !cell.isToday,
                    'text-gray-400': !cell.isCurrentMonth,
                    'bg-blue-400 text-white': cell.isSelect,
                    'hover:bg-gray-100': !cell.isSelect,
                  },
                ]"

                @click="selectDate(cell)"
              >
                <span>
                  {{ cell.text }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
