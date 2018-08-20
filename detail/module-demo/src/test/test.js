const setContainerFontSize = (size)=>{
    document.querySelector(".test-container1").innerText = "hello container1";
    document.querySelector(".test-container1").style.fontSize = size;
}

module.exports = setContainerFontSize;