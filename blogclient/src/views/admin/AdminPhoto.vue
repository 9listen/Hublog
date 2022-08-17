<template>
  <div class="admin-photo">
    <toolBox @headleClick="addPhoto()" />
    <el-table :data="photoList" :stripe="true" style="width: 100%">
      <el-table-column label="图片名称">
        <template slot-scope="scope">
          <i class="iconfont icon-duomeiti" :style="{ color: '#0099CC' }"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img
            class="image-wraper"
            :src="BASE_URL + scope.row.photoUrl"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column label="时间" width="200">
        <template slot-scope="scope">
          <i class="iconfont icon-shijian" :style="{ color: '#009933' }"></i>
          <span>{{ scope.row.createtime | timeFitter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="225">
        <template slot-scope="scope">
          <el-button size="mini" @click="photoEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="photoDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加图片" fullscreen :visible.sync="dialogFormVisible">
      <el-form class="photo-form" :model="photoForm">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="photoForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <div class="photo-images">
            <el-upload
              class="upload-demo"
              action=""
              :show-file-list="false"
              :http-request="uploadPhotoFile"
            >
              <img
                v-if="photoForm.photoUrl"
                :src="BASE_URL + photoForm.photoUrl"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelphoto()">取 消</el-button>
        <el-button type="primary" @click="headlephoto()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const BASE_URL = "api/";
import { UPLOADFILE } from "@/apis/client/index";
import {
  CREATEPHOTO,
  CHANGEPHOTO,
  DELETEPHOTO,
  GETPHOTOS
} from "@/apis/admin/index";
import toolBox from "@/components/adminbase/toolBox";
export default {
  name: "admin-photo",
  components: {
    toolBox
  },
  inject: ["reload"],
  data() {
    return {
      BASE_URL: BASE_URL,
      dialogFormVisible: false,
      formLabelWidth: "80px",
      isNewphoto: true,
      photoForm: {
        PK_photoGuid: "",
        name: "",
        photoUrl: "",
        status: "",
        photoImages: []
      },
      photoList: []
    };
  },
  methods: {
    headlephoto() {
      if (this.isNewphoto) {
        CREATEPHOTO({
          name: this.photoForm.name,
          photoUrl: this.photoForm.photoUrl
        }).then(res => {
          if (res.status === 200) {
            this.dialogFormVisible = false;
            this.getPage();
            this.photoForm = {
              PK_photoGuid: "",
              name: "",
              photoUrl: "",
              status: "",
              photoImages: []
            };
          }
        });
      } else {
        CHANGEPHOTO({
          PK_photoGuid: this.photoForm.PK_photoGuid,
          name: this.photoForm.name,
          photoUrl: this.photoForm.photoUrl
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              duration: 1500,
              type: "success",
              message: res.msg
            });
            this.dialogFormVisible = false;
            this.photoForm = {
              PK_photoGuid: "",
              name: "",
              photoUrl: "",
              status: "",
              photoImages: []
            };
            this.reload();
          } else {
            this.$message({
              duration: 1500,
              type: "error",
              message: res.msg
            });
          }
        });
      }
    },
    cancelphoto() {
      this.dialogFormVisible = false;
      this.photoForm = {
        PK_photoGuid: "",
        name: "",
        photoUrl: "",
        status: "",
        photoImages: []
      };
    },
    photoEdit(index, row) {
      this.dialogFormVisible = true;
      this.isNewPhoto = false;
      this.photoForm = {
        PK_photoGuid: row.PK_photoGuid,
        name: row.name,
        photoUrl: row.photoUrl,
        status: row.status
      };
    },
    photoDelete(index, row) {
      this.$confirm("此操作不可逆, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DELETEPHOTO({
            PK_photoGuid: row.PK_photoGuid
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                duration: 1500,
                type: "success",
                message: res.msg
              });
              this.getPage();
            } else {
              this.$message({
                duration: 1500,
                type: "error",
                message: res.msg
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            duration: 1500,
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addPhoto() {
      this.isNewPhoto = true;
      this.photoForm = {
        PK_photoGuid: "",
        name: "",
        photoUrl: "",
        status: "",
        photoImages: []
      };
      this.dialogFormVisible = true;
    },
    uploadPhotoFile(e) {
      let formData = new FormData();
      formData.append("file", e.file);
      UPLOADFILE(formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        this.photoForm.photoImages = [];
        this.photoForm.photoImages.push({
          name: res.data.name,
          url: BASE_URL + res.data.url
        });
        this.photoForm.photoUrl = res.data.url;
      });
    },
    getPage() {
      GETPHOTOS({
        page: 0,
        limit: 100
      }).then(res => {
        if (res.status === 200) {
          this.photoList = res.data.rows;
        }
      });
    }
  },
  mounted() {
    this.getPage();
  }
};
</script>
<style lang="scss" scoped>
.admin-photo {
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
.photo-form {
  width: 900px;
  margin: 0 auto;
}
.photo-images {
  width: 100%;
  .image {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("./../../../static/images/bg1.jpg");
  }
}
.image-wraper {
  width: 120px;
  height: 100px;
}
/deep/ .upload-demo .el-upload {
  border: 1px solid #ccc;
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 180px;
  display: block;
}
</style>
