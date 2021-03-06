export default {
  //  第三方集成authServer的接口
  'AUTH_TO_RSQID': 'idmap/userid2rsqid',
  'AUTH_TO_USERID': 'idmap/rsqid2userid',
  'SEND_TO_CONV': 'msg/sendtoconversation',
  'SEND_TO_CORP_CONV': 'msg/sendasynccorpmessage',
  'SEND_REMIND': 'msg/remind',

  'AVATAR_CDN': 'https://rishiqing-avatar.oss-cn-beijing.aliyuncs.com/',
  'SYS_AVATAR_CDN': 'https://rishiqing-images.oss-cn-beijing.aliyuncs.com/avatar/',
  'CHECK_AUTH': 'task/login/authAjax',
  'POST_LOGIN': 'task/j_spring_security_check',
  'GET_LOGOUT': 'task/j_spring_security_logout',
  'GET_INBOX_TODOS': 'task/mainTodoList/getInboxTodos',
  'POST_SUB_TODO': 'task/v2/subTodo',
  'POST_SUBTODO_PROP': 'task/v2/subTodo',
  'POST_NEW_TODO': 'task/v2/todo',
  'PUT_TODO_PROP': 'task/v2/todo/:id',
  'DELETE_TODO': 'task/v2/todo/:id',
  'DELETE_REPEAT_TODO': 'task/v2/todo/',
  'DELETE_COMMENT_TODO': 'task/v2/todoComment/:id',
  'DELETE_SUB_TODO': 'task/v2/subTodo/:id',
  'GET_TODO': 'task/v2/todo/:id',
  'GET_SCHEDULE_TODOS': 'task/v2/todo/getPeriodTodos',
  'POST_DATES_HAS_TODO': 'task/v2/todo/getDatesHasTodo',
  'POST_DESP': 'task/v2/todo/:id',
  'GET_STAFF_LIST': 'task/rsqCommonUser/getAllCompanyUserList',
  'GET_TODO_TITLE': 'task/rsqTodoTitle/getAllTodoTitleList',
  'POST_TODO_COMMENT': 'task/v2/todoComment',
  'POST_RECORD_COMMENT': 'task/rsqTodoAction/saveTodoAction',
  'GET_FILE_FROM_AlI': 'task/v2/folders/file/getFileFromAli'
}
