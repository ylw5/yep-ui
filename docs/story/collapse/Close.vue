<script setup lang="ts">
async function accept(close) {
  setTimeout(() => {
    close()
  }, 1000)
}
</script>

<template>
  <Collapse.Root>
    <Collapse.Trigger class="w-full b-b b-solid b-border p-1 btn btn-text">
      为什么学习前端：
    </Collapse.Trigger>
    <Collapse.Panel v-slot="{ close }">
      <li>高需求：前端开发是当今IT行业中最热门的职业之一。随着越来越多的公司转向数字化，他们需要专业的前端开发人员来开发和维护他们的网站和应用程序。因此，前端开发人员的需求量非常高。</li>
      <li>薪资高：随着前端开发需求的增加，前端开发人员的薪资也不断上涨。许多公司愿意为经验丰富、技能熟练的前端开发人员提供高薪。</li>
      <li>转行门槛低：相比其他行业，学习前端开发的门槛较低。无论你是想学习一个新的技能，还是想转行进入IT行业，学习前端开发都是一个不错的选择。</li>
      <li>创造力：前端开发人员可以通过设计和构建美观、富有交互性的用户界面，来创造出真正的价值。这可以激发创造力，并让你感到自豪。</li>
      <li>前途广阔：学习前端开发可以为你打开许多职业发展机会。一旦你掌握了这项技能，你可以在许多不同的行业找到工作，包括技术、金融、医疗等。</li>
      <p class="text-right text-gray-400">
        （来自GPT）
      </p>
      <div class="text-center mt-2">
        <button class="btn btn-primary" @click="accept(close)">
          成功了浪费你一分钟的生命，关闭它还可以浪费一秒
        </button>
      </div>
    </Collapse.Panel>
  </Collapse.Root>
</template>
