<template>
  <div class="admin-project">
    <toolBox @headleClick="addProejct" />
    <el-table :data="projectList"
              :stripe="true"
              style="width: 100%">
      <el-table-column label="项目名称"
                       width="275">
        <template slot-scope="scope">
          <i class="iconfont icon-duomeiti"
             :style="{ color: '#0099CC' }"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址"
                       width="325">
        <template slot-scope="scope">
          <i class="iconfont icon-dingwei"
             :style="{ color: '#009933' }"></i>
          <a :href="scope.row.projectUrl"
             target="_blank">{{
            scope.row.projectUrl
          }}</a>
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
                       width="225">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="projectEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="projectDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加项目"
               fullscreen
               :visible.sync="dialogFormVisible">
      <el-form class="project-form"
               :model="projectForm">
        <el-form-item label="名称"
                      :label-width="formLabelWidth">
          <el-input v-model="projectForm.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址"
                      :label-width="formLabelWidth">
          <el-input v-model="projectForm.projectUrl"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Logo"
                      :label-width="formLabelWidth">
          <div class="logo-wrapper">
            <div class="logo"
                 :style="{
                backgroundImage: 'url(' + BASE_URL + projectForm.logo + ')'
              }"></div>
            <input type="file"
                   name="file"
                   class="file"
                   @change="uploadProejctLogo($event)"
                   id="uploadicon" />
            <el-button type="primary"
                       class="file_btn"
                       size="mini">
              <label for="uploadicon">
                修改<i class="el-icon-upload"> </i> </label></el-button>
          </div>
        </el-form-item>
        <el-form-item label="标签"
                      :label-width="formLabelWidth">
          <el-tag :key="tag.key"
                  v-for="tag in projectForm.labelkeywords"
                  closable
                  :disable-transitions="false"
                  @close="closeTag(tag)">
            {{ tag.key }}
          </el-tag>
          <el-input class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="addTagInputConfirm"
                    @blur="addTagInputConfirm">
          </el-input>
          <el-button v-else
                     class="button-new-tag"
                     size="small"
                     @click="showInputAddTag">添加</el-button>
        </el-form-item>
        <el-form-item label="项目简介"
                      :label-width="formLabelWidth">
          <el-input type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="projectForm.description">
          </el-input>
        </el-form-item>
        <el-form-item label="项目截图"
                      :label-width="formLabelWidth">
          <div class="project-images">
            <el-upload class="upload-demo"
                       action=""
                       :file-list="projectForm.projectImages"
                       :http-request="uploadProejctFile"
                       list-type="text">
              <el-button size="small"
                         type="primary">上传</el-button>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancelProject()">取 消</el-button>
        <el-button type="primary"
                   @click="headleProject()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const BASE_URL = 'api/'
import { UPLOADFILE } from '@/apis/client/index'

