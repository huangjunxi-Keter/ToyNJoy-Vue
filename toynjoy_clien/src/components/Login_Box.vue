<template>
    <div class="loginBox">
        <div class="content">
            <ul>
                <li>
                    <p>登入 ToyNJoy</p>
                </li>
                <li>
                    <input v-model="user.username" type="text" placeholder="用户名" />
                </li>
                <li>
                    <input v-model="user.password" type="password" placeholder="密码" />
                </li>
                <li>
                    <button @click="login">确 定</button>
                </li>
                <li class="registered">
                    <a @click.prevent="go('register')">加入ToyNJoy</a>
                </li>
            </ul>
        </div>
        <div class="message">{{ message }}</div>
    </div>
    <!--
        Uncaught TypeError: Cannot read properties of undefined (reading 'toLowerCase')     VM56792:1 
        at HTMLDocument.eval (eval at <anonymous> (eval at putSampleVal (content2.js:471:56)), <anonymous>:1:47818)

        以上报错由浏览器的自动存储表单引起
    -->
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'LoginBox',
    data() {
        return {
            user: {
                username: '',
                password: ''
            },
            message: ''
        }
    },
    methods: {
        ...mapMutations('system', ['UPDATE_LOGIN_USER']),
        login() {
            if (this.user.username.trim() != '' && this.user.password.trim() != '') {
                this.message = '';
                this.myAxios({
                    method: 'post',
                    url: 'User/login',
                    data: this.user,
                    success: (response) => {
                        if (response.data.code == 0)
                            this.message = response.data.message;
                        else {
                            this.UPDATE_LOGIN_USER(response.headers.token);
                            this.$router.go(-1);
                        }
                    }
                });
            } else {
                this.message = '用户名密码不能为空！'
            }
        }
    }
}
</script>

<style scoped>
.loginBox {
    position: absolute;
    top: 10vw;
    width: 100vw;
}

.content {
    background-color: rgba(255, 255, 255, 1);
    width: 30vw;
    margin: auto;
    border-radius: 1vw;
    box-shadow: 0 0 0.3vw 0.03vw rgba(100, 100, 100, 0.6);
    padding: 3vh 0;
}

.content>ul {
    width: 100%;
    list-style: none;
    text-align: center;
}

.content li>input,
.content li>button {
    height: 5vh;
    margin: 2vh auto;
    outline: none;
    border: none;
    border-radius: 0.6vw;
}

.content li>a {
    user-select: none;
    cursor: pointer;
}

.content input {
    width: 25vw;
    padding: 0 2vw;
    background-color: rgba(180, 180, 180, 0.5);
    font-size: 1.2vw;
    color: rgba(0, 0, 0, 0.65);
    transition: 0.3s;
}

.content input:focus {
    box-shadow: 0 0 0.3vw 0.03vw rgba(100, 100, 100, 0.5);
}

.content button {
    width: 25vw;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0.3vw 0.03vw rgba(100, 100, 100, 0.5);
    color: rgba(0, 0, 0, 0.65);
    font-size: 1.2vw;
    font-weight: bold;
    user-select: none;
    cursor: pointer;
}

.content button:hover {
    background-color: rgb(219, 219, 219);
}

.content>ul p {
    color: rgba(0, 0, 0, 0.65);
    margin-bottom: 2vh;
    font-size: 1.6vw;
    font-weight: bold;
}

.registered {
    width: 24vw;
    margin: 0 auto;
    padding-right: 1vw;
    text-align: right;
    position: relative;
    top: -1vh;
}

.registered>a {
    color: #808080;
    text-decoration: none;
}

.registered>a:hover {
    border-bottom: #808080 solid 0.1vh;
}

.message {
    margin-top: 2vw;
    width: 100%;
    text-align: center;
    color: indianred;
    font-size: 1.2vw;
}

.message>a {
    color: tomato;
    text-decoration: none;
}
</style>