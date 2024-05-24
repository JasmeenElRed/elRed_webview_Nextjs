export const truncateWithEllipses = (text, maxLength) => {
    if (!text) return "";
    console.log('gh')
    const title = text?.split(' ');
    if (title?.length < 3) return text;
  
    const thirdSpaceIndex = text.indexOf(title?.slice(0, 3).join(' ')) + title?.slice(0, 3)?.join(' ').length;
    const remainingText = text?.slice(thirdSpaceIndex).trim();
    return remainingText.length > maxLength
      ? text?.slice(0, thirdSpaceIndex) + ' ' + remainingText?.slice(0, maxLength) + "...'s Profile on elRed"
      : text;
  }
