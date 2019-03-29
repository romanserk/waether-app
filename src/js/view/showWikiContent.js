import {
    elements,
} from './base';


export const updateWikiRes = content => {
    
    elements.wikiContainer.innerHTML = `
        <p>${content.data.extract}</p>
        <img src=${content.data.originalimage.source}>
    `;

}
