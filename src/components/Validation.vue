<template lang="pug">
  #Validation
    el-steps(:active="active", finish-status="success")
      el-step
      el-step
      el-step
    //- form1
    .form-container(v-if="active === 0")
      .form-title Create Account
      .form-subtitle Glad to see you here!
      el-form.form-body(
        :model="accountData",
        :rules="rules",
        ref="ruleForm",
        label-position="top"
        label-width="100%"
        )
        el-form-item(label="Account", prop="email", placeholder="example@email.com")
          el-input(v-model="accountData.email")
        el-form-item(label="Password", prop="password")
          el-input(v-model="accountData.password", type="password" )
        el-form-item(label="Confirm Password", prop="confirmPassword")
          el-input(v-model="accountData.confirmPassword", type="password" )
    //- form2
    .form-container(v-if="active === 1")
      .form-title General Infomation
      .form-subtitle Tell us who you are!
      el-form.form-body(
        :model="informationData",
        :rules="rules", ref="ruleForm",
        label-position="top"
        label-width="100%"
        )
        el-form-item(label="Name", prop="name", placeholder="Example Name")
          el-input(v-model="informationData.name")
        el-form-item(label="Phone", prop="phone")
          el-input(v-model="informationData.phone", type="text" )
        el-form-item(label="Birth Date", prop="birthDate")
          el-date-picker(v-model="informationData.birthDate", type="date", placeholder="Choose date")
          | {{informationData.address}}
        el-form-item(label="Address", prop="address")
          el-cascader(placeholder="Try to search 板橋區", :options="addressOptions", filterable="")
    //- form3
    .form-container(v-if="active === 2")
      .form-title Update Profile Picture
      .form-subtitle We wanna know you more!
      .form-upload
        i.form-upload-icon.fas.fa-images
        .form-upload-info
          .form-upload-info-title UPLOAD UP TO 3 PHOTOS
          .form-upload-info-subtitle MAXIMUM SIZE: 800KB
        input(type="file", @change="fileSelected")
      .form-upload-images
        .image(v-if="imageUrl[index]" v-for="(item, index) in 3")
          img(:src="imageUrl[index]")
          .image-delete(@click="imageUrl.splice(index, 1)")
            i.fas.fa-trash-alt
    //- finish page
    .form-container(v-if="active === 3")
      .form-title Congratulations
      .form-subtitle Now you’re one of us!
      i.finish.far.fa-smile
    //- Submit
    el-button.submitButton(style="margin-top: 12px;", @click="submitForm" plain v-show="active < 3") SUBMIT & NEXT

</template>

<script>
export default {
  name: 'Validation',
  data() {
    const validatePassword = (rule, value, callback) => {
      this.accountData.password === '' ? callback(new Error('Please enter your password')) : callback()
    }
    const validateConfirmPassword = (rule, value, callback) => {
      this.accountData.password !== this.accountData.confirmPassword
        ? callback(new Error('Passwords are different'))
        : callback()
    }
    return {
      validatePassword,
      validateConfirmPassword,
      active: 0,
      accountData: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      informationData: {
        name: '',
        phone: '',
        birthDate: '',
        address: ''
      },
      imageUrl: [],
      rules: {
        email: [
          { required: true, message: 'Please enter your email', trigger: 'blur' },
          { type: 'email', message: 'INVALID EMAIL', trigger: ['blur', 'change'] }
        ],
        password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        confirmPassword: [{ required: true, validator: validateConfirmPassword, trigger: 'change' }],
        name: [{ required: true }],
        phone: [{ required: true }]
      },
      addressOptions: [
        {
          value: '台北市',
          label: '台北市',
          children: [
            {
              value: '中正區',
              label: '中正區'
            },
            {
              value: '大同區',
              label: '大同區'
            }
          ]
        },
        {
          value: '新北市',
          label: '新北市',
          children: [
            {
              value: '板橋區',
              label: '板橋區'
            },
            {
              value: '中和區',
              label: '中和區'
            }
          ]
        }
      ]
    }
  },
  methods: {
    submitForm() {
      if (this.active === 2) {
        this.active++
      } else {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.active++
          } else {
            return false
          }
        })
      }
    },
    fileSelected(e) {
      if (this.imageUrl.length === 3) {
        this.$message.warning('Max 3 photos')
      } else {
        const file = e.target.files.item(0)
        if (!file.type.match(/jpeg|png/)) {
          this.$message.warning('Only jpeg & png')
          return false
        }
        if (file.size / 1024 > 800) {
          this.$message.warning('File size over 800kb')
          return false
        }
        const reader = new FileReader()
        reader.addEventListener('load', this.imageLoaded)
        reader.readAsDataURL(file)
      }
    },
    imageLoaded(e) {
      this.imageUrl.push(e.target.result)
    }
  }
}
</script>

