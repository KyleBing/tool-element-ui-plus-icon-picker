<template>
    <div id="app">
        <div class="header">
            <div class="search-bar">
                <input ref="refInput" placeholder="class 关键字" type="text" v-model="searchWord">
                <span class="tip">点击图标，复制组件 icon 名到剪贴板</span>
                <a class="tip" target="_blank" href="https://kylebing.cn/tools/icons"> -> 旧版 Element 图标</a>
            </div>

            <div class="switch-bar">
                <div class="switch" >
                    <input type="radio" >
                    <label>
                        <p>ElementUiPlus ICONS</p>
                        <span class="badge">{{iconNameList.length}}</span>
                    </label>
                </div>
            </div>
        </div>

        <div class="icon-container">
            <div :data-clipboard-text="item.clipText"
                 class="icon-item"
                 v-for="item in iconsShowing"
                 :key="item.name"
            >
                <el-icon>
                    <component :is="item.name"/>
                </el-icon>
                <p>{{ item.name }}</p>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

import {onMounted, onBeforeMount, ref, computed, watch} from "vue";
import {iconNameList} from "./main.ts";
import * as ClipboardJS from 'clipboard'
const refInput = ref()

onBeforeMount(() => {
})

onMounted(() => {
    refInput.value.focus() // focus on input on init
    let clipboard = new ClipboardJS('.icon-item')
    filterIcon()
})

const searchWord = ref(null)
const iconsShowing: IconItem[] = ref()

interface IconItem {
    name: string,
    clipText: string,
    className: string
}

function filterIcon() {
    let filteredIcons
    if (searchWord.value){
        filteredIcons = iconNameList.filter(item => new RegExp(`.*${searchWord.value}.*`,'i').test(item))
    } else {
        filteredIcons = iconNameList
    }
    iconsShowing.value = filteredIcons.map (item => { // 将数组映射成对象数组，
        let prefix = ''
        return <IconItem>{
            name: item, // 名字
            clipText: prefix + item, // 剪贴板的名字
            className: item // 对应的 class 名
        }
    })
}

watch(searchWord, () => {
    filterIcon()
})


</script>

<style lang="scss">
@import "assets/scss/main";
</style>
