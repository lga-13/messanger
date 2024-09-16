// language=hbs

export default `
    <div>
        {{#each chatList}}
            <hr>
            {{{ this }}}
        {{/each}}
    </div> 
`;
