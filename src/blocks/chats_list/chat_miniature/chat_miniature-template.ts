// language=hbs

export default `
    {{#if active}}
        <div class="chats-message-active">
    {{else}}
        <div class="chats-message">
    {{/if}}
        <img class="chats-img" src="{{srcName}}" alt="btn"/>
        <div class="chats-text">
            <span class="chats-message-sender">
                {{sender}}
            </span>
            <div class="chats-message-answer">
                {{#if your}}
                    <span class="chats-your-message">
                        Вы:
                    </span>
                {{/if}}
                <span class="chats-message-content">
                    {{content}}
                </span>
            </div>
        </div>
        <div class="chats-time-and-count">
            <span class="chats-time">
                {{time}}
            </span>
            {{#if count}}
                <span class="chats-count">
                    {{count}}
                </span>
            {{/if}}
        </div>
    </div>
`;
