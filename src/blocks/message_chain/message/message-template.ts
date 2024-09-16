// language=hbs

export default `
    {{#if me}}
        <div class="message-chain-sender-message">
    {{else}}
        <div class="message-chain-recipient-message">
    {{/if}}
        {{ text }}
        <div class="message-chain-time-message">
            {{ time }}
        </div>
        <div class="message-chain-read-flag">
            {{#if read}}
                <p>✓✓</p>
            {{ else }}
                <p class="message-chain-unread">✓</p>
            {{/if}}
        </div>
    </div>
    <script src="../message_chain-dynamic-box.ts"></script>
`;
