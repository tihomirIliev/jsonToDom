    const jsonData = {
        props: {
            styling: "wplay",
            openTermsInCustomLightbox: "false",
            promoCodeDisplay: "basic",
            promoCodeSize: "5",
        },
        meta: {
            styling: {
                description: "The theme supports several color schemes",
                type: "dropdown",
                defaultValue: "winner",
                values: [
                    { winner: "Winner" },
                    { sunvegas: "SunVegas" },
                    { wplay: "Wplay" },
                ],
                label: "Select styling",
            },
            openTermsInCustomLightbox: {
                description:
                    "Hides close button from storeCardCredentials static page and applies popup styles to the scc terms window.",
                type: "checkbox",
                defaultValue: "false",
                label: "Open SCC terms in custom lightbox",
            },
            promoCodeDisplay: {
                description:
                    "Display promo code",
                type: "radio",
                defaultValue: "advanced",
                values: [
                    { basic: "Basic" },
                    { advanced: "Advanced" },
                ],
                label: "Display promo code",
            },
            promoCodeSize: {
                description:
                    "Defines the size of the promo code field",
                type: "text",
                defaultValue: "",
                label: "Promo code size",
            },
        }
    };
    let meta = jsonData.meta;
    let elements = Object.keys(meta);
    debugger
    let desFields = document.getElementsByClassName('description')
    let inputField = document.getElementsByClassName('inputField')


    elements.forEach(function(el, i){
        desFields[i].appendChild(document.createTextNode(meta[el].description))
    })

    function manageValues(action){
        action = this.id
        let updatedProps = {}
        let tempProps = [];
        let metaQuestions = Object.keys(jsonData.meta)

        switch(action){
            case 'save_btn':
                tempProps.push(document.getElementById('styling').value)
                tempProps.push(document.getElementById('openTermsInCustomLightbox').checked)

                let nodes = document.getElementById('promoCodeDisplay').childNodes
                let radioValues = Array.prototype.slice.call(nodes).filter(x=>x.nodeName=='INPUT')
                let optionToShow = false;
            
                radioValues.forEach(x=>{
                    if(x.checked){
                        optionToShow = x.value
                    }
                })
            
                tempProps.push(optionToShow)
                tempProps.push(document.getElementById('promoCodeSize').value)
            break;
            case 'default_btn':
                let defaultVaules = Object.keys(meta).map(el=>meta[el].defaultValue)

                defaultVaules.forEach(x=>tempProps.push(x))
                
                document.getElementById('styling').value = defaultVaules[0]
                document.getElementById('openTermsInCustomLightbox').checked = eval(defaultVaules[1])
                document.getElementById('radio2').checked = defaultVaules[2]
                document.getElementById('promoCodeSize').value = defaultVaules[3]
                
            break;
            case 'reset_btn':
                let initialValues = Object.keys(jsonData.props).map(el=>jsonData.props[el])
                
                initialValues.forEach(x=>tempProps.push(x))

                document.getElementById('styling').value = initialValues[0]
                document.getElementById('openTermsInCustomLightbox').checked = eval(initialValues[1])
                document.getElementById('radio2').checked = initialValues[2]
                document.getElementById('promoCodeSize').value = initialValues[3]
            break;

        }

        //adding the new values to the prop object
        Object.keys(jsonData.props).forEach((prop, index)=>{
            if(prop == 'styling'){
                updatedProps[prop]=tempProps[index].toLowerCase()
            }else{
                updatedProps[prop]=tempProps[index]
            }
        })
        
        generateNewTable(updatedProps)

        console.log(updatedProps);
        return updatedProps
    };

    function generateNewTable(tdata){
        let newDiv = document.createElement('div')
        let table = document.createElement('table')
        let tbody = document.createElement('tbody')
        let props = Object.keys(tdata)


        if(document.getElementsByClassName('result_screen').length > 0){
            document.getElementById('container').removeChild(document.getElementsByClassName('result_screen')[0])
        }
        
        let thead = document.createElement('thead')
        thead.appendChild(document.createTextNode('Updated properties'))
        table.appendChild(thead)

        for (let i = 0; i < 4; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < 2; j++) {
                let td = document.createElement('td');

                if(j<1){
                    td.appendChild(document.createTextNode(props[i]))
                }else{
                    td.appendChild(document.createTextNode(tdata[props[i]]))
                }
                
                tr.appendChild(td)
            }
            tbody.appendChild(tr);
        }
        
        table.classList.add('result_screen')
        table.appendChild(tbody)
        document.getElementById('container').appendChild(table)
        
    };


    document.getElementById('save_btn').addEventListener('click', manageValues)
    document.getElementById('default_btn').addEventListener('click', manageValues)
    document.getElementById('reset_btn').addEventListener('click', manageValues)
