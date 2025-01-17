const gBucket = []; // The activity list
document.querySelector("#btnSubmit").addEventListener("click", onAdd);

addTestData();

function onAdd(e) {
    e.preventDefault();
    const hName = document.querySelector("#activityName");
    const name = hName.value;
    hName.value = "";
    const hCategory = document.querySelector("#activityCategory");
    const category = hCategory.value;
    hCategory.selectedIndex = 0;
    const activity = {
        name: name,
        category: category,
        done: false
    };
    gBucket.push(activity);
    // Sort the bucket list first by category and then by name. Converts bool to number with the minus sign.
    gBucket.sort((a, b) => a.category !== b.category ? 1+2*-(a.category < b.category) : 1+2*-(a.name < b.name));
    drawBucket();
}

function onRemove(e) {
    e.preventDefault();
    const activity = e.target.parentElement.value;
    gBucket.splice(gBucket.indexOf(activity), 1);
    drawBucket();
}

function onDone(e) {
    const activity = e.target.parentElement.value;
    activity.done = !activity.done;
}

function drawBucket() {
    const hBucket = document.querySelector("#bucketList");

    // Remove the old list
    while (hBucket.firstChild) {
        hBucket.removeChild(hBucket.firstChild);
    }

    // Add the new list
    let category = "";
    for (const activity of gBucket) {
        if (category !== activity.category) {
            category = activity.category;
            drawCategory(hBucket, category)
        }
        drawActivity(hBucket, activity);
    }
}

function drawCategory(hParent, category) {
    const hCategory = document.createElement("h2");
    hCategory.innerText = category;
    hParent.appendChild(hCategory);
}

function drawActivity(hParent, activity) {
    const hActivity = document.createElement("div");
    hActivity.value = activity;
    hActivity.classList = "activity";

    const hSpan = document.createElement("span");
    hSpan.innerText = activity.name;
    hActivity.appendChild(hSpan);

    const hDone = document.createElement("input");
    hDone.type = "checkbox";
    hDone.checked = activity.done;
    hDone.addEventListener("click", onDone);
    hActivity.appendChild(hDone);
    
    const hRemove = document.createElement("button");
    hRemove.type = "submit";
    hRemove.innerText = "Ta bort";
    hRemove.addEventListener("click", onRemove);
    hActivity.appendChild(hRemove);

    hParent.appendChild(hActivity);
}

function addTestData() {
    function addActivity(hName, hCategory, hAdd, name, categoryIndex) {
        hName.value = name;
        hCategory.selectedIndex = categoryIndex;
        hAdd.click();
    }
    const hName = document.querySelector("#activityName");
    const hCategory = document.querySelector("#activityCategory");
    const hAdd = document.querySelector("#btnSubmit");
    addActivity(hName, hCategory, hAdd, "Resa till månen", 0);
    addActivity(hName, hCategory, hAdd, "Resa till Skövde", 0);
    addActivity(hName, hCategory, hAdd, "Spela DnD", 1);
    addActivity(hName, hCategory, hAdd, "Spela Shadowrun", 1);
    addActivity(hName, hCategory, hAdd, "Penningpolitik", 2);
    addActivity(hName, hCategory, hAdd, "Kvantfysik", 2);
    addActivity(hName, hCategory, hAdd, "Oljemålning", 3);
    addActivity(hName, hCategory, hAdd, "Samla frimärken", 3);
}