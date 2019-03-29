import {
    elements
} from './base';

export const showLocalTime = timeAndDate => {
    elements.localTimeElem.innerHTML = `
      <p>${timeAndDate.date}</p>
      <p>${timeAndDate.time}</p>
    `;
}
