<template>
  <div class="cal-bar" :style="{'left': barOffsetStyle}">
    <table class="cal-table">
      <tr>
        <td class="cal-weekday"
            v-for="day in days"
            :key="day.date.getTime()"
            >
          <div class="cal-day-tag" :class="{'tag-active': day.showTag&&!isHighLight(day.date)}"></div>
          <div class="cal-day" @tap="calDayClick(day.date)"
                   :class="{'cal-day--focus': isHighLight(day.date)}">
            {{dateText(day)}}
          </div>
        </td>
        <!--<td><i class="icon2-arrow-right-small arrow"></i></td>-->
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }, // 为社么只显示一周的数据  不是三周的数据吗
    props: {
      days: Array,
      barIndex: Number,
      highlightDay: Date,
      todayValue: Number
    },
    computed: {
      barOffsetStyle () {
        return (this.barIndex * 100) + '%'
      }
    },
    components: {},
    methods: {
      dateText (day) {
        //  如果是当天，则显示“今”这个字
        return this.todayValue === day.date.getTime() ? '今' : day.date.getDate()
      },
      isHighLight (date) {
        return this.highlightDay != null && date.getTime() === this.highlightDay.getTime()
      },
      calDayClick (date) {
        if (date.getTime() !== this.highlightDay.getTime()) {
          this.$emit('click-cal-bar-day', date)
        }
      }
    },
    mounted () {
//      console.log('传过来的days是' + JSON.stringify(this.days) + 'index是' + this.barIndex) // 这个循环执行了3次
    }
  }
</script>
<style lang="scss" scope>
  .arrow{
    font-size: 12px;
  }
  .cal-bar {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;display: inline-block;
  }
  .cal-table {
    border-collapse: collapse;
    text-align: center;
    border-spacing: 0;
    table-layout: fixed;
    width: 100%;
    height: 100%;
  }
  .cal-weekday {
    position:relative;
    font-family: PingFangSC-Medium;
    font-size: 11px;
    color: #FFFFFF;
    line-height: 12px;
  }
  .cal-day-tag {position:absolute;top:5px;right: 0.66rem;border-radius:50%;}
  .tag-active {width:4px;height:4px;background:#30FFA8;}
  .cal-day {
    margin:0 auto;
    width:30px;
    height:30px;
    line-height:30px;
    font-family: PingFangSC-Medium;
    font-size: 15px;
    color: #FFFFFF;
  }
  .cal-day--focus {
    background:white;
    color:#479AEF;
    border-radius: 50%;
    font-size: 17px;
  }
</style>
