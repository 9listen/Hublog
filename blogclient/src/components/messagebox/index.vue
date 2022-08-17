<template>
  <div class="message-board">
    <div class="message-editor">
      <textarea
        class="message-editor-textarea"
        placeholder="要留下点什么吗？？"
        v-model="messageTextarea"
      ></textarea>
    </div>
    <!-- 留言按钮 -->
    <div class="message-summit">
      <div
        v-if="!friendIslogin"
        @click="getUserinfoByQQ()"
        id="qqLoginBtn"
        class="message-summit-btn qq"
        title="qq登录"
      >
        <i class="iconfont icon-qq"></i>
      </div>
      <div
        v-else
        @click="loginExit()"
        title="退出登录"
        class="message-summit-btn islogin"
      >
        <img v-lazy="userheadimg" alt="avatar" class="userimg" />
      </div>
      <div @click="submitMsg()" class="message-summit-btn">留言</div>
    </div>
    <!--  -->
    <div class="message-area">
      <div
        class="message-list"
        v-for="(item, index) in messageList"
        :key="item.PK_messageGuid"
      >
        <div class="visitor-item">
          <img class="visitor-img" alt="avatar" v-lazy="item.userheadimg" />
          <div class="vistor-info">
            <div class="vistor-name">
              {{ item.username }}
            </div>
            <div class="vistor-time">{{ item.createtime | timeFitter }}</div>
          </div>
        </div>
        <div class="vistor-massage">
          {{ item.content }}
        </div>
        <div class="vistor-foot">
          <i class="iconfont icon-huifu vistor-reapply"></i>
          <span class="vistor-foot-text" @click="showMsgInput(item, index)"
            >回复</span
          >
        </div>
        <div
          v-if="showTemplateInput && index === replyMsgInputIndex"
          class="message-input-area"
        >
          <textarea
            class="message-input"
            :placeholder="replyInputPlaceholder"
            v-model="replyMsgTextarea"
          ></textarea>
          <div class="message-input-btn-area">
            <span @click="replyMsg(item)" class="message-input-btn">
              回复
            </span>
          </div>
        </div>
        <div v-if="item.children" class="message-children-item">
          <span
            v-for="childrenItem in item.children"
            :key="childrenItem.PK_messageGuid"
          >
            <div class="visitor-item">
              <img
                class="visitor-img"
                alt="avatar"
                v-lazy="childrenItem.userheadimg"
              />
              <div class="vistor-info">
                <div class="vistor-name">
                  <span>{{ childrenItem.username }}</span>
                  <span style="color: #333; margin: 0 5px"> 回复</span>
                  <span>{{ childrenItem.parentUsername }}</span>
                </div>
                <div class="vistor-time">
                  {{ childrenItem.createtime | timeFitter }}
                </div>
              </div>
            </div>
            <div class="vistor-massage">
              {{ childrenItem.content }}
            </div>
            <div class="vistor-foot">
              <i class="iconfont icon-huifu vistor-reapply"></i>
              <span
                class="vistor-foot-text"
                @click="showMsgInput(childrenItem, index)"
                >回复</span
              >
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { messageFitter } from "@/utils/messagefitter.js";
import {
  LEAVINGMSG,
  GETQQLOGIN,
  FRIENDLOGIN,
  FRIENDEXIT,
  GETMSGS
} from "@/apis/client";
export default {
  name: "message-board",
  props: {
    belongtoGuid: {//=MESAGE_GUID-在父组件里面是个字符串
      type: String,
      required: true
    }
  },
  computed: {
    friendIslogin () {
      return this.$store.state.friendIslogin;
    },
    userheadimg () {
      return this.$store.state.friendInfo.userheadimg;
    },
    friendInfo () {
      return this.$store.state.friendInfo;
    }
  },
  watch: {//监听数据变化
    belongtoGuid (guid) {
      this.getPage(guid);
    }
  },
  data () {
    return {
      messageList: [],
      messageTextarea: "",
      replyInputPlaceholder: "",
      replyMsgTextarea: "",
      replyMsgInputIndex: 0,
      showTemplateInput: false,
      templateTitle: "留言板",
      replyObj: {}
    };
  },
  methods: {
    showMsgInput (item, index) {
      this.replyObj = item;
      this.replyInputPlaceholder = `@${item.username}`;
      if (this.replyMsgInputIndex !== index) {
        this.replyMsgInputIndex = index;
        this.showTemplateInput = true;
      } else {
        this.showTemplateInput = !this.showTemplateInput;
      }
    },
    getUserinfoByQQ () {
      GETQQLOGIN().then(res => {
        if (res.status === 200) {
          window.location.href = res.data;//window.location.href="/url" 当前页面打开URL页面
        }
      });
    },
    // 退出登录
    loginExit () {
      FRIENDEXIT().then(res => {
        if (res.status === 200) {
          this.$store.commit("SET_FRIENDUSERINFO", {
            PK_userGuid: "",
            nickname: "",
            userheadimg: ""
          });
          this.$store.commit("SET_FRIENDISLOGIN", false);
          this.$message({
            duration: 1500,
            type: "success",
            message: "退出登录",
          });
        }
      });
    },
    replyMsg () {
      if (!this.friendIslogin) {
        this.$message({
          duration: 1500,
          type: "info",
          message: "登录才可以留言哟"
        });
        return;
      }
      if (this.replyMsgTextarea === "") {
        this.$message({
          duration: 1500,
          type: "error",
          message: "还不知道你想回复什么呢"
        });
        return;
      }
      let FK_parentLineageGuid;
      if (this.replyObj.FK_parentLineageGuid === "") {
        FK_parentLineageGuid = this.replyObj.PK_messageGuid;
      } else {
        FK_parentLineageGuid = this.replyObj;
      }
      LEAVINGMSG({
        content: this.replyMsgTextarea,
        FK_parentLineageGuid: FK_parentLineageGuid,
        FK_parentGuid: this.replyObj.PK_messageGuid,
        FK_articleGuid: this.belongtoGuid
      }).then(res => {
        if (res.status === 200) {
          this.$message({
            duration: 1500,
            type: "success",
            message: "成功"
          });
          this.replyMsgTextarea = "";
          this.replyMsgInputIndex = 0;
          this.showTemplateInput = false;
          this.getPage(this.belongtoGuid);
        }
      });
    },
    submitMsg () {
      if (!this.friendIslogin) {//false
        this.$message({
          duration: 1500,
          type: "info",
          message: "登录才可以留言哟"
        });
        return;
      }
      if (this.messageTextarea === "") {
        this.$message({
          duration: 1500,
          type: "error",
          message: "说点什么吧"
        });
        return;
      }
      LEAVINGMSG({
        content: this.messageTextarea,
        FK_parentLineageGuid: "",
        FK_parentGuid: "",
        FK_articleGuid: this.belongtoGuid
      }).then(res => {
        if (res.status === 200) {
          this.$message({
            duration: 1500,
            type: "success",
            message: "成功"
          });
          this.messageTextarea = "";
          this.getPage(this.belongtoGuid);
        }
      });
    },
    getPage (guid) {
      GETMSGS({
        FK_articleGuid: guid
      }).then(res => {
        if (res.status === 200) {
          // console.log(res.data);
          this.messageList = messageFitter(res.data);
          // console.log(messageList);
        }
      });
    }
  },
  mounted () {
    this.getPage(this.belongtoGuid);
    FRIENDLOGIN().then(res => {
      if (res.status === 200) {
        this.$store.commit("SET_FRIENDUSERINFO", {
          PK_userGuid: res.data.PK_userGuid,
          nickname: res.data.nickname,
          userheadimg: res.data.userheadimg
        });
        this.$store.commit("SET_FRIENDISLOGIN", true);
      } else {
        this.$store.commit("SET_FRIENDUSERINFO", {
          PK_userGuid: "",
          nickname: "",
          userheadimg: ""
        });
        this.$store.commit("SET_FRIENDISLOGIN", false);
      }
    });
  }
};
</script>
<style lang="scss" scoped>
  .blog-author {
    padding: 3px 4px;
    background-color: #3cb371;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
    margin-left: 5px;
  }
  .message-board {
    width: 100%;
    height: 100%;
    .message-editor {
      margin-top: 20px;
      width: 100%;
      padding: 10px 30px;
      box-shadow: 0 0 4px #ccc;
      .message-editor-textarea {
        width: 100%;
        height: 200px;
        line-height: 1.5;
        outline: none;
        border: none;
      }
    }
    .message-summit {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 35px;
      width: 100%;
      .message-summit-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 35px;
        width: 60px;
        margin-left: 10px;
        line-height: 35px;
        text-align: center;
        color: #fff;
        background-color: #3cb371;
        border-radius: 5px;
        cursor: pointer;
      }
      .islogin {
        background-color: #fff;
        color: #0099cc;
      }
      .userimg {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
      .qq {
        background-color: #0099cc;
      }
    }
    .message-area {
      margin-top: 20px;
      width: 100%;
      .message-list {
        margin-bottom: 20px;
        width: 100%;
        padding: 10px;
        box-shadow: 0 0 3px #ccc;
        .visitor-item {
          display: flex;
          align-items: center;
          .visitor-img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background-size: cover;
            background-repeat: no-repeat;
            // background-image: url("./../../../static/images/cover2.jpg");
            background-position: center;
            margin-right: 10px;
          }
          .vistor-info {
            .vistor-name {
              font-size: 14px;
              color: #01aaed;
            }
            .vistor-time {
              font-size: 12px;
              color: #666;
            }
          }
        }
        .vistor-massage {
          margin-top: 5px;
          margin-left: 50px;
          font-size: 14px;
          line-height: 25px;
        }
        .message-children-item {
          margin: 10px 50px;
          width: calc(100% - 100px);
        }
        .message-input-area {
          height: 180px;
          margin: 5px 50px;
          width: calc(100% - 100px);
          .message-input {
            width: 100%;
            height: 120px;
            padding: 10px;
            background-color: #fff;
            outline: none;
            border: 0 0 3px #333;
            line-height: 1.5;
          }
          .message-input-btn-area {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            width: 100%;
            height: 40px;
            .message-input-btn {
              background-color: #3cb371;
              color: #fff;
              border-radius: 4px;
              padding: 8px 20px;
              cursor: pointer;
            }
          }
        }
        .vistor-foot {
          display: flex;
          align-items: center;
          width: 100%;
          height: 40px;
          cursor: pointer;
          .vistor-foot-text {
            font-size: 14px;
          }
          .vistor-reapply {
            margin-left: 50px;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
