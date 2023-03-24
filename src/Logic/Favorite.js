function toggleSaveToLocalStorage(city, icon, lat, lon) {
    let items = JSON.parse(localStorage.getItem('Items')) || [];

    const newItem = {
        location: city,
        isEmpty: icon,
        latitude: lat,
        longitude: lon
    };

    let found = false;

    for (let i = 0; i < items.length; i++) {
        if (items[i].location === city) {
            items.splice(i, 1)
            found = true;
            break;
        }
    }

    if(!found){
        items.push(newItem);
    }
    
    const itemsStr = JSON.stringify(items);
    localStorage.setItem('Items', itemsStr);
    //console.log(itemsStr)
    // if(!favorites.includes(city)){
    //     favorites.push(city);
    // }else{
    //     let nameindex = favorites.indexOf(city);
    //     favorites.splice(nameindex, 1);
    // }
    
    // if(!iconList.includes(icon)){
    //     iconList.push(icon);
    // }else{
    //     let iconIndex = iconList.indexOf(icon);
    //     iconList.splice(iconIndex, 1);
    // }
    
    // localStorage.setItem('Favorites', JSON.stringify(favorites));
    // localStorage.setItem('IconList', JSON.stringify(iconList));
}

function getLocalStorage(){
    // get all of the values that are stored in favorites in local storage
    // let localStorageData;
    // let items = { 
    //     favorites: localStorage.getItem('Favorites'),
    //     iconList: localStorage.getItem('IconList')
    // }
    const itemsStr = localStorage.getItem('Items');
    
    if (itemsStr === null) {
        return [];
    }
    
    const items = JSON.parse(itemsStr);

    return items
        
    
}

export{toggleSaveToLocalStorage, getLocalStorage};