import {
  CHANGEPROJECT,
  DELETEPROJECT,
  CREATEPROJECT,
  GETPROJECTS,
  SETPROJECTSTATUS,
} from '@/apis/admin/index'
import toolBox from '@/components/adminbase/toolBox'
export default {
  name: 'admin-project',
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
      isNewProject: true,
      projectForm: {
        PK_projectGuid: '',
        name: '',
        description: '',
        logo: 'default/defaultproject.png',
        labelkeywords: [],
        projectImages: [],
        projectUrl: '',
        status: '',
      },
      projectList: [],
    }
  },
  methods: {
    headleProject() {
      if (this.isNewProject) {
        CREATEPROJECT(this.projectForm).then((res) => {
          if (res.status === 200) {
            this.$message({
              duration: 1500,
              type: 'success',
              message: res.msg,
            })
            this.projectForm = {
              PK_projectGuid: '',
              name: '',
              description: '',
              logo: 'default/defaultproject.png',
              labelkeywords: [],
              projectImages: [],
              projectUrl: '',
              status: '',
            }
            this.reload()
            this.dialogFormVisible = false
          } else {
            this.$message({
              duration: 1500,
              type: 'error',
              message: res.msg,
            })
          }
        })
      } else {
        CHANGEPROJECT({
          PK_projectGuid: this.projectForm.PK_projectGuid,
          name: this.projectForm.name,
          description: this.projectForm.description,
          logo: this.projectForm.logo,
          labelkeywords: this.projectForm.labelkeywords,
          projectImages: this.projectForm.projectImages,
          projectUrl: this.projectForm.projectUrl,
        }).then((res) => {
          if (res.status === 200) {
            this.$message({
              duration: 1500,
              type: 'success',
              message: res.msg,
            })
            this.projectForm = {
              PK_projectGuid: '',
              name: '',
              description: '',
              logo: 'default/defaultproject.png',
              labelkeywords: [],
              projectImages: [],
              projectUrl: '',
              status: '',
            }
            this.reload()
            this.dialogFormVisible = false
          } else {
            this.$message({
              duration: 1500,
              type: 'error',
              message: res.msg,
            })
          }
        })
      }
    },
    cancelProject() {
      this.isNewProject = true
      this.projectForm = {
        PK_projectGuid: '',
        name: '',
        description: '',
        logo: 'default/defaultproject.png',
        labelkeywords: [],
        projectImages: [],
        projectUrl: '',
        status: '',
      }
      this.dialogFormVisible = false
    },
    projectEdit(index, row) {
      this.dialogFormVisible = true
      this.isNewProject = false
      this.projectForm = {
        PK_projectGuid: row.PK_projectGuid,
        name: row.name,
        description: row.description,
        logo: row.logo,
        labelkeywords: row.labelkeywords,
        projectImages: row.projectImages,
        projectUrl: row.projectUrl,
        status: row.status,
      }
    },
    projectDelete(index, row) {
      this.$confirm('此操作不可逆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          DELETEPROJECT({
            PK_projectGuid: row.PK_projectGuid,
          }).then((res) => {
            if (res.status === 200) {
              this.$message({
                duration: 1500,
                type: 'success',
                message: res.msg,
              })
            } else {
              this.$message({
                duration: 1500,
                type: 'error',
                message: res.msg,
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            duration: 1500,
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    addProejct() {
      this.isNewProject = true
      this.projectForm = {
        PK_projectGuid: '',
        name: '',
        description: '',
        logo: 'default/defaultproject.png',
        labelkeywords: [],
        projectImages: [],
        projectUrl: '',
        status: '',
      }
      this.dialogFormVisible = true
    },
    changeSwitch(val) {
      SETPROJECTSTATUS({
        PK_projectGuid: val.PK_projectGuid,
        status: val.status,
      }).then((res) => {
        if (res.status === 200) {
          this.$message({
            duration: 1500,
            type: 'success',
            message: res.msg,
          })
        } else {
          this.$message({
            duration: 1500,
            type: 'error',
            message: res.msg,
          })
        }
      })
    },
    closeTag(tag) {
      this.projectForm.labelkeywords.splice(
        this.projectForm.labelkeywords.indexOf(tag)
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
        this.projectForm.labelkeywords.push({ key: inputValue })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    uploadProejctFile(e) {
      let formData = new FormData()
      formData.append('file', e.file)
      UPLOADFILE(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        this.projectForm.projectImages.push({
          name: res.data.name,
          url: res.data.url,
        })
      })
    },
    uploadProejctLogo(e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      UPLOADFILE(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        this.projectForm.logo = res.data.url
      })
    },
  },
  mounted() {
    GETPROJECTS({
      page: 0,
      limit: 10,
    }).then((res) => {
      if (res.status === 200) {
        this.projectList = res.data.rows
      }
    })
  },
}
</script>
<style lang="scss" scoped>
.admin-project {
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
.project-form {
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
    background-repeat: no-repeat;
    background-size: cover;
  }
}
.project-images {
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
