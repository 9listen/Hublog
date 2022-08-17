<template>
  <div class="admin-column">
    <toolBox @headleClick="addColumn" />
    <el-table :data="columnList"
              :stripe="true"
              style="width: 100%">
      <el-table-column label="栏目"
                       width="275">
        <template slot-scope="scope">
          <i class="iconfont icon-duomeiti"
             :style="{ color: '#0099CC' }"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间"
                       width="275">
        <template slot-scope="scope">
          <i class="iconfont icon-shijian"
             :style="{ color: '#009933' }"></i>
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态"
                       width="275">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status"
                     active-color="#13ce66"
                     :inactive-value="0"
                     :active-value="1"
                     @change="changeSwitch(scope.row)"
                     inactive-color="#f4f4f4">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="275">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="columnEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="columnDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加栏目"
               fullscreen
               :visible.sync="dialogFormVisible">
      <el-form class="linkFriends-form"
               :model="cloumnForm">
        <el-form-item label="名称"
                      :label-width="formLabelWidth">
          <el-input v-model="cloumnForm.name"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancellinkFriends()">取 消</el-button>
        <el-button type="primary"
                   @click="headlelinkFriends()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const BASE_URL = 'api/'
import { UPLOADFILE } from '@/apis/client/index'
import {
  GETCOLUMNS,
  CREATECOLUMN,
  SETCOLUMNSTATUS,
  DELETECOLUMN,
  CHANGECOLUMN,
} from '@/apis/admin/index'
import toolBox from '@/components/adminbase/toolBox'
export default {
  name: 'admin-column',
  components: {
    toolBox,
  },
  inject: ['reload'],
  data() {
    return {
      BASE_URL: BASE_URL,
      inputVisible: false,
      inputValue: '',
      dialogFormVisible: false,
      formLabelWidth: '80px',
      isNewColumn: true,
      cloumnForm: {
        PK_linkfriendGuid: '',
        name: '',
        createtime: '',
      },
      columnList: [],
    }
  },
  methods: {
    headlelinkFriends() {
      if (this.isNewColumn) {
        CREATECOLUMN({
          name: this.cloumnForm.name,
        }).then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              duration: 1500,
              message: res.msg,
            })
            this.dialogFormVisible = false
            this.cloumnForm = {
              PK_linkfriendGuid: '',
              name: '',
              createtime: '',
            }
            this.reload()
          } else {
            this.$message({
              type: 'error',
              duration: 1500,
              message: res.msg,
            })
          }
        })
      } else {
        CHANGECOLUMN({
          PK_columnGuid: this.cloumnForm.PK_columnGuid,
          name: this.cloumnForm.name,
        }).then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              duration: 1500,
              message: res.msg,
            })
            this.cloumnForm = {
              PK_columnGuid: '',
              name: '',
              createtime: '',
            }
            this.reload()
            this.dialogFormVisible = false
          } else {
            this.$message({
              type: 'error',
              duration: 1500,
              message: res.msg,
            })
          }
        })
      }
    },
    cancellinkFriends() {
      this.isNewColumn = true
      this.cloumnForm = {
        PK_linkfriendGuid: '',
        name: '',
        createtime: '',
      }
      this.dialogFormVisible = false
    },
    columnEdit(index, row) {
      this.dialogFormVisible = true
      this.isNewColumn = false
      this.cloumnForm = {
        PK_columnGuid: row.PK_columnGuid,
        name: row.name,
        createtime: row.createtime,
      }
    },
    columnDelete(index, row) {
      this.$confirm(
        '此操作不可逆,该栏目文章自动归属到默认栏目, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          DELETECOLUMN({
            PK_columnGuid: row.PK_columnGuid,
          }).then((res) => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                duration: 1500,
                message: res.msg,
              })
              this.reload()
            } else {
              this.$message({
                type: 'error',
                duration: 1500,
                message: res.msg,
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            duration: 1500,
            message: '已取消删除',
          })
        })
    },
    addColumn() {
      this.isNewColumn = true
      this.cloumnForm = {
        PK_linkfriendGuid: '',
        name: '',
        createtime: '',
      }
      this.dialogFormVisible = true
    },
    changeSwitch(val) {
      SETCOLUMNSTATUS({
        PK_columnGuid: val.PK_columnGuid,
        status: val.status,
      }).then((res) => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            duration: 1500,
            message: res.msg,
          })
        } else {
          this.$message({
            type: 'error',
            duration: 1500,
            message: res.msg,
          })
        }
      })
    },
    closeTag(tag) {
      this.cloumnForm.labelkeywords.splice(
        this.cloumnForm.labelkeywords.indexOf(tag)
      )
    },
    showInputAddTag() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    addTagInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.cloumnForm.labelkeywords.push({ key: inputValue })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
  },
  mounted() {
    GETCOLUMNS({
      page: 0,
      limit: 10,
    }).then((res) => {
      if (res.status === 200) {
        this.columnList = res.data.rows
      }
    })
  },
}
</script>
<style lang="scss" scoped>
.admin-column {
  width: 100%;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /deep/ .el-dialog {
    padding: 0 150px;
  }
}
</style>
