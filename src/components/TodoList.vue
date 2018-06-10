<template>
  <div>
    <div class="header">
      <div class="header-item" :class="{ 'active': tab === 'myTasks'}" @click="selectTab('myTasks')">My Tasks</div>
      <div class="header-item" :class="{ 'active': tab === 'inProgress'}" @click="selectTab('inProgress')">In Progress</div>
      <div class="header-item" :class="{ 'active': tab === 'completed'}" @click="selectTab('completed')">Completed</div>
    </div>
    <div class="content">
      <!-- ***ADD-FROM*** -->
      <div :class="['task-add', { 'task-add--open' : add }]">
        <span v-if="!add" class="task-add-text" @click="toggleForm('add', true)">+ Add Task</span>
        <form v-if="add" class="task-form">
          <!-- **HEAD** -->
          <div class="task-form-head" :class="{ 'started': addData.started }">
            <!-- completed checkbox -->
            <label class="task-form-checkbox">
              <span v-show="addData.completed"><i  class="task-form-checkbox--completed fas fa-check-square"></i></span>
              <span v-show="!addData.completed"><i class="task-form-checkbox--uncompleted fas fa-square"></i></span>
              <input v-model="addData.completed" type="checkbox">
            </label>
            <!-- title -->
            <input v-show="!addData.completed" v-model="addData.title" :class="{ 'completed': add.completed }" class="task-form-title" type="text" placeholder="Type Something Here..." :readonly="!add" >
            <span v-show="addData.completed" class="task-form-title completed">{{ addData.title || 'Type Something Here...' }}</span>
            <!-- started checkbox -->
            <label class="task-form-checkbox">
              <span v-show="addData.started"><i  class="task-form-checkbox--started fas fa-star"></i></span>
              <span v-show="!addData.started"><i class="task-form-checkbox--unstarted far fa-star"></i></span>
              <input v-model="addData.started" type="checkbox">
            </label>
            <!-- editing -->
            <span v-show="add" @click="toggleForm('add', false)"><i class="task-form-edit--editing fas fa-pencil-alt"></i></span>
            <span v-show="!add" @click="toggleForm('add', true)"><i class="task-form-edit--unediting fas fa-pencil-alt"></i></span>
          </div>
          <!-- **BODY** -->
          <div class="task-form-body">
            <!-- deadline -->
            <div class="task-form-item">
              <span class="task-form-item-title">
                <i class="far fa-calendar-alt"></i> Deadline
              </span>
              <div class="task-form-item-content">
                <div class="task-form-date">
                  <input v-model="addData.date" type="date">
                  <input v-model="addData.time" type="time">
                </div>
              </div>
            </div>
            <!-- file -->
            <div class="task-form-item">
              <span class="task-form-item-title">
                <i class="far fa-file"></i> File
              </span>
              <div class="task-form-item-content">
                <div class="task-form-file">
                  <div v-if="addData.file.fileName" class="task-form-file-info">
                    {{ `${addData.file.fileName}\n${addData.file.uploadTime}` }}
                  </div>
                  <div class="task-form-file-button">
                    <input type="file" @change="fileUpdate($event, index)">
                    <i class="task-form-file-icon fas fa-plus-square"></i>
                  </div>
                </div>
              </div>
            </div>
            <!-- comment -->
            <div class="task-form-item">
              <span class="task-form-item-title">
                <i class="far fa-comment-dots"></i> Comment
              </span>
              <div class="task-form-item-content">
                <div class="task-form-comment">
                  <textarea v-model="addData.comment" placeholder="Type your memo here..."></textarea>
                </div>
              </div>
            </div>
          </div>
          <!-- **FOOT** -->
          <div class="task-form-foot">
            <div class="task-form-button task-form-button--cancel" @click="toggleForm('add', false)">x Cancel</div>
            <div class="task-form-button task-form-button--add" @click="addTodo">+ Add Task</div>
          </div>
        </form>
      </div>

      <!-- ***EDIT-FROM*** -->
      <div
        v-for="(data, index) in datas"
        :key="index"
        :class="['task', `task-${index}`, { 'task--open' : data.editing, 'preview': edit !== index}]"
        >
        <form class="task-form">
          <!-- **HEAD** -->
          <div class="task-form-head" :class="{ 'started': data.started }">
            <!-- completed checkbox -->
            <label class="task-form-checkbox">
              <span v-show="data.completed"><i class="task-form-checkbox--completed fas fa-check-square"></i></span>
              <span v-show="!data.completed"><i class="task-form-checkbox--uncompleted fas fa-square"></i></span>
              <input @click="toggleCompleted($event, index)" type="checkbox">
              <!-- <input v-model="data.completed" type="checkbox"> -->
            </label>
            <!-- title -->
            <input
              type="text" :class="['task-form-title', { 'completed': add.completed }]" :readonly="edit !== index" v-show="!data.completed" v-model="data.title" placeholder="Type Something Here..." >
            <span v-show="data.completed" class="task-form-title completed">{{ data.title || 'Type Something Here...' }}</span>
            <!-- started checkbox -->
            <label class="task-form-checkbox">
              <span v-show="data.started"><i  class="task-form-checkbox--started fas fa-star"></i></span>
              <span v-show="!data.started"><i class="task-form-checkbox--unstarted far fa-star"></i></span>
              <input @click="toggleStared($event, index)" type="checkbox">
            </label>
            <!-- editing -->
            <span v-show="edit === index" @click="toggleForm(null)"><i class="task-form-edit--editing fas fa-pencil-alt"></i></span>
            <span v-show="edit !== index" @click="toggleForm(index)" ><i class="task-form-edit--unediting fas fa-pencil-alt"></i></span>
          </div>
          <!-- **PREVIEW INFO** -->
          <div v-if="edit !== index && (data.date || data.time || data.file || data.comment)" :class="['preview-info', { 'started': data.started }]">
            <span v-if="data.date || data.time"><i class="far fa-calendar-alt"></i> {{ `${data.date || ''} ${data.time || ''}` }}</span>
            <span v-if="data.file.fileName"><i class="far fa-file"></i></span>
            <span v-if="data.comment"><i class="far fa-comment-dots"></i></span>
          </div>
          <!-- **BODY** -->
          <div v-show="edit === index" class="task-form-body">
            <!-- deadline -->
            <div class="task-form-item">
              <span class="task-form-item-title">
                <i class="far fa-calendar-alt"></i> Deadline
              </span>
              <div class="task-form-item-content">
                <div class="task-form-date">
                  <input v-model="data.date" type="date">
                  <input v-model="data.time" type="time">
                </div>
              </div>
            </div>
            <!-- file -->
            <div class="task-form-item">
              <span class="task-form-item-title">
                <i class="far fa-file"></i> File
              </span>
              <div class="task-form-item-content">
                <div class="task-form-file">
                  <div v-if="data.file.fileName" class="task-form-file-info">
                    {{ `${data.file.fileName}\n${data.file.uploadTime}` }}
                  </div>
                  <div class="task-form-file-button">
                    <input type="file" @change="fileUpdate($event, index)">
                    <i class="task-form-file-icon fas fa-plus-square"></i>
                  </div>
                </div>
              </div>
            </div>
            <!-- comment -->
            <div class="task-form-item">
              <span class="task-form-item-title">
                <i class="far fa-comment-dots"></i> Comment
              </span>
              <div class="task-form-item-content">
                <div class="task-form-comment">
                  <textarea v-model="data.comment" placeholder="Type your memo here..."></textarea>
                </div>
              </div>
            </div>
          </div>
          <!-- **FOOT** -->
          <div v-show="edit === index" class="task-form-foot">
            <div class="task-form-button task-form-button--cancel" @click="cancelEdit(index)">x Cancel</div>
            <div class="task-form-button task-form-button--add" @click="saveEdit(index)">+ Save</div>
          </div>
        </form>
      </div>
      <div class="count">{{ `${datas.length} tasks left` }}</div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'todolist',
  data () {
    const defaultData = {
      editing: false,
      completed: false,
      started: false,
      title: null,
      date: null,
      time: null,
      file: {},
      comment: null
    }
    return {
      defaultData,
      tab: 'myTasks',
      add: false,
      edit: null,
      addData: Object.assign({}, defaultData),
      todoData: []
    }
  },
  mounted () {
    this.todoData = JSON.parse(sessionStorage.getItem('todoData')) || []
  },
  computed: {
    datas () {
      if (this.tab === 'myTasks') {
        return this.todoData
      }
      if (this.tab === 'inProgress') {
        return this.inProgressData
      }
      if (this.tab === 'completed') {
        return this.completedData
      }
    },
    inProgressData () {
      return this.todoData.filter(data => !data.completed)
    },
    completedData () {
      return this.todoData.filter(data => data.completed)
    }
  },
  methods: {
    selectTab (tab) {
      this.tab = tab
    },
    toggleForm (form, state) {
      if (form === 'add') {
        this.add = state
      } else {
        this.edit = form
      }
    },
    toggleCompleted (e, index) {
      this.todoData[index].completed = e.target.checked
    },
    toggleStared (e, index) {
      this.todoData[index].started = e.target.checked
      this.todoData.sort((a, b) => {
        if (a.started > b.started) {
          return -1
        }
        if (a.started < b.started) {
          return 1
        } else {
          return 0
        }
      })
    },
    fileUpdate (e, index) {
      const fileData = {
        fileName: e.target.files[0].name,
        uploadTime: e.target.files[0].lastModifiedDate.toISOString().slice(0, 10)
      }
      if (index === undefined) {
        this.addData.file = Object.assign({}, fileData)
      } else {
        this.todoData[index].file = Object.assign({}, fileData)
      }
    },
    addTodo () {
      this.todoData.push(this.addData)
      this.addData = Object.assign({}, this.defaultData)
      sessionStorage.setItem('todoData', JSON.stringify(this.todoData))
      this.toggleForm('add', false)
    },
    saveEdit (index) {
      sessionStorage.setItem('todoData', JSON.stringify(this.todoData))
      this.toggleForm(null, false)
    },
    cancelEdit (index) {
      const { title, date, time, file, comment } = JSON.parse(sessionStorage.getItem('todoData'))[index]
      this.todoData[index].title = title
      this.todoData[index].date = date
      this.todoData[index].time = time
      this.todoData[index].file = file
      this.todoData[index].comment = comment
      this.toggleForm(null, false)
    }
  }
}
</script>

