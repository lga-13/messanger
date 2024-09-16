import chat1 from '../../public/static/img/chat1.svg';
import chat2 from '../../public/static/img/chat2.svg';
import chat3 from '../../public/static/img/chat3.svg';
import chat4 from '../../public/static/img/chat4.svg';
import chat5 from '../../public/static/img/chat5.svg';
import chat6 from '../../public/static/img/chat6.svg';
import chat7 from '../../public/static/img/chat7.svg';
import NewRandomValue from '../../utils/getRandomItem.ts';
import Memory from './avatarMemory.ts';

// переменная avatarPool теперь содержит строки (пути к изображениям)
const avatarPool: string[] = [chat1, chat2, chat3, chat4, chat5, chat6, chat7];

const avatarMemory = new Memory();

class RandomAvatar {
  static get(userId: number) {
    if (!avatarMemory.exist(userId)) {
      avatarMemory.setMemory(userId, NewRandomValue.get(avatarPool));
    }
    return avatarMemory.get(userId);
  }
}

export default RandomAvatar;
