<template>
  <div id="noteEditable" contenteditable="true" class="desp editor-style"
       name="note" rows="5"
       placeholder="添加任务描述..."
       @focus="inputFocus"
       @input="inputChange"
      >
    添加任务描述...
  </div>
</template>
<style>
  .desp{
    font-size: 15px;
  }
</style>
<script>
  export default {
    name: 'desp',
    // 定义数据
    data () {
      return {
        noteChangeTimes: 0,  // 用来标记note变化的次数，只有第一次改变的时候才被watch监控
        DEFAULT_NOTE: this.pNote,
        isBlank: true    // 标记是否为空
      }
    },
    computed: {
      pNote () {
        return this.$store.state.todo.currentTodo.pNote
      }
    }, // 定义事件
    methods: {
      inputFocus () {
        if (this.isBlank) {
          console.log('进来了')
          var noteElement = document.getElementById('noteEditable')
          console.log(noteElement.innerText)
          console.log(noteElement.innerText === '添加任务描述...')
          if (noteElement.innerText === '添加任务描述...') {
            noteElement.innerHTML = ''
          }
          this.isBlank = false
        }
      },
      inputChange () {
        var noteElement = document.getElementById('noteEditable')
        this.newItemNote = noteElement.innerHTML
        // this.$dispatch('text-change', this.newItemNote)
      },
      inputBlur () {
        var noteElement = document.getElementById('noteEditable')
        var inputHTML = noteElement.innerHTML
        this.newItemNote = inputHTML
        this.itemNote = this.newItemNote
        if (inputHTML) {
          this.isBlank = false
        } else {
          this.isBlank = true
          noteElement.innerHTML = this.DEFAULT_NOTE
        }
//        var that = this
        var params = {pNote: this.newItemNote}
        this.$store.dispatch('postdesp', params).then(() => {
//          that.$store.commit('TD_CURRENT_TODO_REPEAT_EDITED', params)
        })
      }
//      blur (value) {
//        // 向服务器发送请求
//        console.log(value)
//      }
    },
    watch: {
      'itemNote': function (newValue) {
        if (typeof newValue === 'undefined') {
          return
        }
        if (this.noteChangeTimes === 0 && newValue) {
          this.noteChangeTimes += 1
          var noteElement = document.getElementById('noteEditable')
          this.newItemNote = newValue
          noteElement.innerHTML = newValue
          this.isBlank = false
        }
      }
    },
    mounted () {
      var noteElement = document.getElementById('noteEditable')
      if (this.pNote) {
        noteElement.innerHTML = this.pNote
      }
    }
  }
</script>

