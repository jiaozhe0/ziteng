<template>
  <div class="zhima">
    <mt-header title='我的芝麻分' v-show="isHeader"></mt-header>
		 <scroll class='content' :style="{top:isHeader?'44px':'0'}">
		 	<div class="zhima-content">
		 		<div class="zhima-score">
		 			<canvas id="clock" height="300px" ref='clock'>
					</canvas>
					<canvas id="score" height="300px" ref='score'>
					</canvas>
		 		</div>
		 		<section class="zhima-text">
		 			<h3>芝麻信用认证有什么好处。</h3>
		 			<p>芝麻分（芝麻分全称是芝麻信用评分）是由蚂蚁金服旗下独立第三方信用评估机构-芝麻信用管理有限公司，依据您在互联网上的各类消费及行为数据，结合传统金融借贷信息，以及其他替代性数据等方方面面的信息，运用云计算、深度机器自我学习等技术，通过逻辑回归、模型提升决策树、随机森林等模型算法，以简单易懂的分值形式对用户进行信用评估的结果体现。</p>
		 		</section>
		 	</div>
		 </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import MtHeader from 'components/mtHeader'
import Scroll from 'components/Scroll'
import {initSize} from 'common/js/browser'
import {requestAnimationFrame} from 'common/js/animation'

export default {
	components: {
		MtHeader,
		Scroll
	},
	computed: {
		isHeader() {
			return this.$route.params.broswer === 'html'
		}
	},
	created() {
		this.value = this.$route.query.value ? this.$route.query.value : 0
	},
	mounted() {
		this._draw(this.value)
		window.addEventListener('resize', () => {
			this._draw(this.value)
    })
	},
	methods: {
		_clock() {
			let canvas = this.$refs.clock
			canvas.setAttribute('width', `${this.size.vW}px`)
			if (canvas.getContext) {
				var ctx = canvas.getContext('2d')
					// 外圈
					ctx.beginPath()
					ctx.arc(this.size.vW / 2, 180, 152, 30 / 180 * Math.PI, 150 / 180 * Math.PI, true)
					ctx.strokeStyle = '#fb7565'
					ctx.lineWidth = '15'
					ctx.stroke()
					ctx.closePath()
					// 绘制内圈
					ctx.beginPath()
					ctx.arc(this.size.vW / 2, 180, 140, 30 / 180 * Math.PI, 150 / 180 * Math.PI, true)
					ctx.strokeStyle = '#fb7464'
					ctx.lineWidth = '3'
					ctx.stroke()
					ctx.closePath()
					// ctx.rotate((-7.5 * 15) / 180 * Math.PI)
					// 移动画布的圆点
					ctx.translate(this.size.vW / 2, 180)
					var total = [350, '较差', 550, '中等', 600, '良好', 650, '优秀', 700, '极好', 950]
					for (var i = 0; i < 17; i++) {
						if (i % 6 === 3) {
							ctx.beginPath()
							ctx.lineWidth = '2'
							ctx.strokeStyle = '#fff7f6'
							ctx.moveTo(126 * Math.sin(7.5 * i / 180 * Math.PI), -126 * Math.cos(7.5 * i / 180 * Math.PI))
							ctx.lineTo(142 * Math.sin(7.5 * i / 180 * Math.PI), -142 * Math.cos(7.5 * i / 180 * Math.PI))
							ctx.moveTo(-126 * Math.sin(7.5 * i / 180 * Math.PI), -126 * Math.cos(7.5 * i / 180 * Math.PI))
							ctx.lineTo(-142 * Math.sin(7.5 * i / 180 * Math.PI), -142 * Math.cos(7.5 * i / 180 * Math.PI))
							ctx.stroke()
							ctx.closePath()
						} else {
							ctx.beginPath()
							ctx.lineWidth = '1'
							ctx.strokeStyle = '#fff7f6'
							ctx.moveTo(130 * Math.sin(7.5 * i / 180 * Math.PI), -130 * Math.cos(7.5 * i / 180 * Math.PI))
							ctx.lineTo(138 * Math.sin(7.5 * i / 180 * Math.PI), -138 * Math.cos(7.5 * i / 180 * Math.PI))
							ctx.moveTo(-130 * Math.sin(7.5 * i / 180 * Math.PI), -130 * Math.cos(7.5 * i / 180 * Math.PI))
							ctx.lineTo(-138 * Math.sin(7.5 * i / 180 * Math.PI), -138 * Math.cos(7.5 * i / 180 * Math.PI))
							ctx.stroke()
							ctx.closePath()
						}
					}
					// 绘制文本
					ctx.fillStyle = '#fff7f6'
					ctx.textAlign = 'center'
					ctx.textBaseline = 'bottom'
					ctx.rotate((-7.5 * 15) / 180 * Math.PI)
					for (let i = 0; i < 11; i++) {
						ctx.fillStyle = i % 2 ? '#fff7f6' : '#fff7f6'
						ctx.font = '14px normal'
						ctx.fillText(total[i], 0, -100)
						ctx.rotate((7.5 * 3) / 180 * Math.PI)
					}
					ctx.rotate(-7.5 * 18 / 180 * Math.PI)
					ctx.fillStyle = '#fff7f6'
			}
		},
		_score(score) {
			var i = 0
			var finalValue = score
			var value = 0 // 根据值的大小确定应该到达的位置
			var _this = this
			if (finalValue < 550) {
				value = (finalValue - 316.7) * 0.225
			} else if (finalValue < 700) {
				value = (finalValue - 550) * 0.9 + 52.5
			} else {
				value = finalValue > 1000 ? 1000 : finalValue
				value = (value - 700) * 0.18 + 187.5
			}
			var evluate = ''
			if (score < 550) {
				evluate = '较差'
			} else if (score < 600) {
				evluate = '中等'
			} else if (score < 650) {
				evluate = '良好'
			} else if (score < 700) {
				evluate = '优秀'
			} else {
				evluate = '极好'
			}
			let pointer = this.$refs.score
			pointer.setAttribute('width', `${this.size.vW}px`)
			let ctxPoint = pointer.getContext('2d')
			ctxPoint.translate(this.size.vW / 2, 180)
			ctxPoint.font = '35px bold'
			ctxPoint.textAlign = 'center'
			ctxPoint.shadowColor = '#fff'

			function slider() {
				// 清除画布
				ctxPoint.translate(-_this.size.vW / 2, -180)
				ctxPoint.clearRect(0, 0, pointer.width, pointer.height)
				// 圆点滑动
				ctxPoint.translate(_this.size.vW / 2, 180)
				i++
				ctxPoint.beginPath()
				ctxPoint.strokeStyle = '#fff'
				ctxPoint.shadowColor = '#fff'
				ctxPoint.shadowBlur = 10
				ctxPoint.arc(-151 * Math.sin((i + 60) / 180 * Math.PI), 151 * Math.cos((i + 60) / 180 * Math.PI), 5, 0, 2 * Math.PI, true)
				ctxPoint.fillStyle = '#fff7f6'
				ctxPoint.fill()
				ctxPoint.stroke()

				var text = 0
				if (i < 52.5) {
					text = i / 0.225 + 316.7
				} else if (i < 187.5) {
					text = (i - 52.5) / 0.9 + 550
				} else {
					text = (i - 187.5) / 0.18 + 700
					text = text > 1000 ? 1000 : text
				}
				text = text > score ? score : text
				ctxPoint.shadowBlur = 0
				ctxPoint.fillText(parseInt(text, 10), 0, 15)
				ctxPoint.font = '35px bold'
				ctxPoint.stroke()
				ctxPoint.closePath() // 如果到达所需要的弧度，则停止，否则继续跳动

				if (i >= value) {
					setTimeout(function() {
						ctxPoint.fillText('信用' + evluate, 0, 54)
					}, 200)
					// clearTimeout(timer)
					window.cancelAnimationFrame(slider)
					return
				} else {
					// timer = setTimeout(slider, text / finalValue * 15)
					// var startTime = drawStart
					requestAnimationFrame(slider)
				}
			}
			// slider()
			requestAnimationFrame(slider)
		},
		_draw(value) {
			this.size = initSize()
			this._clock()
			this._score(value)
		}
	}
}
</script>

<style scoped lang="less" >
 @import '~common/css/variable.less';
 @import '~common/css/mixin.less';
 .content{
 		bottom:0;
 		background-color:#fff;
 }
 .zhima-content{
 	.zhima-score{
 		background:#F95843
 	}
 	.zhima-text{
 		padding: 15px;
 		font-size:0.7rem;
 		color:@color-text-secondary;
 		h3{
 			color:@color-primary;
 			margin: 5px 0;
 			font-weight: normal;
 		}
 	}
 }
 #score{
 	position: absolute;
 	top:0;
 	left:0;
 }
</style>