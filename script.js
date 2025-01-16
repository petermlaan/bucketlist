const bucket = [];
document.querySelector("#btnSubmit").addEventListener("click", eventAdd);

function eventAdd(e) {
    console.log("click event");
    console.log(e);
    e.preventDefault();
    const name = document.querySelector("#activityName").value;
    const category = document.querySelector("#activityCategory").value;
    const activity = {
        name: name,
        category: category,
        done: false
    }
    bucket.push(activity);
    addActivity(activity);
}

function drawBucket() {
    const hBucket = document.querySelector("#bucketList");
    hBucket.innerHTML = "";
    for (const activity of bucket)
        addActivity(activity);
}

function addActivity(activity) {
    const hBucket = document.querySelector("#bucketList");

    const hActivity = document.createElement("div");

    const hSpan = document.createElement("span");
    hSpan.innerHTML =
        activity.name + " " + activity.category;
    hActivity.appendChild(hSpan);

    const hDone = document.createElement("input");
    hDone.type = "checkbox";
    hDone.addEventListener("click", eventDone);
    hActivity.appendChild(hDone);

    const hRemove = document.createElement("button");
    hRemove.type = "submit";
    hRemove.innerHTML = "Ta bort";
    hRemove.value = "remove";
    hRemove.addEventListener("click", eventRemove);
    hActivity.appendChild(hRemove);

    hBucket.appendChild(hActivity);
}

function eventRemove(e) {
    e.preventDefault();
    console.log(e);
    e.target.parentElement.remove();
}

function eventDone(e) {
    console.log(e);
}
