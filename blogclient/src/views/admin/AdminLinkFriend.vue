<template>
  <div class="admin-link-friends">
    <toolBox @headleClick='addLinkFriends()' />
    <el-table :data="linkFriendsList"
              :stripe='true'
              style="width: 100%">
      <el-table-column label="村子名"
                       width="220">
        <template slot-scope="scope">
          <i class="iconfont icon-shouye"
             :style="{'color':'#0099CC'}"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址"
                       width="220">
        <template slot-scope="scope">
          <i class="iconfont icon-dingwei"
             :style="{'color':'#009933'}"></i>
          <a :href="scope.row.url"
             target='_blank'>{{ scope.row.url }}</a>
        </template>
      </el-table-column>
      <el-table-column label="热度"
                       width="220">
        <template slot-scope="scope">
          <i class="iconfont icon-hot"
             :style="{'color':'#FF0033'}"></i>
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态"
                       width="220">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status"
                     active-color="#13ce66"
                     :inactive-value='0'
                     :active-value="1"
                     @change='changeSwitch(scope.row)'
                     inactive-color="#f4f4f4">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="220">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="linkFriendsEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="linkFriendsDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加村子"
               fullscreen
               :visible.sync="dialogFormVisible">
      <el-form class="linkFriends-form"
               :model="linkFriendsForm">
        <el-form-item label="名称"
                      :label-width="formLabelWidth">
          <el-input v-model="linkFriendsForm.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址"
                      :label-width="formLabelWidth">
          <el-input v-model="linkFriendsForm.url"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="热度"
                      :label-width="formLabelWidth">
          <el-input v-model="linkFriendsForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="Logo"
                      :label-width="formLabelWidth">
          <div class="logo-wrapper">
            <div class="logo"
                 :style="{'backgroundImage':'url('+linkFriendsForm.logo+')'}">
            </div>
            <el-button type="primary"
                       @click="changeLinkFriendUrl()"
                       size='mini'>编辑</el-button>
          </div>
        </el-form-item>
        <el-form-item label="村子描述"
                      :label-width="formLabelWidth">
          <el-input type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="linkFriendsForm.description">
          </el-input>
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
import { UPLOADFILE, CREATELINKFRIEND } from '@/apis/client/index'
import {
  GETLINKFRIENDS,
  SETLINKFRIENDSTATUS,
  CHANGELINKFRIEND,
  DELETELINKFRIEND,
} from '@/apis/admin/index'
import toolBox from '@/components/adminbase/toolBox'
export default {
  name: 'admin-link-friends',
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
      isNewlinkFriends: true,
      linkFriendsForm: {
        PK_linkfriendGuid: '',
        name: '',
        sort: 0,
        description: '',
        logo: 'http://blog.xkongkeji.com/static/images/favicon.png',
        createtime: '',
        url: '',
        status: '',
      },
      linkFriendsList: [],
    }
  },
  methods: {
    headlelinkFriends() {
      if (this.isNewlinkFriends) {
        CREATELINKFRIEND({
          name: this.linkFriendsForm.name,
          url: this.linkFriendsForm.url,
          description: this.linkFriendsForm.description,
          logo: this.linkFriendsForm.logo,
          sort: this.linkFriendsForm.sort,
        }).then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              duration: 1500,
              message: res.msg,
            })
            this.dialogFormVisible = false
            this.linkFriendsForm = {
              PK_linkfriendGuid: '',
              name: '',
              description: '',
              logo: 'http://blog.xkongkeji.com/static/images/favicon.png',
              createtime: '',
              url: '',
              status: '',
              sort: 0,
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
        CHANGELINKFRIEND({
          PK_linkfriendGuid: this.linkFriendsForm.PK_linkfriendGuid,
          name: this.linkFriendsForm.name,
          description: this.linkFriendsForm.description,
          url: this.linkFriendsForm.url,
          logo: this.linkFriendsForm.logo,
          sort: this.linkFriendsForm.sort,
        }).then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              duration: 1500,
              message: res.msg,
            })
            this.linkFriendsForm = {
              PK_linkfriendGuid: '',
              name: '',
              description: '',
              logo: 'http://blog.xkongkeji.com/static/images/favicon.png',
              createtime: '',
              url: '',
              status: '',
              sort: 0,
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
      this.isNewlinkFriends = true
      this.linkFriendsForm = {
        PK_linkfriendGuid: '',
        name: '',
        sort: 0,
        description: '',
        logo: 'http://blog.xkongkeji.com/static/images/favicon.png',
        createtime: '',
        url: '',
        status: '',
      }
      this.dialogFormVisible = false
    },
    changeLinkFriendUrl() {
      this.$prompt('请输入网址', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/,
        inputErrorMessage: '网址格式不正确',
      }).then(({ value }) => {
        this.linkFriendsForm.logo = value
      })
    },
    linkFriendsEdit(index, row) {
      this.dialogFormVisible = true
      this.isNewlinkFriends = false
      this.linkFriendsForm = {
        PK_linkfriendGuid: row.PK_linkfriendGuid,
        name: row.name,
        description: row.description,
        logo: row.logo,
        sort: row.sort,
        createtime: row.createtime,
        url: row.url,
        status: row.status,
      }
    },
    linkFriendsDelete(index, row) {
      this.$confirm('此操作不可逆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          DELETELINKFRIEND({
            PK_linkfriendGuid: row.PK_linkfriendGuid,
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
    addLinkFriends() {
      this.isNewlinkFriends = true
      this.linkFriendsForm = {
        PK_linkfriendGuid: '',
        name: '',
        sort: 0,
        description: '',
        logo: 'http://blog.xkongkeji.com/static/images/favicon.png',
        createtime: '',
        url: '',
        status: '',
      }
      this.dialogFormVisible = true
    },
    changeSwitch(val) {
      SETLINKFRIENDSTATUS({
        PK_linkfriendGuid: val.PK_linkfriendGuid,
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
      this.linkFriendsForm.labelkeywords.splice(
        this.linkFriendsForm.labelkeywords.indexOf(tag)
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
        this.linkFriendsForm.labelkeywords.push({ key: inputValue })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
  },
  mounted() {
    GETLINKFRIENDS({
      page: 0,
      limit: 10,
    }).then((res) => {
      if (res.status === 200) {
        this.linkFriendsList = res.data.rows
      }
    })
  },
}
</script>
<style lang="scss" scoped>
.admin-link-friends {
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
.file_btn label {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.file {
  width: 0;
  height: 0;
  opacity: 0;
}
.linkFriends-form {
  width: 900px;
  margin: 0 auto;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.logo-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
.linkFriends-images {
  width: 100%;
  .image {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('./../../../static/images/bg1.jpg');
  }
}
</style>