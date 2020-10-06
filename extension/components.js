/* eslint-disable */

export const clearButtonHtml = `
<button class="current-lookup__clear-container">
<svg
    class="clear-icon"
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
>
    <path d="M0 0h24v24H0z" fill="none" />
    <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    />
</svg>
</button>`;

export const activeTabTag = `<div class="active-tab">
<p class="active-tab__text">Active Tab</p>
</div>`;

export const shortcutEscHtml = `
<button class="current-lookup__clear">
Clear search
<span class="shortcut">esc</span>
</button>`;

export const tabHtml = ({ id, url, title, favIconUrl, active }) => `
<div class="tab" data-id="${id}">
<div class="tab__left">
<div class="tab__favicon-container">
<img src=${favIconUrl} alt="tab favicon" class="tab__favicon">
</div>
    <div>
        <h2 class="tab__title">${title}</h2>
        <p class="tab__url">${url}</p>
    </div>
</div>
<div class="tab__right">
    ${active ? activeTabTag : ''}
    ${active ? clearButtonHtml : ''}
</div>
</div>`;

export const windowHtml = ({id, focused}) => `
<div class="window" data-id="${id}">
    
    <h2 class="window__id">Window ${1}</h2>

    ${focused ? activeTabTag : ''}

    <div class="tab-collection"></div>

</div>

`;
