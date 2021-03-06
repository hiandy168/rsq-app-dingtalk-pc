import util from 'ut/jsUtil'

/**
 * mutation命名规则：
 * 模块前缀_主要操作实体_操作动作
 * 1、模块前缀：
 * SYS：系统级别，例如当前用户、团队用户等
 * INB：inbox收纳箱
 * SCH：schedule日程
 * TD：收纳箱和日程的公共模块
 * PLN：Plan计划（看板）
 * DOC：笔记
 * ME：个人相关
 * 2、操作实体，常用的有：
 * USR：用户
 * STF：员工
 * TODO：任务，包括了收纳箱、日程、计划任务
 * KB：计划看板
 * KBCARD：看板卡片
 * DSET：文集doc set
 * NOTE：笔记
 * LST：各种列表
 * 3、操作动作
 * CREATED
 * UPDATED
 * DELETED
 * GET
 * SET
 * READY
 * CACHED
 */
export default {
  /**
   * 是否显示引导弹窗
   * @param state
   * @param p
   * @constructor
   */
  SYS_GUIDE_SHOW (state, p) {
    var show = p ? p.isShow : true
    state.env.isShowGuide = show
  },
  /**
   * 登录后设置全局loginUser
   * @param state
   * @param p
   * @param p.user
   * @constructor
   */
  SYS_USR_LOGIN (state, p) {
    state.loginUser = p.user
  },
  /**
   * 注销后将全局loginUser置为null
   * @param state
   * @constructor
   */
  SYS_USR_LOGOUT (state) {
    state.loginUser = null
  },
  /**
   *
   * @param state
   * @param p
   * @param p.list
   * @constructor
   */
  SYS_STF_LST_READY (state, p) {
    state.staff.list = p.list
  },
  /**
   * 以openid作为key值进行缓存
   * @param state
   * @param p
   * @param p.key
   * @param p.value
   * @constructor
   */
  SYS_OPENID_CACHED (state, p) {
    state.openidCache[p.key] = p.value
  },
  /**
   * 以rsqid作为key值进行缓存
   * @param state
   * @param p
   * @param p.key
   * @param p.value
   * @constructor
   */
  SYS_RSQID_CACHED (state, p) {
    state.rsqidCache[p.key] = p.value
  },
  /**
   * 设置是否显示导航
   * @param state
   * @param p
   * @param p.isShow
   * @constructor
   */
  SYS_NAV_SHOW (state, p) {
    state.env.isShowNav = p.isShow
  },

  /* ----------------inbox----------------- */
  /**
   *
   * @param state
   * @param p
   * @constructor
   */
  INB_TODO_READY (state, p) {
    state.inbox.items = p.items
  },
  /**
   *
   * @param state
   * @param p
   * @param p.item
   * @constructor
   */
  CHILDTASK_TODO_CREATED (state, p) {
    state.todo.currentTodo.subTodos.unshift(p.item)
  },
  INB_TODO_CREATED (state, p) {
    if (!state.inbox.items) {
      state.inbox.items = []
    }
    state.inbox.items.unshift(p.item)
  },
  /* --------------------------------- */

  /* ----------------schedule----------------- */
  /**
   * 指定日期的todo成功获取到
   * @param state
   * @param p
   * @param p.strCurrentDate
   * @param p.items
   * @constructor
   */
  SCH_TODO_READY (state, p) {
    state.schedule.strCurrentDate = p.strCurrentDate
    state.schedule.items = p.items
  },
  /**
   * 缓存todo
   * @param state
   * @param p
   * @param p.strCurrentDate
   * @param p.items
   * @constructor
   */
  SCH_TODO_CACHED (state, p) {
    state.dateTodosCache[p.strCurrentDate] = p.items
  },
  /**
   * 清除缓存
   * @param state
   * @param p
   * @param p.strCurrentDate
   * @constructor
   */
  SCH_TODO_CACHE_DELETE (state, p) {
    delete state.dateTodosCache[p.strCurrentDate]
  },
  /**
   * 清除所有缓存
   * @param state
   * @param p
   * @constructor
   */
  SCH_TODO_CACHE_DELETE_ALL (state, p) {
    state.dateTodosCache = {}
  },
  /**
   * 新建todo
   * @param state
   * @param p
   * @param p.list
   * @param p.item
   * @constructor
   */
  SCH_TODO_CREATED (state, p) {
    // console.log('进来mutation了' + JSON.stringify(p.item))
    state.schedule.items.unshift(p.item)
    // if (p.list instanceof Array) {
    //   p.list.unshift(p.item)
    // } else {
    //   state.schedule.items.unshift(p.item)
    // }
  },
  /**
   * 勾选todo
   * @param state
   * @param p
   * @param p.item
   * @param p.status
   * @constructor
   */
  SCH_LIST_TODO_CHECKED (state, p) {
    p.item.pIsDone = p.status
  },
  SCH_LIST_SUBTODO_CHECKED (state, p) {
    console.log('p.item是' + JSON.stringify(p.item))
    p.item.pIsDone = p.status
  },
  /* --------------------------------- */

  /* ---------------todo收纳箱和日程页面的公共数据------------------ */
  /**
   * 设置当前的todo
   * @param state
   * @param p
   * @param p.item
   * @constructor
   */
  TD_CURRENT_TODO_SET (state, p) {
    state.todo.currentTodo = p.item
  },
  TD_CURRENT_TODO_REPEAT_SET (state, p) {
    var i = p.item
    state.todo.currentTodoRepeat = {
      id: i.id,
      pTitle: i.pTitle,
      pNote: i.pNote || null,
      oldPTitle: i.pTitle,
      oldPNote: i.pNote || null,
      oldSubTodos: JSON.parse(JSON.stringify(i.subTodos || [])),
      createTaskDate: 'not set',
      type: 'not set'
    }
    state.todo.isRepeatFieldEdit = false
  },
  TD_CURRENT_TODO_REPEAT_EDITED (state, p) {
    // console.log('进来了')
    p = p || {}
    state.todo.isRepeatFieldEdit = true
    // console.log('p.pTitle')
    if (p.pTitle) {
      state.todo.currentTodoRepeat.pTitle = p.pTitle
    }
    if (p.pNote) {
      state.todo.currentTodoRepeat.pNote = p.pNote
    }
    // console.log('执行完毕')
  },
  /**
   * 更新当前的todo
   * @param state
   * @param p
   * @constructor
   */
  TD_CURRENT_TODO_UPDATE (state, p) {
    util.extendObject(state.todo.currentTodo, p.item)
  },
  /**
   * 获取到todo的detail之后，需要将todo的详情设置到currentTodo上
   * @param state
   * @param p
   * @param p.todo
   * @constructor
   */
  TD_TODO_GET (state, p) {
    util.extendObject(state.todo.currentTodo, p.todo)
  },
  /**
   * 更新todo
   * @param state
   * @param p
   * @param p.todo
   * @constructor
   */
  TD_TODO_UPDATED (state, p) {
    console.log('state.todo.currentTodo是' + JSON.stringify(state.todo.currentTodo))
    // console.log('p.todo是' + JSON.stringify(p.todo))
    util.extendObject(state.todo.currentTodo, p.todo) // 直接改标题不行吗
    console.log('state.todo.currentTodo之后是' + JSON.stringify(state.todo.currentTodo))
  },
  TD_SUBTODO_UPDATED (state, p) {
    let items = state.todo.currentTodo.subTodos
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === p.item.id) {
        util.extendObject(items[i], p.subTodo)
        break
      }
    }
  },
  /**
   * 删除todo
   * @param state
   * @param p
   * @param p.item
   * @constructor
   */
  TD_TODO_DELETED (state, p) {
    let items = p.item.pContainer === 'inbox' ? state.inbox.items : state.schedule.items
    let index = items.indexOf(p.item)
    if (index > -1) {
      items.splice(index, 1)
    }
  },
  TD_COMMENT_DELETE (state, p) {
    let items = state.todo.currentTodo.comments
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === p.item.id) {
        items.splice(i, 1)
        break
      }
    }
  },
  TD_SUBTODO_DELETE  (state, p) {
    let items = state.todo.currentTodo.subTodos
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === p.item.id) {
        items.splice(i, 1)
        break
      }
    }
  },
  /**
   * 缓存日程是否含有todo
   * @param state
   * @param p
   * @param p.daysHasTodo
   * @param p.startDate
   * @param p.endDate
   * @constructor
   */
  TD_DATE_HAS_TD_CACHE (state, p) {
    var daysHasTodo = p.daysHasTodo
    for (var d = p.startDate.getTime(); d <= p.endDate.getTime(); d += 24 * 3600 * 1000) {
      state.dayHasTodoCache[String(d)] = daysHasTodo.indexOf(d) !== -1
    }
  },
  /**
   * 清除日程是否含有todo
   * @param state
   * @param p
   * @param p.numDate
   * @constructor
   */
  TD_DATE_HAS_TD_CACHE_DELETE (state, p) {
    delete state.dayHasTodoCache[p.numDate]
  },
  /**
   * 清除所有日程是否含有todo的缓存
   * @param state
   * @param p
   * @constructor
   */
  TD_DATE_HAS_TD_CACHE_DELETE_ALL (state, p) {
    state.dayHasTodoCache = {}
  },
  /**
   * 新建评论
   * @param state
   * @param p
   * @constructor
   */
  TD_COMMENT_CREATED (state, p) {
    state.todo.currentTodo.comments.push(p.comment)
  },
  /**
   * 重置用于提醒的时间model
   * @param state
   * @param p
   * @param p.todo  p.todo存在，则说明是编辑任务时设置的提醒
   * @constructor
   */
  PUB_TODO_TIME_SET (state, p) {
    state.pub.currentTodoTime = p.data
  },
  PUB_TODO_TIME_UPDATE (state, p) {
    util.extendObject(state.pub.currentTodoTime, p.data)
  },
  PUB_TODO_TIME_DELETE (state, p) {
    state.pub.currentTodoTime = {}
  },
  PUB_TODO_TIME_CLOCK_UPDATE (state, p) {
    util.extendObject(state.pub.currentTodoTime.clock, p.data)
  },
  PUB_TODO_DATE_SET (state, p) {
    state.pub.currentTodoDate = p.data
  },
  PUB_TODO_DATE_UPDATE (state, p) {
    if (!state.pub.currentTodoDate) {
      state.pub.currentTodoDate = {}
    }
    util.extendObject(state.pub.currentTodoDate, p.data)
  },
  PUB_TODO_DATE_DELETE (state, p) {
    state.pub.currentTodoDate = null
  },
  TD_DESP_CREATED (state, p) {
    state.todo.currentTodo.pNote = p.desp.pNote
  },
  REPLY_COMMENT_CREATED (state, p) {
    state.replyId = p.item.authorId
    state.replyName = p.item.authorName
  },
  CHANGE_SCHE_TITLE (state, p) {
    var titleArray = state.schedule.titleArray
    // console.log(p.title)
    for (var i = 0; i < titleArray.length; i++) {
      if (titleArray[i][p.name]) {
        // console.log('进来了')
        titleArray[i][p.name] = p.title
      }
    }
    // console.log('改变之后的ｔｉｔｌｅａｒｒａｙ' + JSON.stringify(titleArray))
  },
  CHANGE_PRIORITY (state, p) {
    state.todo.currentTodo.pContainer = p.pContainer
  },
  PUB_SCHE_DATE_UPDATE (state, p) {
    state.pub.year = p.year
    state.pub.month = p.month
  }
}
