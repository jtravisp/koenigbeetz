function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("symbol", ev.target.dataset.symbol);
}

function drop(ev) {
    ev.preventDefault();
    let beatBox = ev.target;
    if (!beatBox.classList.contains("beat")) {
        beatBox = beatBox.closest(".beat");
        if (!beatBox) {
            return;
        }
    }

    var id = ev.dataTransfer.getData("text");
    var symbol = ev.dataTransfer.getData("symbol");

    // Assign the duration value to the rhythm elements
    var duration = 0;
    switch (id) {
        case 'quarterNote':
            duration = 1;
            break;
        case 'eighthNote':
            duration = 0.5;
            break;
        case 'sixteenthNote':
            duration = 0.5;
            break;
        default:
            break;
    }

    // Calculate the total duration of the rhythm elements in the beat box
    var totalDuration = Array.from(beatBox.children).reduce((acc, child) => {
        var childDuration = 0;
        switch (child.id) {
            case 'quarterNote':
                childDuration = 1;
                break;
            case 'eighthNote':
                childDuration = 0.5;
                break;
            case 'sixteenthNote':
                childDuration = 0.25;
                break;
            default:
                break;
        }
        return acc + childDuration;
    }, 0);

    // Check if adding the new rhythm element would exceed the allowed duration
    if (totalDuration + duration > 1) {
        return;
    }

    var rhythmElement = document.createElement("div");
    rhythmElement.id = id;
    rhythmElement.classList.add("rhythm", "note");
    rhythmElement.style.width = "100%";
    rhythmElement.style.height = "100%";
    rhythmElement.textContent = symbol;

    beatBox.appendChild(rhythmElement);
}




function clearBoxes() {
    const beats = document.querySelectorAll(".beat");
    beats.forEach(beat => {
        beat.innerHTML = '';
    });
}
