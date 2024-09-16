// language=hbs

export default `
    <div class="{{className}}">
        <form class="settings-data">
            <div class="settings-page-img">
                {{{ settingsImg }}}
                {{{ settingsLinkImg }}}
            </div>
            {{{ userInfoCard }}}
            {{{ settingsDataLink }}}
            {{{ settingsPasswordLink }}}
            {{{ settingsExitLink }}}
            {{{ buttonBlueBack }}}    
        </form>
        <div class="settings-window">
            {{{ settingsPlug }}}
            {{{ changeDataForm }}}
            {{{ changePasswordForm }}}
        </div>
    </div>
`;