<style lang="scss">
html,
body {
  min-width: 700px;
  background-color: #e1e1e1;
}
input,
textarea {
  outline-width: 0;
}
.header {
  width: 100%;
  height: 76px;
  background-color: #4a90e2;
  &-item {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 100%;
    color: #00408b;
    font-weight: 500;
    font-size: 24px;
    &:hover {
      color: #ffffff;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease-in-out 0s;
    }
    &:before {
      position: absolute;
      bottom: 0;
      width: 160px;
      height: 5px;
      background-color: #00408b;
      content: '';
      transition: transform 0.25s ease-out;
      transform: scale(0);
    }
    &:hover:before {
      transform: scale(1);
    }
    &.active {
      color: #ffffff;
      font-weight: 600;
      cursor: pointer;
      &:before {
        position: absolute;
        bottom: 0;
        width: 160px;
        height: 5px;
        background-color: #00408b;
        content: '';
        transform: scale(1);
      }
    }
  }
}

.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 24px;
  font-family: Roboto-Regular;
  .count {
    color: #c8c8c8;
    font-style: italic;
  }
  .task {
    display: flex;
    margin-bottom: 8px;
    width: 620px;
    border-radius: 5px;
    text-align: left;
    transform: scale(1);
    &-add {
      margin: 20px 0;
      width: 620px;
      height: 65px;
      border: 2px solid #c8c8c8;
      border-radius: 5px;
      background: #ffffff;
      color: #c8c8c8;
      text-align: left;
      &-text {
        display: flex;
        align-items: center;
        padding-left: 30px;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      &--open {
        height: 100%;
        border-radius: 5px;
        background: #f2f2f2;
        box-shadow: 0 4px 4px 0 #c8c8c8;transition: all 0.25s ease-in-out 0s;
        transform: scale(1.01);
      }
    }
  }
  .preview {
    .task-form {
      box-shadow: none;
      transition: all 0.25s ease-in-out 0s;
      transform: scale(1);
      &-head {
        margin-bottom: 0;
        border-bottom: none;
      }
      &-title {
        cursor: pointer;
      }
    }
    &-info {
      padding-bottom: 16px;
      padding-left: 70px;
      color: #757575;
      text-align: left;
      font-size: 16px;
      span {
        padding-right: 10px;
      }
    }
  }
  .started {
    background-color: #fff2dc;
    input,
    span {
      background-color: #fff2dc;
    }
  }
  .task-form {
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background: #f2f2f2;
    box-shadow: 0 4px 4px 0 #c8c8c8;
    transition: all 0.25s ease-in-out 0s;
    transform: scale(1.01);
    &-head {
      display: flex;
      align-items: center;
      margin-bottom: 23px;
      padding-left: 32px;
      height: 76px;
      border-bottom: solid 2px #c8c8c8;
    }
    &-checkbox {
      cursor: pointer;

      user-select: none;
      &--uncompleted {
        color: #ffffff;
      }
      &--completed {
        color: #4a90e2;
      }
      &--unstarted {
        color: #000000;
      }
      &--started {
        color: #f5a623;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
    }
    &-title {
      margin-right: 30px;
      margin-left: 15px;
      width: 400px;
      border: none;
      background: #f2f2f2;
      font-weight: 700;
      font-size: 24px;
      font-family: Roboto-Medium;
      &::placeholder {
        border-color: #000000;
        color: #000000;
      }
      &.completed {
        margin: 1px 31px 1px 16px;
        color: #9b9b9b;
        text-align: left;
        text-decoration: line-through;
      }
    }
    &-star,
    &-edit {
      color: #000000;
      font-size: 24px;
      cursor: pointer;
    }
    &-edit {
      &--editing,
      &--unediting {
        margin-left: 30px;
        cursor: pointer;
      }
      &--editing {
        color: #4a90e2;
      }
    }
    &-item {
      margin-left: 60px;
      input,
      textarea {
        margin: 0 auto;
        border: none;
        border-radius: 2px;
        font-size: 16px;
      }
      &-title {
        color: #000000;
        font-weight: 500;
        font-size: 20px;
        font-family: Roboto-Medium;
      }
      &-content {
        margin-top: 8px;
        margin-bottom: 25px;
        margin-left: 26px;
      }
    }
    &-date {
      input {
        padding-left: 10px;
        width: 170px;
        height: 35px;
        &::placeholder {
          color: #c8c8c8;
        }
      }
    }
    &-file {
      position: relative;
      display: inline-block;
      overflow: hidden;
      &-button {
        display: inline-block;
      }
      &-icon {
        color: #c8c8c8;
        font-size: 32px;
      }
      &-info {
        display: inline-block;
        white-space: pre-line;
        font-size: 16px;
      }
      input {
        position: absolute;
        right: 0;
        left: 0;
        padding-left: 100%;
        width: 32px;
        height: 32px;
        opacity: 0;
        cursor: pointer;
      }
    }
    &-comment {
      textarea {
        position: relative;
        padding: 16px;
        width: 445px;
        height: 120px;
        resize: none;
        &::placeholder {
          color: #c8c8c8;
        }
      }
    }
    &-foot {
      display: flex;
      height: 60px;
    }
    &-button {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      &--add {
        background-color: #4a90e2;
        color: #ffffff;
      }
      &--cancel {
        background-color: #ffffff;
        color: #d0021b;
      }
    }
  }
}
</style>
