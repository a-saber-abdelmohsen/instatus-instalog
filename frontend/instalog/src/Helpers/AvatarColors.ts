export function getGradientColors(actor_id: string): {color1: string, color2: string} {
    let colorsDic: Record<string, string> = JSON.parse(sessionStorage.getItem('colorsDic') || '{}');  
    
    let colors = "";

    if (!(actor_id in colorsDic)) {
        colors = generateRandomColors();
        colorsDic[actor_id] = colors;
    } else{
        colors = colorsDic[actor_id];
    }
    sessionStorage.setItem('colorsDic', JSON.stringify(colorsDic));
    return {color1: colors.split(',')[0], color2: colors.split(',')[1]};
}



function generateRandomColors(): string {
    // Function to generate a random color
    const randomColor = () :string => {
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return color.length === 7 ? color : randomColor(); // Ensure color has 6 characters
    };

    const color1 = randomColor();
    let color2 = randomColor();
    
    // Ensure color2 is different from color1
    while (color2 === color1) {
        color2 = randomColor();
    }

    return `${color1},${color2}`;
}