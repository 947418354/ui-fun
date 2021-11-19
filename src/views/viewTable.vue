<template>
  <div>
    <div>viewTable</div>
    <button @click="onClickUpdate">变更数据</button>
    <div ref="viewTable" style="height: 400px"></div>
  </div>
</template>

<script>
import ViewTable from "view-table";

export default {
  mounted() {
    this.initViewTable();
  },
  methods: {
    resetDeafultOptions() {
      return {
        fixedCol: 1,
      }
    },
    formatterRowData() {},
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
      let fat = this.formatterRowData();
      let cols = this.transferColsData();
      let rows = this.transferRowsData(tableName);

      viewtable.setOpt(opt)
      // viewtable.setFat(fat)
      console.log("cols, rows", cols, rows);
      viewtable.setData(cols, rows);
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