<script setup lang="ts">
import { ref } from 'vue'
const songs = [
  { name: 'Wife No.1', url: 'https://1.vikiplatform.com/pr/14365pr/75f6889021.jpg?x=b&s=590x330&q=h&e=t&f=t&cb=1' },
  { name: 'Wife No.2', url: 'http://image.genie.co.kr/Y/IMAGE/IMG_ARTIST/067/872/918/67872918_1588900211036_19_600x600.JPG' },
  { name: 'Wife No.3', url: 'https://apicms.thestar.com.my/uploads/images/2022/06/09/1616593.jpg' },
  { name: 'Wife No.4', url: 'https://www.sdasrinagar.com/wp-content/uploads/2022/11/IU.jpeg' },
  { name: 'Wife No.5', url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/iu-1663831085.png?crop=0.500xw:1.00xh;0.500xw,0&resize=640:*' },
  { name: 'Wife No.6', url: 'https://www.allkpop.com/upload/2022/09/content/300419/web_data/allkpop_1664527708_20220929-iu.jpg' },

]
const selectedSong = ref(songs[0])
</script>

<template>
  <Select.Root
    v-slot="{ open }"
    v-model="selectedSong"
    class="relative"
  >
    <Select.Trigger
      class="input p-2 h-auto text-left cursor-pointer"
    >
      <div class="flex items-center gap-3">
        <div class="avatar w-10 h-10 rounded-lg overflow-hidden">
          <img :src="selectedSong.url">
        </div>
        <span>{{ selectedSong.name }}</span>
        <span
          class="i-carbon:chevron-down ml-a"
          :class="{
            'i-carbon:chevron-up': open,
          }"
        />
      </div>
    </Select.Trigger>

    <Select.Options
      as="div"
      class="select-options"
    >
      <Select.Option
        v-for="song in songs"
        v-slot="{ selected }"
        :key="song.name"
        :value="song"
        as="div"
        class="select-option data-active:bg-amber-100 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div class="avatar w-10 h-10 rounded-lg overflow-hidden">
            <img :src="song.url">
          </div>
          <span>{{ song.name }}</span>
        </div>
        <span
          v-if="selected"
          class="i-carbon:checkmark-outline"
        />
      </Select.Option>
    </Select.Options>
  </Select.Root>
</template>
