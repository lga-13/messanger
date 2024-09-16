// language=hbs

export default `
<div>
    {{#if fieldLabel }}{{{ fieldLabel }}}{{/if}}
        {{{ fieldInput }}}
        {{#if fieldToggleButton }}{{{ fieldToggleButton }}}{{/if}}    
        {{#if fieldErrorMessage }}{{{ fieldErrorMessage }}}{{/if}}
    {{#if fieldLink }}{{{ fieldLink }}}{{/if}}
</div>
`;
