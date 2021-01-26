// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

export enum SoundType {
  FLY_SOUND = 0,
  SCORE_SOUND,
  DIE_SOUND
}

@ccclass
export default class NewClass extends cc.Component {

  // @property(cc.Label)
  // label: cc.Label = null;

  // @property
  // text: string = 'hello';
  @property(cc.AudioClip)
  bgMusic: cc.AudioClip = null;

  @property(cc.AudioClip)
  flySound: cc.AudioClip = null;

  @property(cc.AudioClip)
  scoreSound: cc.AudioClip = null;

  @property(cc.AudioClip)
  dieSound: cc.AudioClip = null;


  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.audioEngine.playMusic(this.bgMusic, true);
  }

  start() {

  }

  playSound(type: SoundType) {
    switch (type) {
      case SoundType.FLY_SOUND:
        cc.audioEngine.playEffect(this.flySound, false);
        break;
      case SoundType.SCORE_SOUND:
        cc.audioEngine.playEffect(this.scoreSound, false);
        break;
      case SoundType.DIE_SOUND:
        cc.audioEngine.playEffect(this.dieSound, false);
        break;
    }
  }
  // update (dt) {}
}
