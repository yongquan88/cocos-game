// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import MainContorl, { GameStatus } from './MainControl'
import AudioSourceControl, { SoundType } from './AudioSourceControl'

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

  // @property(cc.Label)
  // label: cc.Label = null;

  // @property
  // text: string = 'hello';
  speed: number = 0;
  mainControl: MainContorl = null;
  audioSourceControl: AudioSourceControl = null;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // 点击事件绑定在canvas容器上
    cc.Canvas.instance.node.on('touchstart', this.onTouchStart, this);
    this.mainControl = cc.Canvas.instance.node.getComponent("MainControl");
    this.audioSourceControl = cc.find('Canvas/AudioSource').getComponent('AudioSourceControl');
  }

  start() {

  }

  update(dt) {
    if (this.mainControl.gameStatus !== GameStatus.GAME_PLAYING) return;
    // 小鸟移动逻辑
    this.speed -= 0.05;
    this.node.y += this.speed;

    // 根据飞行速度设置小鸟的飞行状态角度，上升、下降
    let angle = (this.speed / 2) * 30;
    if (angle < -30) {
      angle = -30
    }
    this.node.angle = angle;
  }

  onTouchStart(e: cc.Event.EventTouch) {
    this.speed = 2;
    this.audioSourceControl.playSound(SoundType.FLY_SOUND);
  }

  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    console.log('小鸟碰撞了,other:', other)
    if (other.node.name === 'PipeUp' || other.node.name === 'PipeBottom' || other.node.name === 'sky' || other.node.name === 'floor') {
      // 碰到钢管了，游戏结束
      console.log('碰到钢管了，游戏结束')
      this.audioSourceControl.playSound(SoundType.DIE_SOUND);
      this.mainControl.gameOver();
      this.speed = 0;
    } else if (other.node.name === 'Pipe') {
      // 通过钢管，分数加1
      console.log('通过钢管，分数加1')
      this.audioSourceControl.playSound(SoundType.SCORE_SOUND);
      this.mainControl.gameScore++;
      this.mainControl.labelScore.string = this.mainControl.gameScore.toString();
    }
  }

}
