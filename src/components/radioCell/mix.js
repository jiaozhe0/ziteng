const parentMixin = {
	mounted () {
		this.updateIndex()
	},
	methods: {
		updateIndex() {
			if (!this.$children) return
			let children = this.$children
			for (let i = 0; i < children.length; i++) {
				if (children[i].result !== children[i].modelVal) {
					console.log(children[i].result)
					this.$emit('changeVal', children[i].result)
				}
		}
		}
	}
}

const childMixin = {
	props: ['val', 'modelVal'],
	data() {
		return {
			result: this.modelVal
		}
	},
	mounted () {
    this.$parent.updateIndex()
  }
}

export {
  parentMixin,
  childMixin
}
