// 
var obj = "hello";

fetch('DISCOURSES.json')
  .then(res => res.json())
  .then(data => {
    obj = data;
   })
  .then(() => {
    for (let i of obj.data) {
        //Create Card
        let card = document.createElement("div");
        //Card should have category and should stay hidden initially
        card.classList.add("card");
        card.classList.add(i.CATEGORY);
        //container
        let container = document.createElement("div");
        container.classList.add("container");
        //discourse name
        let name = document.createElement("h5");
        name.classList.add("discourse-name");
        name.innerText = i.DISCOURSE_NAME.toUpperCase();
        container.appendChild(name);
        //date
        let date = document.createElement("h6");
        date.innerText = i.DATE;
        date.classList.add("date");
        container.appendChild(date);
    
        let text = document.createElement("p");
        text.innerText = i.TEXT;
        text.style.display = "none";
        text.classList.add("discourse-text");
        container.appendChild(text);

        let view_btn = document.createElement("button");
        //var full_txt_param = `viewDiscourse(\"" + i.TEXT + ")`;
        var full_txt_param = "viewDiscourse(\"" + text.innerText + "\")";
        view_btn.setAttribute("onclick",full_txt_param);
        view_btn.setAttribute("type","button");
        view_btn.setAttribute("class","view_btn");
        view_btn.innerText = "View Full Discourse";
        container.appendChild(view_btn);
    
        card.appendChild(container);
        document.getElementById("discourses").appendChild(card);
    }
   });

function viewDiscourse(full_txt){
    var modal = document.getElementById("discourseModal");
    var modal_content = document.getElementsByClassName("modal-content")[0];
    
    let modal_content_txt = document.createElement("p");
    modal_content_txt.innerText=full_txt;
    modal_content.appendChild(modal_content_txt);
    
    modal.style.display = "block";
    
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
          modal_content_txt.remove();
        }
      }

}

function hideModal() {
    var modal = document.getElementById("discourseModal");
    modal_content_txt = modal.getElementsByTagName("p")[0];
    modal_content_txt.remove();
    modal.style.display = "none";
}


//parameter passed from botton (Parameter same as category)
// function filterCategory(value) {
//     //Button class code
//     let buttons = document.querySelectorAll(".button-value");
//     buttons.forEach((button) => {
//         //check if value equals innerText
//         if (value.toUpperCase() == button.innerText.toUpperCase()) {
//             button.classList.add("active");
//         } else {
//             button.classList.remove("active");
//         }
//     });

//     //select all cards
//     let elements = document.querySelectorAll(".card");
//     //loop through all cards
//     elements.forEach((element) => {
//         // display all cards on 'all' button click
//         if (value == "all") {
//             element.classList.remove("hide");
//         } else {
//             //Check if element contains category class
//             if (element.classList.contains(value)) {
//                 //display element based on category
//                 element.classList.remove("hide");   
//             } else {
//                 //hide other elements
//                 element.classList.add("hide");
//             }
//         }
//     });
// }
function filterCategory() {
    // Get all selected checkboxes
    var checkboxes = document.querySelectorAll('.checkbox-value:checked');

    // Extract values into an array
    var selectedCategories = Array.from(checkboxes).map(function (checkbox) {
        return checkbox.value;
    });

    // Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        // Check if value is in the selected categories
        if (selectedCategories.includes(button.innerText.toUpperCase())) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    // Select all cards
    let elements = document.querySelectorAll(".card");
    // Loop through all cards
    elements.forEach((element) => {
        // Display all cards if no category is selected
        if (selectedCategories.length === 0) {
            element.classList.remove("hide");
        } else {
            // Check if element contains any of the selected categories
            if (selectedCategories.some(category => element.classList.contains(category))) {
                // Display element based on category
                element.classList.remove("hide");
            } else {
                // Hide other elements
                element.classList.add("hide");
            }
        }
    });
}


// Function to filter by date
function filterDate() {
    // Get start and end dates
    var startDate = new Date(document.getElementById("start-date").value);
    var endDate = new Date(document.getElementById("end-date").value);

    // Select all cards
    let elements = document.querySelectorAll(".card");
    // Loop through all cards
    elements.forEach((element) => {
        // Parse the date from the card
        var cardDate = new Date(element.querySelector(".date").innerText);

        // Display all cards if date is within range
        if (isNaN(startDate) || isNaN(endDate) || (cardDate >= startDate && cardDate <= endDate)) {
            element.classList.remove("hide");
        } else {
            // Hide other elements
            element.classList.add("hide");
        }
    });
}

// Event listener for filter button click
document.getElementById("filter-button").addEventListener("click", function () {
    filterDate();
});


//Search button click
document.getElementById("search").addEventListener
("click", () => {
    //initializations
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".discourse-text");
    let cards = document.querySelectorAll(".card");

    //loop through all elements
    elements.forEach((element,index) => {
        //check if text includes the search value
        if (element.innerText.toLowerCase().includes(searchInput.toLowerCase())) {
            //display matching card
            cards[index].classList.remove("hide");
        } else {
            //hide others
            cards[index].classList.add("hide");
        }
    });
});

//Initially display all discourses
window.onload = () => {
    filterCategory("all");
};
