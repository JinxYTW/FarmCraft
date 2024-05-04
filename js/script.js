function generateFields(){

    const element = document.querySelector("field-parts"); 
    
    
    
    for (var i = 0; i < 25; i++) {

        const paragraphe = document.createElement("field-part"); 

        paragraphe.classList.add("grass"); 

        element.appendChild(paragraphe);
        
    }
}


function attachToolsEvent(){
    const tools = document.querySelectorAll("tool");
    
    for (const tool of tools){
        tool.addEventListener('click', function(event){
            const active = document.querySelector("tool.active");
            active?.classList.remove("active");
            event.target.classList.add("active");      
        });
    }  
    
}
//Voir event.target methode



function onGrassClick(){
    
    const selectedTool = document.querySelector("tool.active");
    
    switch(selectedTool?.id){
        case "tool-hoe":

            console.log("Hoe");
            this.classList.remove("grass");
            this.classList.add("farmland");
            break;
            
        case "tool-sow":
            console.log("Seed");
            if (this.classList.contains("farmland")){
                console.log("Seed");
                this.dataset.seed = 1;
                

            }
            break;
            

        case "tool-water":
            console.log("Water");
            if (this.classList.contains("farmland")){
                
                this.classList.add("hydrated");
            }
            break;

        case "tool-harvest":
            console.log("Harvest");
            if (this.classList.contains("farmland") && this.dataset.seed == 7){
                
                this.dataset.seed = 0;
                let wheatStock = document.getElementById("stock-wheat");
                wheatStock.innerHTML = parseInt(wheatStock.innerHTML) + 1;
            }

            
            break;

        
        
        
    }

}

function attachGrassEvent(){
    const gazon = document.querySelectorAll("field-part");
    
    for (const grass of gazon){
        grass.addEventListener('click', onGrassClick);
    }  
    
}

function grow() {
    console.log("Grow");
    const fields = document.querySelectorAll("field-part");
    for (const field of fields) {
        if (field.classList.contains("farmland")) {
            if (parseInt(field.dataset.seed) > 0 && parseInt(field.dataset.seed) < 7) {
                let growthChance = field.classList.contains('hydrated') ? 0.3 : 0.05;
                if (Math.random() < growthChance) {
                    field.dataset.seed = parseInt(field.dataset.seed) + 1;
                }
            } else if (parseInt(field.dataset.seed) === 0 && Math.random() < 0.01) {
                field.classList.remove("farmland");
                field.classList.add("grass");
            }
        }
    }
}



window.addEventListener("load", () => {
    generateFields();
    attachToolsEvent();
    attachGrassEvent();
    setInterval(grow, 1000);
} );