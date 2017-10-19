import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
Validator.addLocale(zh)

const Veeconfig = {
    locale: 'zh_CN',
    events: 'blur'
}

const dictionary = {
    zh_CN: {
        messages: {
            required: (field) => '请输入' + field
        },
        attributes: {
            email: '邮箱',
            password: '密码',
            phone: '手机号',
            code: '验证码',
            name: '姓名'
        }
    }
}

Validator.extend('phone', {
	messages: {
		zh_CN: field => '手机号格式不正确'
	},
	validate: value => {
		return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
	}
})
Validator.extend('code', {
	messages: {
		zh_CN: field => '验证码必须四位'
	},
	validate: value => {
		return /^\d{4}$/.test(value)
	}
})
Validator.extend('number', {
    messages: {
        zh_CN: field => '请输入正确的身份证'
    },
    validate: value => {
        return /^\d{4}$/.test(value)
    }
})

Validator.updateDictionary(dictionary)
export {VeeValidate, Veeconfig}