<style lang="scss">
#Validation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 10px;
  max-width: 500px;
  width: 100%;
  text-align: left;

  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700,700i,900');
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  .form {
    &-container {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      margin: 50px 0 30px 0;
      max-width: 460px;
      width: 100%;
      .finish {
        margin-top: 50px;
        color: #00cd98;
        font-size: 200px;
      }
    }
    &-title {
      margin-bottom: 10px;
      font-weight: 300;
      font-size: 48px;
    }
    &-subtitle {
      font-weight: 300;
      font-size: 24px;
    }
    &-body {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-top: 25px;
      width: 100%;
      .el-form-item {
        &__label {
          padding: 0;
          color: #000000;
          font-weight: 400;
          font-size: 20px;
          &::before {
            content: '';
          }
        }
        &__error {
          position: absolute;
          top: 14px;
          left: 103%;
          padding: 5px 15px;
          border: 1px solid;
          border-radius: 5px;
          background-color: #f56c6b;
          color: #fff;
          text-align: center;
          white-space: nowrap;
          &::after {
            position: absolute;
            top: 50%;
            left: -2px;
            width: 12px;
            height: 12px;
            background-color: #f56c6b;
            content: '';
            transform: translateY(-50%) rotate(45deg);
          }
        }
      }
      .el-input__inner {
        padding: 16px;
        max-width: 460px;
        width: 100%;
        height: 52px;
        color: #000000;
        font-weight: 300;
        font-size: 20px;
      }
      .el-date-editor--date {
        max-width: 460px;
        width: 100%;
        .el-input__inner {
          padding-left: 35px;
        }
      }
      .el-cascader__label {
        padding: 7px 25px 0 25px;
        font-size: 16px;
      }
    }
    &-upload {
      position: relative;
      display: flex;
      overflow: hidden;
      align-items: center;
      margin-top: 25px;
      max-width: 460px;
      width: 100%;
      height: 140px;
      border: 2px solid #00cd98;
      border-radius: 8px;
      color: #00cd98;
      input {
        padding-left: 100%;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
      &-icon {
        position: absolute;
        left: 70px;
        flex: 1;
        font-size: 60px;
      }
      &-info {
        position: absolute;
        left: 170px;
        flex: 3;
        &-title {
          font-weight: 400;
          font-size: 20px;
          line-height: 24px;
        }
        &-subtitle {
          margin-top: 5px;
          letter-spacing: 1px;
          font-weight: 30;
          font-size: 14px;
          line-height: 24px;
        }
      }
      &-images {
        display: flex;
        justify-content: flex-start;
        max-width: 460px;
        width: 100%;
        .image:not(:last-child) {
          margin-right: 20px;
        }
        .image {
          position: relative;
          overflow: hidden;
          margin-top: 24px;
          border: none;
          &:hover {
            .image-delete {
              height: 52px;
              opacity: 1;
            }
          }
          img {
            width: 140px;
            height: 140px;
            border-radius: 8px;
          }
          &-delete {
            position: absolute;
            bottom: 3px;
            display: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 140px;
            height: 0;
            border-radius: 0 0 8px 8px;
            background-color: #00cd98;
            color: #fff;
            font-size: 20px;
            opacity: 0;
            cursor: pointer;
            transition: all 0.3s;
          }
        }
      }
    }
  }

  .submitButton {
    max-width: 460px;
    width: 100%;
    height: 52px;
    font-weight: 400;
    font-size: 20px;
    &:not(:disabled) {
      background-color: #00cd98;
      color: #fff;
    }
  }
}
</style>
