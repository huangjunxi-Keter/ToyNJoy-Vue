<template slot-scope="scope">
  <div class="page-content">
    <particles-bg type="fountain" :bg="true" />
    <div class="login-bodyer">
      <div class="title">线上游戏商城管理系统</div>
      <!-- 表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginFormData"
        :rules="loginFormRules"
      >
        <el-form-item prop="saname">
          <el-input
            v-model="loginFormData.saname"
            size="large"
            prefix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="sapassword">
          <el-input
            type="password"
            v-model="loginFormData.sapassword"
            size="large"
            prefix-icon="Unlock"
          />
        </el-form-item>
        <el-form-item>
          <span class="other">
            <span class="auto-login">自动登录</span>
            <a class="forgot-password" href="#">忘记密码</a>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submit-btn"
            type="primary"
            size="large"
            :loading="other.butState"
            @click="submit(loginFormRef)"
            >登&nbsp录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";

export default {
  name: "Login",
  components: {
    ParticlesBg,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    // 数据绑定
    const data = reactive({
      // 表单数据
      loginFormData: {
        saname: "123",
        sapassword: "123",
      },
      // 表单验证规则
      loginFormRules: {
        saname: [{ required: true, message: "请输入账号" }],
        sapassword: [{ required: true, message: "请输入密码" }],
      },
      other: {
        butState: false,
      },
    });

    // DOM
    const doms = {
      loginFormRef: ref(),
    };

    // 事件回调
    const eventCallbacks = {
      // 登录
      submit: (formRef) => {
        data.other.butState = true;
        // 表单验证
        formRef.validate(async (valid) => {
          if (valid) {
            let state = await store.dispatch("user/login", data.loginFormData);
            if (state) {
              router.push("/");
            } else {
              ElNotification({
                title: "登录失败",
                message: "账号或密码错误",
                type: "error",
              });
            }
          }
        });
        data.other.butState = false;
      },
    };

    return {
      ...data,
      ...doms,
      ...eventCallbacks,
    };
  },
};
</script>

<style scoped>
.page-content {
  /* 居中定位 */
  display: table-cell;
  width: 100vw;
  height: 100vh;
  vertical-align: middle;
}

.title {
  font-size: 33px;
  color: #000;
  font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  padding-bottom: 40px;
}

.login-bodyer {
  /* 居中定位 */
  min-width: 260px;
  width: 368px;
  margin: auto;

  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  box-shadow: 0 0 5px 2px #ccc;
  border-radius: 10px;
}

.submit-btn {
  width: 100%;
  font-size: 16px;
}

.login-bodyer .other {
  position: relative;
  width: 100%;
  text-align: left;
}

.login-bodyer .other .auto-login {
  color: #888;
}

.login-bodyer .other .forgot-password {
  position: absolute;
  right: 0;
  text-decoration: none;
  color: #1890ff;
}
</style>
