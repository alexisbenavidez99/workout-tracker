// import { request } from 'request';
const search = document.getElementById('search')
const workoutCard = document.getElementById('explain')

search?.addEventListener("click", () => {
    let radioValue = document.querySelector('input[name="exercise_type"]:checked').value
    $.getJSON({
        url: 'https://api.api-ninjas.com/v1/exercises?' + radioValue,
        headers: { 'X-Api-Key': 'Y+nxTPsyrkSvnAOH9CKTkQ==dnVOTmqx3Q0WpvJT' },
        success: function (data) {
            console.log(data);
            workoutCard.innerHTML = "";
            data.forEach(exercise => {
                let exerciseDiv = document.createElement('div');
                let exerciseHeader = document.createElement('h1');
                let arrow = document.createElement("span");
                arrow.innerHTML = "&#x25BC;";
                arrow.style.marginLeft = "5px";
                arrow.style.fontSize = "20px";
                arrow.style.transition = "transform 0.3s ease-in-out";
                exerciseHeader.innerHTML = exercise.name;
                exerciseHeader.appendChild(arrow);
                exerciseHeader.style.borderBottom = "1px solid gray";
                exerciseHeader.classList.add(
                    'text-lg',
                    'font-bold',
                    'my-1',
                    'space-y-2',
                    'leading-6',
                    'font-medium',
                    'text-gray-900',
                    'truncate',
                    'mb-2',
                    'text-center',
                    'font-sans',
                    'font-norma'
                );

                let exerciseDesc = document.createElement('span');
                exerciseDesc.innerHTML = exercise.instructions;
                exerciseDesc.classList.add(
                    'text-base',
                    'leading-5',
                    'mb-3',
                    'text-gray-500',
                    'text-center',
                    'font-sans',
                    'font-norma'
                );

                exerciseHeader.addEventListener("click", function () {
                    let content = this.nextElementSibling;
                    let arrow = this.querySelector("span");
                    if (content.style.display === "block") {
                        content.style.display = "none";
                        arrow.style.transform = "rotate(0deg)";
                    } else {
                        content.style.display = "block";
                        arrow.style.transform = "rotate(180deg)";
                    }
                });

                exerciseDesc.style.display = "none";
                exerciseDiv.appendChild(exerciseHeader);
                exerciseDiv.appendChild(exerciseDesc);
                workoutCard.appendChild(exerciseDiv);
            });
        }
    });
});

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
        this.parentElement.querySelector('.accordion-body').classList.toggle('hidden');
    });
});