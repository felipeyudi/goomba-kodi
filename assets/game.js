//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 1, 1],
})

// Speeds
const MOVE_SPEED = 120
const SLICER_SPEED = 100
const SKELETOR_SPEED = 60

// Game Logic
loadRoot('http://localhost:3000/assets/')
loadSprite('link-going-left', 'goomba.png')
loadSprite('link-going-right', 'goomba.png')
loadSprite('link-going-down', 'goomba.png')
loadSprite('link-going-up', 'goomba.png')
loadSprite('bg', 'local-bg.png')

scene('game', ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const maps = [
    [
      '                ',
      '                ',
      '                ',
      '                ',
      '                ',
      '                ',
      '                ',
      '                ',
    ]
  ]

  const levelCfg = {
    width: 48,
    height: 48
  }
  addLevel(maps[level], levelCfg)

  //add([sprite('bg'), layer('bg')])

  const scoreLabel = add([
    text('0'),
    pos(300, 10),
    layer('ui'),
    {
      value: score,
    },
    scale(3),
  ])

  add([text('level ' + parseInt(level + 1)), pos(10, 10), scale(3)])

  const player = add([
    sprite('link-going-right'),
    pos(5, 190),
    {
      // right by default
      dir: vec2(1, 0),
    },
  ])

  player.action(() => {
    player.resolve()
  })

  player.overlaps('next-level', () => {
    go('game', {
      level: (level + 1) % maps.length,
      score: scoreLabel.value,
    })
  })

  keyDown('left', () => {
    player.changeSprite('link-going-left')
    player.move(-MOVE_SPEED, 0)
    player.dir = vec2(-1, 0)
  })

  keyDown('right', () => {
    player.changeSprite('link-going-right')
    player.move(MOVE_SPEED, 0)
    player.dir = vec2(1, 0)
  })

  keyDown('up', () => {
    player.changeSprite('link-going-up')
    player.move(0, -MOVE_SPEED)
    player.dir = vec2(0, -1)
  })

  keyDown('down', () => {
    player.changeSprite('link-going-down')
    player.move(0, MOVE_SPEED)
    player.dir = vec2(0, 1)
  })

})

scene('lose', ({ score }) => {
  add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)])
})

start('game', { level: 0, score: 0 })
