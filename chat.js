// Responsive Function Start
// function OnResize() {
//     window.onresize = () => {
//         if (NavList.className.includes("active")) {
//             NavList.classList.remove("active");
//         }
//     };
// }
// OnResize();
// let toggleBtn = document.querySelector(".toggleBar"),
//     NavList = document.querySelector(".links");

// toggleBtn.onclick = () => {
//     NavList.classList.toggle("active");

//     if (!NavList.classList.contains("active")) {
//         NavList.style.cssText = `
//                     transition: 0.2s
//                     height:0;
//                     padding:0;
//                     border:none;
//                     `;
//     }
// };
// Responsive Function End

import { API_KEY } from "./config.js";

// Get Date 
let date = new Date(),
    Hours = date.getHours(),
    Min = date.getMinutes();

window.onload = () => {
    Input.focus();
};

let chatBox = document.querySelector(".chat-box"),
    Input = document.getElementById("Input"),
    Submit = document.querySelector(".Submit"),
    Loading = false;

// Fetch Function 

let Fetch = async () => {
    Loading = true;
    Submit.style.cursor = "not-allowed";
    chatBox.innerHTML += `<div class="user-answer answer">
        <img  src="data:image/jpeg;base64,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" alt="" srcset="">
        <p>${Input.value}         </p 
        <span class="time-answer">
            ${Hours}:${Min} </span>
    </div> `;
    Input.setAttribute("disabled", true);
    Input.style.cursor = "not-allowed";
    


    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: `${Input.value}`,
                    },
                ],
            }),

        });

        if (!response.ok) {
            throw new Error(
                
                chatBox.innerHTML += `
            <div class="bot-answer">
                <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi_-o61MQSCEiri8zGK4IQ946ZQHKaMD6p2g&usqp=CAU" alt="" srcset="">
                <p>${Error.message}</p>
            </div>
            `);
        }
        Loading = false;
        Input.value ="";
        const data = await response.json();

        chatBox.innerHTML += `
            <div class="bot-answer">
                <img  src="./BOT.jpg" alt="" srcset="">
                <p>${data.choices[0].message.content}</p>
                <span class="time">
                ${Hours}:${Min} </span>
            </div> `;
            
            Input.style.cursor = "auto";
            Input.removeAttribute("disabled");
            Input.focus();
            Submit.style.cursor = "auto";
    } catch (error) {
        console.error(error);
    }

    chatBox.scrollTo({
        top: document.querySelector("body").scrollHeight += document.querySelector("body").scrollHeight + 100,
        behavior: "smooth",
    });

};

/* Call Function Start*/
Input.onkeyup = (e) => {
    if (e.key === "Enter" && Input.value !="") Submit.click();
};

Submit.onclick = (e) => {

    if (Input.value =="") {
        return ;
    }


    Fetch();
}; 

/* Call Function End */