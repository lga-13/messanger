import greetings from './user_info_card-template.ts';
import Block from '../../components/base/block.ts';
import { getUserData } from '../../pages/settings-page/settings-page.ts';
import Title from '../../components/title/title.ts';

export interface UserInfoCardBlockType{}

export class UserInfoCard extends Block<UserInfoCardBlockType> {
  declare children: {
    cardTitles: Title[]
  };

  constructor(props: UserInfoCardBlockType) {
    super('div', props);
  }

  addChildren() {
    this.children.cardTitles = [];
    Object.values(getUserData()).forEach((title) => {
      this.children.cardTitles.push(new Title({
        className: 'settings-label',
        text: title,
        settings: { withInternalID: true },
        tag: 'p',
      }));
    });
  }

  static generateBlock(data: Record<string, string>) {
    const titles: Title[] = [];
    // Делаем запрос пользователя
    Object.values(data).forEach((titleText) => {
      titles.push(new Title({
        className: 'settings-label',
        text: titleText,
        settings: { withInternalID: true },
        tag: 'p',
      }));
    });
    return titles;
  }

  refreshUserData() {
    this.children.cardTitles = UserInfoCard.generateBlock(getUserData());
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  render() {
    return this.compile(greetings, this.props);
  }
}
