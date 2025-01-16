const gBucket = [];
document.querySelector("#btnSubmit").addEventListener("click", onAdd);

function onAdd(e) {
    e.preventDefault();
    const name = document.querySelector("#activityName").value;
    const category = document.querySelector("#activityCategory").value;
    const activity = {
        name: name,
        category: category,
        done: false
    }
    gBucket.push(activity);
    gBucket.sort((a, b) => a.category !== b.category ? a.category > b.category : a.name > b.name);
    drawBucket();
}

function onRemove(e) {
    e.preventDefault();
    const activity = e.target.parentElement.value;
    gBucket.splice(gBucket.indexOf(activity), 1);
    drawBucket();
}

function onDone(e) {
    console.log(e);
    console.log(gBucket);
    const activity = e.target.parentElement.value;
    activity.done = !activity.done;
    console.log(gBucket);
}

function drawBucket() {
    const hBucket = document.querySelector("#bucketList");
    hBucket.innerHTML = "";
    let category = "";
    for (const activity of gBucket) {
        if (category !== activity.category) {
            category = activity.category;
            drawCategory(hBucket, category);
        }
        drawActivity(hBucket, activity);
    }
}

function drawCategory(hBucket, category) {
    const hCategory = document.createElement("div");

    const hTxt = document.createElement("h2");
    hTxt.innerText = category;
    hCategory.appendChild(hTxt);

    hBucket.appendChild(hCategory);
}

function drawActivity(hBucket, activity) {
    const hActivity = document.createElement("div");
    hActivity.value = activity;

    const hSpan = document.createElement("span");
    hSpan.innerHTML = activity.name;
    hActivity.appendChild(hSpan);

    const hDone = document.createElement("input");
    hDone.type = "checkbox";
    hDone.checked = activity.done;
    hDone.addEventListener("click", onDone);
    hActivity.appendChild(hDone);

    const hRemove = document.createElement("button");
    hRemove.type = "submit";
    hRemove.innerText = "Ta bort";
    hRemove.value = "remove";
    hRemove.addEventListener("click", onRemove);
    hActivity.appendChild(hRemove);

    hBucket.appendChild(hActivity);
}
