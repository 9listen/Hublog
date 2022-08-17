<template>
  <div class="admin-article">
    <toolBox @headleClick="addArticle" />
    <el-table :data="articleList" :stripe="true" style="width: 100%">
      <el-table-column label="文章名" width="300">
        <template slot-scope="scope">
          <i class="iconfont icon-duomeiti" :style="{ color: '#0099CC' }"></i>
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属栏目" width="200">
        <template slot-scope="scope">
          <i class="iconfont icon-shijian" :style="{ color: '#009933' }"></i>
          <span>{{ scope.row.columnname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否可见" width="200">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            :inactive-value="0"
            :active-value="1"
            @change="changeSwitch(scope.row)"
            inactive-color="#f4f4f4"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="200">
        <template slot-scope="scope">
          <i class="iconfont icon-shijian" :style="{ color: '#009933' }"></i>
          <span>{{ scope.row.lasttime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="articleEdit(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="articleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="文章" fullscreen :visible.sync="dialogFormVisible">
      <div class="menu-article">
        <el-button
          v-if="editorStatus"
          type="primary"
          @click="addArticleAttribute()"
          >发布</el-button
        >
        <el-button v-else type="primary" @click="changeEditorStatus()"
          >编辑</el-button
        >
      </div>
      <mavon-editor
        ref="MavonEditor"
        :toolbars="toolbars"
        :toolbarsFlag="toolbarsFlag"
        :subfield="subfield"
        :editable="editable"
        placeholder="支持markdown语法"
        @imgAdd="imgAdd"
        v-model="articleForm.articleContentMd"
      />
    </el-dialog>
    <el-dialog title="文章属性" top="5vh" :visible.sync="dialogColumnVisible">
      <el-form :model="articleForm">
        <el-form-item label="文章名" :label-width="formLabelWidth">
          <el-input v-model="articleForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属栏目" :label-width="formLabelWidth">
          <el-select v-model="articleForm.articlecolumn">
            <el-option
              v-for="item in columnList"
              :key="item.PK_columnGuid"
              :label="item.name"
              :value="item.PK_columnGuid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth">
          <el-upload
            action=""
            :limit="1"
            :show-file-list="false"
            :http-request="uploadArticleImageCover"
            list-type="picture-card"
          >
            <img
              v-if="articleForm.imagecover"
              alt="avatar"
              v-lazy="BASE_URL + articleForm.imagecover"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-tag
            :key="tag.key"
            v-for="tag in articleForm.labellist"
            closable
            :disable-transitions="false"
            @close="closeTag(tag)"
          >
            {{ tag.key }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="addTagInputConfirm"
            @blur="addTagInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInputAddTag"
            >添加</el-button
          >
        </el-form-item>
        <el-form-item label="文章摘要" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="articleForm.description"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogColumnVisible = false">取 消</el-button>
        <el-button type="primary" @click="publishArticle()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const BASE_URL = "api/";
import toolBox from "@/components/adminbase/toolBox";
import { UPLOADFILE } from "@/apis/client/index";
import {
  GETCOLUMNS,
  GETPAGEARTICLES,
  CREATEARTICLE,
  DELETEARTICLE,
  SETARTICLESTATUS
} from "@/apis/admin/index";
import IsEmptyParameter from "@/utils/verification.js";
export default {
  name: "admin-article",
  components: {
    toolBox
  },
  inject: ["reload"],
  data() {
    return {
      BASE_URL: BASE_URL,
      //编辑器相关配置
      toolbarsFlag: true,
      subfield: true,
      editable: true,
      editorStatus: true,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: false, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      columnList: [],
      inputVisible: false,
      inputValue: "",
      dialogFormVisible: false,
      dialogColumnVisible: false,
      formLabelWidth: "80px",
      articleForm: {
        PK_articleGuid: "",
        title: "",
        articlecolumn: "",
        description: "",
        labellist: [],
        imagecover: "",
        articleContentMd: "",
        articleContentHtml: ""
      },
      articleList: []
    };
  },
  methods: {
    addArticleAttribute() {
      if (this.articleForm.articleContentMd === "") {
        this.$message({
          type: "error",
          duration: 1500,
          message: "写点什么吧"
        });
        return;
      }
      GETCOLUMNS({
        page: 0,
        limit: 10
      }).then(res => {
        if (res.status === 200) {
          this.columnList = res.data.rows;
        }
      });
      this.dialogColumnVisible = true;
    },
    changeEditorStatus() {
      this.toolbarsFlag = true;
      this.subfield = true;
      this.editable = true;
      this.editorStatus = true;
    },
    publishArticle() {
      if (
        !IsEmptyParameter(this.articleForm, [
          "title",
          "articlecolumn",
          "description",
          "articleContentMd"
        ])
      ) {
        this.$message({
          type: "error",
          duration: 1500,
          message: "信息不完善，请检查后发布"
        });
      }
      CREATEARTICLE({
        PK_articleGuid: this.articleForm.PK_articleGuid,
        title: this.articleForm.title,
        description: this.articleForm.description,
        imagecover: this.articleForm.imagecover,
        labellist: this.articleForm.labellist,
        articleContentMd: this.articleForm.articleContentMd,
        articleContentHtml: this.$refs.MavonEditor.d_render, //获取html
        articlecolumn: this.articleForm.articlecolumn
      })
        .then(res => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              duration: 1500,
              message: "文章发布成功"
            });
            this.dialogFormVisible = false;
            this.dialogColumnVisible = false;
            this.reload();
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            duration: 1500,
            message: err.msg
          });
        });
    },
    addArticle() {
      this.toolbarsFlag = true;
      this.subfield = true;
      this.editable = true;
      this.editorStatus = true;
      this.articleForm = {
        PK_articleGuid: "",
        title: "",
        description: "",
        articlecolumn: "",
        labellist: [],
        imagecover: "",
        articleContentMd: "",
        articleContentHtml: ""
      };
      this.dialogFormVisible = true;
    },
    async uploadArticleImageCover(e) {
      let formData = new FormData();
      formData.append("file", e.file);
      let res = await this.uploadImage(formData);
      this.articleForm.imagecover = res.data.url;
    },
    async uploadImage(formData) {
      let res = await UPLOADFILE(formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return res;
    },
    showInputAddTag() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    addTagInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.articleForm.labellist.push({ key: inputValue });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    articleEdit(index, val) {
      this.toolbarsFlag = false;
      this.subfield = false;
      this.editable = false;
      this.editorStatus = false;
      this.articleForm = {
        PK_articleGuid: val.PK_articleGuid,
        title: val.title,
        description: val.description,
        articlecolumn: val.FK_columnGuid,
        labellist: val.labellist,
        imagecover: val.imagecover,
        articleContentMd: val.articleContentMd,
        articleContentHtml: val.articleContentHtml //获取html
      };
      this.dialogFormVisible = true;
    },
    articleDelete(index, row) {
      this.$confirm("此操作不可逆, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DELETEARTICLE({
            PK_articleGuid: row.PK_articleGuid
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                duration: 1500,
                message: res.msg
              });
              this.reload();
            } else {
              this.$message({
                type: "error",
                duration: 1500,
                message: res.msg
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "info",
            duration: 1500,
            message: "已取消删除"
          });
        });
    },
    closeTag(tag) {
      this.articleForm.labellist.splice(
        this.articleForm.labellist.indexOf(tag)
      );
    },
    imgAdd(pos, $file) {
      let formdata = new FormData();
      formdata.append("file", $file);
      this.uploadImage(formdata).then(res => {
        this.$refs.MavonEditor.$img2Url(pos, this.BASE_URL + res.data.url);
      });
    },
    changeSwitch(val) {
      SETARTICLESTATUS({
        PK_articleGuid: val.PK_articleGuid,
        status: val.status
      }).then(res => {
        if (res.status === 200) {
          this.$message({
            type: "success",
            duration: 1500,
            message: res.msg
          });
        } else {
          this.$message({
            type: "error",
            duration: 1500,
            message: res.msg
          });
        }
      });
    }
  },
  async mounted() {
    await GETPAGEARTICLES({
      page: 0,
      limit: 200
    }).then(res => {
      if (res.status === 200) {
        this.articleList = res.data.rows;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.admin-article {
  width: 100%;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /deep/ .el-upload--picture-card {
    width: 160px;
    height: 120px;
  }
  /deep/ .el-dialog.is-fullscreen {
    padding: 0 150px;
    .menu-article {
      width: 100%;
      margin-bottom: 10px;
    }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 160px;
  height: 120px;
  display: block;
}
</style>
