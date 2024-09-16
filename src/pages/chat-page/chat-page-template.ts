// language=hbs

export default `
    <div class="chats">
        <div class="chats-tape">
            <div class="chats-container-nav">
                <div class="chats-account-nav">
                    {{{ accountLink }}}
                </div>
                <form class="chats-search-box">
                    {{{ searchForm }}}
                </form>
            </div>
            <div class="chat-list">
                {{{ chatAvatarImg }}}
                {{{ chatsList }}}
            </div>
        </div>
        <div class="message-chain">
            {{{ messageChain }}}
        </div>
        {{{ chatPlug }}}
    </div>
`;
