export const getBackgroundColor = (target, input) => {
    let color = 'white';

    const frac = parseInt(input) / parseInt(target);

    if(frac < 0.33){
        color = '#CBD5E0';
    } else if(frac < 0.66){
        color = '#A0AEC0';
    } else if(frac < 0.99){
        color = '#718096';
    } else{
        color = 'black';
    }

    if (input === '' || input === undefined){
        color = 'white';
    }
    
    return color;
}

export const getTextColor = (target, input) => {
    const frac = input / target;

    let color = 'black';

    if(frac >= 0.99) color = 'white';

    return color;
}