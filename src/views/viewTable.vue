<template>
  <div>
    <div>viewTable</div>
    <button @click="onClickUpdate">变更数据</button>
    <div ref="viewTable" style="height: 400px"></div>
  </div>
</template>

<script>
import ViewTable from "view-table";
import Vue from 'vue/dist/vue.esm.js'

export default {
  mounted() {
    this.initViewTable();
  },
  methods: {
    resetDeafultOptions() {
      return {
        fixedCol: 1,
        fixedRightCol: 2,
      }
    },
    viewTableFat() {
      return {
        operation() {
          return `<div class="fund-operate-col"><button @click="onClickSee">查看</button></div>`
        }
      }
    },
    _table_special_onCellRendered(e, d) {
      console.log(e, d)
      const vm = this
      let vueEl = $(d.el).find('.fund-operate-col')
      if (vueEl.length > 0) {
        new Vue({
          el: vueEl.get(0),
          data() {
            return {
              row: d.row,
            }
          },
          methods: {
            onClickSee() {
              console.log('see')
            }
          },
        })
      }
    },
    transferColsData() {
      let arr = [{
        name: '固定列头',
        id: 'fixed',
      }];
      for (let index = 0; index < 100; index += 10) {
        const childs = _.times(10, (ele) => {
          return {
            name: index + ele + '',
            id: index + ele + "",
          };
        });
        arr.push({
          name: index + '',
          id: index + "",
          childs,
        });
      }
      arr.push({
        name: '操作',
        id: 'operate',
        fat: 'operation'
      })
      return arr;
    },
    transferRowsData() {
      let arr = [];
      for (let index = 0; index < 100; index++) {
        const obj = {
          fixed: '固定列值'
        };
        for (let index1 = 0; index1 < 100; index1++) {
          obj[index1] = Math.random().toFixed(4);
        }
        arr.push(obj);
      }
      return arr;
    },
    // 绑定table事件
    handleTableEvent: function () {
      let c = 0
      const vm = this
      let viewtable = vm._viewTableInstance_viewTable
      // let events = ["onClick", "onCheckboxClick", "onCheckboxTotalClick", "onHeaderMouseOver", "onCellMouseOver", "onCellRendered", "onHeaderCreated", "onSort", 'onMultiLevelClick']
      let events = ['onCellRendered']
      events.forEach((evt, index) => {
        viewtable.bind(evt, (e, d) => {
          console.log(++c)
          if (vm["_table_special_" + evt]) {
            vm["_table_special_" + evt](e, d)
          }
        })
      })
    },
    initViewTable(tableName) {
      tableName = tableName || "viewTable";
      let $container = $(this.$refs[tableName]);
      if ($container.length === 0) {
        return;
      }
      let viewtable = (this["_viewTableInstance_" + tableName] = new ViewTable(
        $container
      ));
      let opt = this.resetDeafultOptions();
      let fat = this.viewTableFat();
      let cols = this.transferColsData();
      let rows = this.transferRowsData(tableName);

      viewtable.setOpt(opt)
      viewtable.setFat(fat)
      console.log("cols, rows", cols, rows);
      viewtable.setData(cols, rows);
      this.handleTableEvent()
      viewtable.render();
    },
    updateTable(tableName) {
      tableName = tableName || "viewTable";
      let viewtable = this._viewTableInstance_viewTable;
      if (!viewtable) {
        return;
      }
      let cols = this.transferColsData();
      let rows = this.transferRowsData(tableName);
      viewtable.setData(cols, rows);
      viewtable.update();
      // viewtable.unsectAll() // 去掉全选状态
    },
    onClickUpdate() {
      this.updateTable();
    },
  },
};
</script>

<style>
</style>