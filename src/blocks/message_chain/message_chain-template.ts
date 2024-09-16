// language=hbs

export default `
    <div class="message-chain">
        <div class="message-chain-header">
            <div class="message-chain-data-sender">
                <img class="message-chain-img" src="{{srcName}}" alt="photo"/>
                {{{ messageSenderName }}}
            </div>
            {{{ messageChainMoreButton }}}
        </div>
        <div class="message-chain-message-chain">
            {{#each chainMessages}}
                {{{ this }}}
            {{/each}}
        </div>
        <div class="message-chain-message-field">
            {{{ messageChainAttachmentsButton }}}
            {{{ messageChainForm }}}
        </div>
    </div>
`;
