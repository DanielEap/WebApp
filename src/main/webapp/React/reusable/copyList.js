    // To let React know that a state variable has changed, you use the setter 
    // function (provided by React for that state variable). However, if you just 
    // change an element of an array (or property of an object), React does not 
    // know that the state variable has been changed. To deal with this you need to 
    // do what's known as a "deep copy", as shown below. 
    const copyList = (list) => {
        let listCopy = JSON.parse(JSON.stringify(list));
        return listCopy;
    };