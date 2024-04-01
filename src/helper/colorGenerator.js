const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
  
    const brightR = Math.floor((r + 255) * brightness);
    const brightG = Math.floor((g + 255) * brightness);
    const brightB = Math.floor((b + 255) * brightness);
  
    const hexColor = `#${brightR.toString(16)}${brightG.toString(16)}${brightB.toString(16)}`;
  
    return hexColor;
  };