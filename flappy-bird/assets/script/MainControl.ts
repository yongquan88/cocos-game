// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

export enum GameStatus {
  GAME_READY = 0,
  GAME_PLAYING,
  GAME_OVER
}

@ccclass
export default class NewClass extends cc.Component {

  // @property(cc.Label)
  // label: cc.Label = null;

  // @property
  // text: string = 'hello';

  @property(cc.Sprite)
  spBg: cc.Sprite[] = [null, null];

  @property(cc.Node)
  bird: cc.Node = null;

  @property(cc.Prefab)
  pipePrefab: cc.Prefab = null;

  @property(cc.Sprite)
  spGameOver: cc.Sprite = null;

  @property(cc.Button)
  btnStart: cc.Button = null;

  @property(cc.Label)
  labelScore: cc.Label = null;

  pipe: cc.Node[] = [null, null, null]
  gameScore: number = 0
  gameStatus: GameStatus = GameStatus.GAME_READY
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    const colliderManager = cc.director.getCollisionManager();
    colliderManager.enabled = true;

    this.spGameOver.node.active = false;
    this.btnStart.node.on('touchend', this.touchStartBtn, this)
  }

  start() {
    // 生成管道
    for (let i = 0; i < this.pipe.length; i++) {
      this.pipe[i] = cc.instantiate(this.pipePrefab);
      this.pipe[i].parent = this.node.getChildByName("Pipe");

      this.pipe[i].x = 170 + 200 * i;
      const minY = -120;
      const maxY = 120;

      this.pipe[i].y = minY + Math.random() * (maxY - minY);
    }
    console.log('this.pipe', this.pipe)
  }

  update(dt: number) {
    if (this.gameStatus !== GameStatus.GAME_PLAYING) return;

    // 背景移动
    for (let i = 0; i < this.spBg.length; i++) {
      this.spBg[i].node.x -= 1.0;
      if (this.spBg[i].node.x <= -288) {
        this.spBg[i].node.x = 288
      }
    }

    // 管道移动
    for (let i = 0; i < this.pipe.length; i++) {
      this.pipe[i].x -= 1;
      if (this.pipe[i].x <= -170) {
        this.pipe[i].x = 430;

        const minY = -120;
        const maxY = 120;
        this.pipe[i].y = minY + Math.random() * (maxY - minY);
      }
    }
  }

  // 开始游戏
  touchStartBtn() {
    this.gameStatus = GameStatus.GAME_PLAYING;
    this.btnStart.node.active = false;
    this.spGameOver.node.active = false;

    for (let i = 0; i < this.pipe.length; i++) {
      this.pipe[i].x = 170 + 200 * i;
      const minY = -120;
      const maxY = 120;

      this.pipe[i].y = minY + Math.random() * (maxY - minY);
    }
    this.bird.y = 0;
    this.bird.angle = 0;

    this.gameScore = 0;
    this.labelScore.string = this.gameScore.toString();
  }
  // 游戏结束
  gameOver() {
    this.gameStatus = GameStatus.GAME_OVER;
    this.spGameOver.node.active = true;
    this.btnStart.node.active = true;
  }
}
