// 캐릭터 이미지 (public/chars). 뱁새 = 앱 마스코트, 동물 = 친구들 아바타.

// 뱁새 표정: 화면 내용에 맞춰 고른다
export const BIRD = {
  neutral: '멀뚱',
  walk: '총총',
  cheer: '만세',
  sleepy: '꾸벅',
  grumpy: '뾰로통',
  surprised: '깜짝',
  heart: '하트',
  fighting: '파이팅',
  yawn: '하품',
  curious: '갸우뚱',
  hello: '안녕',
  jump: '폴짝',
}
export const birdSrc = (mood) => `/chars/bird-${mood}.webp`

// 친구 동물: 데모 멤버는 고정, 새 이름은 글자로 골라 늘 같은 동물이 나온다
export const ANIMALS = ['cat', 'rabbit', 'hamster', 'penguin', 'seal', 'duck', 'sheep']
export const ANIMAL_KO = { cat: '고양이', rabbit: '토끼', hamster: '햄스터', penguin: '펭귄', seal: '물범', duck: '오리', sheep: '양' }
const FIXED = { 민서: 'cat', 지안: 'rabbit', 서윤: 'hamster', 하린: 'penguin', 지운: 'seal', 수빈: 'duck' }

export function animalOf(name = '') {
  if (FIXED[name]) return FIXED[name]
  let h = 0
  for (const ch of name) h = (h * 31 + ch.codePointAt(0)) >>> 0
  return ANIMALS[h % ANIMALS.length]
}
export const animalSrc = (name) => `/chars/${animalOf(name)}.webp`
